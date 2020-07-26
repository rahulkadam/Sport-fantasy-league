package com.garv.satta.fantasy;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommanBean {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
