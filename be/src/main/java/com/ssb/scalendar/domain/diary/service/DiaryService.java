package com.ssb.scalendar.domain.diary.service;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.dto.response.DiaryResponseDto;
import com.ssb.scalendar.domain.diary.entity.Diary;
import com.ssb.scalendar.domain.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Transactional
    public DiaryResponseDto createDiary(DiaryCreateRequestDto requestDto) {
        Diary diary = diaryRepository.save(requestDto.toEntity());

        return DiaryResponseDto.from(diary);
    }

}
