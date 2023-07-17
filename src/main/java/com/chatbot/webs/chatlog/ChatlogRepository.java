package com.chatbot.webs.chatlog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.webs.user.User;

public interface ChatlogRepository extends JpaRepository<Chatlog, Long>{

	Page<Chatlog> findByUser(User user, Pageable page);
	
}
