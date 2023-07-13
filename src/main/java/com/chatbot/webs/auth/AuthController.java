package com.chatbot.webs.auth;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chatbot.webs.error.ApiError;
import com.chatbot.webs.shared.CurrentUser;
import com.chatbot.webs.user.User;
import com.chatbot.webs.user.UserRepository;
import com.chatbot.webs.user.vm.UserVM;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	@PostMapping("/api/1.0/auth")

	UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}
}
