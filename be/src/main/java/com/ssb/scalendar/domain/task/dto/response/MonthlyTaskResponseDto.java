package com.ssb.scalendar.domain.task.dto.response;

import com.ssb.scalendar.domain.common.projection.DailyCount;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class MonthlyTaskResponseDto {
    private LocalDate day;
    private Integer count;

    public static MonthlyTaskResponseDto from(DailyCount dailyCount) {
        return MonthlyTaskResponseDto.builder()
                .day(dailyCount.getDay())
                .count(dailyCount.getCount())
                .build();
    }
}
