package com.ssb.scalendar.domain.task.service;

import com.ssb.scalendar.domain.task.dto.request.TaskCreateRequestDto;
import com.ssb.scalendar.domain.task.repository.TaskRepository;
import com.ssb.scalendar.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    @Transactional
    public void createTask(TaskCreateRequestDto requestDto, User user) {
        taskRepository.save(requestDto.toEntity(user));
    }
}
