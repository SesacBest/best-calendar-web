package com.ssb.scalendar.domain.diary.dto.request;

import com.ssb.scalendar.domain.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class DiaryCreateRequestDto {

    private LocalDate selectedDate;
    private String content;

    public Diary toEntity() {
        return Diary.builder()
                .selectedDate(this.selectedDate)
                .content(this.content)
                .build();
    }

}
