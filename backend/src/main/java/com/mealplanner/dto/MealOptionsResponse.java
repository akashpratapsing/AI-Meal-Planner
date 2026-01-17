package com.mealplanner.dto;

import lombok.Data;
import java.util.List;

@Data
public class MealOptionsResponse {
    private List<String> category;
    private List<String> area;
    private List<String> ingredient;
}
