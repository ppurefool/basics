/**
 * 사용자 AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    getKeys: function() {

        return $.map(
            $.grep(
                Utility.grid.getData("grid", true),
                function(detail) {return (!Utility.json.isEmptyValue(detail, "email"));}
            ),
            function(detail) {return detail.email}
        );
    },

    inquiry: function(page) {

        Utility.grid.clear("grid");

        Utility.ajax.request({
            url: "/membership/users", // 회원 // 사용자목록
            type: "get", // 조회
            data: Utility.json.serialize($("#condition"), {
                page: page,
                size: 15
            }),
            success: DataResponse.processInquirySuccess
        });
    },

    initializePassword: function() {

        Utility.ajax.request({
            url: "/membership/users/password-initialization", // 회원 // 사용자목록 // 비밀번호 초기화
            type: "put", // 변경
            data: DataRequest.getKeys(),
            success: DataResponse.processPasswordInitializationSuccess
        });
    },

    save: function() {

        Utility.ajax.request({
            url: "/membership/users", // 회원 // 사용자목록
            type: "post", // 등록
            data: Utility.grid.getData("grid", true),
            success: DataResponse.processSavingSuccess
        });
    },

    delete: function() {

        Utility.ajax.request({
            url: "/membership/users", // 회원 // 사용자목록
            type: "delete", // 삭제
            data: DataRequest.getKeys(),
            success: DataResponse.processDeletingSuccess
        });
    }
};

// Data 응답
var DataResponse = {

    processInquirySuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.grid.setData("grid", result);
            Utility.grid.select("grid", "email");
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "조회 결과가 존재하지 않습니다.");
        }
    },

    processPasswordInitializationSuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.notification.pushInformation("비밀번호 초기화가 완료되었습니다.");
            Utility.grid.setSelectingKeyArray("grid", result);

            DataRequest.inquiry(Utility.grid.getPageOffset("grid"));
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "비멀번호를 초기화할 데이터가 존재하지 않습니다.");
        }
    },

    processSavingSuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.notification.pushInformation("저장이 완료되었습니다.");
            Utility.grid.setSelectingKeyArray("grid", result);

            DataRequest.inquiry(Utility.grid.getPageOffset("grid"));
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "저장할 데이터가 존재하지 않습니다.");
        }
    },

    processDeletingSuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.notification.pushInformation("삭제가 완료되었습니다.");

            DataRequest.inquiry();
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "삭제할 데이터가 존재하지 않습니다.");
        }
    }
};