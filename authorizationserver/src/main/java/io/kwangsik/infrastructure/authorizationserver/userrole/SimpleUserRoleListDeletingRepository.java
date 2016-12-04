package io.kwangsik.infrastructure.authorizationserver.userrole;

import io.kwangsik.domain.authorizationserver.userrole.UserRoleDetail;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleListDeletingRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple 사용자 Role 목록 삭제 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleUserRoleListDeletingRepository implements UserRoleListDeletingRepository {

    @PersistenceContext
    private EntityManager entityManager;

// 참고) 쿼리를 주석안에 작성한다.
/**
delete
        UserRole
where
        userIdentifier.email not in (:emails)
and     roleIdentifier.key       in (:roleKeys)*/
    @Multiline
    private static String queryString = null;

    @Override
    public void process(final List<UserRoleDetail> cause) {

        final String emails = cause.stream().map(UserRoleDetail::getEmail).collect(Collectors.joining("', '"));
        final String roleKeys = cause.stream().map(UserRoleDetail::getEmail).distinct().collect(Collectors.joining("', '"));

        this.entityManager.createQuery(queryString)
                .setParameter("emails", emails)
                .setParameter("roleKeys", roleKeys)
                .executeUpdate();
    }
}
