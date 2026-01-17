package com.mealplanner.service;

public interface PaymentWebhookService {

    void handleWebhook(String payload, String signature, String eventId);
}
