package io.kwangsik.application.authorizationserver.user;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.user.User;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryCondition;
import io.kwangsik.domain.authorizationserver.user.UserDetail;
import io.kwangsik.domain.authorizationserver.user.UserIdentifier;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryRepository;
import io.kwangsik.domain.authorizationserver.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 사용자 Service
 */
@Service // Spring Service Class 인 경우 작성한다.
public class UserService {

    private final UserListInquiryRepository listInquiryRepository;
    private final UserRepository repository;

    @Autowired
    public UserService(final UserListInquiryRepository listInquiryRepository, final UserRepository repository) {

        this.listInquiryRepository = listInquiryRepository;
        this.repository = repository;
    }

    public PageResponse<UserListInquiryCondition, UserDetail> inquiryList(
            final UserListInquiryCondition cause, final PageRequest pageRequest) {

        return this.listInquiryRepository.process(cause, pageRequest);
    }

    @Transactional
    public List<String> saveList(final List<UserDetail> cause) {

        List<String> result = new ArrayList<>();

        for (UserDetail detail : cause) {

            result.add(this.repository.save(new User(detail)).getUsername());
        }

        return result;
    }

    @Transactional
    public void deleteList(final List<String> cause) {

        cause.forEach(identifier -> this.repository.delete(new UserIdentifier(identifier)));
    }
}