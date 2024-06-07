// package com.kahoot.kahoot.auth;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.cors.CorsConfigurationSource;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http.
//     .anonymous()
//     .and()
//     .authorizeRequests()
//     .antMatchers("/admin-panel/**").authenticated()
//     .anyRequest().permitAll()

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Frontend URL
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "HEAD", "OPTIONS"));
//         configuration.setAllowCredentials(true);
//         configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
// }
