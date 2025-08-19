package com.mealplanner.service;

import com.mealplanner.dto.CreateOrderRequest;
import com.mealplanner.dto.PaymentVerificationRequest;
import com.mealplanner.dto.SubscriptionResponse;
import java.util.Map;

public interface PaymentService {

    Map<String, Object> createOrder(CreateOrderRequest request, String userId);
    
    SubscriptionResponse verifyPayment(PaymentVerificationRequest request, String userId);
    
    SubscriptionResponse getCurrentSubscription(String userId);
    
    SubscriptionResponse upgradeToFreePlan(String userId);
    
    boolean cancelSubscription(String userId);
    
    boolean hasValidSubscription(String userId);
    
    boolean canMakeApiCall(String userId);
    
    boolean canMakeGenerateCall(String userId);
    
    void decrementApiCalls(String userId);
    
    void decrementGenerateCalls(String userId);
    
    int getRemainingApiCalls(String userId);
    
    int getRemainingGenerateCalls(String userId);
}
