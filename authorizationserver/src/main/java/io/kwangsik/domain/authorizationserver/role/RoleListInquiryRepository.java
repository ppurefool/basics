package io.kwangsik.domain.authorizationserver.role;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;

/**
 * Role 목록 조회 Repository Interface
 */
public interface RoleListInquiryRepository {

    PageResponse<?, RoleDetail> process(PageRequest pageRequest);
}