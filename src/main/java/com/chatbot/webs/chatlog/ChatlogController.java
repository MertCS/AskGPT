package com.chatbot.webs.chatlog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatbot.webs.chatlog.vm.ChatlogVM;
import com.chatbot.webs.shared.CurrentUser;
import com.chatbot.webs.shared.GenericResponse;
import com.chatbot.webs.user.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class ChatlogController {
	
	@Autowired
	ChatlogService chatlogService;

	@PostMapping("/chatlogs")
	GenericResponse saveChatlog(@Valid @RequestBody Chatlog chatlog, @CurrentUser User user) {
		chatlogService.save(chatlog, user);
		return new GenericResponse("Chatlog saved");
	}
	
	@GetMapping("/chatlogs")
	Page<ChatlogVM> getChatlogs(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return chatlogService.getChatlogs(page).map(ChatlogVM::new);
	}
	
	@GetMapping("/users/{username}/chatlogs")
	Page<ChatlogVM> getUserChatlogs(@PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return chatlogService.getChatlogsOfUser(username, page).map(ChatlogVM::new);
	}
}
