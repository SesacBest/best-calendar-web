package com.ssb.scalendar.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Map;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private final String message;
    private final String code;
    private final LocalDate day;
    private final T data;
    private final Map<String, String> errors;

    private ApiResponse(T data) {
        this.message = "Success";
        this.code = "SUCCESS";
        this.day = null;
        this.data = data;
        this.errors = null;
    }

    private ApiResponse(String message, String code, LocalDate day, T data, Map<String, String> errors) {
        this.message = message;
        this.code = code;
        this.day = day;
        this.data = data;
        this.errors = errors;
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data);
    }

    public static <T> ApiResponse<T> ok(String message, String code, T data) {
        return new ApiResponse<>(message, code, null, data, null);
    }

    public static <T> ApiResponse<T> ok(String message, String code, LocalDate day, T data) {
        return new ApiResponse<>(message, code, day, data, null);
    }

    public static <T> ApiResponse<T> error(String message, String code) {
        return new ApiResponse<>(message, code, null, null, null);
    }

    public static <T> ApiResponse<T> error(String message, String code, Map<String, String> errors) {
        return new ApiResponse<>(message, code, null, null, errors);
    }

}
