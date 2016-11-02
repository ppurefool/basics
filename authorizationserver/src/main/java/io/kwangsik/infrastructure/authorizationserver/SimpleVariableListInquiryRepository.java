package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.variable.VariableDetail;
import io.kwangsik.domain.authorizationserver.variable.VariableListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Simple 변수 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleVariableListInquiryRepository implements VariableListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        new io.kwangsik.domain.authorizationserver.variable.VariableDetail(
            a1.key,
            a1.value,
            a1.detail)
from
        Variable a1
order by
        a1.key ASC*/
    @Multiline
    private static String queryString = null;

    @Override
    public PageResponse<?, VariableDetail> process(final PageRequest pageRequest) {

        return new PageResponse<>(null, pageRequest, getTypedQuery(), getTypedQuery());
    }

    private TypedQuery<VariableDetail> getTypedQuery() {

        return this.entityManager.createQuery(queryString, VariableDetail.class);
    }
}