package com.mealplanner.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;

@Data
public class PaymentVerificationRequest {
    
    @NotBlank(message = "Razorpay payment ID is required")
    private String razorpayPaymentId;
    
    @NotBlank(message = "Razorpay order ID is required")
    private String razorpayOrderId;
    
    @NotBlank(message = "Razorpay signature is required")
    private String razorpaySignature;
}
