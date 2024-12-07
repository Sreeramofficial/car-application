package com.carpulse.CarPulse.controller;


import com.carpulse.CarPulse.DTO.AuthenticationRequest;
import com.carpulse.CarPulse.DTO.AuthenticationResponse;
import com.carpulse.CarPulse.DTO.SignUpRequest;
import com.carpulse.CarPulse.DTO.UserDto;
import com.carpulse.CarPulse.Entities.User;
import com.carpulse.CarPulse.repository.UserRepository;
import com.carpulse.CarPulse.services.jwt.UserService;
import com.carpulse.CarPulse.services.jwt.auth.AuthService;
import com.carpulse.CarPulse.services.jwt.utils.JWTUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Data
public class AuthController {
    public final AuthService service;

    private final JWTUtil jwtUtil;

    private final UserService userService;


    private final UserRepository userRepository;


    private final AuthenticationManager authenticationManager;


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


    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody
                                        AuthenticationRequest authenticationRequest
    ) {

        try {
            authenticationManager.
                    authenticate(new UsernamePasswordAuthenticationToken
                            (authenticationRequest.getEmail(),
                                    authenticationRequest.getPassword()));

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("invalid credential");

        }
        final UserDetails userDetails=userService.userDetailsService()
                .loadUserByUsername(authenticationRequest.getEmail());
       Optional<User>  user=userRepository.findFirstByEmail(authenticationRequest.getEmail());
       final String jwt=jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse=new AuthenticationResponse();
        if(user.isPresent()){
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserRole(user.get().getUserRole());
            authenticationResponse.setUserId(user.get().getId());


        }
        return authenticationResponse;


    }

}
