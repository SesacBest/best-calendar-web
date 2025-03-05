package com.ssb.scalendar.domain.task.dto.request;

import com.ssb.scalendar.domain.task.entity.Task;
import com.ssb.scalendar.domain.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskCreateRequestDto {
    public static final int CONTENT_MIN_LENGTH = 1;
    public static final int CONTENT_MAX_LENGTH = 23;

    @NotNull(message = "날짜는 필수 입력값입니다.")
    private LocalDate selectedDate;

    @NotNull(message = "내용은 필수 입력값입니다.")
    @Length(min = CONTENT_MIN_LENGTH, max = CONTENT_MAX_LENGTH, message = "할 일은 23자 이하여야 합니다.")
    private String content;

    public Task toEntity(User user) {
        return Task.builder()
                .selectedDate(this.selectedDate)
                .content(this.content)
                .user(user)
                .build();
    }
}
