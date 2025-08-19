package com.mealplanner.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.mealplanner.dto.CreateUserRequest;
import com.mealplanner.dto.UserDTO;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mealplanner.auth.JwtProvider;
import com.mealplanner.model.AuditLog;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.model.User;
import com.mealplanner.repository.UserRepository;
import com.mealplanner.service.AuditService;
import com.mealplanner.service.UserService;
import com.mealplanner.utils.CsvExportUtil;
import com.mealplanner.utils.ExcelExportUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1")
@RequiredArgsConstructor
public class AdminController {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditService auditService;
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

    @GetMapping("/logs/export")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Resource> exportLogs(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String method,
            @RequestParam(required = false) String endpoint,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(defaultValue = "csv") String format // "csv" or "excel"
    ) throws IOException {

        LocalDateTime fromDate = (from != null) ? LocalDateTime.parse(from) : null;
        LocalDateTime toDate = (to != null) ? LocalDateTime.parse(to) : null;

        List<AuditLog> logs = auditService.filterLogsForExport(email, username, role, method, endpoint, fromDate,
                toDate);

        byte[] fileData;
        String contentType;
        String fileName;

        if ("excel".equalsIgnoreCase(format)) {
            fileData = ExcelExportUtil.exportToExcel(logs); 
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            fileName = "audit_logs.xlsx";
        } else {
            fileData = CsvExportUtil.exportToCsv(logs); 
            contentType = "text/csv";
            fileName = "audit_logs.csv";
        }

        ByteArrayResource resource = new ByteArrayResource(fileData);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
                .contentLength(fileData.length)
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
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
