package io.kwangsik.application.authorizationserver.commonness;

import io.kwangsik.infrastructure.authorizationserver.SimpleModelMapInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Model Map 조회 Service
 * 참고) ModelMapAspect Class 에서 이용한다.
 */
@Service // Spring Service Class 인 경우 작성한다.
public class ModelMapInquiryService {

    private final SimpleModelMapInquiryRepository repository;

    @Autowired // 해당 Class 의 Spring Bean 객체가 필요한 경우 작성한다.
    private ModelMapInquiryService(final SimpleModelMapInquiryRepository repository) {

        this.repository = repository;
    }

    public Map<String, ?> process(final String address) {

        return repository.process(address);
    }
}