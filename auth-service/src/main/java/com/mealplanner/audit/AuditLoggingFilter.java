package com.mealplanner.audit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mealplanner.auth.UserPrincipal;
import com.mealplanner.model.AuditLog;
import com.mealplanner.repository.AuditLogRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AuditLoggingFilter extends OncePerRequestFilter {

    private final AuditLogRepository auditLogRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            String username = auth.getName();
            String email = ""; // default fallback

            List<String> roles = auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            if (auth.getPrincipal() instanceof UserPrincipal userPrincipal) {
                email = userPrincipal.getUser().getEmail(); // extract email
            }

            AuditLog log = new AuditLog();
            log.setUsername(username);
            log.setEmail(email);
            log.setRoles(roles);
            log.setEndpoint(request.getRequestURI());
            log.setMethod(request.getMethod());
            log.setTimestamp(LocalDateTime.now());

            auditLogRepository.save(log);
        }

        filterChain.doFilter(request, response);
    }
}
