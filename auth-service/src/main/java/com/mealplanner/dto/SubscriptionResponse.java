package com.mealplanner.dto;

import com.mealplanner.model.SubscriptionPlan;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SubscriptionResponse {
    
    private String id;
    private String userId;
    private String userEmail;
    private SubscriptionPlan plan;
    private String status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime nextBillingDate;
    private int remainingApiCalls;
    private int totalApiCalls;
    private LocalDateTime createdAt;
}
