package com.mealplanner.controller;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.MealOptionsResponse;
import com.mealplanner.model.Feature;
import com.mealplanner.service.impl.FeatureUsageService;
import com.mealplanner.service.impl.MealDBService;
import com.mealplanner.service.impl.SubscriptionAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/meals")
@RequiredArgsConstructor
public class MealDBController {

    private final MealDBService mealService;
    private final SubscriptionAccessService accessService;
    private final FeatureUsageService usageService;

    @GetMapping("/options")
    public MealOptionsResponse getOptions() {
        return mealService.getMealOptions();
    }

    @GetMapping("/browse")
    public ResponseEntity<?> browseMeals(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam String type,
            @RequestParam String value
    ) {
        if (!accessService.hasFeature(user.getId(), Feature.BROWSE_MEALS)) {
            return ResponseEntity.status(403).body("Upgrade to PRO");
        }

        return switch (type.toLowerCase()) {
            case "category" -> ResponseEntity.ok(mealService.searchByCategory(value));
            case "area" -> ResponseEntity.ok(mealService.searchByArea(value));
            case "ingredient" -> ResponseEntity.ok(mealService.searchByIngredient(value));
            case "letter" -> ResponseEntity.ok(mealService.searchByLetter(value));
            case "name" -> ResponseEntity.ok(mealService.searchByName(value));
            default -> ResponseEntity.badRequest().body("Invalid filter type");
        };
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> details(@PathVariable String id) {
        return ResponseEntity.ok(mealService.getMealDetails(id));
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandomMeal(
            @AuthenticationPrincipal UserPrincipal user
    ) {

        usageService.checkAndConsume(
                user.getId(),
                Feature.RANDOM_MEAL
        );

        Map<String, Object> meal = mealService.getRandomMeal();
        return ResponseEntity.ok(meal);
    }
}

