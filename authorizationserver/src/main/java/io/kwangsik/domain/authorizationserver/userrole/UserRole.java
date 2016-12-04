package io.kwangsik.domain.authorizationserver.userrole;

import io.kwangsik.domain.authorizationserver.role.RoleIdentifier;
import io.kwangsik.domain.authorizationserver.user.UserIdentifier;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 사용자 권한 Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
@NoArgsConstructor // Constructor 추가시 작성한다.
public class UserRole
        implements GrantedAuthority { // Spring Security 를 이용하기 위하여 작성한다.

    @Id
    @GeneratedValue
    private int number; // 번호

    @Embedded
    @AttributeOverride(name = "email", column = @Column(name = "userEmail", length = 320, nullable = false))
    private UserIdentifier userIdentifier; // 사용자 Email

    @Embedded
    private RoleIdentifier roleIdentifier; // Role Key

    @Override  // Spring Security 를 이용하기 위하여 작성한다.
    public String getAuthority() {

        return this.roleIdentifier.getKey();
    }

    public UserRole(final UserRoleDetail detail) { // 참고) UserRoleService Class 에서 이용한다.

        this.userIdentifier = new UserIdentifier(detail.getEmail());
        this.roleIdentifier = new RoleIdentifier(detail.getRoleKey());
    }
}