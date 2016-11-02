package io.kwangsik.domain.authorizationserver.variable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * 변수 상세
 * 참고) VariableListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Getter // 참고) Variable Entity Class 에서 이용한다.
@AllArgsConstructor // 참고) SimpleVariableListInquiryRepository 에서 이용한다.
public class VariableDetail {

    private String key; // 변수 Key
    private String value; // 변수 값
    private String detail; // 상세 값
}