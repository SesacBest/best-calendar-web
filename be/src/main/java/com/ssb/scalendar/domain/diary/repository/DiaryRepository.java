package com.ssb.scalendar.domain.diary.repository;

import com.ssb.scalendar.domain.diary.entity.Diary;
import com.ssb.scalendar.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Optional<Diary> findByUserAndSelectedDate(User user, LocalDate selectedDate);
}

