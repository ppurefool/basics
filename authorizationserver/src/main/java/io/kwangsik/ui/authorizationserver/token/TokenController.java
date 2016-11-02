package io.kwangsik.ui.authorizationserver.token;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Token Controller
 */
@Controller // Spring Web Controller Class 인 경우 작성한다.
public class TokenController {

    /**
     * Token ModelAndView 가져오기
     * 참고) spring.thymeleaf.prefix Property 기본값은 classpath:/templates/ 이다.
     *      spring.thymeleaf.suffix Property 기본값은 .html 이다.
     *      ModelMapAspect Class 에서 return 되는 ModelAndView Class Instance 에 ModelMap 을 추가해준다.
     * @return ModelAndView
     */
    @RequestMapping(value = "/membership/tokens-view")
    public ModelAndView getTokenModelAndView() {

        return new ModelAndView("thymeleaf/authorizationserver/token");
    }
}