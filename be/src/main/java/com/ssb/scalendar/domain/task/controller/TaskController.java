package com.ssb.scalendar.domain.task.controller;

import com.ssb.scalendar.domain.task.dto.request.TaskCreateRequestDto;
import com.ssb.scalendar.domain.task.service.TaskService;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/tasks")
    public ResponseEntity<ApiResponse<Object>> createSchedule(
            @Valid @RequestBody TaskCreateRequestDto requestDto,
            @AuthenticationPrincipal User user) {

        taskService.createTask(requestDto, user);

        return ResponseEntity.ok(ApiResponse.ok("일정이 생성되었습니다.", "OK", null));
    }
}
