package io.kwangsik.commonness.authorizationserver.utility;

import io.kwangsik.domain.authorizationserver.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 기본 사용자 Utility
 */
public class BasicsUtility {

    private static BasicsUtility instance;

    public static BasicsUtility getInstance() {

        if (null == instance) instance = new BasicsUtility();

        return instance;
    }

    public String getLoginUserEmail() {

        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public String getRequestAddress() {

        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest().getRequestURI();
    }

    public String getRequestMethod() {

        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest().getMethod();
    }

    public boolean isAdministratorLoginUser() {

        return ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).hasAdministratorRole();
    }
}