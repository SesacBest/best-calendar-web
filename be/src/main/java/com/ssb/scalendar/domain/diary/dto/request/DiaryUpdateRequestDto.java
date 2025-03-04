package com.ssb.scalendar.domain.diary.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class DiaryUpdateRequestDto {
    private String content;
}
