package com.mealplanner.service.impl;

import com.mealplanner.config.PlanFeatureConfig;
import com.mealplanner.model.Feature;
import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.model.SubscriptionStatus;
import com.mealplanner.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionAccessService {

    private final SubscriptionRepository subscriptionRepository;
    private final PlanFeatureConfig planFeatureConfig;

    public boolean hasFeature(String userId, Feature feature) {

        Subscription sub = subscriptionRepository
                .findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE)
                .orElse(null);

        SubscriptionPlan plan = sub != null
                ? sub.getPlan()
                : SubscriptionPlan.FREE;

        return planFeatureConfig
                .getFeatures(plan)
                .contains(feature);
    }
}
