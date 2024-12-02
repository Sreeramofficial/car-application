package com.carpulse.CarPulse.DTO;


import com.carpulse.CarPulse.Enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private UserRole userRole;
}
