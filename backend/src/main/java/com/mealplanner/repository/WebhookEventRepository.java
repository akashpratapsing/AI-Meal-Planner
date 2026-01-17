package com.mealplanner.repository;

import com.mealplanner.model.WebhookEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WebhookEventRepository extends MongoRepository<WebhookEvent, String> {
}
