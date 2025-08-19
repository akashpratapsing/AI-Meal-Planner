package com.mealplanner.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealplanner.model.CustomMealPlan;
import com.mealplanner.service.CustomMealPlanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/custom-meal-plans")
@RequiredArgsConstructor
public class CustomMealPlanController {

    private final CustomMealPlanService customMealPlanService;

    @PostMapping
    public ResponseEntity<CustomMealPlan> saveCustomMealPlan(@RequestBody CustomMealPlan plan) {
        return ResponseEntity.ok(customMealPlanService.saveCustomMealPlan(plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomMealPlan(@PathVariable String id) {
        boolean deleted = customMealPlanService.deleteCustomMealPlan(id);
        return deleted ? ResponseEntity.ok("Deleted successfully") : ResponseEntity.status(404).body("Not found");
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomMealPlan> getById(@PathVariable String id) {
        return ResponseEntity.ok(customMealPlanService.getCustomMealPlanById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CustomMealPlan>> getByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(customMealPlanService.getCustomMealPlansByUserId(userId));
    }
}
