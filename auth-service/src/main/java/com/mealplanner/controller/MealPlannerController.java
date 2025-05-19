package com.mealplanner.controller;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MealPlan> generateMealPlan(@RequestBody MealPlanRequestDTO request) {
        MealPlan plan = mealPlannerService.generateMealPlan(request);
        return ResponseEntity.ok(plan);
    }
}

