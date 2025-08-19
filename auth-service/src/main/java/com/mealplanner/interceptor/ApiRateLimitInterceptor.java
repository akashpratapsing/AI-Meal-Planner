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
public class ApiRateLimitInterceptor implements HandlerInterceptor {

    private final PaymentService paymentService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        // Skip rate limiting for certain endpoints
        String requestURI = request.getRequestURI();
        if (shouldSkipRateLimiting(requestURI)) {
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal())) {
            return true; // Allow unauthenticated requests to pass through
        }

        // Extract user ID from authentication
        String userId = extractUserId(authentication);
        if (userId == null) {
            return true; // Allow to pass through if user ID cannot be extracted
        }

        // Check if user is admin - bypass all rate limits
        if (isAdminUser(authentication)) {
            return true;
        }

        // Check if user can make API call
        if (!paymentService.canMakeApiCall(userId)) {
            response.setStatus(429); // HTTP 429 Too Many Requests
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Daily API rate limit exceeded. Please upgrade to Pro plan for more API calls.\"}");
            return false;
        }

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        
        // Decrement API calls after successful request
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getPrincipal())) {
            
            // Skip decrementing for admin users
            if (isAdminUser(authentication)) {
                return;
            }
            
            String userId = extractUserId(authentication);
            if (userId != null && response.getStatus() < 400) { // Only count successful requests
                paymentService.decrementApiCalls(userId);
            }
        }
    }

    private boolean shouldSkipRateLimiting(String requestURI) {
        // Skip rate limiting for these endpoints
        return requestURI.startsWith("/api/auth/") ||
               requestURI.startsWith("/api/users/") ||
               requestURI.startsWith("/oauth2/") ||
               requestURI.equals("/api/mealplans/user") ||
               requestURI.startsWith("/api/payments/") ||
               requestURI.startsWith("/api/favorites/") ||
               requestURI.startsWith("/actuator/") ||
               requestURI.startsWith("/graphql");
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
