package com.mealplanner.interceptor;

import com.mealplanner.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class GenerateRateLimitInterceptor implements HandlerInterceptor {

    private final PaymentService paymentService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        // Only apply to generate endpoints
        String requestURI = request.getRequestURI();
        if (!requestURI.contains("/generate") && !requestURI.contains("/mealplans/generate")) {
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal())) {
            response.setStatus(401); // Unauthorized
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Authentication required for generate endpoint.\"}");
            return false;
        }

        // Extract user ID from authentication
        String userId = extractUserId(authentication);
        if (userId == null) {
            response.setStatus(401); // Unauthorized
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"User ID not found.\"}");
            return false;
        }

        // Check if user is admin - bypass all rate limits
        if (isAdminUser(authentication)) {
            return true;
        }

        // Check if user can make generate call
        if (!paymentService.canMakeGenerateCall(userId)) {
            response.setStatus(429); // HTTP 429 Too Many Requests
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Monthly generate limit exceeded. Please upgrade to Pro plan for unlimited access.\"}");
            return false;
        }

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        
        // Decrement generate calls after successful request
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getPrincipal())) {
            
            // Skip decrementing for admin users
            if (isAdminUser(authentication)) {
                return;
            }
            
            String userId = extractUserId(authentication);
            if (userId != null && response.getStatus() < 400) { // Only count successful requests
                paymentService.decrementGenerateCalls(userId);
            }
        }
    }

    private String extractUserId(Authentication authentication) {
        try {
            if (authentication.getPrincipal() instanceof com.mealplanner.auth.UserPrincipal userPrincipal) {
                return userPrincipal.getUser().getId();
            }
        } catch (Exception e) {
            // Log error if needed
        }
        return null;
    }

    private boolean isAdminUser(Authentication authentication) {
        try {
            if (authentication.getPrincipal() instanceof com.mealplanner.auth.UserPrincipal userPrincipal) {
                return userPrincipal.getUser().getRoles().contains("ROLE_ADMIN");
            }
        } catch (Exception e) {
            // Log error if needed
        }
        return false;
    }
}
