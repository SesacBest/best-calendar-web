package com.ssb.scalendar.domain.common.projection;

import java.time.LocalDate;

public interface DailyCount {
    LocalDate getDay();
    Integer getCount();
}