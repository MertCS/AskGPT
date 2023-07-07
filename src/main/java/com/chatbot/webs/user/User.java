package com.chatbot.webs.user;


import com.chatbot.webs.shared.Views;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@NotNull
@Data
@Entity
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue
	private long id;

	@NotBlank(message = "{chatbot.constraint.email.NotNull.message}")
	@Email(message = "{chatbot.constraint.email.Email.message}")
	@UniqueEmail(message = "{chatbot.constraint.email.UniqueEmail.message}")
	@JsonView(Views.Base.class)
	private String email;
	
	@NotBlank(message = "{chatbot.constraint.name.NotNull.message}")
	@Size(min = 4, max = 255, message = "{chatbot.constraint.name.Size.message}")
	@JsonView(Views.Base.class)
	private String name;
	
	@NotBlank(message = "{chatbot.constraint.surname.NotNull.message}")
	@Size(min = 4, max = 255, message = "{chatbot.constraint.surname.Size.message}")
	@JsonView(Views.Base.class)
	private String surname;
	
	@NotBlank(message = "{chatbot.constraint.username.NotNull.message}")
	@Size(min = 4, max = 255, message = "{chatbot.constraint.username.Size.message}")
	@UniqueUsername(message = "{chatbot.constraint.username.UniqueUsername.message}")
	@JsonView(Views.Base.class)
	private String userName;
	
	@NotBlank(message = "{chatbot.constraint.pass.NotNull.message}")
	@Size(min = 8, max = 255, message = "{chatbot.constraint.pass.Size.message}")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{chatbot.constraint.pass.Pattern.message}")
	@JsonView(Views.Sensitive.class)
	private String pass;
	
	@JsonView(Views.Base.class)
	private String image;
	
}