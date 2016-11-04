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

        $.ajax({
            data: {
                page: page
                // size: 20
            },
            url: "/system/variables", // 시스템 변수 목록
            type: "get", // 조회
            success: DataResponse.processInquirySuccess,
            error: Utility.ajax.processRequestError
        });
    },

    save: function() {

        $.ajax({
            data: JSON.stringify(Utility.grid.getData("firstGrid", true)),
            contentType: "application/json",
            url: "/system/variables", // 시스템 변수 목록
            type: "post", // 등록
            success: DataResponse.processSavingSuccess,
            error: Utility.ajax.processRequestError
        });
    },

    delete: function() {

        $.ajax({
            data: JSON.stringify($.map(DataRequest.getList(), function(detail) {return detail.key})),
            contentType: "application/json",
            url: "/system/variables", // 시스템 변수 목록
            type: "delete", // 삭제
            success: DataResponse.processDeletingSuccess,
            error: Utility.ajax.processRequestError
        });
    }
};

// Data 응답
var DataResponse = {

    processInquirySuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            Utility.grid.setData("firstGrid", result);
            Utility.grid.select("firstGrid", "key");
        } else if (204 == status) { // 204. nocontent

            Utility.notification.pushInformation("조회 결과가 존재하지 않습니다.");
        } else {

            Utility.ajax.processResponseError(jqXHR);
        }
    },

    processSavingSuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            Utility.notification.pushInformation("저장이 완료되었습니다.");
            Utility.grid.setSelectingKeyArray("firstGrid", $.map(result, function(detail) {return detail.key}));

            DataRequest.inquiry(Utility.grid.getPageOffset("firstGrid"));
        } else if (204 == status) { // 204. nocontent

            Utility.notification.pushInformation("저장할 데이터가 존재하지 않습니다.");
        } else {

            Utility.ajax.processResponseError(jqXHR);
        }
    },

    processDeletingSuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            Utility.notification.pushInformation("삭제가 완료되었습니다.");

            DataRequest.inquiry();
        } else if (204 == status) { // 204. nocontent

            Utility.notification.pushInformation("삭제할 데이터가 존재하지 않습니다.");
        } else {

            Utility.ajax.processResponseError(jqXHR);
        }
    }
};