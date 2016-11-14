package io.kwangsik.domain.authorizationserver.role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

/**
 * Role Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
@NoArgsConstructor // Constructor 추가시 작성한다.
@DynamicUpdate
public class Role {

    @EmbeddedId
    @Getter // RoleService Class 에서 이용한다.
    private RoleIdentifier identifier; // Role Key

    @Column(name = "roleValue", length = 200, nullable = false)
    private String value; // Role 값

    // 참고) RoleService Class 에서 이용한다.
    public Role(final RoleDetail cause) {

        this.identifier = new RoleIdentifier(cause.getKey());
        this.value = cause.getValue();
    }
}