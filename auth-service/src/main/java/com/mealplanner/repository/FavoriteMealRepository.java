package com.mealplanner.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.mealplanner.model.FavoriteMeal;

public interface FavoriteMealRepository extends MongoRepository<FavoriteMeal, String> {
    List<FavoriteMeal> findByUserId(String userId);
}

