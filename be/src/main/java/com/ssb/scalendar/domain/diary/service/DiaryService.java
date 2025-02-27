package com.ssb.scalendar.domain.diary.service;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.dto.response.DiaryResponseDto;
import com.ssb.scalendar.domain.diary.repository.DiaryRepository;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createDiary(User user, DiaryCreateRequestDto requestDto) {
        diaryRepository.save(requestDto.toEntity(user));
    }


    // 일기 조회(By date)
    public Optional<DiaryResponseDto> readDiariesByDate(User user, LocalDate selectedDate) {
        return diaryRepository.findByUserAndSelectedDate(user, selectedDate)
                .map(DiaryResponseDto::from);
    }


}
