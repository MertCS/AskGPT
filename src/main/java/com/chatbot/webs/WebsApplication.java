package com.chatbot.webs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.chatbot.webs.user.User;
import com.chatbot.webs.user.UserService;

import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class WebsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebsApplication.class, args);
	}

//	@Bean
//	CommandLineRunner createInitialUsers(UserService userService) {
//		return (args) -> {
//				User user = new User();
//				user.setEmail("email@mail.com");
//				user.setUserName("user1");
//				user.setName("user1");
//				user.setSurname("user1");
//				user.setPass("P4ssword");
//				userService.save(user);
//			};
//	}
	
}
