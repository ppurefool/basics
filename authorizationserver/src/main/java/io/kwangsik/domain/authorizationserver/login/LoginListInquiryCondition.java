package io.kwangsik.domain.authorizationserver.login;

import io.kwangsik.commonness.authorizationserver.utility.BasicsUtility;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.util.StringUtils;

import java.util.Date;

/**
 * 로그인 목록 조회 조건
 * 참고) LoginListInquiryRepository Interface 에서 이용한다.
 */
@ToString
@Setter
public class LoginListInquiryCondition {

    private String email; // Email
    private String startYmd; // 시작 Ymd
    private String endYmd; // 종료 Ymd

    // 참고) SimpleLoginListInquiryRepository Class 에서 이용한다.
    public String getEmail() {

        return BasicsUtility.getInstance().parseQueryParameter(this.email);
    }

    // 참고) SimpleLoginListInquiryRepository Class 에서 이용한다.
    public Date getStartDate() {

        return BasicsUtility.getInstance().parseDateString(this.startYmd);
    }

    // 참고) SimpleLoginListInquiryRepository Class 에서 이용한다.
    public Date getEndDate() {

        return BasicsUtility.getInstance().parseDateString(this.endYmd);
    }
}