package com.mealplanner.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mealplanner.model.FavoriteMeal;
import com.mealplanner.repository.FavoriteMealRepository;
import com.mealplanner.service.FavoriteMealService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteMealServiceImpl implements FavoriteMealService {

    private final FavoriteMealRepository favoriteMealRepository;

    @Override
    public FavoriteMeal addFavoriteMeal(String userId, FavoriteMeal meal) {
        meal.setUserId(userId);
        return favoriteMealRepository.save(meal);
    }

    @Override
    public List<FavoriteMeal> getFavoriteMeals(String userId) {
        return favoriteMealRepository.findByUserId(userId);
    }

    @Override
    public boolean deleteFavoriteMeal(String id) {
        if (!favoriteMealRepository.existsById(id)) {
            throw new RuntimeException("Favorite meal not found with ID: " + id);
        }
        favoriteMealRepository.deleteById(id);
        return true;
    }
}

