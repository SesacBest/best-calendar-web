package com.ssb.scalendar.domain.task.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckTaskRequestDto {
    @NotNull(message = "내용은 필수 입력값입니다.")
    private Boolean isCompleted;
}
