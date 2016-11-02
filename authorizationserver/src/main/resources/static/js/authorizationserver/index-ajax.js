/**
 * Index AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    inquiry: function(page) {

        ScreenUtility.clearGridData(GridSetting["firstGrid"]);

        $.ajax({
            data: {
                email: $('#email').val(),
                page: page
                // size: 15
            },
            url: "/membership/login", // 회원 로그인 목록
            type: "get", // 조회
            success: DataResponse.inquirySuccess,
            error: DataResponse.processRequestError
        });
    }
};

// Data 응답
var DataResponse = {

    inquirySuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            ScreenUtility.setGridData(GridSetting["firstGrid"], result);
        } else if (204 == status) { // 204. nocontent

            ScreenUtility.pushInformation("조회 결과가 존재하지 않습니다.");
        } else {

            ScreenUtility.processResponseError(jqXHR);
        }
    }
};