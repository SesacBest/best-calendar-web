package com.ssb.scalendar.domain.diary.dto.request;

import com.ssb.scalendar.domain.diary.entity.Diary;
import com.ssb.scalendar.domain.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class DiaryCreateRequestDto {

    @NotNull(message = "날짜는 필수 입력값입니다.")
    private LocalDate selectedDate;

    @NotNull(message = "내용은 필수 입력값입니다.")
    private String content;

    public Diary toEntity(User user) {
        return Diary.builder()
                .selectedDate(this.selectedDate)
                .content(this.content)
                .user(user)
                .build();
    }

}
