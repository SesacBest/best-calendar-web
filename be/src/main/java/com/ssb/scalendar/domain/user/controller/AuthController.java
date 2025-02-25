package com.ssb.scalendar.domain.user.controller;

import com.ssb.scalendar.domain.user.dto.request.LoginRequestDto;
import com.ssb.scalendar.domain.user.dto.request.SignupRequestDto;
import com.ssb.scalendar.domain.user.dto.response.LoginResponseDto;
import com.ssb.scalendar.domain.user.service.AuthService;
import com.ssb.scalendar.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(
            @Valid @RequestBody SignupRequestDto requestDto
    ) {
        authService.signup(requestDto);
        return ResponseEntity
                .ok(ApiResponse.ok(
                        "환영합니다.", "OK", null
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
            @Valid @RequestBody LoginRequestDto requestDto) {


        return ResponseEntity.ok(ApiResponse.ok(
                "로그인이 성공했습니다.",
                "OK",
                authService.login(requestDto)
        ));
    }

    @GetMapping("/verify")
    public void verify() {
    }
}
