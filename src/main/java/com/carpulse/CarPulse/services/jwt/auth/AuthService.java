package com.carpulse.CarPulse.services.jwt.auth;

import com.carpulse.CarPulse.DTO.SignUpRequest;
import com.carpulse.CarPulse.DTO.UserDto;
import com.carpulse.CarPulse.Entities.User;

public interface AuthService {
    Boolean hasUserWithEmail(String email);

    UserDto signup(SignUpRequest signUpRequest);
}
