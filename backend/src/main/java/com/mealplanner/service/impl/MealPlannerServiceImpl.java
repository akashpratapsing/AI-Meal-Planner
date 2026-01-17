package com.mealplanner.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.MealPlanRequestDTO;
import com.mealplanner.exceptions.MealPlanNotFoundException;
import com.mealplanner.model.MealPlan;
import com.mealplanner.repository.MealPlanRepository;
import com.mealplanner.service.MealPlannerService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class MealPlannerServiceImpl implements MealPlannerService {

    private final Client client;
    private final MealPlanRepository mealPlanRepository;

    public MealPlannerServiceImpl(Client client, MealPlanRepository mealPlanRepository) {
        this.client = client;
        this.mealPlanRepository = mealPlanRepository;
    }

    @Override
    public MealPlan generateMealPlan(MealPlanRequestDTO request) {
        String prompt = buildPromptFromDTO(request);

        Map<String, Object> payload = new HashMap<>();
        payload.put("prompt", prompt);

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        payload.toString(),
                        null);

        String json = response.text();

       // Convert JSON to POJO
        String cleaned = cleanJson(response.text());
        ObjectMapper mapper = new ObjectMapper();

        MealPlan plan = null;
        try {
            plan = mapper.readValue(cleaned, MealPlan.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        String userId = getLoggedInUserId();
        if (plan != null) {
            plan.setUserId(userId);
        }
//        log.info("meal plan: {}", plan);
        return plan;
    }

    @Override
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

        // --- Core user profile and goals ---
        sb.append("Create a 7-day meal plan for a ")
                .append(dto.getAge()).append("-year-old ")
                .append(dto.getSex()).append(" (")
                .append(dto.getWeight()).append("kg, ")
                .append(dto.getHeight()).append("cm) ")
                .append("with goal: ").append(dto.getHealthGoal()).append(". ");

        sb.append("Activity level: ").append(dto.getActivityLevel()).append(". ");

        sb.append("Target intake: ")
                .append(dto.getTargetCalories()).append(" calories, ")
                .append(dto.getTargetProtein()).append("g protein, ")
                .append(dto.getTargetCarbs()).append("g carbs, ")
                .append(dto.getTargetFats()).append("g fats. ");

        // --- Diet, restrictions, allergies ---
        sb.append("Diet type: ").append(dto.getDietType()).append(". ");

        if (dto.getAllergies() != null && !dto.getAllergies().isEmpty()) {
            sb.append("Allergies: ").append(String.join(", ", dto.getAllergies())).append(". ");
        }

        if (dto.getRestrictions() != null && !dto.getRestrictions().isEmpty()) {
            sb.append("Restrictions: ").append(String.join(", ", dto.getRestrictions())).append(". ");
        }

        // --- Meal structure ---
        sb.append("Meals per day: ").append(dto.getMealsPerDay()).append(". ");

        if (dto.getMealTimes() != null && !dto.getMealTimes().isEmpty()) {
            sb.append("Meal times: ").append(String.join(", ", dto.getMealTimes())).append(". ");
        }

        // --- Preferences ---
        if (dto.getPreferredCuisines() != null && !dto.getPreferredCuisines().isEmpty()) {
            sb.append("Preferred cuisines: ")
                    .append(String.join(", ", dto.getPreferredCuisines()))
                    .append(". ");
        }

        sb.append("Wants diverse meals: ").append(dto.isWantDiverseMeals() ? "Yes" : "No").append(". ");

        // --- Constraints ---
        sb.append("Max preparation time: ")
                .append(dto.getMaxPrepTime()).append(" minutes. ");

        sb.append("Budget: ₹").append(dto.getBudget()).append(" per day. ");

        if (dto.getAvailableIngredients() != null && !dto.getAvailableIngredients().isEmpty()) {
            sb.append("Available ingredients: ")
                    .append(String.join(", ", dto.getAvailableIngredients()))
                    .append(". ");
        }

        // --- JSON format instruction ---
        sb.append("\n\nReturn ONLY valid JSON in this exact structure:\n")
                .append("{\n")
                .append("  \"meals\": [\n")
                .append("    {\n")
                .append("      \"name\": \"Monday\",\n")
                .append("      \"time\": \"breakfast\",\n")
                .append("      \"items\": [\"Oatmeal\", \"Banana\", \"Almond Milk\"],\n")
                .append("      \"calories\": 550,\n")
                .append("      \"protein\": 25,\n")
                .append("      \"carbs\": 80,\n")
                .append("      \"fats\": 10\n")
                .append("    }\n")
                .append("  ],\n")
                .append("  \"healthGoal\": \"").append(dto.getHealthGoal()).append("\",\n")
                .append("  \"generatedDate\": \"").append(java.time.LocalDate.now()).append("\"\n")
                .append("}");

        return sb.toString();
    }

    private String cleanJson(String raw) {
        if (raw == null) return null;

        // Remove markdown fences like ```json or ```
        raw = raw.replaceAll("```json", "")
                .replaceAll("```", "")
                .trim();

        // Sometimes Gemini adds “Here is your JSON:” before returning JSON
        int firstBrace = raw.indexOf("{");
        if (firstBrace > 0) {
            raw = raw.substring(firstBrace);
        }

        // Remove trailing garbage after last closing brace
        int lastBrace = raw.lastIndexOf("}");
        if (lastBrace > 0 && lastBrace + 1 < raw.length()) {
            raw = raw.substring(0, lastBrace + 1);
        }

        return raw.trim();
    }

    private String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getUser().getId();
    }
}