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
import org.springframework.util.StringUtils;

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
        System.out.println(oidcUser);
        System.out.println(" Oidc User : "+ oidcUser.getEmail());
        updateUser(userDTO);
        return oidcUser;
    }

    private void updateUser(UserDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.getEmail());
        if (user == null) {
            user = userConverter.convertToEntity(userDTO);
            user.setProvider("google");
            userRepository.save(user);
        }
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
        TokenVerifier tokenVerifier = TokenVerifier.newBuilder().build();
        try {
            JsonWebSignature jsonWebSignature = tokenVerifier.verify(token);

            // optionally verify additional claims
            if (!"expected-value".equals(jsonWebSignature.getPayload().get("additional-claim"))) {
                // handle custom verification error
                System.out.println("found token");
            }
            return true;
        } catch (TokenVerifier.VerificationException e) {
            // invalid token
            return false;
        }
    }
}
