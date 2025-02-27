package com.ssb.scalendar.domain.schedule.dto.request;

import com.ssb.scalendar.domain.schedule.entity.Schedule;
import com.ssb.scalendar.domain.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleCreateRequestDto {

    @NotNull(message = "날짜는 필수 입력값입니다.")
    private LocalDate selectedDate;

    @NotNull(message = "시간은 필수 입력값입니다.")
    private LocalTime scheduleTime;

    @NotNull(message = "내용은 필수 입력값입니다.")
    private String content;

    public Schedule toEntity(User user) {
        return Schedule.builder()
                .selectedDate(this.selectedDate)
                .scheduleTime(this.scheduleTime)
                .content(this.content)
                .user(user)
                .build();
    }
}
