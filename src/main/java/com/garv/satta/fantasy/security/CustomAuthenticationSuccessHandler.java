package com.garv.satta.fantasy.security;

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

    private String homeUrl = "http://localhost:3000/redirect/success";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        if (response.isCommitted()) {
            return;
        }

        DefaultOidcUser oidcUser = (DefaultOidcUser) authentication.getPrincipal();

        String redirectionUrl = UriComponentsBuilder.fromUriString(homeUrl)
                .queryParam("exchange_for_fantasy_token", oidcUser.getIdToken().getTokenValue())
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, redirectionUrl);
    }
}
