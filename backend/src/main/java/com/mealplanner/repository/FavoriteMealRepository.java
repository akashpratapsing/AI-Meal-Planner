package com.mealplanner.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mealplanner.model.FavoriteMeal;

public interface FavoriteMealRepository extends MongoRepository<FavoriteMeal, String> {

    boolean existsByUserIdAndMealId(String userId, String mealId);
    List<FavoriteMeal> findByUserId(String userId);
}

