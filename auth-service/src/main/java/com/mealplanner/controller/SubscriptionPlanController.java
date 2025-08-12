package com.mealplanner.controller;

import com.mealplanner.model.SubscriptionPlan;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subscription-plans")
public class SubscriptionPlanController {

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<Map<String, Object>>> getAvailablePlans() {
        List<Map<String, Object>> plans = Arrays.stream(SubscriptionPlan.values())
                .map(plan -> {
                    Map<String, Object> planMap = new HashMap<>();
                    planMap.put("name", plan.getName());
                    planMap.put("priceInRupees", plan.getPriceInRupees());
                    planMap.put("priceInPaise", plan.getPriceInPaise());
                    planMap.put("dailyApiCalls", plan.getDailyApiCalls());
                    planMap.put("monthlyGenerateCalls", plan.getMonthlyGenerateCalls());
                    planMap.put("hasPremiumFeatures", plan.hasPremiumFeatures());
                    return planMap;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(plans);
    }
}
