package com.mealplanner.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class MealApiResponse {
    private List<Map<String, Object>> meals;
}
