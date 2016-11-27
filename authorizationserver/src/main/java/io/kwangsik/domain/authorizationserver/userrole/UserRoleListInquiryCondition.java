package io.kwangsik.domain.authorizationserver.userrole;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 사용자 Role 목록 조회 조건
 * 참고) UserListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Setter // 참고) UserRESTController Class 에서 Message Converter 에 의해 이용된다.
@Getter // SimpleUserRoleListInquiryRepository Class 에서 이용한다.
public class UserRoleListInquiryCondition {

    private String email; // Email
}