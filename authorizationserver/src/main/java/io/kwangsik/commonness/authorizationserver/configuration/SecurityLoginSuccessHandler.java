package io.kwangsik.commonness.authorizationserver.configuration;

import com.sun.javafx.binding.StringFormatter;
import io.kwangsik.application.authorizationserver.commonness.LoginDetailRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Security 로그인 Success Handler
 * 참고) SecurityConfiguration Class 에서 이용한다.
 */
@Component // Class 를 Spring Context 에 등록하는 경우 작성한다.
class SecurityLoginSuccessHandler
        implements AuthenticationSuccessHandler { // Spring Security 를 이용하기 위하여 작성한다.

    private final LoginDetailRegistrationService service;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    private SecurityLoginSuccessHandler(final LoginDetailRegistrationService service) {

        this.service = service;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
        final SavedRequest savedRequest;
        final String redirectUrl;
        final int resultNumber = 1;
        String address;

        if (httpServletRequest.getHeader("accept").contains("json")) {

            savedRequest = new HttpSessionRequestCache().getRequest(httpServletRequest, httpServletResponse);
            redirectUrl = (null != savedRequest? savedRequest.getRedirectUrl(): "/");

            address = httpServletRequest.getHeader("X-FORWARDED-FOR");
            if (null == address) address = httpServletRequest.getRemoteAddr();

            this.service.process("USER_LOGIN_SUCCESS", resultNumber, address, authentication.getName()); // 사용자 로그인 성공

            PrintWriter printWriter = httpServletResponse.getWriter();
            printWriter.print(StringFormatter.format(
                    "{\"input\": null, \"inputList\": null, \"output\": {\"resultNumber\": %d, \"redirectUrl\": \"%s\"}, \"outputList\": null}",
                    resultNumber, redirectUrl).get());
            printWriter.flush();
            printWriter.close();
        }
    }
}