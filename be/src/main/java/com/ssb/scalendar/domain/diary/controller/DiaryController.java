package com.ssb.scalendar.domain.diary.controller;

import com.ssb.scalendar.domain.diary.dto.request.DiaryCreateRequestDto;
import com.ssb.scalendar.domain.diary.dto.response.DiaryResponseDto;
import com.ssb.scalendar.domain.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping("/diaries")
    public DiaryResponseDto createDiary(@RequestBody DiaryCreateRequestDto requestDto) {
        return diaryService.createDiary(requestDto);
    }
}
