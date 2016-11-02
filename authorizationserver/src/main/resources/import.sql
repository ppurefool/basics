-- 참고) 한줄로 작성해야 한다.
-- noinspection SqlNoDataSourceInspectionForFile
-- noinspection SqlDialectInspectionForFile

insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (1, '로그인', '로그인', null, '/log-in-view', false, true, 'authorizationserver');
-- insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (9, 'H2_CONSOLE_ALL', 'H2_CONSOLE_ALL', null, '/h2-console/**', false, true, 'authorizationserver - Spring Security Configuration Class 에서 이용하며 /h2-console/** 으로 설정해야 한다. /h2-console 시 사용할 수 없다.');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (11, '로그인 이력', '회원 로그인', 'history', '/', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (12, '사용자 Profile', '회원 사용자 로그인', 'user', '/membership/users/log-in-user-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (13, 'Token 관리', '회원 Token', 'dot-circle-o', '/membership/tokens-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (21, '사용자 관리', '회원 사용자', 'users', '/membership/users-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (22, '메뉴 관리', '시스템 메뉴', 'list', '/system/menus-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (23, '권한 관리', '시스템 Role', 'film', '/system/roles-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (31, '사용자 권한', '권한 사용자', 'user', '/authority/users-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (32, '메뉴 권한', '권한 메뉴', 'list-alt', '/authority/menus-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (41, '시스템 변수', '시스템 변수', 'wrench', '/system/variables-view', true, false, 'authorizationserver');
insert into Menu (menuNumber, displayName, interiorName, iconKey, addressValue, displayYesorno, anonymYesorno, detailValue) values (42, 'DB 관리', 'H2_CONSOLE', 'database', '/h2-console', true, false, 'authorizationserver');

insert into MenuRole (menuNumber, roleKey) values (11, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (11, 'BUSINESS_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (11, 'BUSINESS_USER');
insert into MenuRole (menuNumber, roleKey) values (12, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (12, 'BUSINESS_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (12, 'BUSINESS_USER');
insert into MenuRole (menuNumber, roleKey) values (13, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (13, 'BUSINESS_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (13, 'BUSINESS_USER');
insert into MenuRole (menuNumber, roleKey) values (21, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (22, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (23, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (31, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (32, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (41, 'SYSTEM_ADMINISTRATOR');
insert into MenuRole (menuNumber, roleKey) values (42, 'SYSTEM_ADMINISTRATOR');

insert into Role (roleKey, roleValue) values ('SYSTEM_ADMINISTRATOR', '시스템 관리자');
insert into Role (roleKey, roleValue) values ('BUSINESS_ADMINISTRATOR', '업무 관리자');
insert into Role (roleKey, roleValue) values ('BUSINESS_USER', '업무 사용자');

insert into User (userEmail, passwordHash, name) values ('sys-admin@kwangsik.io', 'a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6', '관리자'); // passwordHash=password
insert into User (userEmail, passwordHash, name) values ('busi-admin@kwangsik.io', 'a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6', '담당자'); // passwordHash=password
insert into User (userEmail, passwordHash, name) values ('user1@kwangsik.io', 'a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6', '사용자1'); // passwordHash=password
insert into User (userEmail, passwordHash, name) values ('user2@kwangsik.io', 'a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6', '사용자2'); // passwordHash=password

insert into UserRole (userEmail, roleKey) values ('sys-admin@kwangsik.io', 'SYSTEM_ADMINISTRATOR');
insert into UserRole (userEmail, roleKey) values ('busi-admin@kwangsik.io', 'BUSINESS_ADMINISTRATOR');
insert into UserRole (userEmail, roleKey) values ('user1@kwangsik.io', 'BUSINESS_USER');
insert into UserRole (userEmail, roleKey) values ('user2@kwangsik.io', 'BUSINESS_USER');

insert into Variable (variableKey, variableValue, detailValue) values ('APPLICATION_TITLE', 'Kwangsik''s Authorization System', '화면내 <title> 태그에 사용되는 Text 예제) Kwangsik''s Basics System');
insert into Variable (variableKey, variableValue, detailValue) values ('APPLICATION_LOGO_TEXT', '인증 시스템', '화면내 Logo 에 사용되는 Text 예제) 기본 시스템');