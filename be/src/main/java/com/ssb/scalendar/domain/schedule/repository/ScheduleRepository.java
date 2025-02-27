package com.ssb.scalendar.domain.schedule.repository;

import com.ssb.scalendar.domain.common.projection.DailyCount;
import com.ssb.scalendar.domain.schedule.entity.Schedule;
import com.ssb.scalendar.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s.selectedDate as day, COUNT(s) as count FROM Schedule s " +
            "WHERE s.user = :user AND s.selectedDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.selectedDate " +
            "ORDER BY s.selectedDate")
    List<DailyCount> countSchedulesByUserAndSelectedDateBetween(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    List<Schedule> findAllByUserAndSelectedDateOrderByScheduleTimeAsc(User user, LocalDate selectedDate);
}