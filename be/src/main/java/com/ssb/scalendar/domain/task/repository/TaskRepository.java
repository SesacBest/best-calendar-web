package com.ssb.scalendar.domain.task.repository;

import com.ssb.scalendar.domain.common.projection.DailyCount;
import com.ssb.scalendar.domain.task.entity.Task;
import com.ssb.scalendar.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t.selectedDate as day, COUNT(t) as count " +
            "FROM Task t " +
            "WHERE t.user = :user AND t.selectedDate >= :startDate " +
            "AND t.selectedDate < :endDate " +
            "GROUP BY t.selectedDate "
    )
    List<DailyCount> findAllByMonth(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    List<Task> findAllByUserAndSelectedDate(User user, LocalDate selectedDate);

    Optional<Task> findByUserAndId(User user, Long id);
}
