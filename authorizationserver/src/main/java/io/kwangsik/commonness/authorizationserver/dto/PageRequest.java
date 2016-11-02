package io.kwangsik.commonness.authorizationserver.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Page Response
 */
@Getter
@Setter
@ToString
public class PageRequest {

    private Integer page;
    private Integer size;

    public int getValidPage() {

        return (null != page && 0 <= page? page: 0);
    }

    public int getValidSize() {

        return (null != size && 0 < size? size: 15);
    }
}