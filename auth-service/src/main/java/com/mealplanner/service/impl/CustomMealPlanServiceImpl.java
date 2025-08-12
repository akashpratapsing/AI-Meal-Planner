package com.mealplanner.service.impl;

import java.time.LocalDateTime;
import java.util.List;

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
    public boolean deleteCustomMealPlan(String id) {
        CustomMealPlan existing = customMealPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom meal plan not found with ID: " + id));
        customMealPlanRepository.delete(existing);
        return true;
    }

    @Override
    public CustomMealPlan getCustomMealPlanById(String id) {
        return customMealPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom meal plan not found with ID: " + id));
    }

    @Override
    public List<CustomMealPlan> getCustomMealPlansByUserId(String userId) {
        return customMealPlanRepository.findByUserId(userId);
    }
}
