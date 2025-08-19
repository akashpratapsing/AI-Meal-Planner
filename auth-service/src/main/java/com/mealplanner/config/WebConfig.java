package com.mealplanner.config;

import com.mealplanner.interceptor.ApiRateLimitInterceptor;
import com.mealplanner.interceptor.GenerateRateLimitInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final ApiRateLimitInterceptor apiRateLimitInterceptor;
    private final GenerateRateLimitInterceptor generateRateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // General API rate limiting (daily limits)
        registry.addInterceptor(apiRateLimitInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**", "/api/users/**", "/api/favorites/**", "/api/payments/**", "/oauth2/**", "/actuator/**", "/graphql");
        
        // Generate endpoint rate limiting (monthly limits)
        registry.addInterceptor(generateRateLimitInterceptor)
                .addPathPatterns("/api/**/generate", "/api/mealplans/generate")
                .order(1); // Higher priority than general API rate limiting
    }
}
