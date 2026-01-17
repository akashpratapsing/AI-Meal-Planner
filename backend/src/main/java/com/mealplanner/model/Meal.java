package com.mealplanner.model;

import lombok.Data;
import java.util.List;

@Data
public class Meal {
    private String name; 
    private String time; 
    private List<String> items; 

    private int calories;
    private int protein;
    private int carbs;
    private int fats;
//    private String image;
}