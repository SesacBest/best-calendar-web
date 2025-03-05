package com.ssb.scalendar.domain.task.entity;

import com.ssb.scalendar.domain.task.dto.request.CheckTaskRequestDto;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Task extends BaseTimeEntity {
    public static final int CONTENT_MAX_SIZE = 23;
    public static final int CONTENT_MAX_LENGTH = CONTENT_MAX_SIZE * 3;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "selected_date")
    private LocalDate selectedDate;

    @Column(length = CONTENT_MAX_LENGTH)
    @Size(max = CONTENT_MAX_SIZE)
    private String content;

    private Boolean isCompleted = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Task(LocalDate selectedDate, String content, User user) {
        this.selectedDate = selectedDate;
        this.content = content;
        this.user = user;
    }

    public Task update(CheckTaskRequestDto updateDto) {
        this.isCompleted = updateDto.getIsCompleted();

        return this;
    }
}

