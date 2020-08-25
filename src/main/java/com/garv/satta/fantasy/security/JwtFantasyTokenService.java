package com.garv.satta.fantasy.security;

import com.google.api.client.json.webtoken.JsonWebSignature;
import com.google.auth.oauth2.TokenVerifier;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;

@Service
public class JwtFantasyTokenService {

    private long EXPIRATIONTIME = 3 * 60 * 60 * 24 * 10; // 30 days
    private String secret = "FantasyISGreatBussiness";

    public String getFantasyTokenFromGoogleToken(String googleToken) {
        try {
            TokenVerifier tokenVerifier = TokenVerifier.newBuilder().build();
            JsonWebSignature jsonWebSignature = tokenVerifier.verify(googleToken);
            String email = (String) jsonWebSignature.getPayload().get("email");
            String name = (String) jsonWebSignature.getPayload().get("name");

            String JWT = Jwts.builder()
                    .setSubject(email)
                    .claim("email", email)
                    .claim("name", name)
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();

            return JWT;

        }catch (TokenVerifier.VerificationException e) {
            System.out.println("Erro occured, unable to verify token , " + e.getMessage());
            return null;
        }

    }

    public String verifyToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token).getBody();
        String email = (String) claims.get("email");
        if (StringUtils.isEmpty(email)) {
            return null;
        }
        return email;
    }

}
