package com.mealplanner.service.impl;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.mealplanner.dto.AuditLogPage;
import com.mealplanner.model.AuditLog;
import com.mealplanner.service.AuditService;

@Service
@RequiredArgsConstructor
public class AuditServiceImpl implements AuditService {

    private final MongoTemplate mongoTemplate;

    @Override
    public AuditLogPage filterLogs(String email, String username, String role, String method, String endpoint,
            LocalDateTime from, LocalDateTime to, Pageable pageable) {

        Query query = new Query();
        if (email != null)
            query.addCriteria(Criteria.where("email").is(email));
        if (username != null)
            query.addCriteria(Criteria.where("username").is(username));
        if (role != null)
            query.addCriteria(Criteria.where("roles").in(role));
        if (method != null)
            query.addCriteria(Criteria.where("method").is(method));
        if (endpoint != null)
            query.addCriteria(Criteria.where("endpoint").is(endpoint));
        if (from != null && to != null)
            query.addCriteria(Criteria.where("timestamp").gte(from).lte(to));

        long total = mongoTemplate.count(query, AuditLog.class);
        query.with(pageable);

        List<AuditLog> logs = mongoTemplate.find(query, AuditLog.class);
        return new AuditLogPage(logs, total, pageable.getPageNumber());
    }

    @Override
    public List<AuditLog> filterLogsForExport(
            String email,
            String username,
            String role,
            String method,
            String endpoint,
            LocalDateTime fromDate,
            LocalDateTime toDate) {
        Query query = new Query();

        if (email != null && !email.isBlank()) {
            query.addCriteria(Criteria.where("email").is(email));
        }

        if (username != null && !username.isBlank()) {
            query.addCriteria(Criteria.where("username").is(username));
        }

        if (role != null && !role.isBlank()) {
            query.addCriteria(Criteria.where("roles").in(role));
        }

        if (method != null && !method.isBlank()) {
            query.addCriteria(Criteria.where("method").is(method));
        }

        if (endpoint != null && !endpoint.isBlank()) {
            query.addCriteria(Criteria.where("endpoint").is(endpoint));
        }

        if (fromDate != null && toDate != null) {
            query.addCriteria(Criteria.where("timestamp").gte(fromDate).lte(toDate));
        } else if (fromDate != null) {
            query.addCriteria(Criteria.where("timestamp").gte(fromDate));
        } else if (toDate != null) {
            query.addCriteria(Criteria.where("timestamp").lte(toDate));
        }

        return mongoTemplate.find(query, AuditLog.class);
    }

}
