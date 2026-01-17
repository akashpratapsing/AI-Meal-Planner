package com.mealplanner.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateUserRequest {

    private String name;
    private String email;
    private String password;
    private List<String> roles;
}
