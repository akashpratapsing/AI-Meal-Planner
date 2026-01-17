package com.mealplanner.controller;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.dto.CreatePaymentOrderRequest;
import com.mealplanner.dto.PaymentOrderResponse;
import com.mealplanner.service.PaymentOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentOrderService paymentOrderService;

    @PostMapping("/create-order")
    public PaymentOrderResponse createOrder(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody CreatePaymentOrderRequest req
    ) {
        return paymentOrderService.createOrder(
                user.getId(),
                user.getEmail(),
                req.getPlan()
        );
    }
}
