package com.mealplanner.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomMeal {

    private String idMeal;

    private String strMeal;

    private String strMealThumb;

}
