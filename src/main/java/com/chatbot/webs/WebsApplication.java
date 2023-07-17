package com.chatbot.webs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.chatbot.webs.chatlog.Chatlog;
import com.chatbot.webs.chatlog.ChatlogService;
import com.chatbot.webs.user.User;
import com.chatbot.webs.user.UserService;

import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class WebsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebsApplication.class, args);
	}

//	@Bean
//	@Profile("dev")
//	CommandLineRunner createInitialUsers(UserService userService) {
//		return (args) -> {
//			for(int i = 0; i < 25; i++) {
//				User user = new User();
//				user.setEmail("mail" + i + "@mail.com");
//				user.setUsername("user" + i);
//				user.setName("name" + i);
//				user.setSurname("surname" + i);
//				user.setPassword("P4ssword");
//				userService.save(user);
//			}
//			};
//	}
//	
//	@Bean
//	CommandLineRunner createInitialChatlogs(ChatlogService chatlogService) {
//		return (args) -> {
//			for(int i = 0; i < 15; i++) {
//				Chatlog chat = new Chatlog();
//				chat.setContent("test-" + i);
//				chatlogService.save(chat);
//			}
//			};
//	}
	
}
