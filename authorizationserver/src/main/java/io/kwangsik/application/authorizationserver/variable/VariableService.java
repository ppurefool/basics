package io.kwangsik.application.authorizationserver.variable;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.domain.authorizationserver.variable.Variable;
import io.kwangsik.domain.authorizationserver.variable.VariableDetail;
import io.kwangsik.domain.authorizationserver.variable.VariableListInquiryRepository;
import io.kwangsik.domain.authorizationserver.variable.VariableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 변수 Service
 */
@Service // Spring Service Class 인 경우 작성한다.
public class VariableService {

    private final VariableListInquiryRepository listInquiryRepository;
    private final VariableRepository repository;

    @Autowired
    public VariableService(final VariableListInquiryRepository listInquiryRepository,
                            final VariableRepository repository) {

        this.listInquiryRepository = listInquiryRepository;
        this.repository = repository;
    }

    public PageResponse<?, VariableDetail> inquiryList(final PageRequest pageRequest) {

        return this.listInquiryRepository.process(pageRequest);
    }

    @Transactional
    public List<String> saveList(final List<VariableDetail> cause) {

        List<String> result = new ArrayList<>();

        for (VariableDetail detail : cause) {

            result.add(this.repository.save(new Variable(detail)).getKey());
        }

        return result;
    }

    public void deleteList(final List<String> cause) {

        cause.forEach(identifier -> {try {this.repository.delete(identifier);} catch
                (EmptyResultDataAccessException e) {e.printStackTrace();}});
    }
}