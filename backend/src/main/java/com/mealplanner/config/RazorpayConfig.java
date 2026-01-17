package com.mealplanner.config;

import com.razorpay.RazorpayClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Bean
    public RazorpayClient razorpayClient() {
        if (keyId == null || keyId.isBlank() ||
                keySecret == null || keySecret.isBlank()) {
            throw new IllegalStateException("Razorpay credentials are missing");
        }

        try {
            return new RazorpayClient(keyId, keySecret);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to initialize Razorpay client", e);
        }
    }
}
