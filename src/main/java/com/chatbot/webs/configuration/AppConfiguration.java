package com.chatbot.webs.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "askgpt")
public class AppConfiguration {
	
	private String uploadPath;
}
