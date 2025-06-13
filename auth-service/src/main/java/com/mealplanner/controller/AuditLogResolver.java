package com.mealplanner.controller;

import java.time.LocalDateTime;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.mealplanner.dto.AuditLogPage;
import com.mealplanner.service.AuditService;

@Controller
public class AuditLogResolver {

    private final AuditService auditLogService;

    public AuditLogResolver(AuditService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @QueryMapping
    public AuditLogPage auditLogs(
            @Argument String email,
            @Argument String username,
            @Argument String role,
            @Argument String method,
            @Argument String endpoint,
            @Argument String from,
            @Argument String to,
            @Argument int page,
            @Argument int size
    ) {
        LocalDateTime fromDate = (from != null) ? LocalDateTime.parse(from) : null;
        LocalDateTime toDate = (to != null) ? LocalDateTime.parse(to) : null;
        Pageable pageable = PageRequest.of(page, size);

        return auditLogService.filterLogs(email, username, role, method, endpoint, fromDate, toDate, pageable);
    }
}

