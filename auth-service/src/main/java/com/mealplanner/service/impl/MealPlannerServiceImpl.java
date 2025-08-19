package com.mealplanner.service.impl;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.MealPlanRequestDTO;
import com.mealplanner.exceptions.MealPlanNotFoundException;
import com.mealplanner.model.MealPlan;
import com.mealplanner.repository.MealPlanRepository;
import com.mealplanner.service.MealPlannerService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MealPlannerServiceImpl implements MealPlannerService {

    private final RestTemplate restTemplate;
    private final MealPlanRepository mealPlanRepository;

    @Value("${flask.meal.api.url}")
    private String flaskApiUrl;

    // public MealPlannerServiceImpl(RestTemplateBuilder builder) {
    // this.restTemplate = builder.build();
    // this.mealPlanRepository = null;
    // }

    public MealPlannerServiceImpl(RestTemplateBuilder builder, MealPlanRepository mealPlanRepository) {
        this.restTemplate = builder.build();
        this.mealPlanRepository = mealPlanRepository;
    }

    @Override
    public MealPlan generateMealPlan(MealPlanRequestDTO request) {
        String prompt = buildPromptFromDTO(request);

        Map<String, Object> payload = new HashMap<>();
        payload.put("prompt", prompt);

        ResponseEntity<MealPlan> response = restTemplate.postForEntity(
                flaskApiUrl,
                payload,
                MealPlan.class);

        MealPlan plan = response.getBody();
        String userId = getLoggedInUserId();
        if (plan != null) {
            plan.setUserId(userId);
        }

        return plan;
    }

    @Override
    // @PreAuthorize("#userId == authentication.principal.user.id or hasRole('ADMIN')")
    @PreAuthorize("hasRole('ADMIN') or principal.user.id != null")
    public MealPlan getMealPlanById(String id) {
        MealPlan mealPlan = this.mealPlanRepository.findById(id)
                .orElseThrow(() -> new MealPlanNotFoundException("Meal Plan not Found with ID : " + id));
        return mealPlan;
    }

    @Override
    public List<MealPlan> getMealPlansByUserId(String userId) {
        return this.mealPlanRepository.findByUserId(userId);
    }

    @Override
    // @PreAuthorize("#userId == authentication.principal.user.id or
    // hasRole('ADMIN')")
    @PreAuthorize("hasRole('ADMIN') or principal.user.id != null")
    public List<MealPlan> getMealPlansByUser() {
        String userId = getLoggedInUserId();
        return this.mealPlanRepository.findByUserId(userId);
    }

    @Override
    @PreAuthorize("#plan.userId == authentication.principal.user.id or hasRole('ADMIN')")
    public MealPlan saveMealPlan(MealPlan plan) {
        return this.mealPlanRepository.save(plan);
    }

    @Override
    @PreAuthorize("#plan.userId == authentication.principal.user.id or hasRole('ADMIN')")
    public boolean deleteMealPlan(String id) {
        MealPlan mealPlan = this.mealPlanRepository.findById(id)
                .orElseThrow(() -> new MealPlanNotFoundException("Meal plan not found with ID : " + id));
        mealPlanRepository.delete(mealPlan);
        return true;
    }

    private String buildPromptFromDTO(MealPlanRequestDTO dto) {
        StringBuilder sb = new StringBuilder();

        // Intro and user profile
        sb.append("Create a 7-day meal plan for a ")
                .append(dto.getAge()).append("-year-old ")
                .append(dto.getSex()).append(" (")
                .append(dto.getWeight()).append("kg, ")
                .append(dto.getHeight()).append("cm) ")
                .append("with goal: ").append(dto.getHealthGoal()).append(". ");

        // Activity level
        sb.append("Activity level: ").append(dto.getActivityLevel()).append(". ");

        // Nutritional targets
        sb.append("Target intake: ")
                .append(dto.getTargetCalories()).append(" calories, ")
                .append(dto.getTargetProtein()).append("g protein, ")
                .append(dto.getTargetCarbs()).append("g carbs, ")
                .append(dto.getTargetFats()).append("g fats. ");

        // Diet and restrictions
        sb.append("Diet type: ").append(dto.getDietType()).append(". ");

        if (dto.getAllergies() != null && !dto.getAllergies().isEmpty()) {
            sb.append("Allergies: ").append(String.join(", ", dto.getAllergies())).append(". ");
        }

        if (dto.getRestrictions() != null && !dto.getRestrictions().isEmpty()) {
            sb.append("Restrictions: ").append(String.join(", ", dto.getRestrictions())).append(". ");
        }

        // Meal structure
        sb.append("Meals per day: ").append(dto.getMealsPerDay()).append(". ");
        if (dto.getMealTimes() != null && !dto.getMealTimes().isEmpty()) {
            sb.append("Meal times: ").append(String.join(", ", dto.getMealTimes())).append(". ");
        }

        // Preferences
        if (dto.getPreferredCuisines() != null && !dto.getPreferredCuisines().isEmpty()) {
            sb.append("Preferred cuisines: ").append(String.join(", ", dto.getPreferredCuisines())).append(". ");
        }

        sb.append("Wants diverse meals: ").append(dto.isWantDiverseMeals() ? "Yes" : "No").append(". ");

        // Constraints
        sb.append("Max preparation time: ").append(dto.getMaxPrepTime()).append(" minutes. ");
        sb.append("Budget: ₹").append(dto.getBudget()).append(" per day. ");

        if (dto.getAvailableIngredients() != null && !dto.getAvailableIngredients().isEmpty()) {
            sb.append("Available ingredients: ").append(String.join(", ", dto.getAvailableIngredients())).append(". ");
        }

        return sb.toString();
    }

    private String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getUser().getId();
    }

}