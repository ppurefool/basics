package io.kwangsik.commonness.authorizationserver.aspect;

import io.kwangsik.application.authorizationserver.commonness.MenuListInquiryService;
import io.kwangsik.application.authorizationserver.commonness.ModelMapInquiryService;
import io.kwangsik.commonness.authorizationserver.utility.BasicsUtility;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

/**
 * Model Map Aspect
 */
@Aspect // Aspect Class 인 경우 작성한다.
@Component // Class 를 Spring Context 에 등록하는 경우 작성한다.
public class ModelMapAspect {

    private final ModelMapInquiryService modelMapInquiryService;
    private final MenuListInquiryService menuListInquiryService;

    @Autowired
    private ModelMapAspect(final ModelMapInquiryService modelMapInquiryService,
                           final MenuListInquiryService menuListInquiryService) {

        this.modelMapInquiryService = modelMapInquiryService;
        this.menuListInquiryService = menuListInquiryService;
    }

    @Pointcut("execution(* io.kwangsik..ui..*Controller.*(..)) && @annotation(org.springframework.web.bind.annotation.RequestMapping)")
    private void setControllerAndRequestMappingPointCut() {}

    /**
     * Objects 추가하기
     * @param result ModelAndView
     * @return ModelAndView
     *         model.get("VARIABLE.APPLICATION_TITLE") Application 제목 String
     *         model.get("VARIABLE.APPLICATION_LOGO_TEXT") Application Log Text String
     *         model.get("MENU.DISPLAY_NAME") Menu 표시 이름 String
     *         model.get("MENUS") 메뉴목록 List<Menu>
     */
    @AfterReturning(pointcut="setControllerAndRequestMappingPointCut()", returning="result")
    private ModelAndView addObjects(final ModelAndView result) {

        final String address = BasicsUtility.getInstance().getRequestAddress();

        // 변수 목록을 추가한다.
        result.addAllObjects(this.modelMapInquiryService.process(address));

        if (!"/log-in-view".equals(address)) { // 로그인

            // 메뉴 목록을 추가한다.
            result.addObject("MENUS", this.menuListInquiryService.process(BasicsUtility.getInstance().getLoginUserEmail()));
        }

        return result;
    }
}