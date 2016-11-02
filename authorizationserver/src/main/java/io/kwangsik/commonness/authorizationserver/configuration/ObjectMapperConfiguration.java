package io.kwangsik.commonness.authorizationserver.configuration;

import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ObjectMapper Configuration
 */
@SuppressWarnings(value = "unused")
@Configuration // Java Spring Configuration Class 인 경우 작성한다.
public class ObjectMapperConfiguration {

    @Bean
    protected ObjectMapper objectMapper() {

        ObjectMapper result = new ObjectMapper();
        result.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES); // DTO 에 없는 Property 가 존재시 오류가 발생하지 않도록 설정한다.

        // Getter 를 작성하지 않으려고 private field 에 접근할 수 있도록 설정한다.
        result.setVisibility(PropertyAccessor.ALL, Visibility.NONE);
        result.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);

        return result;
    }
}