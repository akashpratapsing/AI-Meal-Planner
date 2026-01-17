package com.mealplanner.service.impl;

import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionStatus;
import com.mealplanner.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@EnableScheduling
public class SubscriptionScheduler {

    private final SubscriptionRepository subscriptionRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void expireSubscriptions() {

        LocalDateTime now = LocalDateTime.now();

        List<Subscription> toExpire =
                subscriptionRepository.findByStatusAndGraceUntilBefore(
                        SubscriptionStatus.ACTIVE,
                        now
                );

        toExpire.forEach(sub -> {
            sub.setStatus(SubscriptionStatus.EXPIRED);
            sub.setUpdatedAt(now);
            subscriptionRepository.save(sub);
        });
    }
}


