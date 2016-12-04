package io.kwangsik.application.authorizationserver.userrole;

import io.kwangsik.domain.authorizationserver.userrole.UserRole;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleDetail;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleListDeletingRepository;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 사용자 Role Service
 */
@Service // Spring Service Class 인 경우 작성한다.
public class UserRoleService {

    private UserRoleRepository repository;
    private UserRoleListDeletingRepository listDeletingRepository;

    @Autowired
    public UserRoleService(final UserRoleRepository repository,
                            final UserRoleListDeletingRepository listDeletingRepository) {

        this.repository = repository;
        this.listDeletingRepository = listDeletingRepository;
    }

    @Transactional
    public void saveList(final List<UserRoleDetail> cause) {

        this.listDeletingRepository.process(cause);

        for (UserRoleDetail detail : cause) {

            this.repository.save(new UserRole(detail));
        }
    }
}