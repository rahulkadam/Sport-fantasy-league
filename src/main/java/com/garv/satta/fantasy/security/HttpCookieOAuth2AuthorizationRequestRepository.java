package com.garv.satta.fantasy.security;

import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.util.Assert;
import org.springframework.util.SerializationUtils;
import org.springframework.util.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Optional;

/**
 * Cookie based repository for storing Authorization requests
 */
public class HttpCookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    private static final String AUTHORIZATION_REQUEST_COOKIE_NAME = "fantasy_oauth2_authorization_request";
    public static final String FANTASY_REDIRECT_URI_COOKIE_PARAM_NAME = "fantasy_redirect_uri";

    private int cookieExpirySecs;

    public HttpCookieOAuth2AuthorizationRequestRepository() {
        cookieExpirySecs = 300;
    }

    /**
     * Load authorization request from cookie
     */
    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {

        Assert.notNull(request, "request cannot be null");

        request.getCookies();
        return fetchCookie(request, AUTHORIZATION_REQUEST_COOKIE_NAME)
                .map(this::deserialize)
                .orElse(null);
    }

    /**
     * Fetches a cookie from the request
     */
    public static Optional<Cookie> fetchCookie(HttpServletRequest request, String name) {

        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0)
            for (int i = 0; i < cookies.length; i++)
                if (cookies[i].getName().equals(name))
                    return Optional.of(cookies[i]);

        return Optional.empty();
    }

    /**
     * Save authorization request in cookie
     */
    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request,
                                         HttpServletResponse response) {

        Assert.notNull(request, "request cannot be null");
        Assert.notNull(response, "response cannot be null");

        if (authorizationRequest == null) {

            deleteCookies(request, response);
            return;
        }

        Cookie cookie = new Cookie(AUTHORIZATION_REQUEST_COOKIE_NAME, serialize(authorizationRequest));
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(cookieExpirySecs);
        response.addCookie(cookie);

        String lemonRedirectUri = request.getParameter(FANTASY_REDIRECT_URI_COOKIE_PARAM_NAME);
        if (!StringUtils.isEmpty(lemonRedirectUri)) {

            cookie = new Cookie(FANTASY_REDIRECT_URI_COOKIE_PARAM_NAME, lemonRedirectUri);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(cookieExpirySecs);
            response.addCookie(cookie);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {

        return loadAuthorizationRequest(request);
    }

    /**
     * Utility for deleting related cookies
     */
    public static void deleteCookies(HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0)
            for (int i = 0; i < cookies.length; i++)
                if (cookies[i].getName().equals(AUTHORIZATION_REQUEST_COOKIE_NAME) ||
                        cookies[i].getName().equals(FANTASY_REDIRECT_URI_COOKIE_PARAM_NAME)) {

                    cookies[i].setValue("");
                    cookies[i].setPath("/");
                    cookies[i].setMaxAge(0);
                    response.addCookie(cookies[i]);
                }
    }

    private String serialize(OAuth2AuthorizationRequest authorizationRequest) {

        return Base64.getUrlEncoder().encodeToString(
                SerializationUtils.serialize(authorizationRequest));
    }


    private OAuth2AuthorizationRequest deserialize(Cookie cookie) {

        return (OAuth2AuthorizationRequest) SerializationUtils.deserialize(
                Base64.getUrlDecoder().decode(cookie.getValue()));
    }
}