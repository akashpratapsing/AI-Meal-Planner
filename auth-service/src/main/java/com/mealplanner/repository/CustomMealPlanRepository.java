package com.mealplanner.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mealplanner.model.CustomMealPlan;

@Repository
public interface CustomMealPlanRepository extends MongoRepository<CustomMealPlan, String> {
    List<CustomMealPlan> findByUserId(String userId);
}

