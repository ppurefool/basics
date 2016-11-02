package io.kwangsik.ui.authorizationserver.variable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 변수 Controller
 */
@Controller // Spring Web Controller Class 인 경우 작성한다.
public class VariableController {

    /**
     * 변수 ModelAndView 가져오기
     * 참고) spring.thymeleaf.prefix Property 기본값은 classpath:/templates/ 이다.
     *      spring.thymeleaf.suffix Property 기본값은 .html 이다.
     *      ModelMapAspect Class 에서 return 되는 ModelAndView Class Instance 에 ModelMap 을 추가해준다.
     * @return ModelAndView
     */
    @RequestMapping(value = "/system/variables-view")
    public ModelAndView getVariableModelAndView() {

        return new ModelAndView("thymeleaf/authorizationserver/variable");
    }
}