/**
 * 변수 AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    getDeletingKeys: function() {

        return $.map(
            $.grep(
                Utility.grid.getData("firstGrid", true),
                function(detail) {return (!Utility.json.isEmpty(detail, "email"));}
            ),
            function(detail) {return detail.email}
        );
    },

    inquiry: function(page) {

        Utility.grid.clear("firstGrid");

        Utility.ajax.request({
            url: "/system/variables", // 시스템 변수 목록
            type: "get", // 조회
            data: {
                page: page
                // size: 20
            },
            success: DataResponse.processInquirySuccess
        });
    },

    save: function() {

        Utility.ajax.request({
            url: "/system/variables", // 시스템 변수 목록
            type: "post", // 등록
            data: Utility.grid.getData("firstGrid", true),
            success: DataResponse.processSavingSuccess
        });
    },

    delete: function() {

        Utility.ajax.request({
            url: "/system/variables", // 시스템 변수 목록
            type: "delete", // 삭제
            data: JSON.stringify($.map(DataRequest.getList(), function(detail) {return detail.key})),
            success: DataResponse.processDeletingSuccess
        });
    }
};

// Data 응답
var DataResponse = {

    processInquirySuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.grid.setData("firstGrid", result);
            Utility.grid.select("firstGrid", "key");
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "조회 결과가 존재하지 않습니다.");
        }
    },

    processSavingSuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.notification.pushInformation("저장이 완료되었습니다.");
            Utility.grid.setSelectingKeyArray("firstGrid", $.map(result, function(detail) {return detail.key}));

            DataRequest.inquiry(Utility.grid.getPageOffset("firstGrid"));
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

            Utility.notification.pushInformation("삭제할 데이터가 존재하지 않습니다.");
        }
    }
};