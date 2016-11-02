package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.domain.authorizationserver.menu.AnonymAddressListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Simple 익명 주소 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleAnonymAddressListInquiryRepository implements AnonymAddressListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        a1.address
from
        Menu       a1
where
        a1.address is not null
and     a1.anonym   = true*/
    @Multiline
    private static String queryString = null;

    @SuppressWarnings(value = "unchecked")
    @Override
    public List<String> process() {

        return (List<String>) this.entityManager.createQuery(queryString).getResultList();
    }
}