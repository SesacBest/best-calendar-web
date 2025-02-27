package com.ssb.scalendar.domain.diary.controller;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.dto.response.DiaryResponseDto;
import com.ssb.scalendar.domain.diary.service.DiaryService;
import com.ssb.scalendar.global.response.ApiResponse;
import com.ssb.scalendar.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/diaries")
    public ResponseEntity<ApiResponse<DiaryResponseDto>> createDiary
            (@RequestBody DiaryCreateRequestDto requestDto,
             @RequestHeader("Authorization") String authorizationHeader) {

        // Bearer 제거
        String token = authorizationHeader.replace("Bearer ", "");
//        System.out.println(token);

        // 토큰에서 유저 정보 꺼내기
        Long userId = jwtTokenProvider.getUserId(token);
//        String username = jwtTokenProvider.getUsername(token);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.ok(
                                "일기가 작성되었습니다.",
                                "CREATED",
                                diaryService.createDiary(requestDto, userId)
                        )
                );
    }

}
