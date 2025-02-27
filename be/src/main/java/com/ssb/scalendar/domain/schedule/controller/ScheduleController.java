package com.ssb.scalendar.domain.schedule.controller;

import com.ssb.scalendar.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.ssb.scalendar.domain.schedule.dto.response.MonthlyScheduleResponseDto;
import com.ssb.scalendar.domain.schedule.dto.response.ScheduleResponseDto;
import com.ssb.scalendar.domain.schedule.service.ScheduleService;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.response.ApiResponse;
import com.ssb.scalendar.global.security.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/schedules")
    public ResponseEntity<ApiResponse<Object>> createSchedule(
            @Valid @RequestBody ScheduleCreateRequestDto requestDto,
            @AuthenticationPrincipal User user) {

        scheduleService.createSchedule(requestDto, user);

        return ResponseEntity.ok(ApiResponse.ok(
                "일정이 생성되었습니다.", "OK", null
                ));
    }

    @GetMapping("/monthly-schedules")
    public ResponseEntity<ApiResponse<List<MonthlyScheduleResponseDto>>> readSchedulesByMonth(
            @RequestParam("month") YearMonth month,
            @AuthenticationPrincipal User user) {
        
        return ResponseEntity.ok(ApiResponse.ok(
                "일정 조회에 성공했습니다.", "OK", scheduleService.readSchedulesByMonth(month, user)
        ));
    }
    
    @GetMapping("/schedules")
    public ResponseEntity<ApiResponse<List<ScheduleResponseDto>>> readSchedulesByDate(
            @RequestParam("date") LocalDate date,
            @AuthenticationPrincipal User user) {
        
        return ResponseEntity.ok(ApiResponse.ok(
                "일정 조회에 성공했습니다.", "OK", scheduleService.readSchedulesByDate(date, user)
        ));
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteSchedule(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {

        scheduleService.deleteSchedule(id, user);

        return ResponseEntity.ok(ApiResponse.ok(
                "일정이 삭제되었습니다.", "OK", null
        ));
    }
}
