package com.chatbot.webs.error;

import java.util.Date;
import java.util.Map;

import com.chatbot.webs.shared.Views;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
	
	@JsonView(Views.Base.class)
	private int status;
	@JsonView(Views.Base.class)
	private String message;
	@JsonView(Views.Base.class)
	private String path;
	//test123
	@JsonView(Views.Base.class)
	private long timestamp = new Date().getTime();
	@JsonView(Views.Base.class)
	private Map<String, String> validationErrors;
	
	public ApiError(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}
	
}
