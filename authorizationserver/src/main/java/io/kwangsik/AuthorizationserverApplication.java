package io.kwangsik;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Authorization Server Application
 * 참고) @SpringBootApplication: 다음 세가지의 Annotation 을 작성한 것과 같다.
 *      1. @Configuration: Java Spring Configuration Class 인 경우 작성한다.
 *      2. @EnableAutoConfiguration: Configuration 자동설정을 활성화하며, 각각의 jar 파일을 이용한다. 예제) tomcat-embed-core.jar, spring-webmvc.jar
 *      3. @ComponentScan: @Controller, @RestController, @Service 등의 Class 를 자동으로 검색하여 Spring Context 에 Bean 으로 등록한다.
 */
@SpringBootApplication
public class AuthorizationserverApplication {

    public static void main(String[] args) {

        SpringApplication.run(AuthorizationserverApplication.class, args);
    }
}