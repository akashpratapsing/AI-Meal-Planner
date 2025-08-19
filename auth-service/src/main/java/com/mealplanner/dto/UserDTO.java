package com.mealplanner.dto;

import java.util.List;

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
    private List<String> roles;
    private String sex;
    private Integer age;
    private Double height;
    private Double weight;
    private String religion;
    private String dietaryPreference;
    private String allergies;
    private String profileImageUrl;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .sex(user.getSex())
                .age(user.getAge())
                .allergies(user.getAllergies())
                .dietaryPreference(user.getDietaryPreference())
                .religion(user.getReligion())
                .height(user.getHeight())
                .weight(user.getWeight())
                .profileImageUrl(user.getProfileImageUrl())
                .build();
    }

}
