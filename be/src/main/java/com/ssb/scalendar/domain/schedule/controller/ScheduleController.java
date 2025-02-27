package com.ssb.scalendar.domain.schedule.controller;

import com.ssb.scalendar.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.ssb.scalendar.domain.schedule.service.ScheduleService;
import com.ssb.scalendar.global.response.ApiResponse;
import com.ssb.scalendar.global.security.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/schedules")
    public ResponseEntity<ApiResponse<Object>> createSchedule(
            @Valid @RequestBody ScheduleCreateRequestDto requestDto,
            @RequestHeader("Authorization") String authorizationHeader) {

        String token = authorizationHeader.replace("Bearer ", "");
        Long userId = jwtTokenProvider.getUserId(token);

        scheduleService.createSchedule(requestDto, userId);

        return ResponseEntity.ok(ApiResponse.ok(
                "일정이 생성되었습니다.", "OK", null
                ));
    }
}
