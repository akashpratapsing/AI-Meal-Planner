package com.mealplanner.config;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GenAiConfig {

    @Value("${gemini.api}")
    private String GEMINI_API_KEY;

    @Bean
    public Client genAiClient() {

        return Client.builder()
                .apiKey(System.getenv("GEMINI_API_KEY"))
                .build();
    }
}
