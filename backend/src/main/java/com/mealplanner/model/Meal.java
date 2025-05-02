package com.mealplanner.model;

import lombok.Data;
import java.util.List;

@Data
public class Meal {
    private String name; 
    private String time; 
    private List<String> items; 
}