package io.kwangsik.application.authorizationserver.commonness;

import io.kwangsik.domain.authorizationserver.login.Login;
import io.kwangsik.domain.authorizationserver.login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 로그인 상세 등록 Service
 * 참고) SecurityLoginFailureHandler Class 에서 이용한다.
 *      SecurityLogoutSuccessHandler Class 에서 이용한다.
 *      SecurityLogoutSuccessHandler Class 에서 이용한다.
 */
@Service // Spring Service Class 인 경우 작성한다.
public class LoginDetailRegistrationService {

    private final LoginRepository repository;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    private LoginDetailRegistrationService(final LoginRepository repository) {

        this.repository = repository;
    }

    /**
     * 처리
     * @param typeCode 유형 코드 (필수) 참고) 부모 코드 Key: LOGIN_TYPE. 로그인 유형
     * @param address 주소 (필수)
     * @param registrationUserEmail 등록 사용자 Email (필수)
     */
    public void process(final String typeCode, final String address) {

        repository.save(new Login(typeCode, address)); // 로그인 상세를 저장한다.
    }

    /**
     * 처리
     * @param typeCode 유형 코드 (필수) 참고) 부모 코드 Key: LOGIN_TYPE. 로그인 유형
     * @param address 주소 (필수)
     * @param registrationUserEmail 등록 사용자 Email (필수)
     */
    public void process(final String typeCode, final String address, final String registrationUserEmail) {

        repository.save(new Login(typeCode, address, registrationUserEmail)); // 로그인 상세를 저장한다.
    }

    /**
     * 처리
     * @param typeCode 유형 코드 (필수) 참고) 부모 코드 Key: LOGIN_TYPE. 로그인 유형
     * @param error 오류 (필수)
     * @param address 주소 (필수)
     * @param registrationUserEmail 등록 사용자 Email (필수)
     */
    public void process(final String typeCode, final int error, final String address, final String registrationUserEmail) {

        repository.save(new Login(typeCode, error, address, registrationUserEmail)); // 로그인 상세를 저장한다.
    }
}