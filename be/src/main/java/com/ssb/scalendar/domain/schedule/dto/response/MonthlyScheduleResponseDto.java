package com.ssb.scalendar.domain.schedule.dto.response;

import com.ssb.scalendar.domain.common.projection.DailyCount;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class MonthlyScheduleResponseDto {
    private LocalDate day;
    private Integer count;

    public static MonthlyScheduleResponseDto from(DailyCount dailyCount) {
        return MonthlyScheduleResponseDto.builder()
                .day(dailyCount.getDay())
                .count(dailyCount.getCount())
                .build();
    }
}
