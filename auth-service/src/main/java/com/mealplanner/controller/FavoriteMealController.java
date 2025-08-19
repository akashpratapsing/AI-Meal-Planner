package com.mealplanner.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteMealController {

    private final FavoriteMealService favoriteMealService;

    @PostMapping("/{userId}")
    public ResponseEntity<FavoriteMeal> addFavoriteMeal(@PathVariable String userId, @RequestBody FavoriteMeal meal) {
        return ResponseEntity.ok(favoriteMealService.addFavoriteMeal(userId, meal));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoriteMeal>> getFavorites(@PathVariable String userId) {
        return ResponseEntity.ok(favoriteMealService.getFavoriteMeals(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable String id) {
        favoriteMealService.deleteFavoriteMeal(id);
        return ResponseEntity.ok("Favorite meal deleted successfully");
    }
}

