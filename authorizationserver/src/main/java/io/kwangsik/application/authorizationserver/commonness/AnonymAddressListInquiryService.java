package io.kwangsik.application.authorizationserver.commonness;

import io.kwangsik.domain.authorizationserver.menu.AnonymAddressListInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 익명 주소 목록 조회 Service
 * 참고) Spring Security Configuration Class 에서 이용한다.
 */
@Service // Spring Service Class 인 경우 작성한다.
public class AnonymAddressListInquiryService {

    private final AnonymAddressListInquiryRepository repository;

    @Autowired
    private AnonymAddressListInquiryService(final AnonymAddressListInquiryRepository repository) {

        this.repository = repository;
    }

    // 처리
    public String[] process() {

        return repository.process().stream().map(Object::toString).toArray(String[]::new);
    }
}