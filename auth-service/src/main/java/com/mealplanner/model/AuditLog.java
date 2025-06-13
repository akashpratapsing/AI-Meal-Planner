package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document("audit_logs")
public class AuditLog {

    @Id
    private String id;
    private String username;
    private String email;
    private List<String> roles;
    private String method;
    private String endpoint;
    private LocalDateTime timestamp;

    // Optional but useful
    private String ipAddress;
    private int status;
    private String userAgent;
    private String requestParams;
    private String requestBody;
}

