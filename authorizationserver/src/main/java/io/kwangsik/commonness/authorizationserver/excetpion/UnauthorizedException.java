package io.kwangsik.commonness.authorizationserver.excetpion;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Unauthorized Exception
 * Rest API 입력값 검증시 이용한다.
 */
@Slf4j // org.slf4j.Logger 객체인 log 를 사용하기 위하여 작성한다.
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {

        super(message);
        log.debug("\n================================================================================================= : \nmessage={}\n\u001B[1m\u001B[35m-------------------------------------------------------------------------------------------------\u001B[0m : 위의 내용은 {} 에서 발생한 Exception Message 입니다.",
                this.getMessage(), this.getStackTrace()[0].toString());
    }
}