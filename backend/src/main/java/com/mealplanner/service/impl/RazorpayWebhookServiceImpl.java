package com.mealplanner.service.impl;

import com.mealplanner.model.PaymentStatus;
import com.mealplanner.model.PaymentTransaction;
import com.mealplanner.model.WebhookEvent;
import com.mealplanner.repository.PaymentTransactionRepository;
import com.mealplanner.repository.WebhookEventRepository;
import com.mealplanner.service.PaymentWebhookService;
import com.mealplanner.service.SubscriptionService;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class RazorpayWebhookServiceImpl implements PaymentWebhookService {

    private final WebhookEventRepository webhookEventRepository;
    private final PaymentTransactionRepository paymentRepository;
    private final SubscriptionService subscriptionService;

    @Value("${razorpay.webhook.secret}")
    private String webhookSecret;

    @Override
    public void handleWebhook(String payload, String signature, String eventId) {

        if (payload == null || signature == null) {
            log.error("Webhook missing payload or signature");
            return;
        }

        log.info("Webhook signature received: {}", signature);
        log.info("Webhook event id: {}", eventId);

        // 1️⃣ Verify signature FIRST
        try {
            Utils.verifyWebhookSignature(payload, signature, webhookSecret);
        } catch (Exception e) {
            log.error("❌ Webhook signature verification failed", e);
            throw new SecurityException("Invalid webhook signature");
        }

        // 2️⃣ Idempotency (REAL one)
        if (eventId != null && webhookEventRepository.existsById(eventId)) {
            log.info("Duplicate webhook ignored: {}", eventId);
            return;
        }

        JSONObject root = new JSONObject(payload);
        String eventType = root.getString("event");

        JSONObject payloadObj = root.getJSONObject("payload");
        JSONObject paymentEntity = payloadObj
                .getJSONObject("payment")
                .getJSONObject("entity");

        String orderId = paymentEntity.optString("order_id", null);
        String paymentId = paymentEntity.optString("id", null);

        log.info("Webhook event={}, orderId={}, paymentId={}",
                eventType, orderId, paymentId);

        if (orderId == null) {
            log.warn("Webhook without order_id ignored");
            return;
        }

        // 3️⃣ Handle event
        switch (eventType) {
            case "payment.authorized":
            case "payment.captured":
            case "order.paid":
                handleCaptured(orderId, paymentId);
                break;

            case "payment.failed":
                handleFailed(orderId);
                break;

            case "payment.refunded":
                handleRefunded(orderId);
                break;

            default:
                log.info("Ignoring Razorpay event: {}", eventType);
        }

        // 4️⃣ Persist processed event
        if (eventId != null) {
            webhookEventRepository.save(
                    new WebhookEvent(eventId, eventType, true, LocalDateTime.now())
            );
        }
    }

    private void handleCaptured(String orderId, String paymentId) {
        PaymentTransaction txn = paymentRepository
                .findByRazorpayOrderId(orderId)
                .orElseThrow(() -> new IllegalStateException("Transaction not found"));

        if (txn.getStatus() == PaymentStatus.CAPTURED) return;

        txn.setRazorpayPaymentId(paymentId);
        txn.setStatus(PaymentStatus.CAPTURED);
        txn.setPaymentDate(LocalDateTime.now());
        txn.setUpdatedAt(LocalDateTime.now());
        paymentRepository.save(txn);

        log.info("Activating subscription {}", txn.getSubscriptionId());
        subscriptionService.activateSubscription(txn.getSubscriptionId());
    }

    private void handleFailed(String orderId) {
        paymentRepository.findByRazorpayOrderId(orderId)
                .ifPresent(txn -> {
                    txn.setStatus(PaymentStatus.FAILED);
                    txn.setUpdatedAt(LocalDateTime.now());
                    paymentRepository.save(txn);
                });
    }

    private void handleRefunded(String orderId) {
        paymentRepository.findByRazorpayOrderId(orderId)
                .ifPresent(txn -> {
                    txn.setStatus(PaymentStatus.REFUNDED);
                    txn.setUpdatedAt(LocalDateTime.now());
                    paymentRepository.save(txn);
                });
    }
}



