package io.kwangsik.domain.authorizationserver.login;

import org.springframework.data.repository.CrudRepository;

/**
 * 로그인 Repository Interface
 * 참고) 필요에 따르 CrudRepository, PagingAndSortingRepository 또는 JpaRepository 을 상속한다.
 */
public interface LoginRepository
        extends CrudRepository<Login, Integer> {} // Spring Data JPA 를 이용하기 위하여 작성하며, Entity Class 와 Identifier 를 지정한다.