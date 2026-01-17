package com.mealplanner.config;

import com.mealplanner.model.Feature;
import com.mealplanner.model.SubscriptionPlan;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;

@Component
public class PlanFeatureConfig {

    private static final Map<SubscriptionPlan, Set<Feature>> PLAN_FEATURES =
            Map.of(
                SubscriptionPlan.FREE, Set.of(
                        Feature.CREATE_MEAL_PLAN,
                        Feature.RANDOM_MEAL
                ),
                SubscriptionPlan.PRO, Set.of(
                        Feature.CREATE_MEAL_PLAN,
                        Feature.RANDOM_MEAL,
                        Feature.BROWSE_MEALS,
                        Feature.FAVORITE_MEAL
                )
            );

    public Set<Feature> getFeatures(SubscriptionPlan plan) {
        return PLAN_FEATURES.getOrDefault(plan, Set.of());
    }
}
