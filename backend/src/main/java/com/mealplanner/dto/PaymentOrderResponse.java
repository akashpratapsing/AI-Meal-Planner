package com.mealplanner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentOrderResponse {

    private String razorpayOrderId;
    private int amount;
    private String currency;
    private String keyId;
}
