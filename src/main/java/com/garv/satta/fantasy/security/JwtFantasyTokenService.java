package com.garv.satta.fantasy.security;

import com.garv.satta.fantasy.dao.repository.UserRepository;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.google.api.client.json.webtoken.JsonWebSignature;
import com.google.auth.oauth2.TokenVerifier;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;

@Service
public class JwtFantasyTokenService {

    private long EXPIRATIONTIME = 30 * 60 * 60 * 24 * 10; // 10 days
    private String secret = "FantasyISGreatBussiness";

    @Autowired
    private UserRepository userRepository;

    public String getFantasyTokenFromGoogleToken(String googleToken) {
        try {

            TokenVerifier tokenVerifier = TokenVerifier.newBuilder().build();
            JsonWebSignature jsonWebSignature = tokenVerifier.verify(googleToken);
            String email = (String) jsonWebSignature.getPayload().get("email");
            User user = userRepository.findByEmail(email);
            Long id = user != null ? user.getId() : null;
            String role = user != null ? user.getRole() : "";

            String JWT = Jwts.builder()
                    .setSubject(email)
                    .claim("id", id)
                    .claim("role", role)
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();

            return JWT;

        }catch (TokenVerifier.VerificationException e) {
            System.out.println("Erro occured, unable to verify token , " + e.getMessage());
            return null;
        }

    }

    public Claims verifyToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token).getBody();
        return claims;
    }

}
