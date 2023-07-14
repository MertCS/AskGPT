package com.chatbot.webs.user;

import com.chatbot.webs.shared.ProfileImage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateVM {

	@ProfileImage
	private String image;
	
	@NotBlank
	@Size(min = 1, max = 255)
	private String name;
	
	@NotBlank
	@Size(min = 1, max = 255)
	private String surname;
	
}
