package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "meal_plans")
public class MealPlan {

    @Id
    private String id;

    private String userId;

    private List<Meal> meals; 

    private String healthGoal;
    private String generatedDate;
}