package com.mealplanner.dto;

import com.mealplanner.model.SubscriptionPlan;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateSubscriptionRequest {

    @NotNull
    private SubscriptionPlan plan;
}
