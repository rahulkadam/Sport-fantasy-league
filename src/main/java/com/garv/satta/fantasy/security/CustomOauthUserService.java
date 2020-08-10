package com.garv.satta.fantasy.security;

import com.garv.satta.fantasy.dao.repository.UserRepository;
import com.garv.satta.fantasy.dto.UserDTO;
import com.garv.satta.fantasy.dto.converter.UserConverter;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.google.api.client.json.webtoken.JsonWebSignature;
import com.google.auth.oauth2.TokenVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

@Service
public class CustomOauthUserService extends OidcUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;

    @Override
    public OidcUser loadUser(OidcUserRequest oidcUserRequest) {
        OidcUser oidcUser = super.loadUser(oidcUserRequest);
        Map attributes = oidcUser.getAttributes();
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail((String) attributes.get("email"));
        userDTO.setName((String) attributes.get("name"));
        updateUser(userDTO);
        return oidcUser;
    }

    private void updateUser(UserDTO userDTO) {
        User user = findUserByEmail(userDTO.getEmail());
        if (user == null) {
            user = userConverter.convertToEntity(userDTO);
            user.setRole("ROLE_USER");
            user.setProvider("google");
            user.setIsActive(true);
            user.setIsDeleted(false);
            userRepository.save(user);
        }
    }

    private User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    public String fetchTokenFromOneTimeToken(String oneTimeToken) {
        return oneTimeToken;
    }

    public OAuth2User findUserByToken(String token) {

        String email = verifyToken(token);
        if (email == null) {
            return null;
        }
        OAuth2User oidcUser = getUserForAuthentication(email);
        return oidcUser;
    }

    private OAuth2User getUserForAuthentication(String email) {
        User user = findUserByEmail(email);

        Map<String, Object> userAttributes = new HashMap<>();
        Set<GrantedAuthority> authorities = new LinkedHashSet<>();

        userAttributes.put("email", user.getEmail());
        userAttributes.put("name", user.getName());
        userAttributes.put("id" , user.getId());
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        OAuth2User oidcUser = new DefaultOAuth2User(authorities, userAttributes, "email");
        return oidcUser;
    }

    public String verifyToken(String token) {
        TokenVerifier tokenVerifier = TokenVerifier.newBuilder().build();
        try {
            JsonWebSignature jsonWebSignature = tokenVerifier.verify(token);
            String email = (String) jsonWebSignature.getPayload().get("email");
            return email;
        } catch (TokenVerifier.VerificationException e) {
            return null;
        }
    }
}
