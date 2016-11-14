package io.kwangsik.domain.authorizationserver.user;

import io.kwangsik.domain.authorizationserver.userrole.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.Collection;
import java.util.List;

/**
 * 사용자 Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
@NoArgsConstructor // Constructor 추가시 작성한다.
@DynamicUpdate
public class User
        implements UserDetails { // Spring Security 를 이용하기 위하여 작성한다.

    private static final long serialVersionUID = -7258228718781722280L; // Spring Security 를 이용하기 위하여 작성한다.

    @EmbeddedId
    private UserIdentifier identifier; // 사용자 Email

    @Column(name = "passwordHash", length = 128, nullable = false)
    private String password; //  비밀번호 Hash

    @OneToMany(fetch = FetchType.EAGER) // Spring Security 을 이용하기 위하여 작성한다.
    @JoinColumn(name = "userEmail")
    private List<UserRole> userRoles; // 사용자 Role목록

    @Column(length = 100, nullable = false)
    @Getter
    private String name; // 이름

    public User(final User cause, final String password) { // 참고) UserService Class 에서 이용한다.

        this.identifier = new UserIdentifier(cause.getUsername());
        this.password = password;
        this.userRoles = getUserRoles(cause);
        this.name = cause.getName();
    }

    public User(final UserDetail cause, final String password) { // 참고) UserService Class 에서 이용한다.

        this.identifier = new UserIdentifier(cause.getEmail());
        this.password = password;
        this.name = cause.getName();
    }

    public User(final UserDetail cause, final User user) { // 참고) UserService Class 에서 이용한다.

        this.identifier = new UserIdentifier(cause.getEmail());
        this.password = user.getPassword();
        this.userRoles = getUserRoles(user);
        this.name = cause.getName();
    }

    public boolean hasAdministratorRole() {

        return this.userRoles.stream().anyMatch(userRole -> {
            final String authorityKey = userRole.getAuthority();

            return ("SYSTEM_ADMINISTRATOR".equals(authorityKey) || "BUSINESS_ADMINISTRATOR".equals(authorityKey));
        });
    }

    @SuppressWarnings(value = "unchecked")
    private List<UserRole> getUserRoles(final User user) {

        return (List<UserRole>) user.getAuthorities();
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다. // 참고) UserService Class 에서 이용한다.
    public String getUsername() {

        return this.identifier.getEmail();
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public String getPassword() {

        return this.password;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public boolean isEnabled() {

        return true;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return this.userRoles;
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public boolean equals(final Object cause) {

        return (this == cause || (null != cause && this.getClass() == cause.getClass() && this.identifier.equals(((User) cause).identifier)));
    }

    @Override // Spring Security 를 이용하기 위하여 작성한다.
    public int hashCode() {

        return (null != this.identifier? this.identifier.hashCode() : 0);
    }
}