package com.ssb.scalendar.domain.task.service;

import com.ssb.scalendar.domain.task.dto.request.TaskCreateRequestDto;
import com.ssb.scalendar.domain.task.dto.response.MonthlyTaskResponseDto;
import com.ssb.scalendar.domain.task.dto.response.TaskResponseDto;
import com.ssb.scalendar.domain.task.entity.Task;
import com.ssb.scalendar.domain.task.repository.TaskRepository;
import com.ssb.scalendar.domain.user.entity.User;
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
public class TaskService {

    private final TaskRepository taskRepository;


    @Transactional
    public void createTask(TaskCreateRequestDto requestDto, User user) {
        taskRepository.save(requestDto.toEntity(user));
    }

//    public List<MonthlyTaskResponseDto> preFindAllByMonth(User user, String month) {
//        // 입력 문자열을 파싱하기 위한 포맷터를 정의.
//        DateTimeFormatter ymFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
//
//        // YearMonth 객체로 변환.
//        YearMonth yearMonth = YearMonth.parse(month, ymFormatter);
//
//        // 해당 월의 첫째 날로 startDate를 생성.
//        LocalDate startDate = yearMonth.atDay(1);
//        // 다음 달의 첫째 날로 endDate를 생성.
//        LocalDate endDate = yearMonth.plusMonths(1).atDay(1);
//
//        // 원하는 형식으로 출력하기 위해 포맷터를 설정.
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        return findAllByMonth(user, startDate, endDate);
//
//    }

    public List<MonthlyTaskResponseDto> findAllByMonth(User user, YearMonth month) {
        LocalDate startDate = month.atDay(1);
        LocalDate endDate = month.atEndOfMonth();

        return taskRepository.findAllByMonth(user, startDate, endDate).stream()
                .map(MonthlyTaskResponseDto::from)
                .toList();
    }


    public List<TaskResponseDto> readTasksByDate(LocalDate date, User user) {
        return taskRepository.findAllByUserAndSelectedDate(user, date).stream()
                .map(TaskResponseDto::from)
                .toList();
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());

        taskRepository.delete(task);
    }

}
