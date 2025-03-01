package com.ssb.scalendar.domain.task.dto.response;

import com.ssb.scalendar.domain.task.entity.Task;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckTaskResponseDto {
    private Long id;
    private Boolean isCompleted;

    public static CheckTaskResponseDto from(Task task) {
        return CheckTaskResponseDto.builder()
                .id(task.getId())
                .isCompleted(task.getIsCompleted())
                .build();
    }
}
