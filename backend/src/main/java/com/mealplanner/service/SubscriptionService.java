package com.mealplanner.service;

import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionPlan;

public interface SubscriptionService {

    Subscription createPendingSubscription(
            String userId,
            String email,
            SubscriptionPlan plan
    );

    void activateSubscription(String subscriptionId);

    boolean hasActiveSubscription(String userId);
}
