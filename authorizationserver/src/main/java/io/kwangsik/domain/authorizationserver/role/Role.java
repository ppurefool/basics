package io.kwangsik.domain.authorizationserver.role;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

/**
 * Role Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
public class Role {

    @EmbeddedId
    private RoleIdentifier identifier; // Role Key

    @Column(name = "roleValue", length = 200, nullable = false)
    private String value; // Role 값
}