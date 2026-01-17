package com.mealplanner.exceptions;

public class MealPlanNotFoundException extends RuntimeException {
    public MealPlanNotFoundException(String message) {
        super(message);
    }
}
