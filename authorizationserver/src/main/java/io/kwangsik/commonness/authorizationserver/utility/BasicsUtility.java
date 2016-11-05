package io.kwangsik.commonness.authorizationserver.utility;

import io.kwangsik.domain.authorizationserver.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 기본 Utility
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

    public Date parseDateString(final String cause) {

        Date result = null;

        if (!StringUtils.isEmpty(cause)) {

            try {

                result = new SimpleDateFormat("yyyyMMdd").parse(cause);
            } catch (ParseException e) {

                e.printStackTrace();
            }
        }

        return result;
    }

    public String parseQueryParameter(final String cause) {

        return (!StringUtils.isEmpty(cause)? cause: null); // "" -> null
    }

    public String parseQueryParameter(final String cause, final String prefixAndSuffix) {

        return (!StringUtils.isEmpty(cause)? prefixAndSuffix + cause + prefixAndSuffix: null); // "" -> null
    }
}