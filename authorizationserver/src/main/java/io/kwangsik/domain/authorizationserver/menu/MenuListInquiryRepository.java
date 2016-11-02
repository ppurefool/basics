package io.kwangsik.domain.authorizationserver.menu;

import java.util.List;

/**
 * 메뉴 목록 조회 Repository Interface
 */
public interface MenuListInquiryRepository {

    /**
     * 처리
     * @param email String
     * @return List<Menu>
     */
    List<Menu> process(String email);
}