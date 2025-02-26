package com.ssb.scalendar.domain.schedule.service;

import com.ssb.scalendar.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.ssb.scalendar.domain.schedule.repository.ScheduleRepository;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import com.ssb.scalendar.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createSchedule(ScheduleCreateRequestDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException());

        scheduleRepository.save(requestDto.toEntity(user));
    }
}
