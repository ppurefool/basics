package io.kwangsik.ui.authorizationserver.user;

import io.kwangsik.application.authorizationserver.user.UserService;
import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.commonness.authorizationserver.excetpion.NoContentException;
import io.kwangsik.domain.authorizationserver.user.UserDetail;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryCondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 사용자 REST Controller
 */
@RestController // Sprint Web REST Controller Class 인 경우 작성한다.
public class UserRESTController {

    private final UserService service;

    @Autowired
    public UserRESTController(final UserService service) { // Constructor 추가시 public 으로 작성한다.

        this.service = service;
    }

    /**
     * 목록 조회
     * @param cause UserListInquiryCondition
     * @param pageRequest PageRequest
     * @return PageResponse
     */
    @RequestMapping(value = "/membership/users", method = RequestMethod.GET)
    public PageResponse<UserListInquiryCondition, UserDetail> inquiryList(
            final UserListInquiryCondition cause, final PageRequest pageRequest) {

        final PageResponse<UserListInquiryCondition, UserDetail> result = this.service.inquiryList(cause, pageRequest);
        if (result.hasNoOutput()) throw new NoContentException();

        return result;
    }

    /**
     * 목록 비밀번호 초기화하기
     * @param cause List<String>
     * @return List<String>
     */
    @RequestMapping(value = "/membership/users/password-initialization", method = RequestMethod.PUT)
    public List<String> initializeListPassword(@RequestBody final List<String> cause) {

        List<String> result;

        if (cause.isEmpty()) throw new NoContentException();
        result = this.service.initializeListPassword(cause);
        if (result.isEmpty()) throw new NoContentException();

        return result;
    }

    /**
     * 목록 저장하기
     * @param cause List<UserDetail>
     * @return List<String>
     */
    @RequestMapping(value = "/membership/users", method = {RequestMethod.POST, RequestMethod.PUT})
    public List<String> saveList(@RequestBody final List<UserDetail> cause) {

        List<String> result;

        if (cause.isEmpty()) throw new NoContentException();
        return this.service.saveList(cause);
    }

    /**
     * 목록 삭제하기
     * @param cause List<String>
     */
    @RequestMapping(value = "/membership/users", method = RequestMethod.DELETE)
    public void deleteList(@RequestBody final List<String> cause) {

        if (cause.isEmpty()) throw new NoContentException();
        this.service.deleteList(cause);
    }
}