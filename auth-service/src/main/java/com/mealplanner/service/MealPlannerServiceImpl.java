package com.mealplanner.service;

import com.mealplanner.dto.MealPlanRequestDTO;
import com.mealplanner.model.Meal;
import com.mealplanner.model.MealPlan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MealPlannerServiceImpl implements MealPlannerService {

    private final RestTemplate restTemplate;

    @Value("${flask.meal.api.url}")
    private String flaskApiUrl;

    public MealPlannerServiceImpl(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    @Override
    public MealPlan generateMealPlan(MealPlanRequestDTO request) {
        String prompt = buildPromptFromDTO(request);

        Map<String, Object> payload = new HashMap<>();
        payload.put("prompt", prompt);  // key matches what Flask expects

        ResponseEntity<MealPlan> response = restTemplate.postForEntity(
                flaskApiUrl,
                payload,
                MealPlan.class
        );

        MealPlan plan = response.getBody();
//        if (plan != null) {
//            plan.setUserId(request.getUserId()); // if you want to associate user
//        }

        return plan;
    }


    @Override
    public Optional<MealPlan> getMealPlanById(String id) {
        return Optional.empty();
    }

    @Override
    public List<MealPlan> getMealPlansByUserId(String userId) {
        return List.of();
    }

    @Override
    public MealPlan saveMealPlan(MealPlan plan) {
        return null;
    }

    @Override
    public void deleteMealPlan(String id) {

    }

    @Override
    public List<Meal> recommendMeals(MealPlanRequestDTO request) {
        return List.of();
    }

    @Override
    public boolean validateMealPreferences(MealPlanRequestDTO request) {
        return false;
    }

    private String buildPromptFromDTO(MealPlanRequestDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append("Create a 7-day meal plan for a ");
        sb.append(dto.getAge()).append("-year-old ");
        sb.append(dto.getSex()).append(" with goal: ").append(dto.getHealthGoal()).append(". ");
        sb.append("Target: ").append(dto.getTargetCalories()).append(" calories, ")
                .append(dto.getTargetProtein()).append("g protein, ")
                .append(dto.getTargetCarbs()).append("g carbs, ")
                .append(dto.getTargetFats()).append("g fats. ");
        sb.append("Diet type: ").append(dto.getDietType()).append(". ");
        sb.append("Allergies: ").append(String.join(", ", dto.getAllergies())).append(". ");
        sb.append("Meal times: ").append(String.join(", ", dto.getMealTimes())).append(". ");
        sb.append("Prefers: ").append(String.join(", ", dto.getPreferredCuisines())).append(". ");
        sb.append("Wants diverse meals: ").append(dto.isWantDiverseMeals() ? "Yes" : "No").append(". ");
        sb.append("Max prep time: ").append(dto.getMaxPrepTime()).append(" mins. ");
        sb.append("Available ingredients: ").append(String.join(", ", dto.getAvailableIngredients())).append(".");
        return sb.toString();
    }

}
