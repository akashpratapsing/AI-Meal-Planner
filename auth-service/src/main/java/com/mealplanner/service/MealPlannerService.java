package com.mealplanner.service;

import java.util.List;
import java.util.Optional;

import com.mealplanner.dto.MealPlanRequestDTO;
import com.mealplanner.model.Meal;
import com.mealplanner.model.MealPlan;

public interface MealPlannerService {

     // Generate a meal plan based on user input/preferences
    MealPlan generateMealPlan(MealPlanRequestDTO request);

    // Get an existing meal plan by its ID
    Optional<MealPlan> getMealPlanById(String id);

    // Get all meal plans for a particular user
    List<MealPlan> getMealPlansByUserId(String userId);

    // Save a meal plan to the database
    MealPlan saveMealPlan(MealPlan plan);

    // Delete a meal plan by ID
    void deleteMealPlan(String id);

    // I will implement these after implementing core feature

    // Recommend meals (helper method, AI-powered)
    List<Meal> recommendMeals(MealPlanRequestDTO request);

    // Validate user input/preferences before processing
    boolean validateMealPreferences(MealPlanRequestDTO request);
}
