package io.kwangsik.domain.authorizationserver.variable;

import java.util.Map;

/**
 * Model Map 조회 Repository Interface
 */
public interface ModelMapInquiryRepository {

    /**
     * 처리
     * 참고) View 에서 필요한 데이터를 조회한다.
     * @param address String
     * @return Map
     */
    Map<String, ?> process(String address);
}