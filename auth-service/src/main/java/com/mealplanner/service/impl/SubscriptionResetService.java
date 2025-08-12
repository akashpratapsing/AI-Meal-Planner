package com.mealplanner.service.impl;

import com.mealplanner.model.Subscription;
import com.mealplanner.model.SubscriptionPlan;
import com.mealplanner.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionResetService {

    private final SubscriptionRepository subscriptionRepository;

    /**
     * Reset daily API calls every day at midnight
     */
    @Scheduled(cron = "0 0 0 * * ?") // Every day at midnight
    public void resetDailyApiCalls() {
        log.info("Starting daily API calls reset...");
        
        List<Subscription> activeSubscriptions = subscriptionRepository.findByStatus("ACTIVE");
        
        for (Subscription subscription : activeSubscriptions) {
            try {
                // Reset to plan's daily limit
                int dailyLimit = subscription.getPlan().getDailyApiCalls();
                subscription.setRemainingApiCalls(dailyLimit);
                subscription.setTotalApiCalls(dailyLimit);
                subscription.setUpdatedAt(LocalDateTime.now());
                
                subscriptionRepository.save(subscription);
                log.debug("Reset daily API calls for user {}: {}", subscription.getUserId(), dailyLimit);
            } catch (Exception e) {
                log.error("Error resetting daily API calls for user {}: {}", subscription.getUserId(), e.getMessage());
            }
        }
        
        log.info("Daily API calls reset completed for {} subscriptions", activeSubscriptions.size());
    }

    /**
     * Reset monthly generate calls on the 1st of every month at midnight
     */
    @Scheduled(cron = "0 0 0 1 * ?") // 1st of every month at midnight
    public void resetMonthlyGenerateCalls() {
        log.info("Starting monthly generate calls reset...");
        
        List<Subscription> activeSubscriptions = subscriptionRepository.findByStatus("ACTIVE");
        
        for (Subscription subscription : activeSubscriptions) {
            try {
                // Only reset for FREE users (PRO users have unlimited)
                if (subscription.getPlan() == SubscriptionPlan.FREE) {
                    int monthlyLimit = subscription.getPlan().getMonthlyGenerateCalls();
                    subscription.setRemainingGenerateCalls(monthlyLimit);
                    subscription.setTotalGenerateCalls(monthlyLimit);
                    subscription.setUpdatedAt(LocalDateTime.now());
                    
                    subscriptionRepository.save(subscription);
                    log.debug("Reset monthly generate calls for user {}: {}", subscription.getUserId(), monthlyLimit);
                }
            } catch (Exception e) {
                log.error("Error resetting monthly generate calls for user {}: {}", subscription.getUserId(), e.getMessage());
            }
        }
        
        log.info("Monthly generate calls reset completed for {} subscriptions", activeSubscriptions.size());
    }
}
