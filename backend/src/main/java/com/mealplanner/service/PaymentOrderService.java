package com.mealplanner.service;

import com.mealplanner.dto.PaymentOrderResponse;
import com.mealplanner.model.SubscriptionPlan;

public interface PaymentOrderService {

    PaymentOrderResponse createOrder(
            String userId,
            String email,
            SubscriptionPlan plan
    );
}
