/**
 * Index AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    inquiry: function(page) {

        Utility.grid.clear("firstGrid");

        $.ajax({
            data: Utility.json.serialize($("#condition"), {
                page: page
                // size: 15
            }),
            url: "/membership/login", // 회원 로그인 목록
            type: "get", // 조회
            success: DataResponse.inquirySuccess,
            error: Utility.ajax.processRequestError
        });
    }
};

// Data 응답
var DataResponse = {

    inquirySuccess: function(result, statusText, jqXHR) {

        var status = jqXHR.status; // HTTP Status Code

        if (200 == status) { // 200. success

            Utility.grid.setData("firstGrid", result);
        } else if (204 == status) { // 204. nocontent

            Utility.notification.pushInformation("조회 결과가 존재하지 않습니다.");
        } else {

            Utility.ajax.processResponseError(jqXHR);
        }
    }
};