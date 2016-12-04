package io.kwangsik.domain.authorizationserver.userrole;

import lombok.Getter;
import lombok.ToString;

/**
 * 사용자 Role 상세
 */
@ToString
@Getter // 참고) UserRole Entity Class 에서 이용한다.
public class UserRoleDetail {

    private String roleKey; // Role Key
    private String email; // Email
}