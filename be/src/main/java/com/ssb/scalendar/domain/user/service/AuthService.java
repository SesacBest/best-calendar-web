package com.ssb.scalendar.domain.user.service;

import com.ssb.scalendar.domain.user.dto.request.LoginRequestDto;
import com.ssb.scalendar.domain.user.dto.request.SignupRequestDto;
import com.ssb.scalendar.domain.user.dto.response.LoginResponseDto;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import com.ssb.scalendar.global.exception.ResourceNotFoundException;
import com.ssb.scalendar.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void signup(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
        userRepository.save(requestDto.toEntity(encodedPassword));

    }

    public LoginResponseDto login(LoginRequestDto requestDto) {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDto.getUsername(),
                        requestDto.getPassword()
                )
        );

        User user = userRepository.findByUsername(requestDto.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException());

        String jwt = jwtTokenProvider.createToken(authentication, user);

        return new LoginResponseDto(jwt);


    }

    public void verifyEmail(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
    }
}
