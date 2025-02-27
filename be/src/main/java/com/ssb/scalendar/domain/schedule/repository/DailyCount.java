package com.ssb.scalendar.domain.schedule.repository;

import java.time.LocalDate;

public interface DailyCount {
    LocalDate getDay();
    Integer getCount();
}