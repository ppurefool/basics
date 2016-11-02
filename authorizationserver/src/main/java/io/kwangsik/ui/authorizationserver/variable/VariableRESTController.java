package io.kwangsik.ui.authorizationserver.variable;

import io.kwangsik.application.authorizationserver.variable.VariableService;
import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.commonness.authorizationserver.excetpion.NoContentException;
import io.kwangsik.domain.authorizationserver.variable.VariableDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 변수 REST Controller
 */
@RestController // Sprint Web REST Controller Class 인 경우 작성한다.
public class VariableRESTController {

    private final VariableService service;

    @Autowired
    public VariableRESTController(final VariableService service) { // Constructor 추가시 public 으로 작성한다.

        this.service = service;
    }

    /**
     * 목록 조회
     * @param pageRequest PageRequest
     *        page int
     *        size int
     * @return PageResponse
     *         input ?
     *         outputList List<VariableDetail>
     *         pageRequest PageRequest
     *         first boolean
     *         last boolean
     *         numberOfElements int
     *         totalElements int
     *         totalPage int
     *         page int
     *         size int
     */
    @RequestMapping(value = "/system/variables", method = RequestMethod.GET)
    public PageResponse<?, VariableDetail> inquiryList(final PageRequest pageRequest) {

        final PageResponse<?, VariableDetail> result = this.service.inquiryList(pageRequest);
        if (result.hasNoOutput()) throw new NoContentException();

        return result;
    }

    /**
     * 목록 저장
     * @param cause List<VariableDetail>
     * @return List<String>
     */
    @RequestMapping(value = "/system/variables", method = {RequestMethod.POST, RequestMethod.PUT})
    public List<String> saveList(@RequestBody final List<VariableDetail> cause) {

        if (cause.isEmpty()) throw new NoContentException();
        return this.service.saveList(cause);
    }

    /**
     * 목록 삭제
     * @param cause List<String>
     */
    @RequestMapping(value = "/system/variables", method = RequestMethod.DELETE)
    public void deleteList(@RequestBody final List<String> cause) {

        if (cause.isEmpty()) throw new NoContentException();
        this.service.deleteList(cause);
    }
}