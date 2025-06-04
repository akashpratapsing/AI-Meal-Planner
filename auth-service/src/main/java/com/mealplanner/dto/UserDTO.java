package com.mealplanner.dto;

import com.mealplanner.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDTO {

    private String id;
    private String name;
    private String email;
    private String password;
    private Integer age;
    private Double height;
    private Double weight;
    private String religion;
    private String dietaryPreference;
    private String allergies;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .age(user.getAge())
                .allergies(user.getAllergies())
                .dietaryPreference(user.getDietaryPreference())
                .religion(user.getReligion())
                .height(user.getHeight())
                .weight(user.getWeight())
                .build();
    }

}
