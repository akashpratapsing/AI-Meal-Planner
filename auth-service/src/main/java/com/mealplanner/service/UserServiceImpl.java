package com.mealplanner.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.mealplanner.dto.UserDTO;
import com.mealplanner.exceptions.UserNotFoundException;
import com.mealplanner.model.User;
import com.mealplanner.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> dtos = users.stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
        return dtos;
    }

    @Override
    @PreAuthorize("#id == authentication.principal.user.id or hasRole('ADMIN')")
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User Not Found with id : " + id));
        return UserDTO.fromEntity(user);

    }

    @Override
    @PreAuthorize("#id == authentication.principal.user.id or hasRole('ADMIN')")
    public UserDTO updateUserById(String id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User Not Found with id : " + id));
        user.setName(userDTO.getName());
        // user.setPassword(userDTO.getPassword());
        // user.setEmail(userDTO.getEmail());
        user.setAge(userDTO.getAge());
        user.setAllergies(userDTO.getAllergies());
        user.setHeight(userDTO.getHeight());
        user.setWeight(userDTO.getWeight());
        user.setReligion(userDTO.getReligion());
        user.setDietaryPreference(userDTO.getDietaryPreference());
        userRepository.save(user);
        return UserDTO.fromEntity(user);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User Not Found with id : " + id));

        userRepository.delete(user);
        return true;
    }

}
