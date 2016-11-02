package io.kwangsik.domain.authorizationserver.user;

import org.springframework.data.repository.CrudRepository;

/**
 * 사용자 Repository Interface
 * 참고) 필요에 따르 CrudRepository, PagingAndSortingRepository 또는 JpaRepository 을 상속한다.
 */
public interface UserRepository
        extends CrudRepository<User, UserIdentifier> {} // Spring Data JPA 를 이용하기 위하여 작성하며, Entity Class 와 Identifier 를 지정한다.