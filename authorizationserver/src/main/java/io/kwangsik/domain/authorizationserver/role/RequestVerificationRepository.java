package io.kwangsik.domain.authorizationserver.role;

/**
 * 요청 검증 Repository Interface
 */
public interface RequestVerificationRepository {

    boolean isVerifiedMenu(String email, String address);
    boolean isVerifiedREST(String email, String address, String method);
}