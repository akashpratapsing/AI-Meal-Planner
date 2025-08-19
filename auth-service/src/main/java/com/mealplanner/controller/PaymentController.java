package com.mealplanner.controller;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.CreateOrderRequest;
import com.mealplanner.dto.PaymentVerificationRequest;
import com.mealplanner.dto.SubscriptionResponse;
import com.mealplanner.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/payments/v1")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        Map<String, Object> order = paymentService.createOrder(request, userPrincipal.getUser().getId());
        return ResponseEntity.ok(order);
    }

    @PostMapping("/verify-payment")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SubscriptionResponse> verifyPayment(
            @Valid @RequestBody PaymentVerificationRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        SubscriptionResponse subscription = paymentService.verifyPayment(request, userPrincipal.getUser().getId());
        return ResponseEntity.ok(subscription);
    }

    @GetMapping("/subscription")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SubscriptionResponse> getCurrentSubscription(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        SubscriptionResponse subscription = paymentService.getCurrentSubscription(userPrincipal.getUser().getId());
        return ResponseEntity.ok(subscription);
    }

    @PostMapping("/upgrade-free")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SubscriptionResponse> upgradeToFreePlan(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        SubscriptionResponse subscription = paymentService.upgradeToFreePlan(userPrincipal.getUser().getId());
        return ResponseEntity.ok(subscription);
    }

    @PostMapping("/cancel")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> cancelSubscription(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        boolean cancelled = paymentService.cancelSubscription(userPrincipal.getUser().getId());
        if (cancelled) {
            return ResponseEntity.ok("Subscription cancelled successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to cancel subscription");
        }
    }

    @GetMapping("/api-calls/remaining")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> getRemainingApiCalls(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        String userId = userPrincipal.getUser().getId();
        int remainingApiCalls = paymentService.getRemainingApiCalls(userId);
        int remainingGenerateCalls = paymentService.getRemainingGenerateCalls(userId);
        
        Map<String, Object> response = Map.of(
            "remainingApiCalls", remainingApiCalls,
            "remainingGenerateCalls", remainingGenerateCalls,
            "userId", userId
        );
        return ResponseEntity.ok(response);
    }
}
