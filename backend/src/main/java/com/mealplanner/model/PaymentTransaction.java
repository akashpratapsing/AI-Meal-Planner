package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "payment_transactions")
@Data
public class PaymentTransaction {

    @Id
    private String id;

    private String userId;
    private String userEmail;

    private String subscriptionId;
    private SubscriptionPlan plan;

    @Indexed(unique = true)
    private String razorpayOrderId;     // ✅ PRIMARY identity

    private String razorpayPaymentId;   // assigned on capture

    private double amount;
    private String currency;

    private PaymentStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime paymentDate;
}

