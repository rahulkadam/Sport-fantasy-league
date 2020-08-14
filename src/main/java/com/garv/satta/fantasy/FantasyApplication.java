package com.garv.satta.fantasy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.garv.satta.fantasy.dao.repository")
public class FantasyApplication {

	public static void main(String[] args) {
		SpringApplication.run(FantasyApplication.class, args);
	}

}
