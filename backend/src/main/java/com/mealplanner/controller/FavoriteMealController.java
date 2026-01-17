package com.mealplanner.controller;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.IngredientDTO;
import com.mealplanner.model.Feature;
import com.mealplanner.service.impl.SubscriptionAccessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealplanner.model.FavoriteMeal;
import com.mealplanner.service.FavoriteMealService;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteMealController {

    private final FavoriteMealService favoriteMealService;
    private final SubscriptionAccessService accessService;

    @PostMapping
    public ResponseEntity<?> addToFavorites(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody Map<String, Object> meal
    ) {

        if (!accessService.hasFeature(user.getId(), Feature.FAVORITE_MEAL)) {
            return ResponseEntity.status(403).body("Upgrade to PRO");
        }

        FavoriteMeal fav = new FavoriteMeal();
        fav.setMealId((String) meal.get("idMeal"));
        fav.setName((String) meal.get("strMeal"));
        fav.setThumbnail((String) meal.get("strMealThumb"));
        fav.setCategory((String) meal.get("strCategory"));
        fav.setArea((String) meal.get("strArea"));

        // ingredients already processed by MealDB service
        fav.setIngredients(
                ((List<Map<String, String>>) meal.get("ingredients"))
                        .stream()
                        .map(i -> new IngredientDTO(
                                i.get("ingredient"),
                                i.get("measure")
                        ))
                        .toList()
        );

        try {
            FavoriteMeal saved =
                    favoriteMealService.addFavoriteMeal(user.getId(), fav);

            return ResponseEntity.ok(saved);

        } catch (IllegalStateException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getFavorites(
            @AuthenticationPrincipal UserPrincipal user
    ) {
        if (!accessService.hasFeature(user.getId(), Feature.FAVORITE_MEAL)) {
            return ResponseEntity.status(403).body("Upgrade to PRO");
        }

        return ResponseEntity.ok(
                favoriteMealService.getFavoriteMeals(user.getId())
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFavorite(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String id
    ) {
        if (!accessService.hasFeature(user.getId(), Feature.FAVORITE_MEAL)) {
            return ResponseEntity.status(403).body("Upgrade to PRO");
        }

        boolean removed = favoriteMealService.deleteFavoriteMeal(id);

        if (!removed) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Favorite not found");
        }

        return ResponseEntity.ok("Removed");
    }
}

