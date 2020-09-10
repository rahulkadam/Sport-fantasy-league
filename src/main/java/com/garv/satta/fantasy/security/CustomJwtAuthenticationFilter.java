package com.garv.satta.fantasy.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Creating Custom Filter for authorization of accessToken
 */
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private CustomOauthUserService customOauthUserService;

    @Autowired
    private JwtFantasyTokenService fantasyTokenService;

    /**
     * Process to authorized token , either from header bearer token or verify one time Token
     * @param req
     * @param res
     * @param chain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        try {
            ExchangeforFantasyToken(req, res);
            authorizeAPGToken(req, res);
        } catch (Exception e) {
            logger.error("Auth JWT TOken error : " + e.getMessage());
        }
        chain.doFilter(req, res);
    }

    /**
     * verify ULM Access token by calling introspect API of ULM
     * @param request
     * @param response
     */
    public void authorizeAPGToken(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String bearerToken = request.getHeader("authorization");

        if (!StringUtils.isEmpty(bearerToken) && bearerToken.startsWith("Bearer")) {
            String token = bearerToken.substring(7);

            UsernamePasswordAuthenticationToken authenticationToken = getAuthenticatedUserByToken(token,
                    request, response);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
    }


    /**
     * Exchange ULM token with APG for getting permanent access token
     * @param request
     * @param response
     */
    public void ExchangeforFantasyToken(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String tokenParam = request.getParameter("exchange_for_fantasy_token");

        if (!StringUtils.isEmpty(tokenParam)) {

            String accessToken = customOauthUserService.fetchTokenFromOneTimeToken(tokenParam);

            UsernamePasswordAuthenticationToken authenticationToken = getAuthenticatedUserByToken(accessToken,
                    request, response);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
    }


    /**
     * Getting Authentication By AccessToken
     * @param token
     * @param request
     * @param response
     * @return
     */
    public UsernamePasswordAuthenticationToken getAuthenticatedUserByToken(String token, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authentication = null;
        OAuth2User user = customOauthUserService.findUserByToken(token);
        if (user != null) {
            authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        }
        return authentication;
    }

}
