/**
 * Index AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    inquiry: function(page) {

        Utility.grid.clear("jsGrid");

        Utility.ajax.request({
            url: "/membership/login", // 회원 로그인 목록
            type: "get", // 조회
            data: Utility.json.serialize($("#condition"), {
                page: page,
                size: 10
            }),
            success: DataResponse.inquirySuccess
        });
    }
};

// Data 응답
var DataResponse = {

    inquirySuccess: function(result, statusText, jqXHR) {

        var STATUS = jqXHR.status; // HTTP Status Code

        if (200 == STATUS) { // 200. success

            Utility.grid.setData("jsGrid", result);
        } else {

            Utility.ajax.processResponseError(jqXHR, STATUS, "조회 결과가 존재하지 않습니다.");
        }
    }
};