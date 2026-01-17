package com.mealplanner.controller;

import java.util.List;
import java.util.Map;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.model.Feature;
import com.mealplanner.service.impl.FeatureUsageService;
import com.mealplanner.service.impl.SubscriptionAccessService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
@RequiredArgsConstructor
public class MealPlannerController {

    private static final Logger log = LoggerFactory.getLogger(MealPlannerController.class);
    private final MealPlannerService mealPlannerService;
    private final SubscriptionAccessService accessService;
    private final FeatureUsageService usageService;

      @PostMapping("/generate")
      @PreAuthorize("isAuthenticated()")
      public ResponseEntity<?> generateMealPlan(
           @AuthenticationPrincipal UserPrincipal user,
           @RequestBody MealPlanRequestDTO request
) {
          usageService.checkAndConsume(
                  user.getId(),
                  Feature.CREATE_MEAL_PLAN
          );

    MealPlan plan = mealPlannerService.generateMealPlan(request);
//    log.info("Plan: {}", plan);
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
