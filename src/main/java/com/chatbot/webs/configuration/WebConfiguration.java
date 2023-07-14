package com.chatbot.webs.configuration;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.boot.CommandLineRunner;

@Configuration
public class WebConfiguration implements WebMvcConfigurer{

	@Autowired
	AppConfiguration appConfiguration;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/**")
		.addResourceLocations("file:./"+appConfiguration.getUploadPath()+"/")
		.setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
	}
	
	@Bean
	CommandLineRunner createStorageDirectories(){
		return (args) -> {
			File folder = new File(appConfiguration.getUploadPath());
			boolean folderExists = folder.exists() && folder.isDirectory();
			if(!folderExists) {
				folder.mkdir();
			}
		};
	}
	
}
