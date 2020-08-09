package com.garv.satta.fantasy.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

@Service
public class CustomOauthUserService extends OidcUserService {

    @Override
    public OidcUser loadUser(OidcUserRequest oidcUserRequest) {
        OidcUser oidcUser = super.loadUser(oidcUserRequest);
        System.out.println(oidcUser);
        System.out.println(" Oidc User : "+ oidcUser.getEmail());
        return oidcUser;
    }


    public String fetchTokenFromOneTimeToken(String oneTimeToken) {
        return oneTimeToken;
    }

    public OAuth2User findUserByToken(String token) {

        if (StringUtils.isEmpty(token)){
            return null;
        }

        if (!verifyToken(token)) {
            return null;
        }

        Map<String, Object> userAttributes = new HashMap<>();
        Set<GrantedAuthority> authorities = new LinkedHashSet<>();

        userAttributes.put("email", "kadamrahul581@gmail.com");
        userAttributes.put("token", token);
        userAttributes.put("name", "Rahul");
        authorities.add(new SimpleGrantedAuthority("SCOPE_USER"));
        OAuth2User oidcUser = new DefaultOAuth2User(authorities, userAttributes, "email");

        return oidcUser;
    }

    public boolean verifyToken(String token) {
        return true;
    }
}
