package com.mealplanner.dto;

import com.mealplanner.model.SubscriptionPlan;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreatePaymentOrderRequest {

    @NotBlank
    private String subscriptionId;

//    @NotBlank
//    private String userId;
//
//    @Email
//    @NotBlank
//    private String email;

    @NotNull
    private SubscriptionPlan plan;
}
