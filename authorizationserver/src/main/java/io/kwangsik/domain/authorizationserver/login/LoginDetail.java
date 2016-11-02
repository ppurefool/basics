package io.kwangsik.domain.authorizationserver.login;

import lombok.ToString;

import java.util.Date;

/**
 * 로그인 상세
 * 참고) VariableListInquiryRepository Interface 에서 이용한다.
 */
@ToString
public class LoginDetail {

    private int number; // 번호
    private String typeName; // 유형 이름
    private String errorName; // 오류 이름
    private String address; // 주소
    private Date registrationDate; // 등록 일자
    private String registrationUserEmail; // 등록 사용자 Email

    // 참고) SimpleLoginListInquiryRepository Class 에서 이용한다.
    public LoginDetail(final int number, final String type, final int error, final String address,
                       final Date registrationDate, final String registrationUserEmail) {

        final String typeName;
        final String errorName;

        if ("USER_LOGIN_SUCCESS".equals(type)) typeName = "사용자 로그인 성공";
        else if ("USER_LOGIN_FAILURE".equals(type)) typeName = "사용자 로그인 실패";
        else if ("USER_LOGOUT_SUCCESS".equals(type)) typeName = "사용자 로그아웃 성공";
        else typeName = null;

        if (-1 == error) errorName = "E-mail 불일치";
        else if (-2 == error) errorName = "비밀번호 불일치";
        else if (-3 == error) errorName = "E-mail 사용불가";
        else if (-4 == error) errorName = "비밀번호 만료";
        else if (-5 == error) errorName = "Lock 걸린 사용자";
        else if (-6 == error) errorName = "사용자 만료";
        else if (-7 == error) errorName = "로그인된 사용자";
        else if (1 != error) errorName = "알 수 없는 오류";
        else errorName = null;

        this.number = number;
        this.typeName = typeName;
        this.errorName = errorName;
        this.address = address;
        this.registrationDate = registrationDate;
        this.registrationUserEmail = registrationUserEmail;
    }
}