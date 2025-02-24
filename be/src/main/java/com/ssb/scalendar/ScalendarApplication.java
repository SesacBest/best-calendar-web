package com.ssb.scalendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ScalendarApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScalendarApplication.class, args);
    }

}
