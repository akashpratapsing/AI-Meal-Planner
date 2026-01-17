package com.mealplanner.model;

import java.time.LocalDateTime;
import java.util.List;

import com.mealplanner.dto.IngredientDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "favorite_meals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteMeal {

    @Id
    private String id;

    private String userId;

    private String mealId;
    private String name;
    private String thumbnail;
    private String category;
    private String area;

    private List<IngredientDTO> ingredients;

    private LocalDateTime createdAt;
}
