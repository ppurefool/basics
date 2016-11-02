package io.kwangsik.commonness.authorizationserver.configuration;

import io.kwangsik.application.authorizationserver.commonness.LoginDetailRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Security Logout Success Handler
 * 참고) SecurityConfiguration Class 에서 이용한다.
 */
@Component // Class 를 Spring Context 에 등록하는 경우 작성한다.
class SecurityLogoutSuccessHandler
        implements LogoutSuccessHandler { // Spring Security 를 이용하기 위하여 작성한다.

    private final LoginDetailRegistrationService service;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    private SecurityLogoutSuccessHandler(final LoginDetailRegistrationService service) {

        this.service = service;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                Authentication authentication) throws IOException, ServletException {

        String address = httpServletRequest.getHeader("X-FORWARDED-FOR");
        if (null == address) address = httpServletRequest.getRemoteAddr();

        if (null != authentication) this.service.process("USER_LOGOUT_SUCCESS", 1, address, authentication.getName()); // 사용자 로그아웃 성공
        else this.service.process("USER_LOGOUT_SUCCESS", 1, address, ""); // 이미 로그아웃된 경우..

        httpServletResponse.sendRedirect("/log-in-view");
    }
}