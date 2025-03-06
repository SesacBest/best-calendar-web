package com.ssb.scalendar.domain.schedule.entity;

import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "selected_date")
    private LocalDate selectedDate;

    @Column(name = "schedule_time")
    private LocalTime scheduleTime;

    @Column(length = 69)
    @Size(max = 23)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Schedule(LocalDate selectedDate, LocalTime scheduleTime, String content, User user) {
        this.selectedDate = selectedDate;
        this.scheduleTime = scheduleTime;
        this.content = content;
        this.user = user;
    }
}
