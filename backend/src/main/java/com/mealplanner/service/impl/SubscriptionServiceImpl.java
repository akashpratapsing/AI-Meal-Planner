package com.mealplanner.service.impl;

import com.mealplanner.model.*;
import com.mealplanner.repository.PaymentTransactionRepository;
import com.mealplanner.repository.SubscriptionRepository;
import com.mealplanner.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Override
    public Subscription createPendingSubscription(
            String userId,
            String email,
            SubscriptionPlan plan
    ) {
        subscriptionRepository
                .findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE)
                .filter(s -> s.getPlan() == plan)
                .ifPresent(s -> {
                    throw new IllegalStateException("Subscription already active for this plan");
                });

        Subscription sub = new Subscription();
        sub.setUserId(userId);
        sub.setUserEmail(email);
        sub.setPlan(plan);
        sub.setStatus(SubscriptionStatus.PENDING);
        sub.setCreatedAt(LocalDateTime.now());
        sub.setUpdatedAt(LocalDateTime.now());

        return subscriptionRepository.save(sub);
    }

    @Override
    public void activateSubscription(String subscriptionId) {

        Subscription sub = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));

        if (sub.getStatus() == SubscriptionStatus.ACTIVE) return;

        LocalDateTime now = LocalDateTime.now();

        sub.setStatus(SubscriptionStatus.ACTIVE);

        if (sub.getStartDate() == null) {
            sub.setStartDate(now);
        }

        LocalDateTime base = sub.getEndDate() != null
                ? sub.getEndDate()
                : now;

        sub.setEndDate(base.plusMonths(1));
        sub.setGraceUntil(sub.getEndDate().plusDays(3));
        sub.setUpdatedAt(now);

        subscriptionRepository.save(sub);
        log.info("Subscription activated: {}", sub);
    }

    @Override
    public boolean hasActiveSubscription(String userId) {
        LocalDateTime now = LocalDateTime.now();

        return subscriptionRepository
                .findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE)
                .filter(sub ->
                        (sub.getEndDate() != null && sub.getEndDate().isAfter(now)) ||
                                (sub.getGraceUntil() != null && sub.getGraceUntil().isAfter(now))
                )
                .isPresent();
    }
}


