package io.kwangsik.domain.authorizationserver.login;

import io.kwangsik.domain.authorizationserver.user.UserIdentifier;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Calendar;
import java.util.Date;

/**
 * 로그인 Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
@Getter // VariableListInquiryResponse  Class 에서 이용한다.
@NoArgsConstructor // Constructor 추가시 작성한다.
public class Login {

    @Id
    @GeneratedValue
    @Column(name = "loginNumber")
    private int number; // 로그인 번호

    @Column(name = "typeKey", length = 50, nullable = false)
    private String type; // 유형 코드 // LOGIN_TYPE

    @Column(name = "errorNumber")
    private Integer error; // 오류 번호

    @Column(name = "addressName", length = 100, nullable = false)
    private String address; // 주소 이름

    @Column(name = "registrationDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationDate; // 등록 일자

    @Embedded
    @AttributeOverrides(@AttributeOverride(name = "email", column = @Column(name = "registrationUserEmail", length = 320)))
    private UserIdentifier registrationUserIdentifier; // 등록 사용자 Email

    // 참고) LoginDetailRegistrationService Class 에서 이용한다.
    public Login(final String type, final String address) {

        this.type = type;
        this.address = address;
        this.registrationDate = Calendar.getInstance().getTime();
    }

    // 참고) LoginDetailRegistrationService Class 에서 이용한다.
    public Login(final String type, final String address, final String registrationUserEmail) {

        this.type = type;
        this.address = address;
        this.registrationDate = Calendar.getInstance().getTime();
        this.registrationUserIdentifier = new UserIdentifier(registrationUserEmail);
    }

    // 참고) LoginDetailRegistrationService Class 에서 이용한다.
    public Login(final String type, final Integer error, final String address, final String registrationUserEmail) {

        this.type = type;
        this.error = error;
        this.address = address;
        this.registrationDate = Calendar.getInstance().getTime();
        this.registrationUserIdentifier = new UserIdentifier(registrationUserEmail);
    }
}