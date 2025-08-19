package com.mealplanner.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "favorite_meals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteMeal {

    @Id
    private String id;
    
    private String name;
    private String userId;
    private List<String> items;
    private int calories;
    private int protein;
    private int carbs;
    private int fats;
}
