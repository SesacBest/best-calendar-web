package com.ssb.scalendar.domain.schedule.service;

import com.ssb.scalendar.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.ssb.scalendar.domain.schedule.dto.response.MonthlyScheduleResponseDto;
import com.ssb.scalendar.domain.schedule.repository.ScheduleRepository;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import com.ssb.scalendar.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createSchedule(ScheduleCreateRequestDto requestDto, User user) {
        scheduleRepository.save(requestDto.toEntity(user));
    }

    public List<MonthlyScheduleResponseDto> readSchedulesByMonth(YearMonth month, User user) {

        LocalDate startDate = month.atDay(1);
        LocalDate endDate = month.atEndOfMonth();

        return scheduleRepository.countSchedulesByUserAndSelectedDateBetween(user, startDate, endDate).stream()
                .map(MonthlyScheduleResponseDto::from)
                .toList();
    }
}
