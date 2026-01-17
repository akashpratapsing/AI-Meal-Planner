package com.mealplanner.controller;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.CreateSubscriptionRequest;
import com.mealplanner.model.Subscription;
import com.mealplanner.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/create")
    public ResponseEntity<?> createSubscription(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody CreateSubscriptionRequest request
    ) {
        Subscription sub = subscriptionService.createPendingSubscription(
                user.getId(),
                user.getEmail(),
                request.getPlan()
        );

        return ResponseEntity.ok(sub.getId());
    }

}
