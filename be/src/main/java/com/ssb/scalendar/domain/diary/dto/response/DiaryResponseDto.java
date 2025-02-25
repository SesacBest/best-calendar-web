package com.ssb.scalendar.domain.diary.dto.response;

import com.ssb.scalendar.domain.diary.entity.Diary;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class DiaryResponseDto {
    private final Long id;

    private final LocalDate selectedDate;
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static DiaryResponseDto from(Diary entity) {
        return DiaryResponseDto.builder()
                .id(entity.getId())
                .selectedDate(entity.getSelectedDate())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

}
