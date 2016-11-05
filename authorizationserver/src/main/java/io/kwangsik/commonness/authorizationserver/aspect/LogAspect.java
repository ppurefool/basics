package io.kwangsik.commonness.authorizationserver.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Log Aspect
 */
@Aspect // Aspect Class 인 경우 작성한다.
@Component // Class 를 Spring Context 에 등록하는 경우 작성한다.
public class LogAspect {

    private final Logger log = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    private void setRequestMappingPointCut() {}

    @Before(value = "setRequestMappingPointCut()")
    private void printCause(final JoinPoint cause) {

        final StackTraceElement stackTraceElement = getRequestMappingStackTraceElement();
        final String className;
        final String methodName;
        final String parameters;
        final String debugFormat;

        if (null != stackTraceElement) {

            className = stackTraceElement.getClassName().split("\\$\\$")[0];
            methodName = stackTraceElement.getMethodName();
            parameters = Arrays.stream(cause.getArgs()).map(arg -> Optional.ofNullable(arg).map(Object::toString).orElse("null")).collect(Collectors.joining(", \n"));
            debugFormat = "아래 내용은 {}{}{}{}\n\u001B[1m\u001B[35m================================================================================================= : \u001B[0m\n{}\n------------------------------------------------------------------------------------------------- : ";

            System.out.println("\n");
            log.debug(debugFormat, className, " CLASS 내 ", methodName, "() METHOD 의 매개변수 객체 목록입니다.", (0 < parameters.length()? parameters: "(매개변수 없음)"), "LogAspect.printCause() 에서 출력");
        }
    }

    @AfterReturning(pointcut="setRequestMappingPointCut()", returning="result")
    private Object printChannelDTOResult(final Object result) {

        printResult(Optional.ofNullable(result).map(Object::toString).orElse("null"));

        return result;
    }

    private void printResult(final String resultString) {

        final StackTraceElement stackTraceElement = getRequestMappingStackTraceElement();
        final String className;
        final String methodName;
        final String debugFormat;

        if (null != stackTraceElement) {

            className = stackTraceElement.getClassName().split("\\$\\$")[0];
            methodName = stackTraceElement.getMethodName();
            debugFormat = "\n================================================================================================= : \n{}\n\u001B[1m\u001B[35m------------------------------------------------------------------------------------------------- : \u001B[0m";

            log.debug(debugFormat, resultString);
            log.debug("위 내용은 {}{}{}{}", className, " CLASS 내 ", methodName, "() METHOD 의 RETURN 객체입니다.");
        }
    }

    private StackTraceElement getRequestMappingStackTraceElement() {

        final Optional<StackTraceElement> optionalResult = Arrays.stream(Thread.currentThread().getStackTrace())
                .filter(stackTraceElement -> {

                    final String className = stackTraceElement.getClassName();
                    return className.contains("io.kwangsik") && !className.endsWith("LogAspect");
                }).findFirst();

        return (optionalResult.isPresent()? optionalResult.get(): null);
    }
}