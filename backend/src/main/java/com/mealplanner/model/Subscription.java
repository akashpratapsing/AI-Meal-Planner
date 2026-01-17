package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "subscriptions")
@Data
public class Subscription {

    @Id
    private String id;

    private String userId;
    private String userEmail;

    private SubscriptionPlan plan;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private LocalDateTime graceUntil;

    private SubscriptionStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

