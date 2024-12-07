package com.carpulse.CarPulse.repository;

import com.carpulse.CarPulse.Entities.User;
import com.carpulse.CarPulse.Enums.UserRole;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findFirstByEmail(String email);

    Optional<User> findByUserRole(UserRole userRole);
}
