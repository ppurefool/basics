package io.kwangsik.domain.authorizationserver.userrole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * 사용자 Role 상세
 * 참고) UserRoleListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Getter // 참고) Variable Entity Class 에서 이용한다.
@AllArgsConstructor // 참고) SimpleVariableListInquiryRepository 에서 이용한다.
public class UserRoleDetail {

    private boolean isRegistered; // 등록여부
    private String key; // Role Key
    private String value; // Role 값
}