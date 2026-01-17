package com.mealplanner.service.impl;

import com.mealplanner.model.*;
import com.mealplanner.repository.FeatureUsageRepository;
import com.mealplanner.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class FeatureUsageService {

    private final FeatureUsageRepository usageRepository;
    private final SubscriptionRepository subscriptionRepository;

    public void checkAndConsume(
            String userId,
            Feature feature
    ) {
        SubscriptionPlan plan = subscriptionRepository
                .findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE)
                .map(Subscription::getPlan)
                .orElse(SubscriptionPlan.FREE);

        if (plan == SubscriptionPlan.PRO) {
            return; // unlimited
        }

        switch (feature) {
            case CREATE_MEAL_PLAN -> enforceMonthly(
                    userId, feature, 3
            );
            case RANDOM_MEAL -> enforceDaily(
                    userId, feature, 2
            );
        }
    }

    private void enforceMonthly(
            String userId,
            Feature feature,
            int limit
    ) {
        String currentMonth = YearMonth.now().toString(); // "2026-01"

        FeatureUsage usage = usageRepository
                .findByUserIdAndFeatureAndUsageMonth(userId, feature, currentMonth)
                .orElseGet(() -> createMonthly(userId, feature, currentMonth));


        if (usage.getCount() >= limit) {
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "Monthly limit reached. Upgrade to PRO."
            );
        }

        usage.setCount(usage.getCount() + 1);
        usage.setUpdatedAt(LocalDateTime.now());
        usageRepository.save(usage);
    }

    private void enforceDaily(
            String userId,
            Feature feature,
            int limit
    ) {
        LocalDate today = LocalDate.now();

        FeatureUsage usage = usageRepository
                .findByUserIdAndFeatureAndUsageDate(userId, feature, today)
                .orElseGet(() -> createDaily(userId, feature, today));

        if (usage.getCount() >= limit) {
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "Daily limit reached. Upgrade to PRO."
            );
        }

        usage.setCount(usage.getCount() + 1);
        usage.setUpdatedAt(LocalDateTime.now());
        usageRepository.save(usage);
    }

    private FeatureUsage createDaily(String userId, Feature feature, LocalDate date) {
        FeatureUsage u = new FeatureUsage();
        u.setUserId(userId);
        u.setFeature(feature);
        u.setUsageDate(date);
        u.setCount(0);
        u.setUpdatedAt(LocalDateTime.now());
        return u;
    }

    private FeatureUsage createMonthly(String userId, Feature feature, String month) {
        FeatureUsage u = new FeatureUsage();
        u.setUserId(userId);
        u.setFeature(feature);
        u.setUsageMonth(month);
        u.setCount(0);
        u.setUpdatedAt(LocalDateTime.now());
        return u;
    }
}
