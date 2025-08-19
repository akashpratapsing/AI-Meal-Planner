package com.mealplanner.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.mealplanner.model.CustomMealPlan;
import com.mealplanner.repository.CustomMealPlanRepository;
import com.mealplanner.service.CustomMealPlanService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomMealPlanServiceImpl implements CustomMealPlanService {

    private final CustomMealPlanRepository customMealPlanRepository;

    @Override
    public CustomMealPlan saveCustomMealPlan(CustomMealPlan plan) {
        plan.setCreatedDate(LocalDateTime.now());
        return customMealPlanRepository.save(plan);
    }

    @Override
    // @PreAuthorize("#userId == authentication.principal.user.id or hasRole('ADMIN')")
    @PreAuthorize("hasRole('ADMIN') or principal.user.id != null")
    public boolean deleteCustomMealPlan(String id) {
        CustomMealPlan existing = customMealPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom meal plan not found with ID: " + id));
        customMealPlanRepository.delete(existing);
        return true;
    }

    @Override
    // @PreAuthorize("#userId == authentication.principal.user.id or hasRole('ADMIN')")
    @PreAuthorize("hasRole('ADMIN') or principal.user.id != null")
    public CustomMealPlan getCustomMealPlanById(String id) {
        return customMealPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom meal plan not found with ID: " + id));
    }

    @Override
    // @PreAuthorize("#userId == authentication.principal.user.id or hasRole('ADMIN')")
    @PreAuthorize("hasRole('ADMIN') or principal.user.id != null")
    public List<CustomMealPlan> getCustomMealPlansByUserId(String userId) {
        return customMealPlanRepository.findByUserId(userId);
    }
}
