package com.ssb.scalendar.domain.user.dto.request;

import com.ssb.scalendar.domain.user.entity.Role;
import com.ssb.scalendar.domain.user.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    @NotBlank(message = "이메일이 입력되지 않았습니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String username;

    @NotBlank(message = "비밀번호가 입력되지 않았습니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수 문자가 각각 1자 이상 포함되어야 합니다.")
    private String password;

    @NotBlank(message = "닉네임이 입력되지 않았습니다.")
    @Length(min = 2, max = 15, message = "닉네임은 2자 이상, 15자 이하여야 합니다.")
    private String nickname;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .username(this.getUsername())
                .password(encodedPassword)
                .nickname(this.getNickname())
                .role(Role.ROLE_USER)
                .build();
    }
}
