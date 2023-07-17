package com.chatbot.webs.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
 
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled=true)
public class SecurityConfiguration {
	
	@Autowired
	UserAuthService userAuthService;
 
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable();
    
    http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
    http.headers().frameOptions().disable();
    
    http.authorizeHttpRequests()
			.requestMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
			.requestMatchers(HttpMethod.PUT, "/api/1.0/users/{username}").authenticated()
			.requestMatchers(HttpMethod.POST, "/api/1.0/chatlogs").authenticated()
			.and()
			.authorizeHttpRequests().anyRequest().permitAll();
 
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
 
    return http.build();
  }
  
  protected void configure(AuthenticationManagerBuilder auth)throws Exception{
	  auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
  }
 
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}