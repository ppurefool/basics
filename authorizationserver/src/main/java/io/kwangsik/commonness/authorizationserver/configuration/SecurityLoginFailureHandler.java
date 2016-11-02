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
        final int resultNumber;
        String address;

        if (httpServletRequest.getHeader("accept").contains("json")) {

            eToString = e.toString();

            if (eToString.startsWith("org.springframework.security.authentication.InternalAuthenticationServiceException:")) {

                resultNumber = -1;
            } else if (eToString.startsWith("org.springframework.security.authentication.BadCredentialsException:")) {

                resultNumber = -2;
            } else if (eToString.startsWith("org.springframework.security.authentication.DisabledException:")) {

                resultNumber = -3;
            } else if (eToString.startsWith("org.springframework.security.authentication.CredentialsExpiredException:")) {

                resultNumber = -4;
            } else if (eToString.startsWith("org.springframework.security.authentication.LockedException:")) {

                resultNumber = -5;
            } else if (eToString.startsWith("org.springframework.security.authentication.AccountExpiredException:")) {

                resultNumber = -6;
            } else if (eToString.startsWith("org.springframework.security.web.authentication.session.SessionAuthenticationException:")) {

                resultNumber = -7;
            } else {
                System.out.println("===== eToString=" + eToString);
                resultNumber = -9;
            }

            address = httpServletRequest.getHeader("X-FORWARDED-FOR");
            if (null == address) address = httpServletRequest.getRemoteAddr();

            this.service.process("USER_LOGIN_FAILURE", resultNumber, address, httpServletRequest.getParameter("user-email")); // 사용자 로그인 실패

            PrintWriter printWriter = httpServletResponse.getWriter();
            e.getMessage();
            printWriter.print(StringFormatter.format(
                    "{\"input\": null, \"inputList\": null, \"output\": {\"resultNumber\": %d, \"redirectUrl\": null}, \"outputList\": null}", resultNumber).get());
            printWriter.flush();
            printWriter.close();
        }
    }
}