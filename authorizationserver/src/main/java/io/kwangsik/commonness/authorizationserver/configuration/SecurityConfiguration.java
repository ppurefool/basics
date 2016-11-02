package io.kwangsik.commonness.authorizationserver.configuration;

import io.kwangsik.application.authorizationserver.commonness.AnonymAddressListInquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Spring Security Configuration
 */
@Configuration // Java Spring Configuration Class 인 경우 작성한다.
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AnonymAddressListInquiryService service;
    private final SecurityLoginSuccessHandler loginSuccessHandler;
    private final SecurityLoginFailureHandler loginFailureHandler;
    private final SecurityLogoutSuccessHandler logoutSuccessHandler;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    public SecurityConfiguration(final AnonymAddressListInquiryService service,
                                 final SecurityLoginSuccessHandler loginSuccessHandler,
                                 final SecurityLoginFailureHandler loginFailureHandler,
                                 final SecurityLogoutSuccessHandler logoutSuccessHandler) {

        this.service = service;
        this.loginSuccessHandler = loginSuccessHandler;
        this.loginFailureHandler = loginFailureHandler;
        this.logoutSuccessHandler = logoutSuccessHandler;
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {

        webSecurity.ignoring().antMatchers("/vendor/**");
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf() // Cross Site Request Forgery 방어 기능을 설정한다.
                        .ignoringAntMatchers("/h2-console/**").and() // /h2-console 화면을 이용하기 위하여 작성한다.
                .headers()
                        .cacheControl().disable()
                        .frameOptions().disable().and() // HTTP Header 의 iFrame 등의 사용제한 기능을 비활성한다. // /h2-console 화면을 이용하기 위하여 작성한다.
                .authorizeRequests()
                        .antMatchers(this.service.process()).permitAll() // 해당 요청을 인증없이 사용하도록 설정한다.
                        .anyRequest().authenticated().and() // 그 외 화면 요청은 모두 로그인하도록 한다.
                .formLogin() // 로그인 화면을 이용하도록 설정한다.
                        .loginPage("/log-in-view") // 화면 경로를 설정한다.
                        .loginProcessingUrl("/log-in") // 로그인을 요청하는 URL 을 설정한다.
                        .usernameParameter("user-email") // 로그인 요청시 사용자이름에 대한 매개변수명을 설정한다.
                        .passwordParameter("password-hash") // 로그인 요청시 비밀번호에 대한 매개변수명을 설정한다.
                        .successHandler(this.loginSuccessHandler) // 로그인 요청 성공시 이용하는 Bean 을 설정한다.
                        .failureHandler(this.loginFailureHandler).and() // 로그인 요청 실패시 이용하는 Bean 을 설정한다.
                .logout() // 로그아웃을 설정한다.
                        .logoutUrl("/log-out") // 로그아웃을 요청하는 URL 을 설정한다.
                        .logoutSuccessHandler(this.logoutSuccessHandler) // 로그아웃 요청 성공시 이용하는 Bean 을 설정한다.
                        .deleteCookies("JSESSIONID");
    }
}