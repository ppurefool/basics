package io.kwangsik.ui.authorizationserver.index;

import io.kwangsik.application.authorizationserver.login.LoginService;
import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.commonness.authorizationserver.excetpion.NoContentException;
import io.kwangsik.commonness.authorizationserver.utility.BasicsUtility;
import io.kwangsik.domain.authorizationserver.login.LoginListInquiryCondition;
import io.kwangsik.domain.authorizationserver.login.LoginDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Index REST Controller
 */
@RestController // Sprint Web REST Controller Class 인 경우 작성한다.
public class IndexRESTController {

    private final LoginService service;

    @Autowired
    public IndexRESTController(final LoginService service) { // Constructor 추가시 public 으로 작성한다.

        this.service = service;
    }

    /**
     * 목록 조회
     * @param cause LoginListInquiryCondition
     * @param pageRequest PageRequest
     * @return PageResponse
     */
    @RequestMapping(value = "/membership/login", method = RequestMethod.GET)
    public PageResponse<LoginListInquiryCondition, LoginDetail> inquiryList(
            final LoginListInquiryCondition cause, final PageRequest pageRequest) {

        final BasicsUtility basicsUtility = BasicsUtility.getInstance();
        final PageResponse<LoginListInquiryCondition, LoginDetail> result;
        if (!basicsUtility.isAdministratorLoginUser()) cause.setEmail(basicsUtility.getLoginUserEmail());
        result = this.service.inquiryList(cause, pageRequest);
        if (result.hasNoOutput()) throw new NoContentException();

        return result;
    }
}