package com.ssb.scalendar.domain.diary.controller;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.dto.request.DiaryUpdateRequestDto;
import com.ssb.scalendar.domain.diary.repository.DiaryRepository;
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
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final JwtTokenProvider jwtTokenProvider;
    private final DiaryRepository diaryRepository;


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


    // 일기 조회(By month)
    @GetMapping("/monthly-diaries")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> readDiariesByMonth(
            @RequestParam("month") YearMonth selectedDate,
            @AuthenticationPrincipal User user) {

        return ResponseEntity
                .ok(
                        ApiResponse.ok(
                                "일기 조회에 성공했습니다.",
                                "OK",
                                diaryService.readDiariesByMonth(user, selectedDate)

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
                                diaryService.readDiariesByDate(user, selectedDate)
                        )
                );
    }


    @PutMapping("/diaries/{id}")
    public ResponseEntity<ApiResponse<Object>> updateDiary(
            @PathVariable Long id,
            @AuthenticationPrincipal User user,
            @RequestBody DiaryUpdateRequestDto requestDto
    ) {
        diaryService.updateDiary(user, id, requestDto);
        return ResponseEntity
                .ok(
                        ApiResponse.ok(
                                "일기가 수정되었습니다.",
                                "OK",
                                null
                        )
                );
    }


    @DeleteMapping("/diaries/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteDiary(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        diaryService.deleteDiary(user, id);
        return ResponseEntity
                .ok(
                        ApiResponse.ok(
                                "일기가 삭제되었습니다.",
                                "DELETED",
                                null
                        )
                );
    }


}
