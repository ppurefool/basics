package io.kwangsik.domain.authorizationserver.menu;

import java.util.List;

/**
 * 익명 주소 목록 조회 Repository Interface
 */
public interface AnonymAddressListInquiryRepository {

    /**
     * 처리
     * @return List<String>
     */
    List<String> process();
}