/**
 * 사용자 Role AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    inquiryCombo: function(successCallback) {

        Utility.combo.request({
            url: "/system/roles", // 시스템 // Role목록
            type: "get", // 조회
            data: {
                page: 0,
                size: 99
            },
            combo: {
                // emptyValueText: null,
                successCallback: successCallback,
                target: $("select")
                // textName: "value"
                // valueName: "key",
            }
        });
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

    save: function() {

        Utility.ajax.request({
            url: "/authority/users", // 권한 // 사용자목록
            type: "post", // 등록
            data: Utility.grid.getData("grid", true),
            success: DataResponse.processSavingSuccess
        });
    }
};

// Data 응답
var DataResponse = {

    processInquirySuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.grid.setData("grid", result);
            Utility.grid.select("user-grid", "email");
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "조회 결과가 존재하지 않습니다.");
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
    }
};