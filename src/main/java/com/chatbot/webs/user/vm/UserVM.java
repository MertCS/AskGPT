package com.chatbot.webs.user.vm;

import com.chatbot.webs.user.User;

import lombok.Data;

@Data
public class UserVM {

	private String email;
	private String name;
	private String surname;
	private String username;
	private String image;
	
	public UserVM(User user) {
		this.setEmail(user.getEmail());
		this.setName(user.getName());
		this.setSurname(user.getSurname());
		this.setUsername(user.getUsername());
		this.setImage(user.getImage());
	}
}
