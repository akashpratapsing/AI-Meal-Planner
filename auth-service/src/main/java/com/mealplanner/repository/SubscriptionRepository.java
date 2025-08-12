package com.mealplanner.repository;

import com.mealplanner.model.Subscription;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends MongoRepository<Subscription, String> {
    
    Optional<Subscription> findByUserId(String userId);
    Optional<Subscription> findByUserEmail(String userEmail);
    List<Subscription> findByStatus(String status);
    Optional<Subscription> findByRazorpaySubscriptionId(String razorpaySubscriptionId);
}
