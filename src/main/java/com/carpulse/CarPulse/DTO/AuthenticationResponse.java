package com.carpulse.CarPulse.DTO;


import com.carpulse.CarPulse.Enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;

    private Long userId;

    private UserRole userRole;
}
