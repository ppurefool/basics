package io.kwangsik.domain.authorizationserver.role;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * Role Identifier
 * 참고) Identifier Class 는 Database Table 사이의 Non-Identifying Relationship 을 JPA Entity Class 사이에서도 Mapping 할 수 있게 해준다.
 */
@Embeddable // Identifier Class 인 경우 작성한다.
@Getter // Embedded Class 사용하기 위하여 작성한다.
public class RoleIdentifier
        implements Serializable { // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.

    private static final long serialVersionUID = 2886725228334724419L; // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.

    @Column(name = "roleKey", length = 50, nullable = false)
    private String key; // Role Key


    @Override // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.
    public boolean equals(final Object cause) {

        return (this == cause || (null != cause && this.getClass() == cause.getClass() && this.key.equals(((RoleIdentifier) cause).key)));
    }

    @Override // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.
    public int hashCode() {

        return this.key.hashCode();
    }
}