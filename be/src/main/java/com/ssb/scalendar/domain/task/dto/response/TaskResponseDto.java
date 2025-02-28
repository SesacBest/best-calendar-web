package com.ssb.scalendar.domain.task.dto.response;

import com.ssb.scalendar.domain.task.entity.Task;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskResponseDto {
    private Long id;
    private Boolean isCompleted;
    private String content;

    public static TaskResponseDto from(Task task) {
        return TaskResponseDto.builder()
                .id(task.getId())
                .isCompleted(task.getIsCompleted())
                .content(task.getContent())
                .build();
    }
}
