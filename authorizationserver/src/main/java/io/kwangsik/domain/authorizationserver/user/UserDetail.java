package io.kwangsik.domain.authorizationserver.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * 사용자 상세
 * 참고) UserListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@AllArgsConstructor // 참고) SimpleUserListInquiryRepository Class 에서 이용한다.
@Getter // 참고) User Entity Class 에서 이용한다.
public class UserDetail {

    private String email; // Email
    private String name; // 이름
}