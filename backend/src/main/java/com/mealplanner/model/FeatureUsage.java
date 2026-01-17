package com.mealplanner.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Document(collection = "feature_usage")
@Data
public class FeatureUsage {

    @Id
    private String id;

    private String userId;
    private Feature feature;

    // counters
    private int count;

    // reset boundaries
    private LocalDate usageDate;    // for daily limits
    private String usageMonth;   // for monthly limits

    private LocalDateTime updatedAt;
}
