package com.ssb.scalendar.domain.task.repository;

import com.ssb.scalendar.domain.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
