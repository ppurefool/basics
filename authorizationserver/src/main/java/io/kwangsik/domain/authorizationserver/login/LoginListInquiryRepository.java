package io.kwangsik.domain.authorizationserver.login;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;

/**
 * 로그인 목록 조회 Repository Interface
 */
public interface LoginListInquiryRepository {

    PageResponse<LoginListInquiryRequest, LoginListInquiryResponse> process(LoginListInquiryRequest cause, PageRequest pageRequest);
}