package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "subscriptions")
public class Subscription {

    @Id
    private String id;
    
    private String userId;
    private String userEmail;
    private SubscriptionPlan plan;
    private String razorpaySubscriptionId;
    private String razorpayCustomerId;
    
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime nextBillingDate;
    
    private String status; // ACTIVE, CANCELLED, EXPIRED, PENDING
    private int remainingApiCalls;
    private int totalApiCalls;
    private int remainingGenerateCalls; // Monthly generate calls limit
    private int totalGenerateCalls; // Total generate calls for the month
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Payment details
    private String lastPaymentId;
    private LocalDateTime lastPaymentDate;
    private double lastPaymentAmount;
    private String lastPaymentStatus;
}
