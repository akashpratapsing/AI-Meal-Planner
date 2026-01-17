package com.mealplanner.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.mealplanner.model.FavoriteMeal;
import com.mealplanner.repository.FavoriteMealRepository;
import com.mealplanner.service.FavoriteMealService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteMealServiceImpl implements FavoriteMealService {

    private final FavoriteMealRepository favoriteMealRepository;

    @Override
    public FavoriteMeal addFavoriteMeal(String userId, FavoriteMeal meal) {

        if (favoriteMealRepository.existsByUserIdAndMealId(userId, meal.getMealId())) {
            throw new IllegalStateException("Meal already in favorites");
        }

        meal.setUserId(userId);
        meal.setCreatedAt(LocalDateTime.now());

        FavoriteMeal saved = favoriteMealRepository.save(meal);
        log.info("Favorite meal added → user={}, mealId={}", userId, meal.getMealId());

        return saved;
    }

    @Override
    public List<FavoriteMeal> getFavoriteMeals(String userId) {
        return favoriteMealRepository.findByUserId(userId);
    }

    @Override
    public boolean deleteFavoriteMeal(String id) {
        if (!favoriteMealRepository.existsById(id)) {
            return false;
        }
        favoriteMealRepository.deleteById(id);
        return true;
    }
}


