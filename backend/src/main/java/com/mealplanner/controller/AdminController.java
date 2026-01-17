package com.mealplanner.controller;

import java.util.List;
import java.util.Map;

import com.mealplanner.dto.CreateUserRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mealplanner.auth.JwtProvider;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.model.User;
import com.mealplanner.repository.UserRepository;
import com.mealplanner.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1")
@RequiredArgsConstructor
public class AdminController {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    // @PostMapping("/auth/register-admin")
    // @PreAuthorize("isAnonymous()")
    // public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    // if (userRepository.findByEmail(request.getEmail()).isPresent()) {
    // return ResponseEntity.badRequest().body("User already exists");
    // }

    // User user = new User();
    // user.setEmail(request.getEmail());
    // user.setName(request.getName());
    // user.setPassword(passwordEncoder.encode(request.getPassword()));
    // user.setRoles(List.of("ROLE_ADMIN"));
    // userRepository.save(user);

    // String token = jwtProvider.generateToken(user.getEmail());
    // return ResponseEntity.ok(Map.of("token", token));
    // }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/users/{id}/roles")
    public ResponseEntity<?> updateRoles(@PathVariable String id, @RequestBody List<String> roles) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok("Roles updated");
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> totalUserCount() {

        long count = userService.getTotalUserCount();
        return ResponseEntity.ok(count);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/count-by-plan")
    public ResponseEntity<Map<SubscriptionPlan, Long>> getCountByPlan() {
        return ResponseEntity.ok(userService.getActiveUserCountByPlan());
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequest userDTO) {
        try {
            boolean created = userService.createUser(userDTO);
            if (created) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("✅ User created successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("⚠️ Failed to create user");
            }
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ " + ex.getMessage());
        }
    }

}
