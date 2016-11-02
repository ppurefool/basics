package io.kwangsik.application.authorizationserver.commonness;

import io.kwangsik.domain.authorizationserver.user.UserIdentifier;
import io.kwangsik.domain.authorizationserver.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 사용자 상세 조회
 * 참고) Spring Security 에서 내부적으로 이용한다.
 */
@Service // Spring Service Class 인 경우 작성한다.
public class UserDetailInquiryService
        implements UserDetailsService { // Spring Security 를 이용하기 위하여 작성한다.

    private final UserRepository repository;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    private UserDetailInquiryService(final UserRepository repository) {

        this.repository = repository;
    }

    @Override // 해당 Method 를 재정의하는 겅우 작성한다.
    public UserDetails loadUserByUsername(String cause) throws UsernameNotFoundException {

        return repository.findOne(new UserIdentifier(cause)); // 사용자 상세를 찾아온다.
    }
}