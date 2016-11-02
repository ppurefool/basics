package io.kwangsik.domain.authorizationserver.variable;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 변수 Entity
 */
@Entity // JPA Entity Class 인 경우 작성한다.
@NoArgsConstructor // Constructor 추가시 작성한다.
public class Variable {

    @Id
    @Column(name = "variableKey", length = 50)
    @Getter // VariableService 에서 이용한다.
    private String key; // 변수 Key

    @Column(name = "variableValue", length = 200, nullable = false)
    private String value; // 변수 값

    @Column(name = "detailValue", length = 200, nullable = false)
    private String detail; // 상세 값

    // 참고) VariableService Class 에서 이용한다.
    public Variable(final VariableDetail cause) {

        this.key = cause.getKey();
        this.value = cause.getValue();
        this.detail = cause.getDetail();
    }
}