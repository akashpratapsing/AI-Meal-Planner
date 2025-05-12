package com.mealplanner.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.mealplanner.model.MealPlan;

public interface MealPlanRepository extends MongoRepository<MealPlan, String> {

    List<MealPlan> findByUserId(String userId);

}
