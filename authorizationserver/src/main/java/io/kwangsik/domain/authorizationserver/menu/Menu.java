package io.kwangsik.domain.authorizationserver.menu;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * 메뉴 Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "addressValue")})
@ToString // LOG 를 출력하기 위하여 작성한다.
@Getter // DTO 를 대신하기 위하여 작성한다.
public class Menu {

    @EmbeddedId
    private MenuIdentifier identifier; // 메뉴 번호

    @Column(length = 100, nullable = false)
    private String displayName; // 표시 이름

    @Column(length = 100, nullable = false)
    private String interiorName; // 내부 이름

    @Column(length = 50)
    private String iconKey; // Icon Key

    @Column(name = "addressValue", length = 200)
    private String address; // 주소 값

    @Column(name = "displayOrderNumber")
    private Integer displayOrder; // 표시 순서 번호

    @Column(name = "displayYesorno")
    private boolean display; // 표시 여부

    @Column(name = "anonymYesorno", nullable = false)
    private boolean anonym; // 익명 여부

    @Column(name = "detailValue", length = 200, nullable = false)
    private String detail; // 상세 값
}