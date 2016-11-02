package io.kwangsik.application.authorizationserver.login;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.login.LoginListInquiryCondition;
import io.kwangsik.domain.authorizationserver.login.LoginDetail;
import io.kwangsik.domain.authorizationserver.login.LoginListInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 로그인 Service
 */
@Service // Spring Service Class 인 경우 작성한다.
public class LoginService {

    private final LoginListInquiryRepository listInquiryRepository;

    @Autowired
    private LoginService(final LoginListInquiryRepository listInquiryRepository) {

        this.listInquiryRepository = listInquiryRepository;
    }

    public PageResponse<LoginListInquiryCondition, LoginDetail> inquiryList(
            final LoginListInquiryCondition cause, final PageRequest pageRequest) {

        return this.listInquiryRepository.process(cause, pageRequest);
    }
}