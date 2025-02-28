package com.ssb.scalendar.domain.diary.dto.response;

import com.ssb.scalendar.domain.diary.entity.Diary;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DiaryResponseDto {

    private final Long id;
    private final String content;

    public static DiaryResponseDto from(Diary entity) {
        return DiaryResponseDto.builder()
                .id(entity.getId())
                .content(entity.getContent())
                .build();
    }


}