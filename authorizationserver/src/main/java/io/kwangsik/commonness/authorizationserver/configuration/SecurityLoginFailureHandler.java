package io.kwangsik.commonness.authorizationserver.configuration;

import com.sun.javafx.binding.StringFormatter;
import io.kwangsik.application.authorizationserver.commonness.LoginDetailRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

/**
 * Security 로그인 Failure Handler
 * 참고) SecurityConfiguration Class 에서 이용한다.
 */
@Component // Class 를 Spring Context 에 등록하는 경우 작성한다.
class SecurityLoginFailureHandler
        implements AuthenticationFailureHandler { // Spring Security 를 이용하기 위하여 작성한다.

    private final LoginDetailRegistrationService service;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    private SecurityLoginFailureHandler(final LoginDetailRegistrationService service) {

        this.service = service;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        AuthenticationException e) throws IOException, ServletException {

        final String eToString;
        final int error;

        if (httpServletRequest.getHeader("accept").contains("json")) {

            eToString = e.toString();

            if (eToString.startsWith("org.springframework.security.authentication.InternalAuthenticationServiceException:")) {

                error = -1;
            } else if (eToString.startsWith("org.springframework.security.authentication.BadCredentialsException:")) {

                error = -2;
            } else if (eToString.startsWith("org.springframework.security.authentication.DisabledException:")) {

                error = -3;
            } else if (eToString.startsWith("org.springframework.security.authentication.CredentialsExpiredException:")) {

                error = -4;
            } else if (eToString.startsWith("org.springframework.security.authentication.LockedException:")) {

                error = -5;
            } else if (eToString.startsWith("org.springframework.security.authentication.AccountExpiredException:")) {

                error = -6;
            } else if (eToString.startsWith("org.springframework.security.web.authentication.session.SessionAuthenticationException:")) {

                error = -7;
            } else {
                System.out.println("===== eToString=" + eToString);
                error = -9;
            }

            // 사용자 로그인 실패
            this.service.process(
                    "USER_LOGIN_FAILURE",
                    error,
                    Optional.ofNullable(httpServletRequest.getHeader("X-FORWARDED-FOR")).orElse(httpServletRequest.getRemoteAddr()),
                    httpServletRequest.getParameter("user-email"));

            PrintWriter printWriter = httpServletResponse.getWriter();
            e.getMessage();
            printWriter.print(StringFormatter.format("{\"error\": %d, \"redirectURL\": null}", error).get());
            printWriter.flush();
            printWriter.close();
        }
    }
}