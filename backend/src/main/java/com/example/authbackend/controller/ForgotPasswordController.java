package com.example.authbackend.controller;

import com.example.authbackend.dto.ForgotPasswordRequest;
import com.example.authbackend.model.User;
import com.example.authbackend.repository.UserRepository;
import com.example.authbackend.service.EmailService;
import com.example.authbackend.service.OtpService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    
    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody ForgotPasswordRequest request) throws MessagingException {
        String email = request.getEmail();

        User user = userRepository.findByEmail(email);
        if (user == null) return "User not found";

        String otp = otpService.generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);

        emailService.sendOtpEmail(email, otp);
        return "OTP sent to email";
    }

    
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        User user = userRepository.findByEmail(email);
        if (user == null || !otp.equals(user.getOtp())) return "Invalid OTP";
        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) return "OTP expired";

        return "OTP verified";
    }

    
    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) return "User not found";

        user.setPassword(newPassword); 
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        return "Password reset successful";
    }
}
