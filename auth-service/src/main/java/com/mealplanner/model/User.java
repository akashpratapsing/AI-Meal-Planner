package com.mealplanner.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;
    private List<String> roles;

    // Additional info for Generating Meal Plan
    private Integer age;
    private Double height;
    private Double weight;
    private String religion;
    private String dietaryPreference;
    private String allergies;


}
