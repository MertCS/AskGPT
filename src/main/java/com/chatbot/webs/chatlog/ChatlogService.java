package com.chatbot.webs.chatlog;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.chatbot.webs.user.User;
import com.chatbot.webs.user.UserService;

@Service
public class ChatlogService {
	
	ChatlogRepository chatlogRepository;
	
	UserService userService;

	public ChatlogService(ChatlogRepository chatlogRepository, UserService userService) {
		super();
		this.chatlogRepository = chatlogRepository;
		this.userService = userService;
	}

	public void save(Chatlog chatlog, User user) {
		chatlog.setTimestamp(new Date());
		chatlog.setUser(user);
		chatlogRepository.save(chatlog);
	}

	public Page<Chatlog> getChatlogs(Pageable page) {
		return chatlogRepository.findAll(page);
	}

	public Page<Chatlog> getChatlogsOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return chatlogRepository.findByUser(inDB, page);
	}
	
	
	
}
