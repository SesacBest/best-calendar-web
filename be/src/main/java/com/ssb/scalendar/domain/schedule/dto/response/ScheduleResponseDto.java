package com.ssb.scalendar.domain.schedule.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssb.scalendar.domain.schedule.entity.Schedule;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class ScheduleResponseDto {
    private Long id;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime scheduleTime;
    private String content;

    public static ScheduleResponseDto from(Schedule schedule) {
        return ScheduleResponseDto.builder()
                .id(schedule.getId())
                .scheduleTime(schedule.getScheduleTime())
                .content(schedule.getContent())
                .build();
    }
}
