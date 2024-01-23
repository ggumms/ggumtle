package com.ggums.ggumtle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GgumtleApplication {

	public static void main(String[] args) {
		SpringApplication.run(GgumtleApplication.class, args);
	}

}
