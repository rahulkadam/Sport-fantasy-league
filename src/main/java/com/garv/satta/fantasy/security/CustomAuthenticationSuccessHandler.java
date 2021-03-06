package com.garv.satta.fantasy.security;

import com.garv.satta.fantasy.configuration.FantasyProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private FantasyProperties properties;

    @Autowired
    private JwtFantasyTokenService jwtFantasyTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String homeUrl = "/redirect";
        boolean localDebug = properties.islocal();
         if (localDebug) {
             homeUrl = "http://localhost:3000" + homeUrl;
         }

        if (response.isCommitted()) {
            return;
        }

        DefaultOidcUser oidcUser = (DefaultOidcUser) authentication.getPrincipal();

        String token = jwtFantasyTokenService.getFantasyTokenFromGoogleToken(oidcUser.getIdToken().getTokenValue());

        String redirectionUrl = UriComponentsBuilder.fromUriString(homeUrl)
                .queryParam("exchange_for_fantasy_token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, redirectionUrl);
    }
}
