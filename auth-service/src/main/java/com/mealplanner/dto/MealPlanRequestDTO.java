package com.mealplanner.dto;

import lombok.Data;
import java.util.List;

@Data
public class MealPlanRequestDTO {
    // Nutritional Goals
    private int targetCalories;
    private int targetProtein;
    private int targetCarbs;
    private int targetFats;

    // Dietary Preferences
    private String dietType; 
    private List<String> allergies;
    private List<String> restrictions; 

    // Meal Structure
    private int mealsPerDay;
    private List<String> mealTimes; 

    // User Profile
    private int age;
    private String sex;
    private double weight; 
    private double height; 
    private String healthGoal; 
    private String activityLevel; 

    // Practical Constraints
    private int maxPrepTime; 
    private double budget; 
    private List<String> availableIngredients;

    // Variety & Preferences
    private boolean wantDiverseMeals;
    private List<String> preferredCuisines;

}