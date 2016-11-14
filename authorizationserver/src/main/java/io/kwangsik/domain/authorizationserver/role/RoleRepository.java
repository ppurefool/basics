package io.kwangsik.domain.authorizationserver.role;

import org.springframework.data.repository.CrudRepository;

/**
 * Role Repository Interface
 * 참고) 필요에 따르 CrudRepository, PagingAndSortingRepository 또는 JpaRepository 을 상속한다.
 */
public interface RoleRepository
        extends CrudRepository<Role, RoleIdentifier> {} // Spring Data JPA 를 이용하기 위하여 작성하며, Entity Class 와 Identifier 를 지정한다.
