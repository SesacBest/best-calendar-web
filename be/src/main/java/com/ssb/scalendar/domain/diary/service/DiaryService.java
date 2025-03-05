package com.ssb.scalendar.domain.diary.service;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.dto.request.DiaryUpdateRequestDto;
import com.ssb.scalendar.domain.diary.dto.response.DiaryResponseDto;
import com.ssb.scalendar.domain.diary.entity.Diary;
import com.ssb.scalendar.domain.diary.repository.DiaryRepository;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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


    // 일기 조회(By month)
    public List<Map<String, Object>> readDiariesByMonth(User user, YearMonth selectedDate) {

        int year = selectedDate.getYear();
        int month = selectedDate.getMonthValue();

        List<Object[]> results = diaryRepository.countDiariesPerDay(user, year, month);

        return results.stream()
                .map(result -> Map.<String, Object>of("day", result[0], "count", result[1]))
                .collect(Collectors.toList());

    }


    // 일기 조회(By date)
    public Optional<DiaryResponseDto> readDiariesByDate(User user, LocalDate selectedDate) {
        return diaryRepository.findByUserAndSelectedDate(user, selectedDate)
                .map(DiaryResponseDto::from);
    }


    @Transactional
    public DiaryResponseDto updateDiary(User user, Long id, DiaryUpdateRequestDto requestDto) {
        Diary diary = diaryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException());
        diary.update(requestDto);

        return DiaryResponseDto.from(diary);
    }

    @Transactional
    public void deleteDiary(User user, Long id) {
        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id가 없습니다."));

        diaryRepository.delete(diary);
    }


}
