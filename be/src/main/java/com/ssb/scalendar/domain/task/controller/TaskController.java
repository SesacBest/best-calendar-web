package com.ssb.scalendar.domain.task.controller;

import com.ssb.scalendar.domain.task.dto.request.TaskCreateRequestDto;
import com.ssb.scalendar.domain.task.dto.response.MonthlyTaskResponseDto;
import com.ssb.scalendar.domain.task.dto.response.TaskResponseDto;
import com.ssb.scalendar.domain.task.service.TaskService;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.response.ApiResponse;
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
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/tasks")
    public ResponseEntity<ApiResponse<Object>> createTask(
            @Valid @RequestBody TaskCreateRequestDto requestDto,
            @AuthenticationPrincipal User user) {

        taskService.createTask(requestDto, user);

        return ResponseEntity.ok(ApiResponse.ok("할 일이 생성되었습니다.", "OK", null));
    }

    @GetMapping("/monthly-tasks")
    public ResponseEntity<ApiResponse<List<MonthlyTaskResponseDto>>> findAllByMonth(
            @AuthenticationPrincipal User user,
            @Valid @RequestParam YearMonth month
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "할 일 조회에 성공했습니다.",
                "OK",
                taskService.findAllByMonth(user, month)
        ));
    }

    @GetMapping("/tasks")
    public ResponseEntity<ApiResponse<List<TaskResponseDto>>> getTasksByDate(
            @Valid @RequestParam LocalDate date,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "할 일 조회에 성공했습니다.",
                "OK",
                taskService.readTasksByDate(date, user))
        );
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);

        return ResponseEntity.ok(ApiResponse.ok("할 일이 삭제되었습니다.", "OK", null));
    }
}
