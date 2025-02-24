package com.ssb.scalendar.domain.task.entity;

import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Task extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "selected_date")
    private LocalDate selectedDate;

    private String content;

    private Boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

