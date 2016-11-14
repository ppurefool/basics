package io.kwangsik.domain.authorizationserver.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * 사용자 Identifier
 * 참고) Identifier Class 는 Database Table 사이의 Non-Identifying Relationship 을 JPA Entity Class 사이에서도 Mapping 할 수 있게 해준다.
 */
@Embeddable // Identifier Class 인 경우 작성한다.
@NoArgsConstructor // Identifier Class 인 경우 작성한다.
@Getter // Entity Class 에서 사용하기 위하여 작성한다.
@AllArgsConstructor // Setter 를 대신하기 위하여 작성한다.
public class UserIdentifier
        implements Serializable { // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.

    private static final long serialVersionUID = 951545728677628107L; // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.

    @Column(name = "userEmail", length = 320)
    private String email; // 사용자 Email

    @Override // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.
    public boolean equals(final Object cause) {

        return (this == cause || (null != cause && this.getClass() == cause.getClass()) &&
                (null != this.email? this.email.equals(((UserIdentifier) cause).email): null == ((UserIdentifier) cause).email));
    }

    @Override // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.
    public int hashCode() {

        return (null != this.email? this.email.hashCode(): 0);
    }
}