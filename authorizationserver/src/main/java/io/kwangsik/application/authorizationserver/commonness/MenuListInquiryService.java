package io.kwangsik.application.authorizationserver.commonness;

import io.kwangsik.domain.authorizationserver.menu.Menu;
import io.kwangsik.domain.authorizationserver.menu.MenuListInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 메뉴 목록 조회 Service
 * 참고) ModelMapAspect Class 에서 이용한다.
 */
@Service // Spring Service Class 인 경우 작성한다.
public class MenuListInquiryService {

    private final MenuListInquiryRepository repository;

    @Autowired
    private MenuListInquiryService(final MenuListInquiryRepository repository) {

        this.repository = repository;
    }

    public List<Menu> process(final String email) {

        return this.repository.process(email);
    }
}