package com.mealplanner.dto;

import java.util.List;

import com.mealplanner.model.AuditLog;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuditLogPage {
    private List<AuditLog> content;
    private long totalElements;
    private int pageNumber;

    public int getTotalPages() {
        return (int) Math.ceil((double) totalElements / 10); // assuming size 10
    }
}

