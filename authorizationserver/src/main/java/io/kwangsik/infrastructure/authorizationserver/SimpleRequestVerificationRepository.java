package io.kwangsik.infrastructure.authorizationserver;

import io.kwangsik.domain.authorizationserver.role.RequestVerificationRepository;
import org.adrianwalker.multilinestring.Multiline;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 * Simple 요청 검증 Repository
 */
@Repository // Spring Repository Class 인 경우 작성한다.
public class SimpleRequestVerificationRepository implements RequestVerificationRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // 참고) 쿼리를 주석안에 작성한다.
    /**
select
        1
from
        Menu a1
where
        a1.address = :address
and     (
        a1.anonym  = true
or      exists (
            select
                    1
            from
                    MenuRole b1,
                    UserRole c1
            where
                    b1.menuIdentifier.number = a1.identifier.number
            and
                    c1.userIdentifier.email  = :email
            and     c1.roleIdentifier.key    = b1.roleIdentifier.key
            )
        )*/
    @Multiline
    private static String queryStringMenu = null;

    /**
     */
//    @Multiline
//    private static String queryStringREST = null;

    @Override
    public boolean isVerifiedMenu(String email, String address) {

        Query query = this.entityManager.createQuery(queryStringMenu);
        query.setParameter("address", address);
        query.setParameter("email", email);

        return (0 < query.setMaxResults(1).getResultList().size());
    }

    @Override
    public boolean isVerifiedREST(String email, String address, String method) {

        return true;
    }
}
