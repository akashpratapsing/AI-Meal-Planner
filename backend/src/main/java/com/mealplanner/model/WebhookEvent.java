package com.mealplanner.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "webhook_events")
@Data
@AllArgsConstructor
public class WebhookEvent {

    @Id
    private String id; // Razorpay event_id (unique)

    private String eventType;

    private boolean processed;

    private LocalDateTime receivedAt;
}
