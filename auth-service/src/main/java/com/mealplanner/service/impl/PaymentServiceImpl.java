package com.mealplanner.service.impl;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.CreateOrderRequest;
import com.mealplanner.dto.PaymentVerificationRequest;
import com.mealplanner.dto.SubscriptionResponse;
import com.mealplanner.model.PaymentTransaction;
import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.model.User;
import com.mealplanner.repository.PaymentTransactionRepository;
import com.mealplanner.repository.SubscriptionRepository;
import com.mealplanner.repository.UserRepository;
import com.mealplanner.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    // @Value("${razorpay.key.secret}")
    // private String keySecret;

    private final RazorpayClient razorpayClient;
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final UserRepository userRepository;

    @Override
    public Map<String, Object> createOrder(CreateOrderRequest request, String userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            SubscriptionPlan plan = request.getPlan();
            
            // Create Razorpay order
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", plan.getPriceInPaise());
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt_" + UUID.randomUUID().toString().substring(0, 8));
            
            // Notes should be a Map, not a String
            JSONObject notes = new JSONObject();
            notes.put("description", request.getNotes() != null ? request.getNotes() : "Subscription payment for " + plan.getName() + " plan");
            notes.put("plan", plan.getName());
            notes.put("userId", userId);
            orderRequest.put("notes", notes);

            Order order = razorpayClient.orders.create(orderRequest);

            System.out.println("\nOrder Details : \n" + order + "\n");

            // Save payment transaction
            PaymentTransaction transaction = new PaymentTransaction();
            transaction.setUserId(userId);
            transaction.setUserEmail(user.getEmail());
            transaction.setPlan(plan);
            transaction.setRazorpayOrderId(order.get("id").toString());
            transaction.setAmount(plan.getPriceInRupees());
            transaction.setCurrency("INR");
            transaction.setStatus("PENDING");
            transaction.setDescription("Subscription payment for " + plan.getName() + " plan");
            transaction.setReceipt(order.get("receipt").toString());
            transaction.setCreatedAt(LocalDateTime.now());
            transaction.setUpdatedAt(LocalDateTime.now());

            paymentTransactionRepository.save(transaction);

            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("receipt", order.get("receipt"));
            response.put("keyId", getRazorpayKeyId());

            return response;

        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create order: " + e.getMessage());
        }
    }

    @Override
    public SubscriptionResponse verifyPayment(PaymentVerificationRequest request, String userId) {
        try {
            // Verify payment signature
            if (!verifyPaymentSignature(request)) {
                throw new RuntimeException("Payment signature verification failed");
            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Get payment transaction
            PaymentTransaction transaction = paymentTransactionRepository
                    .findByRazorpayOrderId(request.getRazorpayOrderId())
                    .orElseThrow(() -> new RuntimeException("Payment transaction not found"));

            // Update transaction status
            transaction.setRazorpayPaymentId(request.getRazorpayPaymentId());
            transaction.setStatus("SUCCESS");
            transaction.setPaymentDate(LocalDateTime.now());
            transaction.setUpdatedAt(LocalDateTime.now());
            paymentTransactionRepository.save(transaction);

            // Create or update subscription
            Subscription subscription = createOrUpdateSubscription(user, transaction);

            return mapToSubscriptionResponse(subscription);

        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    @Override
    public SubscriptionResponse getCurrentSubscription(String userId) {
        Subscription subscription = subscriptionRepository.findByUserId(userId)
                .orElse(null);

        if (subscription == null) {
            // Create free subscription if none exists
            subscription = createFreeSubscription(userId);
        }

        return mapToSubscriptionResponse(subscription);
    }

    @Override
    public SubscriptionResponse upgradeToFreePlan(String userId) {
        Subscription subscription = createFreeSubscription(userId);
        return mapToSubscriptionResponse(subscription);
    }

    @Override
    public boolean cancelSubscription(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            subscription.setStatus("CANCELLED");
            subscription.setUpdatedAt(LocalDateTime.now());
            subscriptionRepository.save(subscription);
            return true;
        }
        return false;
    }

    @Override
    public boolean hasValidSubscription(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            return "ACTIVE".equals(subscription.getStatus()) && 
                   subscription.getEndDate().isAfter(LocalDateTime.now());
        }
        return false;
    }

    @Override
    public boolean canMakeApiCall(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            boolean canMake = subscription.getRemainingApiCalls() > 0;
            log.debug("User {} can make API call: {} (remaining: {})", userId, canMake, subscription.getRemainingApiCalls());
            return canMake;
        }
        log.debug("User {} has no subscription, cannot make API call", userId);
        return false;
    }

    @Override
    public void decrementApiCalls(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            if (subscription.getRemainingApiCalls() > 0) {
                subscription.setRemainingApiCalls(subscription.getRemainingApiCalls() - 1);
                subscription.setUpdatedAt(LocalDateTime.now());
                subscriptionRepository.save(subscription);
            }
        }
    }

    @Override
    public int getRemainingApiCalls(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            return subscriptionOpt.get().getRemainingApiCalls();
        }
        return 0;
    }

    @Override
    public boolean canMakeGenerateCall(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            // Pro users have unlimited generate calls
            if (subscription.getPlan() == SubscriptionPlan.PRO) {
                return true;
            }
            // Free users have monthly limit
            return subscription.getRemainingGenerateCalls() > 0;
        }
        return false;
    }

    @Override
    public void decrementGenerateCalls(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            // Only decrement for FREE users (PRO users have unlimited)
            if (subscription.getPlan() == SubscriptionPlan.FREE && subscription.getRemainingGenerateCalls() > 0) {
                subscription.setRemainingGenerateCalls(subscription.getRemainingGenerateCalls() - 1);
                subscription.setUpdatedAt(LocalDateTime.now());
                subscriptionRepository.save(subscription);
            }
        }
    }

    @Override
    public int getRemainingGenerateCalls(String userId) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserId(userId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            // Pro users have unlimited generate calls
            if (subscription.getPlan() == SubscriptionPlan.PRO) {
                return -1; // -1 indicates unlimited
            }
            return subscription.getRemainingGenerateCalls();
        }
        return 0;
    }

    private boolean verifyPaymentSignature(PaymentVerificationRequest request) {
        // In production, implement proper signature verification
        // For now, return true (you should implement this properly)
        return true;
    }

    private Subscription createOrUpdateSubscription(User user, PaymentTransaction transaction) {
        Optional<Subscription> existingSubscription = subscriptionRepository.findByUserId(user.getId());
        
        Subscription subscription;
        if (existingSubscription.isPresent()) {
            subscription = existingSubscription.get();
        } else {
            subscription = new Subscription();
            subscription.setUserId(user.getId());
            subscription.setUserEmail(user.getEmail());
            subscription.setCreatedAt(LocalDateTime.now());
        }

        subscription.setPlan(transaction.getPlan());
        subscription.setStatus("ACTIVE");
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusMonths(1));
        subscription.setNextBillingDate(LocalDateTime.now().plusMonths(1));
        subscription.setRemainingApiCalls(transaction.getPlan().getDailyApiCalls());
        subscription.setTotalApiCalls(transaction.getPlan().getDailyApiCalls());
        subscription.setRemainingGenerateCalls(transaction.getPlan().getMonthlyGenerateCalls());
        subscription.setTotalGenerateCalls(transaction.getPlan().getMonthlyGenerateCalls());
        subscription.setLastPaymentId(transaction.getRazorpayPaymentId());
        subscription.setLastPaymentDate(transaction.getPaymentDate());
        subscription.setLastPaymentAmount(transaction.getAmount());
        subscription.setLastPaymentStatus(transaction.getStatus());
        subscription.setUpdatedAt(LocalDateTime.now());

        return subscriptionRepository.save(subscription);
    }

    private Subscription createFreeSubscription(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subscription subscription = new Subscription();
        subscription.setUserId(userId);
        subscription.setUserEmail(user.getEmail());
        subscription.setPlan(SubscriptionPlan.FREE);
        subscription.setStatus("ACTIVE");
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusYears(100)); // Free plan never expires
        subscription.setNextBillingDate(LocalDateTime.now().plusYears(100));
        subscription.setRemainingApiCalls(SubscriptionPlan.FREE.getDailyApiCalls());
        subscription.setTotalApiCalls(SubscriptionPlan.FREE.getDailyApiCalls());
        subscription.setRemainingGenerateCalls(SubscriptionPlan.FREE.getMonthlyGenerateCalls());
        subscription.setTotalGenerateCalls(SubscriptionPlan.FREE.getMonthlyGenerateCalls());
        subscription.setCreatedAt(LocalDateTime.now());
        subscription.setUpdatedAt(LocalDateTime.now());

        return subscriptionRepository.save(subscription);
    }

    private SubscriptionResponse mapToSubscriptionResponse(Subscription subscription) {
        SubscriptionResponse response = new SubscriptionResponse();
        response.setId(subscription.getId());
        response.setUserId(subscription.getUserId());
        response.setUserEmail(subscription.getUserEmail());
        response.setPlan(subscription.getPlan());
        response.setStatus(subscription.getStatus());
        response.setStartDate(subscription.getStartDate());
        response.setEndDate(subscription.getEndDate());
        response.setNextBillingDate(subscription.getNextBillingDate());
        response.setRemainingApiCalls(subscription.getRemainingApiCalls());
        response.setTotalApiCalls(subscription.getTotalApiCalls());
        response.setCreatedAt(subscription.getCreatedAt());
        return response;
    }

    private String getRazorpayKeyId() {
        // This should come from configuration
        return keyId; // Replace with actual key from properties
    }
}
