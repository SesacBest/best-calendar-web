package com.ssb.scalendar.domain.schedule.repository;

import com.ssb.scalendar.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
