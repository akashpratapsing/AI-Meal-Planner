package com.mealplanner.dto;

import com.mealplanner.model.SubscriptionPlan;
import lombok.Data;

import jakarta.validation.constraints.NotNull;

@Data
public class CreateOrderRequest {
    
    @NotNull(message = "Plan is required")
    private SubscriptionPlan plan;
    
    private String notes;
}
