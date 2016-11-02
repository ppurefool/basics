package io.kwangsik.domain.authorizationserver.login;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 로그인 목록 조회 요청
 * 참고) LoginListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Setter
@Getter
public class LoginListInquiryRequest {

    private String email; // Email
}