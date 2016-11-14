package io.kwangsik.domain.authorizationserver.role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * Role 상세
 * 참고) VariableListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Getter // 참고) Variable Entity Class 에서 이용한다.
@AllArgsConstructor // 참고) SimpleVariableListInquiryRepository 에서 이용한다.
public class RoleDetail {

    private String key; // Role Key
    private String value; // Role 값
}