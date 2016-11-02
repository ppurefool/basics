package io.kwangsik.domain.authorizationserver.variable;

import org.springframework.data.repository.CrudRepository;

/**
 * 변수 Repository Interface
 */
public interface VariableRepository
        extends CrudRepository<Variable, String> {} // Spring Data JPA 를 이용하기 위하여 작성하며, Entity Class 와 Identifier 를 지정한다.
