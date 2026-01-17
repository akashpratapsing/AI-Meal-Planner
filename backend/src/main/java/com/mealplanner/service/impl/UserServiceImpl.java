package com.mealplanner.service.impl;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.mealplanner.dto.CreateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mealplanner.dto.UserDTO;
import com.mealplanner.exceptions.UserNotFoundException;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.model.User;
import com.mealplanner.repository.UserRepository;
import com.mealplanner.service.UserService;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public String uploadUserProfileImage(String userId, MultipartFile image) {
        try {
            // Upload image to Cloudinary
            String imageUrl = imageUploadService.uploadImage(image);

            // Fetch user and update profile image URL
            User user = userRepository.findById(userId)
                    .orElseThrow(() ->  new UserNotFoundException("User Not Found with id : " + userId));
            user.setProfileImageUrl(imageUrl);

            // Save updated user
            userRepository.save(user);

            return imageUrl;

        } catch (IOException e) {
            throw new RuntimeException("Error uploading image", e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred", e);
        }
    }

    @Override
//    @PreAuthorize("#id == authentication.principal.user.id or hasRole('ADMIN')")
    public boolean createUser(CreateUserRequest dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + dto.getEmail());
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());

        // Encode password only if provided (in some cases, you might want to auto-generate)
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(encoder.encode(dto.getPassword()));
        } else {
            // Default password (optional, or throw exception if password required)
            user.setPassword(encoder.encode("defaultPassword123"));
        }

        // Assign roles (default to ["USER"] if not provided)
        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            user.setRoles(dto.getRoles());
        } else {
            user.setRoles(Collections.singletonList("USER"));
        }

        userRepository.save(user);
        return true;
    }


    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> dtos = users.stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
        return dtos;
    }

    @Override
    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
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
        user.setSex(userDTO.getSex());
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
    public boolean deleteUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User Not Found with id : " + id));

        userRepository.delete(user);
        return true;
    }

    @Override
    public long getTotalUserCount() {
        return userRepository.count();
    }

    @Override
    public Map<SubscriptionPlan, Long> getActiveUserCountByPlan() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("status").is("ACTIVE")),
                Aggregation.group("plan").count().as("count"));

        AggregationResults<Document> results = mongoTemplate.aggregate(
                aggregation, "subscriptions", Document.class);

        Map<SubscriptionPlan, Long> counts = new HashMap<>();
        for (Document doc : results) {
            SubscriptionPlan plan = SubscriptionPlan.valueOf(doc.getString("_id"));
            Number countValue = doc.get("count", Number.class); // Get as Number
            counts.put(plan, countValue.longValue()); // Convert safely to long
        }

        return counts;
    }

}
