package com.mealplanner.controller;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.config.PlanFeatureConfig;
import com.mealplanner.model.Feature;
import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.model.SubscriptionStatus;
import com.mealplanner.repository.FeatureUsageRepository;
import com.mealplanner.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MeController {

    private final SubscriptionRepository subscriptionRepository;
    private final PlanFeatureConfig planFeatureConfig;
    private final FeatureUsageRepository usageRepository;

    @GetMapping("/features")
    public Set<Feature> myFeatures(
            @AuthenticationPrincipal UserPrincipal user
    ) {
        SubscriptionPlan plan = subscriptionRepository
                .findByUserIdAndStatus(user.getId(), SubscriptionStatus.ACTIVE)
                .map(Subscription::getPlan)
                .orElse(SubscriptionPlan.FREE);

        return planFeatureConfig.getFeatures(plan);
    }

    @GetMapping("/usage")
    public Map<String, Integer> myUsage(
            @AuthenticationPrincipal UserPrincipal user
    ) {
        Map<String, Integer> result = new HashMap<>();

        LocalDate today = LocalDate.now();
        String month = YearMonth.now().toString();
        usageRepository
                .findByUserIdAndFeatureAndUsageMonth(
                        user.getId(),
                        Feature.CREATE_MEAL_PLAN,
                        month
                )
                .ifPresent(u ->
                        result.put("CREATE_MEAL_PLAN", u.getCount())
                );

        usageRepository
                .findByUserIdAndFeatureAndUsageDate(
                        user.getId(),
                        Feature.RANDOM_MEAL,
                        today
                )
                .ifPresent(u ->
                        result.put("RANDOM_MEAL_TODAY", u.getCount())
                );

        return result;
    }
}
