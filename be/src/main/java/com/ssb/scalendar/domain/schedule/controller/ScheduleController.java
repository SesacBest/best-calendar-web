package com.ssb.scalendar.domain.schedule.controller;

import com.ssb.scalendar.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
@Validated
public class ScheduleController {
    private final ScheduleService scheduleService;

}
