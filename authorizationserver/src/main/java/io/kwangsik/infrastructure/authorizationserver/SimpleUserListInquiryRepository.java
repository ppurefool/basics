package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryCondition;
import io.kwangsik.domain.authorizationserver.user.UserDetail;
import io.kwangsik.domain.authorizationserver.user.UserListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Simple 사용자 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleUserListInquiryRepository implements UserListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        new io.kwangsik.domain.authorizationserver.user.UserDetail(
                a1.identifier.email,
                a1.name,
                exists (
                    select  1
                    from    UserRole ba
                    where   ba.userIdentifier.email = a1.identifier.email
                    and     ba.roleIdentifier.key   = :roleKey
                )
        )
from
        User a1
where   (
                :email is null
        or      a1.identifier.email = :email
        )
and     (
                :name is null
        or      a1.name like :name
        )
order by
        a1.identifier.email ASC*/
    @Multiline
    private static String queryString = null;

    @Override
    public PageResponse<UserListInquiryCondition, UserDetail> process(
            final UserListInquiryCondition cause, final PageRequest pageRequest) {

        return new PageResponse<>(cause, pageRequest, getTypedQuery(cause), getTypedQuery(cause));
    }

    private TypedQuery<UserDetail> getTypedQuery(final UserListInquiryCondition cause) {

        return this.entityManager.createQuery(queryString, UserDetail.class)
                .setParameter("email", cause.getEmail())
                .setParameter("name", cause.getName())
                .setParameter("roleKey", cause.getRoleKey());
    }
}