package com.mealplanner.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.mealplanner.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}

