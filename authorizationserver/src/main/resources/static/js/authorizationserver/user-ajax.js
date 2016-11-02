/**
 * 사용자 AJAX JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Data 요청
var DataRequest = {

    getList: function() {

        return $.grep(GridSetting["firstGrid"].getList("selected"), function(detail) {

            return (0 < ScreenUtility.coalesceJSONValue(detail, "email").length);
        });
    },

    inquiry: function(page) {

        ScreenUtility.clearGridData(GridSetting["firstGrid"]);

        $.ajax({
            data: ScreenUtility.serializeJSON($("#condition"), {
                page: page
                // size: 15
            }),
            url: "/membership/users", // 회원 사용자 목록
            type: "get", // 조회
            success: DataResponse.processInquirySuccess,
            error: ScreenUtility.processRequestError
        });
    },

    save: function() {

        $.ajax({
            data: JSON.stringify(DataRequest.getList()),
            contentType: "application/json",
            url: "/membership/users", // 회원 사용자 목록
            type: "post", // 등록
            success: DataResponse.processSavingSuccess,
            error: ScreenUtility.processRequestError
        });
    },

    delete: function() {

        $.ajax({
            data: JSON.stringify($.map(DataRequest.getList(), function(detail) {return detail.email})),
            contentType: "application/json",
            url: "/membership/users", // 회원 사용자 목록
            type: "delete", // 삭제
            success: DataResponse.processDeletingSuccess,
            error: ScreenUtility.processRequestError
        });
    }
};

// Data 응답
var DataResponse = {

    processInquirySuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            ScreenUtility.setGridData(GridSetting["firstGrid"], result);
            ScreenUtility.selectGridData(GridSetting["firstGrid"], "email");
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("조회 결과가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    },

    processSavingSuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            ScreenUtility.pushInformation("저장이 완료되었습니다.");
            ScreenUtility.selectingGridData = result;

            DataRequest.inquiry(GridSetting["firstGrid"].page.currentPage);
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("저장할 데이터가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    },

    processDeletingSuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            ScreenUtility.pushInformation("삭제가 완료되었습니다.");

            DataRequest.inquiry();
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("삭제할 데이터가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    }
};