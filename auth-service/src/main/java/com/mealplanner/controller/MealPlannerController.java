package com.mealplanner.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealplanner.dto.MealPlanRequestDTO;
import com.mealplanner.model.MealPlan;
import com.mealplanner.service.MealPlannerService;

@RestController
@RequestMapping("/api/mealplans")
public class MealPlannerController {

    private final MealPlannerService mealPlannerService;

    public MealPlannerController(MealPlannerService mealPlannerService) {
        this.mealPlannerService = mealPlannerService;
    }

    @PostMapping("/generate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<MealPlan> generateMealPlan(@RequestBody MealPlanRequestDTO request) {
        MealPlan plan = mealPlannerService.generateMealPlan(request);
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlan> getMealPlanById(@PathVariable String id) {
        MealPlan plan = mealPlannerService.getMealPlanById(id);
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/user")
    public ResponseEntity<List<MealPlan>> getMealPlansByUserId() {
        List<MealPlan> plans = mealPlannerService.getMealPlansByUser();
        return ResponseEntity.ok(plans);
    }

    @PostMapping

    public ResponseEntity<MealPlan> saveMealPlan(@RequestBody MealPlan mealPlan) {
        MealPlan saved = mealPlannerService.saveMealPlan(mealPlan);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMealPlan(@PathVariable String id) {
        boolean deleted = mealPlannerService.deleteMealPlan(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Meal Plan deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete meal plan"));
        }
    }

}
