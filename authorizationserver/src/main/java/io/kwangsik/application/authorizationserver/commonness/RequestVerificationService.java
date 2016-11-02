package io.kwangsik.application.authorizationserver.commonness;

import io.kwangsik.domain.authorizationserver.role.RequestVerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 요청 검증 Service
 * 참고) RequestVerificationAspect Class 에서 이용한다.
 */
@Service // Spring Service Class 인 경우 작성한다.
public class RequestVerificationService {

    private final RequestVerificationRepository repository;

    @Autowired
    private RequestVerificationService(final RequestVerificationRepository repository) {

        this.repository = repository;
    }

    public boolean isVerifiedMenu(final String email, final String address) {

        return this.repository.isVerifiedMenu(email, address);
    }

    public boolean isVerifiedREST(final String email, final String address, final String method) {

        return this.repository.isVerifiedREST(email, address, method);
    }
}