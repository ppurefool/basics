package io.kwangsik.commonness.authorizationserver.excetpion;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * No Content Exception
 * Rest API 출력값 검증시 이용한다.
 */
@Slf4j // org.slf4j.Logger 객체인 log 를 사용하기 위하여 작성한다.
@ResponseStatus(HttpStatus.NO_CONTENT)
public class NoContentException extends RuntimeException {

    public NoContentException() {

        super();
        log.debug(this.getStackTrace()[0].toString());
    }
}