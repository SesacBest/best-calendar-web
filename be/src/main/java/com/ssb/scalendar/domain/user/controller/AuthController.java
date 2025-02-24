package com.ssb.scalendar.domain.user.controller;

import com.ssb.scalendar.domain.user.dto.request.SignupRequestDto;
import com.ssb.scalendar.domain.user.service.AuthService;
import com.ssb.scalendar.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
