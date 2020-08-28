package com.garv.satta.fantasy.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class FantasyProperties {

    @Autowired
    private Environment env;

    public boolean islocal() {
        return Boolean.parseBoolean(env.getProperty("fantasy.env.local"));
    }

    public String[] getProfile() {
        return env.getActiveProfiles();
    }

    public String getGoogleCallBackRedirection() {
        return env.getProperty("spring.security.oauth2.client.registration.google.redirect-uri");
    }

    public String getCricAPIURL() {
        return env.getProperty("fantasy.cricapi.url");
    }

    public String getCricAPIKey() {
        return env.getProperty("fantasy.cricapi.key");
    }


}
