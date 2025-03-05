package com.ssb.scalendar.domain.diary.entity;

import com.ssb.scalendar.domain.diary.dto.request.DiaryUpdateRequestDto;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "selected_date")
    private LocalDate selectedDate;

    @Column(length = 10000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Diary(LocalDate selectedDate, String content, User user) {
        this.selectedDate = selectedDate;
        this.content = content;
        this.user = user;
    }

    public Diary update(DiaryUpdateRequestDto requestDto) {
        this.content = requestDto.getContent();
        return this;
    }
}
