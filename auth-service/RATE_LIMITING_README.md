# Rate Limiting System

This document describes the tiered rate limiting system implemented in the Meal Planner application.

## Overview

The application implements a two-tier subscription system with different rate limits for different user types:

### Free Users
- **Generate Feature**: 3 calls per month
- **Other APIs**: 50 calls per day
- **Access**: All features available

### Pro Users  
- **Generate Feature**: Unlimited calls
- **Other APIs**: 100 calls per day
- **Access**: All features available + premium features

### Admin Users
- **Generate Feature**: Unlimited calls (no rate limiting)
- **Other APIs**: Unlimited calls (no rate limiting)
- **Access**: All features available + complete bypass of rate limiting

## Rate Limiting Implementation

### 1. Daily API Rate Limiting
- **Interceptor**: `ApiRateLimitInterceptor`
- **Scope**: All API endpoints (except excluded ones)
- **Reset**: Every day at midnight
- **Storage**: `remainingApiCalls` field in Subscription model

### 2. Monthly Generate Rate Limiting
- **Interceptor**: `GenerateRateLimitInterceptor`
- **Scope**: Only `/generate` and `/mealplans/generate` endpoints
- **Reset**: 1st of every month at midnight
- **Storage**: `remainingGenerateCalls` field in Subscription model

### 3. Automatic Reset Service
- **Service**: `SubscriptionResetService`
- **Daily Reset**: Cron job at `0 0 0 * * ?` (midnight)
- **Monthly Reset**: Cron job at `0 0 0 1 * ?` (1st of month)

### 4. Admin User Bypass
- **Scope**: All rate limiting (both daily and monthly)
- **Implementation**: Both interceptors check for `ROLE_ADMIN` role
- **Behavior**: Admin users bypass all rate limit checks and decrements
- **Authentication**: Uses Spring Security's `Authentication` object to check user roles

## Admin User Identification

Admin users are identified by having the `ROLE_ADMIN` role in their user profile. The system checks for this role in both interceptors:

```java
private boolean isAdminUser(Authentication authentication) {
    try {
        if (authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getUser().getRoles().contains("ROLE_ADMIN");
        }
    } catch (Exception e) {
        // Log error if needed
    }
    return false;
}
```

When an admin user makes any API call:
1. **Pre-handle**: Rate limit checks are bypassed immediately
2. **After-completion**: No API call counts are decremented
3. **Generate endpoints**: Monthly limits are also bypassed

## Configuration
```java
// General API rate limiting (daily limits)
registry.addInterceptor(apiRateLimitInterceptor)
        .addPathPatterns("/api/**")
        .excludePathPatterns("/api/auth/**", "/api/users/**", "/api/favorites/**", "/api/payments/**", "/oauth2/**", "/actuator/**", "/graphql");

// Generate endpoint rate limiting (monthly limits)
registry.addInterceptor(generateRateLimitInterceptor)
        .addPathPatterns("/api/**/generate", "/api/mealplans/generate")
        .order(1); // Higher priority than general API rate limiting
```

### SubscriptionPlan Enum
```java
FREE("Free", 0, 3, 50, false),      // 3 generate/month, 50 API/day
PRO("Pro", 99900, -1, 100, true);   // Unlimited generate, 100 API/day
```

## API Endpoints

### Check Remaining Limits
```
GET /api/payments/v1/api-calls/remaining
```

**Response:**
```json
{
  "remainingApiCalls": 45,
  "remainingGenerateCalls": 2,
  "userId": "user123"
}
```

**Note:** `remainingGenerateCalls: -1` indicates unlimited access (Pro users).

## Error Responses

### Rate Limit Exceeded (429)
```json
{
  "error": "Daily API rate limit exceeded. Please upgrade to Pro plan for more API calls."
}
```

### Generate Limit Exceeded (429)
```json
{
  "error": "Monthly generate limit exceeded. Please upgrade to Pro plan for unlimited access."
}
```

## Database Schema

### Subscription Model
```java
public class Subscription {
    // ... existing fields ...
    private int remainingApiCalls;        // Daily limit
    private int totalApiCalls;            // Daily limit (for display)
    private int remainingGenerateCalls;   // Monthly limit
    private int totalGenerateCalls;       // Monthly limit (for display)
    // ... other fields ...
}
```

## Monitoring and Logging

- **Daily Reset**: Logs when daily API calls are reset
- **Monthly Reset**: Logs when monthly generate calls are reset
- **Debug Logs**: Rate limiting decisions are logged at DEBUG level
- **Error Logs**: Any issues during reset operations are logged

## Testing

To test the rate limiting system:

1. **Create a free user account**
2. **Make API calls** - should be limited to 50 per day
3. **Use generate feature** - should be limited to 3 per month
4. **Upgrade to Pro** - should have higher limits
5. **Check remaining calls** using the `/remaining` endpoint
6. **Test admin user** - should bypass all rate limits (assign `ROLE_ADMIN` role)

## Future Enhancements

- **Real-time notifications** when approaching limits
- **Usage analytics dashboard**
- **Custom rate limit tiers**
- **Admin dashboard** for monitoring all users' rate limit usage
- **Webhook notifications** for limit exceeded events
- **Granular admin permissions** for different types of rate limit overrides
