package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleDetail;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleListInquiryCondition;
import io.kwangsik.domain.authorizationserver.userrole.UserRoleListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Simple 사용자 Role 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleUserRoleListInquiryRepository implements UserRoleListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        new io.kwangsik.domain.authorizationserver.userrole.UserRoleDetail(
            exists(select b1 from UserRole b1 where b1.userIdentifier.email = :email and b1.roleIdentifier.roleKey = a1.identifier.key),
            a1.identifier.key,
            a1.value)
from
        Role a1
order by
        a1.identifier.key ASC*/
    @Multiline
    private static String queryString = null;

    @Override
    public PageResponse<UserRoleListInquiryCondition, UserRoleDetail> process(
            final UserRoleListInquiryCondition cause, final PageRequest pageRequest) {

        return new PageResponse<>(cause, pageRequest, getTypedQuery(cause), getTypedQuery(cause));
    }

    private TypedQuery<UserRoleDetail> getTypedQuery(final UserRoleListInquiryCondition cause) {

        return this.entityManager.createQuery(queryString, UserRoleDetail.class)
                .setParameter("email", cause.getEmail());
    }
}