package io.kwangsik.domain.authorizationserver.menurole;

import io.kwangsik.domain.authorizationserver.menu.MenuIdentifier;
import io.kwangsik.domain.authorizationserver.role.RoleIdentifier;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 메뉴 Role Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
public class MenuRole {

    @Id
    @GeneratedValue
    private int number; // 번호

    @Embedded
    private MenuIdentifier menuIdentifier; // 메뉴 번호

    @Embedded
    private RoleIdentifier roleIdentifier; // 권한 Key
}