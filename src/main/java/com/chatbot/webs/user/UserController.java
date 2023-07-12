package com.chatbot.webs.user;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chatbot.webs.error.ApiError;
import com.chatbot.webs.shared.GenericResponse;
import com.chatbot.webs.shared.Views;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class UserController {
		
//	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;
	
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createUser(@Valid @RequestBody User user) {		
		userService.save(user);
		return new GenericResponse("Yeni kullanıcı oluşturuldu");
	}
	
//	@GetMapping("/api/1.0/users")
//	@JsonView(Views.Base.class)
//	List<User> getUsers(){
//		return userService.getUsers();
//	}
	
	@GetMapping("/users/{username}")
	User getUser(@PathVariable String username) {
		User user = userService.getByUsername(username);
		return user;
	}
}