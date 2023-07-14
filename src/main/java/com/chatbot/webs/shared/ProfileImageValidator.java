package com.chatbot.webs.shared;

import org.springframework.beans.factory.annotation.Autowired;

import com.chatbot.webs.file.FileService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ProfileImageValidator implements ConstraintValidator<ProfileImage, String>{

	@Autowired
	FileService fileService;
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		String fileType = fileService.detectType(value);
		if(value == null || value.isEmpty()) {
			return true;
		}
		if(fileType.equalsIgnoreCase("image/jpeg") || fileType.equalsIgnoreCase("image/png")) {
			return true;
		}
		
		return false;
	}
	
}
