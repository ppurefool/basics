package io.kwangsik.domain.authorizationserver.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 사용자 목록 조회 요청
 * 참고) UserListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Setter // 참고) UserRESTController Class 에서 Message Converter 에 의해 이용된다.
@Getter // 참고) SimpleUserListInquiryRepository Class 에서 이용한다.
public class UserListInquiryCondition {

    private String email; // Email
    private String name; // 이름
}