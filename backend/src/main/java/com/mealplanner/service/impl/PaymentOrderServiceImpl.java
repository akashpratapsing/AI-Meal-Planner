package com.mealplanner.service.impl;

import com.mealplanner.dto.PaymentOrderResponse;
import com.mealplanner.model.*;
import com.mealplanner.repository.PaymentTransactionRepository;
import com.mealplanner.repository.SubscriptionRepository;
import com.mealplanner.service.PaymentOrderService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentOrderServiceImpl implements PaymentOrderService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;


    private final RazorpayClient razorpayClient;
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentTransactionRepository paymentRepository;

    @Override
    public PaymentOrderResponse createOrder(
            String userId,
            String email,
            SubscriptionPlan plan
    ) {
        if (plan == SubscriptionPlan.FREE) {
            throw new IllegalArgumentException("FREE plan does not require payment");
        }

        // 1️⃣ Create PENDING subscription FIRST
        Subscription sub = new Subscription();
        sub.setUserId(userId);
        sub.setUserEmail(email);
        sub.setPlan(plan);
        sub.setStatus(SubscriptionStatus.PENDING);
        sub.setCreatedAt(LocalDateTime.now());
        sub.setUpdatedAt(LocalDateTime.now());

        sub = subscriptionRepository.save(sub);
        log.info("Saved Pending Subscription with userid: {}", userId);
        log.info("Saved Pending Subscription with userEmail: {}", email);
        // ✅ sub.getId() is now NON-NULL

        // 2️⃣ Calculate amount
        int amount = getAmountInPaise(plan);

        // 3️⃣ Create Razorpay order
        JSONObject options = new JSONObject();
        options.put("amount", amount);
        options.put("currency", "INR");
        options.put("receipt", "sub_" + sub.getId());

        Order order;
        try {
            order = razorpayClient.orders.create(options);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order", e);
        }

        // 4️⃣ Create payment transaction
        PaymentTransaction txn = new PaymentTransaction();
        txn.setUserId(userId);
        txn.setUserEmail(email);
        txn.setSubscriptionId(sub.getId()); // ✅ SAFE
        txn.setPlan(plan);
        txn.setAmount(amount / 100.0);
        txn.setCurrency("INR");
        txn.setRazorpayOrderId(order.get("id"));
        txn.setStatus(PaymentStatus.CREATED);
        txn.setCreatedAt(LocalDateTime.now());
        txn.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(txn);
        log.info("Saved transaction with order_id: {}", txn.getRazorpayOrderId());

        // 5️⃣ Return order to frontend
        return new PaymentOrderResponse(
//                order.get("id"),
                txn.getRazorpayOrderId(),
                amount,
                "INR",
                razorpayKeyId
        );
    }

    private int getAmountInPaise(SubscriptionPlan plan) {
        return switch (plan) {
            case PRO -> 49900; // ₹499
            default -> throw new IllegalStateException("Unexpected plan");
        };
    }
}

