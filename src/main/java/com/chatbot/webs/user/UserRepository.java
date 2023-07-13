package com.chatbot.webs.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User findByUsername(String username);
	User findByEmail(String email);
	
	Page<User> findByUsernameNot(String username, Pageable page);
}