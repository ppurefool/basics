/**
 * Role AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    getKeys: function() {

        return $.map(
            $.grep(
                Utility.grid.getData("grid", true),
                function(detail) {return (!Utility.json.isEmptyValue(detail, "key"));}
            ),
            function(detail) {return detail.key}
        );
    },

    inquiry: function(page) {

        Utility.grid.clear("grid");

        Utility.ajax.request({
            url: "/system/roles", // 시스템 // Role목록
            type: "get", // 조회
            data: {
                page: page,
                size: 15
            },
            success: DataResponse.processInquirySuccess
        });
    },

    save: function() {

        Utility.ajax.request({
            url: "/system/roles", // 시스템 // Role목록
            type: "post", // 등록
            data: Utility.grid.getData("grid", true),
            success: DataResponse.processSavingSuccess
        });
    },

    delete: function() {

        Utility.ajax.request({
            url: "/system/roles", // 시스템 // Role목록
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
            Utility.grid.select("grid", "key");
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