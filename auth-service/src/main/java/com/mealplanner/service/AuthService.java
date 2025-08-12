package com.mealplanner.service;

import java.util.Map;

import com.mealplanner.dto.ChangePasswordRequest;
import com.mealplanner.dto.LoginRequest;
import com.mealplanner.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    Map<String, Object> login(LoginRequest request);

    void changePassword(String email, ChangePasswordRequest request);

}
