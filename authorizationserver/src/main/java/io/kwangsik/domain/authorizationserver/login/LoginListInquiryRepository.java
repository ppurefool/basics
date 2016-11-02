package io.kwangsik.domain.authorizationserver.login;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;

/**
 * 로그인 목록 조회 Repository Interface
 */
public interface LoginListInquiryRepository {

    PageResponse<LoginListInquiryCondition, LoginDetail> process(LoginListInquiryCondition cause, PageRequest pageRequest);
}