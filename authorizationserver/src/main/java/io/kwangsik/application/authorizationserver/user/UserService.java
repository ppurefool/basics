package io.kwangsik.application.authorizationserver.user;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.user.User;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryCondition;
import io.kwangsik.domain.authorizationserver.user.UserDetail;
import io.kwangsik.domain.authorizationserver.user.UserIdentifier;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryRepository;
import io.kwangsik.domain.authorizationserver.user.UserRepository;
import io.kwangsik.domain.authorizationserver.variable.Variable;
import io.kwangsik.domain.authorizationserver.variable.VariableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 사용자 Service
 */
@Service // Spring Service Class 인 경우 작성한다.
public class UserService {

    private final UserListInquiryRepository listInquiryRepository;
    private final UserRepository repository;
    private final String passwordDefaultValue;

    @Autowired
    public UserService(final UserListInquiryRepository listInquiryRepository, final UserRepository repository,
                       final VariableRepository variableRepository) {

        this.listInquiryRepository = listInquiryRepository;
        this.repository = repository;
        this.passwordDefaultValue = Optional.ofNullable(variableRepository.findOne("PASSWORD_DEFAULT_VALUE"))
                .map(Variable::getValue).orElse("a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6");
    }

    public PageResponse<UserListInquiryCondition, UserDetail> inquiryList(
            final UserListInquiryCondition cause, final PageRequest pageRequest) {

        return this.listInquiryRepository.process(cause, pageRequest);
    }

    @Transactional
    public List<String> initializeListPassword(final List<String> cause) {

        List<String> result = new ArrayList<>();
        User user;

        for (String email : cause) {

            user = this.repository.findOne(new UserIdentifier(email));
            if (null != user) result.add(this.repository.save(new User(user, this.passwordDefaultValue)).getUsername());
        }

        return result;
    }

    @Transactional
    public List<String> saveList(final List<UserDetail> cause) {

        List<String> result = new ArrayList<>();
        User user;

        for (UserDetail detail : cause) {

            user = this.repository.findOne(new UserIdentifier(detail.getEmail()));
            result.add(this.repository.save(null != user?
                    new User(detail, user): new User(detail, this.passwordDefaultValue)).getUsername());
        }

        return result;
    }

    public void deleteList(final List<String> cause) {

        cause.forEach(identifier -> {try {this.repository.delete(new UserIdentifier(identifier));} catch
                (EmptyResultDataAccessException e) {e.printStackTrace();}});
    }
}