package com.mealplanner.repository;

import com.mealplanner.model.PaymentTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentTransactionRepository extends MongoRepository<PaymentTransaction, String> {

//    Optional<PaymentTransaction> findByRazorpayPaymentId(String razorpayPaymentId);

    Optional<PaymentTransaction> findByRazorpayOrderId(String razorpayOrderId);

    List<PaymentTransaction> findByUserId(String userId);
}

