package com.mealplanner.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mealplanner.dto.MealApiResponse;
import com.mealplanner.dto.MealOptionsResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MealDBService {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final String baseUrl;

    public MealDBService(
            RestTemplate restTemplate,
            ObjectMapper mapper,
            @Value("${mealdb.base-url}") String baseUrl
    ) {
        this.restTemplate = restTemplate;
        this.mapper = mapper;
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    }

    /* ---------------- SEARCH ---------------- */

    @Cacheable(value = "meal-search", key = "'cat:' + #category")
    public JsonNode searchByCategory(String category) {
        return getJson("filter.php?c=" + encode(category));
    }

    @Cacheable(value = "meal-search", key = "'area:' + #area")
    public JsonNode searchByArea(String area) {
        return getJson("filter.php?a=" + encode(area));
    }

    @Cacheable(value = "meal-search", key = "'ing:' + #ingredient")
    public JsonNode searchByIngredient(String ingredient) {
        return getJson("filter.php?i=" + encode(ingredient));
    }

    @Cacheable(value = "meal-search", key = "'letter:' + #letter")
    public JsonNode searchByLetter(String letter) {
        return getJson("search.php?f=" + letter);
    }

    @Cacheable(value = "meal-search", key = "'name:' + #name.toLowerCase().trim()")
    public JsonNode searchByName(String name) {
        return getJson("search.php?s=" + encode(name));
    }

    /* ---------------- OPTIONS ---------------- */

    @Cacheable("meal-options")
    public MealOptionsResponse getMealOptions() {
        MealOptionsResponse response = new MealOptionsResponse();
        response.setCategory(fetchList(categoryUrl(), "strCategory"));
        response.setArea(fetchList(areaUrl(), "strArea"));
        response.setIngredient(fetchList(ingredientUrl(), "strIngredient"));
        return response;
    }

    /* ---------------- DETAILS ---------------- */

    public Map<String, Object> getMealDetails(String mealId) {
        MealApiResponse response = fetchMeal("lookup.php?i=" + mealId);

        Map<String, Object> meal = response.getMeals().get(0);
        meal.put("ingredients", extractIngredients(meal));
        return meal;
    }

    public Map<String, Object> getRandomMeal() {
        MealApiResponse response = fetchMeal("random.php");
        return response.getMeals().get(0);
    }

    /* ---------------- INTERNAL HELPERS ---------------- */

    private MealApiResponse fetchMeal(String path) {
        try {
            MealApiResponse response =
                    restTemplate.getForObject(baseUrl + path, MealApiResponse.class);

            if (response == null || response.getMeals() == null || response.getMeals().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Meal not found");
            }
            return response;
        } catch (Exception e) {
            log.error("MealDB API error → {}", e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Meal service temporarily unavailable"
            );
        }
    }

    private JsonNode getJson(String path) {
        try {
            return restTemplate.getForObject(baseUrl + path, JsonNode.class);
        } catch (Exception e) {
            log.error("MealDB API error → {}", e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Meal service temporarily unavailable"
            );
        }
    }

    private List<Map<String, String>> extractIngredients(Map<String, Object> meal) {
        List<Map<String, String>> ingredients = new ArrayList<>();

        for (int i = 1; i <= 20; i++) {
            String ingredient = (String) meal.get("strIngredient" + i);
            String measure = (String) meal.get("strMeasure" + i);

            if (ingredient != null && !ingredient.isBlank()) {
                ingredients.add(Map.of(
                        "ingredient", ingredient.trim(),
                        "measure", measure != null ? measure.trim() : ""
                ));
            }
        }
        return ingredients;
    }

    private List<String> fetchList(String url, String fieldName) {
        List<String> result = new ArrayList<>();
        try {
            String json = restTemplate.getForObject(url, String.class);
            JsonNode root = mapper.readTree(json);
            JsonNode meals = root.get("meals");

            if (meals != null && meals.isArray()) {
                for (JsonNode node : meals) {
                    result.add(node.get(fieldName).asText());
                }
            }
        } catch (Exception e) {
            log.warn("Failed fetching {} → {}", fieldName, e.getMessage());
        }
        return result;
    }

    private String encode(String value) {
        return UriUtils.encode(value, StandardCharsets.UTF_8);
    }

    private String categoryUrl() {
        return baseUrl + "list.php?c=list";
    }

    private String areaUrl() {
        return baseUrl + "list.php?a=list";
    }

    private String ingredientUrl() {
        return baseUrl + "list.php?i=list";
    }
}