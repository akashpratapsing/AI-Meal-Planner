package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "payment_transactions")
public class PaymentTransaction {

    @Id
    private String id;
    
    private String userId;
    private String userEmail;
    private String subscriptionId;
    private SubscriptionPlan plan;
    
    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;
    
    private double amount;
    private String currency;
    private String status; // SUCCESS, FAILED, PENDING, REFUNDED
    
    private String description;
    private String receipt;
    private String notes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime paymentDate;
}
