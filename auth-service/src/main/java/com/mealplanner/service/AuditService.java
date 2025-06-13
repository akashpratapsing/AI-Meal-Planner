package com.mealplanner.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.mealplanner.dto.AuditLogPage;
import com.mealplanner.model.AuditLog;

public interface AuditService {

    AuditLogPage filterLogs(String email, String username, String role, String method, String endpoint,
            LocalDateTime from, LocalDateTime to, Pageable pageable);

    List<AuditLog> filterLogsForExport(
            String email,
            String username,
            String role,
            String method,
            String endpoint,
            LocalDateTime fromDate,
            LocalDateTime toDate);

}
