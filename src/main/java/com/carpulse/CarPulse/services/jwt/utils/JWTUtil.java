package com.carpulse.CarPulse.services.jwt.utils;


import com.carpulse.CarPulse.Entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

@Component
public class JWTUtil {

    private Key getSignedKey() {
        String SECRET = "u6v9r+Q9dTu/OXApb1xzZn2KuT5xL+Cm7vZ1YsJWt2I=";
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignedKey()).build()
                .parseClaimsJwt(token)
                .getBody();
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject);

    }

    public Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);

    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());

    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && isTokenExpired(token));

    }

    private String generateToken
            (Map<String, Object> extractClaims, UserDetails userDetails) {
        return Jwts.builder().setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 100 * 60 * 60 * 24))
                .signWith(getSignedKey(), SignatureAlgorithm.HS256).compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
}
