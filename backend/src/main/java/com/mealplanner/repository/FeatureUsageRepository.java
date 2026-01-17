package com.mealplanner.repository;

import com.mealplanner.model.Feature;
import com.mealplanner.model.FeatureUsage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Optional;

@Repository
public interface FeatureUsageRepository
        extends MongoRepository<FeatureUsage, String> {

    Optional<FeatureUsage> findByUserIdAndFeatureAndUsageDate(
            String userId,
            Feature feature,
            LocalDate usageDate
    );

    Optional<FeatureUsage> findByUserIdAndFeatureAndUsageMonth(
            String userId,
            Feature feature,
            String usageMonth
    );
}
