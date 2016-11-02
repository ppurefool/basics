package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.domain.authorizationserver.menu.Menu;
import io.kwangsik.domain.authorizationserver.menu.MenuListInquiryRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Simple 메뉴 목록 조회 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleMenuListInquiryRepository implements MenuListInquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select  distinct
        a1
from
        Menu     a1,
        MenuRole b1,
        UserRole c1
where
        b1.menuIdentifier.number = a1.identifier.number
and
        c1.userIdentifier.email = :email
and     c1.roleIdentifier.key   = b1.roleIdentifier.key
and
        a1.display = true
order by
        a1.displayOrder      ASC,
        a1.identifier.number ASC*/
    @Multiline
    private static String queryString = null;

    @Override
    public List<Menu> process(final String email) {

        TypedQuery<Menu> typedQuery = this.entityManager.createQuery(queryString, Menu.class);
        typedQuery.setParameter("email", email);

        return typedQuery.getResultList();
    }
}