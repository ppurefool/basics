package io.kwangsik.commonness.authorizationserver.dto;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Page Response
 */
@ToString
public class PageResponse<T, R> {

    private T input;
    private List<R> outputList;

    private PageRequest pageRequest;

    private boolean first; // 첫페이지 // 첫번째 페이지 여부
    private boolean last; // 마지막페이지 // 마지막 페이지 여부
    private int numberOfElements; // 행건수 // 현재 출력된 행건수
    private int totalElements; // 총 행건수
    private int totalPage; // 총 페이지수
    private int page; // 현재 페이지 Offset
    private int size; // 페이지당 행건수

    // 참고) 목록 조회 Repository Class 에서 이용한다.
    public PageResponse(final T input, final PageRequest pageRequest, final TypedQuery<R> outputQuery,
                        final TypedQuery<R> countQuery) {

        final int page = pageRequest.getValidPage();
        final int size = pageRequest.getValidSize();
        final int tempTotalElements = countQuery.getResultList().size();
        final int tempTotalPage = tempTotalElements / size + (0 < tempTotalElements % size? 1: 0);

        this.input = input;
        this.outputList = outputQuery.setFirstResult(page * size).setMaxResults(size).getResultList();

        this.pageRequest = pageRequest;

        this.first = (0 == page);
        this.last = (page >= tempTotalPage - 1);
        this.numberOfElements = outputList.size();
        this.totalElements = tempTotalElements;
        this.totalPage = tempTotalPage;
        this.page = page;
        this.size = size;
    }

    // 참고) RESTController Class 에서 이용한다.
    public boolean hasNoOutput() {

        return this.outputList.isEmpty();
    }
}