package com.carpulse.CarPulse.services.jwt.auth;


import com.carpulse.CarPulse.DTO.SignUpRequest;
import com.carpulse.CarPulse.DTO.UserDto;
import com.carpulse.CarPulse.Entities.User;
import com.carpulse.CarPulse.Enums.UserRole;
import com.carpulse.CarPulse.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AuthService {
    private final UserRepository userRepository;


    @PostConstruct
    //used to load method when run
    public void createAdminAccount() {
        Optional<User> admin =
                userRepository.findByUserRole(UserRole.ADMIN);
        if (admin.isPresent()) {
            System.out.println("Admin already present");
        } else {
            User newAdmin = User.builder()
                    .userRole(UserRole.ADMIN)
                    .name("Admin")
                    .email("admin@test.com")
                    .password(new BCryptPasswordEncoder().encode("admin")).build();
            userRepository.save(newAdmin);
            System.out.println("Admin created successfully");

        }
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public UserDto signup(SignUpRequest signUpRequest) {
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setUserRole(UserRole.CUSTOMER);
        user.setPassword(new BCryptPasswordEncoder()
                .encode(signUpRequest.getPassword()));
        return userRepository.save(user).getUserDto();
    }
}
