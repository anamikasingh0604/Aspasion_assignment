package com.example.authbackend.controller;

import com.example.authbackend.model.User;
import com.example.authbackend.repository.UserRepository;
import com.example.authbackend.service.AuthService;
import com.example.authbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        
        if (!user.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            return ResponseEntity.badRequest().body("❌ Invalid email format");
        }

        if (!user.getPassword().matches("^(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$")) {
            return ResponseEntity.badRequest().body("❌ Weak password: Minimum 8 characters with at least one special character");
        }

        
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("❌ Email already exists");
        }

        authService.register(user);
        return ResponseEntity.ok("✅ User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        boolean isAuthenticated = authService.login(loginUser);
        if (isAuthenticated) {
            String token = jwtUtil.generateToken(loginUser.getEmail());
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Invalid credentials!");
        }
    }
    
}
