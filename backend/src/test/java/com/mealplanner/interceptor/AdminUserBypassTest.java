package com.mealplanner.interceptor;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminUserBypassTest {

    @Mock
    private PaymentService paymentService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    private ApiRateLimitInterceptor apiRateLimitInterceptor;
    private GenerateRateLimitInterceptor generateRateLimitInterceptor;

    @BeforeEach
    void setUp() {
        apiRateLimitInterceptor = new ApiRateLimitInterceptor(paymentService);
        generateRateLimitInterceptor = new GenerateRateLimitInterceptor(paymentService);
        
        // Setup SecurityContext
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
    }

    @Test
    void testAdminUserBypassesApiRateLimit() throws Exception {
        // Setup admin user
        User adminUser = new User();
        adminUser.setId("admin123");
        adminUser.setRoles(Arrays.asList("ROLE_ADMIN"));
        
        UserPrincipal userPrincipal = new UserPrincipal(adminUser);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(authentication.isAuthenticated()).thenReturn(true);
        
        // Mock request URI to trigger rate limiting
        when(request.getRequestURI()).thenReturn("/api/test");
        
        // Should bypass rate limiting and return true
        boolean result = apiRateLimitInterceptor.preHandle(request, response, null);
        
        assertTrue(result);
        // Verify that paymentService methods were never called
        verify(paymentService, never()).canMakeApiCall(anyString());
    }

    @Test
    void testAdminUserBypassesGenerateRateLimit() throws Exception {
        // Setup admin user
        User adminUser = new User();
        adminUser.setId("admin123");
        adminUser.setRoles(Arrays.asList("ROLE_ADMIN"));
        
        UserPrincipal userPrincipal = new UserPrincipal(adminUser);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(authentication.isAuthenticated()).thenReturn(true);
        
        // Mock request URI to trigger generate rate limiting
        when(request.getRequestURI()).thenReturn("/api/mealplans/generate");
        
        // Should bypass rate limiting and return true
        boolean result = generateRateLimitInterceptor.preHandle(request, response, null);
        
        assertTrue(result);
        // Verify that paymentService methods were never called
        verify(paymentService, never()).canMakeGenerateCall(anyString());
    }

    @Test
    void testNonAdminUserStillSubjectToRateLimits() throws Exception {
        // Setup regular user
        User regularUser = new User();
        regularUser.setId("user123");
        regularUser.setRoles(Arrays.asList("ROLE_USER"));
        
        UserPrincipal userPrincipal = new UserPrincipal(regularUser);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(authentication.isAuthenticated()).thenReturn(true);
        
        // Mock request URI to trigger rate limiting
        when(request.getRequestURI()).thenReturn("/api/test");
        
        // Mock payment service response
        when(paymentService.canMakeApiCall("user123")).thenReturn(true);
        
        // Should check rate limits and return true (since canMakeApiCall returns true)
        boolean result = apiRateLimitInterceptor.preHandle(request, response, null);
        
        assertTrue(result);
        // Verify that paymentService methods were called
        verify(paymentService).canMakeApiCall("user123");
    }

    @Test
    void testAdminUserSkipsApiCallDecrement() throws Exception {
        // Setup admin user
        User adminUser = new User();
        adminUser.setId("admin123");
        adminUser.setRoles(Arrays.asList("ROLE_ADMIN"));
        
        UserPrincipal userPrincipal = new UserPrincipal(adminUser);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(authentication.isAuthenticated()).thenReturn(true);
        
        // Should not decrement API calls for admin users
        apiRateLimitInterceptor.afterCompletion(request, response, null, null);
        
        // Verify that paymentService methods were never called
        verify(paymentService, never()).decrementApiCalls(anyString());
    }

    @Test
    void testAdminUserSkipsGenerateCallDecrement() throws Exception {
        // Setup admin user
        User adminUser = new User();
        adminUser.setId("admin123");
        adminUser.setRoles(Arrays.asList("ROLE_ADMIN"));
        
        UserPrincipal userPrincipal = new UserPrincipal(adminUser);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(authentication.isAuthenticated()).thenReturn(true);
        
        // Should not decrement generate calls for admin users
        generateRateLimitInterceptor.afterCompletion(request, response, null, null);
        
        // Verify that paymentService methods were never called
        verify(paymentService, never()).decrementGenerateCalls(anyString());
    }
}
