package io.kwangsik.domain.authorizationserver.variable;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;

/**
 * 로그인 목록 조회 Repository Interface
 */
public interface VariableListInquiryRepository {

    PageResponse<?, VariableDetail> process(PageRequest pageRequest);
}