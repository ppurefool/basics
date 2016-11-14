package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.role.RoleDetail;
import io.kwangsik.domain.authorizationserver.role.RoleListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Simple Role 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleRoleListInquiryRepository implements RoleListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        new io.kwangsik.domain.authorizationserver.role.RoleDetail(
            a1.identifier.key,
            a1.value)
from
        Role a1
order by
        a1.identifier.key ASC*/
    @Multiline
    private static String queryString = null;

    @Override
    public PageResponse<?, RoleDetail> process(final PageRequest pageRequest) {

        return new PageResponse<>(null, pageRequest, getTypedQuery(), getTypedQuery());
    }

    private TypedQuery<RoleDetail> getTypedQuery() {

        return this.entityManager.createQuery(queryString, RoleDetail.class);
    }
}