package com.mealplanner.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.mealplanner.model.AuditLog;

public interface AuditLogRepository extends MongoRepository<AuditLog, String>{


}
