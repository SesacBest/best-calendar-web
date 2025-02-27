package com.ssb.scalendar.domain.diary.service;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.repository.DiaryRepository;
import com.ssb.scalendar.domain.user.entity.User;
import com.ssb.scalendar.domain.user.repository.UserRepository;
import com.ssb.scalendar.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createDiary(DiaryCreateRequestDto requestDto, Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException());
        diaryRepository.save(requestDto.toEntity(user));
    }

}
