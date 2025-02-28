package com.ssb.scalendar.domain.diary.repository;

import com.ssb.scalendar.domain.diary.entity.Diary;
import com.ssb.scalendar.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    // SQL문
//   SELECT SelectedDate AS day, COUNT(*) AS count
//   FROM Diary d
//    WHERE YEAR(SelectedDate)=2025 AND MONTH(SelectedDate) = 1
//   GROUP BY SelecetedDate

    @Query("SELECT d.selectedDate, COUNT(d) " +
            "FROM Diary d " +
            "WHERE FUNCTION('YEAR', d.selectedDate) = :year " +
            "AND FUNCTION('MONTH', d.selectedDate) = :month " +
            "AND d.user = :user " +
            "GROUP BY d.selectedDate " +
            "ORDER BY d.selectedDate ")
    List<Object[]> countDiariesPerDay(@Param("user") User user, @Param("year") int year, @Param("month") int month);

    // 일별 조회
    Optional<Diary> findByUserAndSelectedDate(User user, LocalDate selectedDate);
}

