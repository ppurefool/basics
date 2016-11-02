package io.kwangsik.commonness.authorizationserver.aspect;

import io.kwangsik.commonness.authorizationserver.excetpion.UnauthorizedException;
import io.kwangsik.commonness.authorizationserver.utility.BasicsUtility;
import io.kwangsik.infrastructure.authorizationserver.SimpleRequestVerificationRepository;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 요청 검증 Aspect
 */
@Aspect // Aspect Class 인 경우 작성한다.
@Component // Class 를 Spring Context 에 등록하는 경우 작성한다.
public class RequestVerificationAspect {

    private final SimpleRequestVerificationRepository repository;

    @Autowired
    private RequestVerificationAspect(final SimpleRequestVerificationRepository repository) {

        this.repository = repository;
    }

    @Pointcut("execution(* io.kwangsik..ui..*Controller.*(..)) && @target(org.springframework.stereotype.Controller) && @annotation(org.springframework.web.bind.annotation.RequestMapping)")
    private void setControllerAndRequestMappingPointCut() {}

    @Pointcut("execution(* io.kwangsik..ui..*RESTController.*(..)) && @annotation(org.springframework.web.bind.annotation.RequestMapping)")
    private void setRESTControllerAndRequestMappingPointCut() {}

    @Before(value = "setControllerAndRequestMappingPointCut()")
    private void verityMenu() {

        final BasicsUtility basicsUtility = BasicsUtility.getInstance();

        if (!this.repository.isVerifiedMenu(basicsUtility.getLoginUserEmail(), basicsUtility.getRequestAddress()))
            throw new UnauthorizedException("접근 권한이 존재하지 않습니다. 관리자에게 문의하십시오.");
    }

    @Before(value = "setRESTControllerAndRequestMappingPointCut()")
    private void verityREST() {

        final BasicsUtility basicsUtility = BasicsUtility.getInstance();

        if (!this.repository.isVerifiedREST(basicsUtility.getLoginUserEmail(), basicsUtility.getRequestAddress(),
                basicsUtility.getRequestMethod()))
            throw new UnauthorizedException("접근 권한이 존재하지 않습니다. 관리자에게 문의하십시오.");
    }
}