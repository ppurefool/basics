package io.kwangsik.domain.authorizationserver.userrole;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;

/**
 * 사용자 Role 목록 조회 Repository Interface
 */
public interface UserRoleListInquiryRepository {

    PageResponse<?, UserRoleDetail> process(UserRoleListInquiryCondition cause, PageRequest pageRequest);
}