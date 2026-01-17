package com.mealplanner.service;

import java.util.List;

import com.mealplanner.model.FavoriteMeal;

public interface FavoriteMealService {

    FavoriteMeal addFavoriteMeal(String userId, FavoriteMeal meal);
    List<FavoriteMeal> getFavoriteMeals(String userId);
    boolean deleteFavoriteMeal(String id);
    
}

