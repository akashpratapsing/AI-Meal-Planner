package com.mealplanner.service;

import java.util.List;

import com.mealplanner.dto.UserDTO;

public interface UserService {

    List<UserDTO> getAllUsers(); 

    UserDTO getUserById(String id);
    
    UserDTO updateUserById(String id, UserDTO dto);

    boolean deleteUserById(String id);

}
