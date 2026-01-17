package com.mealplanner.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mealplanner.model.User;
import com.mealplanner.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setRoles(List.of("ROLE_USER"));
            return userRepository.save(newUser);
        });

        String jwt = jwtProvider.generateToken(user.getId(), user.getEmail(), user.getRoles());

//        Map<String, Object> responseBody = new HashMap<>();
//        responseBody.put("token", jwt);
//        responseBody.put("email", user.getEmail());
//        responseBody.put("userId", user.getId());
//
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));

        // Send token in redirect URL or store in cookie
         response.sendRedirect("http://localhost:5173/oauth-success?token=" + jwt);
    }

}
