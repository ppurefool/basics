package io.kwangsik.ui.authorizationserver.role;

import io.kwangsik.application.authorizationserver.role.RoleService;
import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.commonness.authorizationserver.excetpion.NoContentException;
import io.kwangsik.domain.authorizationserver.role.RoleDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.RollbackException;
import java.util.List;

/**
 * Role REST Controller
 */
@RestController // Sprint Web REST Controller Class 인 경우 작성한다.
public class RoleRESTController {

    private final RoleService service;

    @Autowired
    public RoleRESTController(final RoleService service) { // Constructor 추가시 public 으로 작성한다.

        this.service = service;
    }

    /**
     * 목록 조회
     * @param pageRequest PageRequest
     * @return PageResponse
     */
    @RequestMapping(value = "/system/roles", method = RequestMethod.GET)
    public PageResponse<?, RoleDetail> inquiryList(final PageRequest pageRequest) {

        final PageResponse<?, RoleDetail> result = this.service.inquiryList(pageRequest);
        if (result.hasNoOutput()) throw new NoContentException();

        return result;
    }

    /**
     * 목록 저장하기
     * @param cause List<RoleDetail>
     * @return List<String>
     */
    @RequestMapping(value = "/system/roles", method = {RequestMethod.POST, RequestMethod.PUT})
    public List<String> saveList(@RequestBody final List<RoleDetail> cause) {

        if (cause.isEmpty()) throw new NoContentException();
        return this.service.saveList(cause);
    }

    /**
     * 목록 삭제하기
     * @param cause List<String>
     */
    @RequestMapping(value = "/system/roles", method = RequestMethod.DELETE)
    public void deleteList(@RequestBody final List<String> cause) {

        if (cause.isEmpty()) throw new NoContentException();
        this.service.deleteList(cause);
    }
}