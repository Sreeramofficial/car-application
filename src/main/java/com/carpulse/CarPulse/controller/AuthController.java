package com.carpulse.CarPulse.controller;


import com.carpulse.CarPulse.DTO.SignUpRequest;
import com.carpulse.CarPulse.DTO.UserDto;
import com.carpulse.CarPulse.services.jwt.auth.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Data
public class AuthController {
    public final AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {
        if (service.hasUserWithEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body("User Already Exist");
        }
        UserDto userDto = service.signup(signUpRequest);
        if (userDto == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @GetMapping("/hai")
    public String test() {
        return "string";
    }

}
