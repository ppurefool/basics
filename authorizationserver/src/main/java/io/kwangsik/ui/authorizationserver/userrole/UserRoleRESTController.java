package io.kwangsik.ui.authorizationserver.userrole;

import io.kwangsik.application.authorizationserver.userrole.UserRoleService;
import io.kwangsik.commonness.authorizationserver.excetpion.NoContentException;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 사용자 Role REST Controller
 */
@RestController // Sprint Web REST Controller Class 인 경우 작성한다.
public class UserRoleRESTController {

    private final UserRoleService service;

    @Autowired
    public UserRoleRESTController(final UserRoleService service) { // Constructor 추가시 public 으로 작성한다.

        this.service = service;
    }

    /**
     * 목록 저장하기
     * @param cause List<UserDetail>
     */
    @RequestMapping(value = "/authority/users", method = {RequestMethod.POST, RequestMethod.PUT})
    public void saveList(@RequestBody final List<UserRoleDetail> cause) {

        List<String> result;

        if (cause.isEmpty()) throw new NoContentException();
        this.service.saveList(cause);
    }
}