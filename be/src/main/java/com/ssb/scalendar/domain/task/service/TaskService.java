package com.ssb.scalendar.domain.task.service;

import com.ssb.scalendar.domain.task.dto.request.CheckTaskRequestDto;
import com.ssb.scalendar.domain.task.dto.request.TaskCreateRequestDto;
import com.ssb.scalendar.domain.task.dto.response.CheckTaskResponseDto;
import com.ssb.scalendar.domain.task.dto.response.MonthlyTaskResponseDto;
import com.ssb.scalendar.domain.task.dto.response.TaskResponseDto;
import com.ssb.scalendar.domain.task.entity.Task;
import com.ssb.scalendar.domain.task.repository.TaskRepository;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;


    @Transactional
    public void createTask(TaskCreateRequestDto requestDto, User user) {
        taskRepository.save(requestDto.toEntity(user));
    }

    public List<MonthlyTaskResponseDto> findAllByMonth(User user, YearMonth month) {
        LocalDate startDate = month.atDay(1);
        LocalDate endDate = month.atEndOfMonth();

        return taskRepository.findAllByMonth(user, startDate, endDate).stream()
                .map(MonthlyTaskResponseDto::from)
                .toList();
    }


    public List<TaskResponseDto> readTasksByDate(LocalDate date, User user) {
        return taskRepository.findAllByUserAndSelectedDate(user, date).stream()
                .map(TaskResponseDto::from)
                .toList();
    }

    @Transactional
    public CheckTaskResponseDto updateTaskState(User user, Long id, CheckTaskRequestDto updatedTaskDto) {
        Task task = taskRepository.findByUserAndId(user, id)
                .orElseThrow(() -> new IllegalArgumentException("해당 할 일이 없습니다."));

        task.update(updatedTaskDto);

        return CheckTaskResponseDto.from(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);

        taskRepository.delete(task);
    }

}
