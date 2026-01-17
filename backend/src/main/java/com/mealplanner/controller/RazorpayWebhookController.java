package com.mealplanner.controller;

import com.mealplanner.service.PaymentWebhookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/webhooks/razorpay")
public class RazorpayWebhookController {

    private final PaymentWebhookService webhookService;

    @PostMapping
    public ResponseEntity<String> handle(
            @RequestBody(required = false) String payload,
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature,
            @RequestHeader(value = "X-Razorpay-Event-Id", required = false) String eventId
    ) {
        log.info("🔥 WEBHOOK HIT");
        log.info("Payload: {}", payload);
        webhookService.handleWebhook(payload, signature, eventId);
        return ResponseEntity.ok("OK");
    }

}
