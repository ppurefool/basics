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

        ScreenUtility.clearGridData(GridSetting, "firstGrid");

        $.ajax({
            data: {
                email: $('#email').val(),
                name: $('#name').val(),
                page: page,
                size: 20
            },
            url: "/membership/users", // 회원 사용자 목록
            type: "get", // 조회
            success: DataResponse.processInquirySuccess,
            error: ScreenUtility.processRequestError
        });
    },

    save: function() {

        DataResponse.savingIdentifiers = null;

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

            ScreenUtility.setGridData(GridSetting, "firstGrid", result);

            if (null != DataResponse.savingIdentifiers) {

                var identifiers = $.map(GridSetting["firstGrid"].getList(), function(detail) {return detail.email;});
                var savingIdentifiersLength = DataResponse.savingIdentifiers.length;
                var selectIndex;

                for (var index = 0; index < savingIdentifiersLength; index++) {

                    selectIndex = $.inArray(DataResponse.savingIdentifiers[index], identifiers);
                    if (0 <= selectIndex) GridSetting["firstGrid"].select(selectIndex);
                }

                DataResponse.savingIdentifiers = null;
            }
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("조회 결과가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    },

    savingIdentifiers: null,
    processSavingSuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            DataResponse.savingIdentifiers = result;
            DataRequest.inquiry(GridSetting["firstGrid"].page.currentPage);

            ScreenUtility.pushInformation("저장이 완료되었습니다.");
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("저장할 데이터가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    },

    processDeletingSuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            DataRequest.inquiry();

            ScreenUtility.pushInformation("삭제가 완료되었습니다.");
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("삭제할 데이터가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    }
};