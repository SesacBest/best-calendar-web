package com.ssb.scalendar.domain.diary.controller;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.service.DiaryService;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.response.ApiResponse;
import com.ssb.scalendar.global.security.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/diaries")
    public ResponseEntity<ApiResponse<Object>> createDiary
            (@Valid @RequestBody DiaryCreateRequestDto requestDto,
             @AuthenticationPrincipal User user) {
        diaryService.createDiary(user, requestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.ok(
                                "일기가 작성되었습니다.",
                                "CREATED",
                                null
                        )
                );
    }

    // 일기 조회(By date)
    @GetMapping("/diaries")
    public ResponseEntity<ApiResponse<Object>> readDiariesByDate
    (@RequestParam("date") LocalDate selectedDate,
     @AuthenticationPrincipal User user) {
        return ResponseEntity
                .ok(
                        ApiResponse.ok(
                                "일기 조회에 성공했습니다.",
                                "OK",
                                selectedDate,
                                diaryService.readDiariesByDate(user, selectedDate)
                        )
                );
    }


}
