package com.mealplanner.service;

import java.util.List;
import java.util.Map;

import com.mealplanner.dto.CreateUserRequest;
import org.springframework.web.multipart.MultipartFile;

import com.mealplanner.dto.UserDTO;
import com.mealplanner.model.SubscriptionPlan;

public interface UserService {

    boolean createUser(CreateUserRequest dto);

    List<UserDTO> getAllUsers(); 

    UserDTO getUserById(String id);
    
    UserDTO updateUserById(String id, UserDTO dto);

    boolean deleteUserById(String id);

    long getTotalUserCount();

    Map<SubscriptionPlan, Long> getActiveUserCountByPlan();

    String uploadUserProfileImage(String userId, MultipartFile image);

}
