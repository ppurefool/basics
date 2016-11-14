package io.kwangsik.application.authorizationserver.role;

import io.kwangsik.commonness.authorizationserver.dto.PageRequest;
import io.kwangsik.commonness.authorizationserver.dto.PageResponse;
import io.kwangsik.commonness.authorizationserver.excetpion.NoContentException;
import io.kwangsik.domain.authorizationserver.role.Role;
import io.kwangsik.domain.authorizationserver.role.RoleDetail;
import io.kwangsik.domain.authorizationserver.role.RoleIdentifier;
import io.kwangsik.domain.authorizationserver.role.RoleListInquiryRepository;
import io.kwangsik.domain.authorizationserver.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.transaction.RollbackException;
import java.util.ArrayList;
import java.util.List;

/**
 * Role Service
 */
@Service // Spring Service Class 인 경우 작성한다.
public class RoleService {

    private final RoleListInquiryRepository listInquiryRepository;
    private final RoleRepository repository;

    @Autowired
    public RoleService(final RoleListInquiryRepository listInquiryRepository,
                       final RoleRepository repository) {

        this.listInquiryRepository = listInquiryRepository;
        this.repository = repository;
    }

    public PageResponse<?, RoleDetail> inquiryList(final PageRequest pageRequest) {

        return this.listInquiryRepository.process(pageRequest);
    }

    @Transactional
    public List<String> saveList(final List<RoleDetail> cause) {

        List<String> result = new ArrayList<>();

        for (RoleDetail detail : cause) {

            result.add(this.repository.save(new Role(detail)).getIdentifier().getKey());
        }

        return result;
    }

    public void deleteList(final List<String> cause) {

        cause.forEach(identifier -> {try {this.repository.delete(new RoleIdentifier(identifier));} catch
                (EmptyResultDataAccessException e) {e.printStackTrace();}});
    }
}