package com.chatbot.webs.chatlog.vm;

import com.chatbot.webs.chatlog.Chatlog;
import com.chatbot.webs.user.vm.UserVM;

import lombok.Data;

@Data
public class ChatlogVM {

	private long id;
	
	private String content;
	
	private long timestamp;

	private UserVM user;
	
	public ChatlogVM(Chatlog chatlog) {
		this.setId(chatlog.getId());
		this.setContent(chatlog.getContent());
		this.setTimestamp(chatlog.getTimestamp().getTime());
		this.setUser(new UserVM(chatlog.getUser()));
	}
}
