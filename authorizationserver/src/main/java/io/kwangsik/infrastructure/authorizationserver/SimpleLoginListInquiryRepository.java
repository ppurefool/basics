package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.login.LoginDetail;
import io.kwangsik.domain.authorizationserver.login.LoginListInquiryCondition;
import io.kwangsik.domain.authorizationserver.login.LoginListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Simple 로그인 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleLoginListInquiryRepository implements LoginListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        new io.kwangsik.domain.authorizationserver.login.LoginDetail(
            a1.number,
            a1.type,
            a1.error,
            a1.address,
            a1.registrationDate,
            a1.registrationUserIdentifier.email)
from
        Login a1
where   (
        :startDate is null
or      a1.registrationDate >= :startDate
        )
and     (
        :endDate is null
or      a1.registrationDate <= :endDate
        )
and     (
        :email is null
or      a1.registrationUserIdentifier.email = :email
        )
order by
        a1.number DESC*/
    @Multiline
    private static String queryString = null;

    @Override
    public PageResponse<LoginListInquiryCondition, LoginDetail> process(
            final LoginListInquiryCondition cause, final PageRequest pageRequest) {

        return new PageResponse<>(cause, pageRequest, getTypedQuery(cause), getTypedQuery(cause));
    }

    private TypedQuery<LoginDetail> getTypedQuery(final LoginListInquiryCondition cause) {

        return this.entityManager.createQuery(queryString, LoginDetail.class)
                .setParameter("email", cause.getEmail())
                .setParameter("startDate", cause.getStartDate())
                .setParameter("endDate", cause.getEndDate());
    }
}