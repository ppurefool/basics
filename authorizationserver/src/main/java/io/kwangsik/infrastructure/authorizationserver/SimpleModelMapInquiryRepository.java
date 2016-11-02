package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.domain.authorizationserver.variable.ModelMapInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Simple Model Map 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleModelMapInquiryRepository implements ModelMapInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        'VARIABLE.' || a1.variableKey as key,
        a1.variableValue              as value
from
        Variable a1
union all
select
        'MENU.DISPLAY_NAME' as key,
        a1.displayName      as value
from
        Menu a1
where
        a1.addressValue = :addressValue*/
    @Multiline
    private static String nativeQueryString = null;

    @SuppressWarnings("unchecked")
    @Override
    public Map<String, ?> process(final String address) {

        Query query = this.entityManager.createNativeQuery(nativeQueryString);
        query.setParameter("addressValue", address);

        return ((List<Object[]>) query.getResultList()).stream().collect(Collectors.toMap(objectArray -> (String) objectArray[0], objectArray -> objectArray[1]));
    }
}