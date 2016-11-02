package io.kwangsik.domain.authorizationserver.menu;

import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * 메뉴 Identifier
 * 참고) Identifier Class 는 Database Table 사이의 Non-Identifying Relationship 을 JPA Entity Class 사이에서도 Mapping 할 수 있게 해준다.
 */
@Embeddable // Identifier Class 인 경우 작성한다.
@ToString // LOG 를 출력하기 위하여 작성한다.
public class MenuIdentifier
        implements Serializable { // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.

    private static final long serialVersionUID = 7093778468305872033L; // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.

    @Column(name = "menuNumber", nullable = false)
    private int number; // 요청 번호

    @Override // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.
    public boolean equals(final Object cause) {

        return (this == cause || (null != cause && this.getClass() == cause.getClass() && this.number == ((MenuIdentifier) cause).number));
    }

    @Override // Identifier Class 인 경우 Serializable Interface 를 Implementation 한다.
    public int hashCode() {

        return number;
    }
}