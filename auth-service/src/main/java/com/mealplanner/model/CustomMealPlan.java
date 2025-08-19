package com.mealplanner.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "custom_meal_plans")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomMealPlan {

    @Id
    private String id;

    private String userId;

    private String mealPlanName;

    private int mealsPerDay;

    private List<CustomMeal> selectedMeals;

    private LocalDateTime createdDate;
}
