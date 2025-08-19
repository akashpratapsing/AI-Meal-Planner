package com.mealplanner.service;

import java.util.List;

import com.mealplanner.model.CustomMealPlan;

public interface CustomMealPlanService {

    CustomMealPlan saveCustomMealPlan(CustomMealPlan plan);

    boolean deleteCustomMealPlan(String id);

    CustomMealPlan getCustomMealPlanById(String id);

    List<CustomMealPlan> getCustomMealPlansByUserId(String userId);

}
