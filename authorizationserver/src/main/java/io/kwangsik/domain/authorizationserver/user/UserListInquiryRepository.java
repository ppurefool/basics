package io.kwangsik.domain.authorizationserver.user;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;

/**
 * 사용자 목록 조회 Repository Interface
 */
public interface UserListInquiryRepository {

    PageResponse<UserListInquiryCondition, UserDetail> process(UserListInquiryCondition cause, PageRequest pageRequest);
}