package com.mealplanner.repository;

import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends MongoRepository<Subscription, String> {

    Optional<Subscription> findByUserIdAndStatus(String userId, SubscriptionStatus status);

    List<Subscription> findByStatus(SubscriptionStatus status);

    List<Subscription> findByStatusAndGraceUntilBefore(
            SubscriptionStatus status,
            LocalDateTime time
    );
}

