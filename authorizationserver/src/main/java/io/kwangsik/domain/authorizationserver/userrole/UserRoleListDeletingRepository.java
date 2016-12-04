package io.kwangsik.domain.authorizationserver.userrole;

import java.util.List;

/**
 * 사용자 Role 목록 삭제 Repository Interface
 */
public interface UserRoleListDeletingRepository {

    void process(List<UserRoleDetail> cause);
}