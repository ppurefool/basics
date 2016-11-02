/**
 * 로그인 AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    login: function() {

        $.ajax({
            "data": {
                "user-email": $("input:eq(0)").val(),
                "password-hash": keccak_512($("input:eq(1)").val()),
                "_csrf": $("input:eq(2)").val()
            },
            "dataType": "json",
            "url": "/log-in", // 로그인
            "type": "post", // 상세 등록
            "success": DataResponse.success,
            "error": DataResponse.error
        });
    }
};

// Data 응답
var DataResponse = {

    success: function(result) {

        var RESULT_NUMBER = ScreenUtility.getJSONValue(result, "output.resultNumber");

        if (-1 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("E-mail 이 일치하지 않습니다. 다시 시도해주세요.");
            $("input:eq(0)").select();
        } else if (-2 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
            $("input:eq(1)").select();
        } else if (-3 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("사용할 수 없는 E-mail 입니다. 다시 시도해주세요.");
            $("input:eq(0)").select();
        } else if (-4 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("비밀번호가 만료되어 사용할 수 없습니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (-5 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("잠겨진 사용자입니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (-6 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("E-mail 이 만료되어 사용할 수 없습니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (-7 == RESULT_NUMBER) {

            ScreenUtility.pushWarning("다른 사용자가 로그인하고 있습니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (1 != RESULT_NUMBER) {

            ScreenUtility.pushWarning("오류가 발생했습니다. 관리자에게 문의하십시오.");
        } else {

            if (null != opener) {

                opener.location.reload(true);
                window.close();
            } else {

                location.href = ScreenUtility.getJSONValue(result, "output.redirectUrl");
            }
        }
    },

    error: function(result) {

        alert("오류가 발생하였습니다. 관리자에게 문의해주세요.\n\n" + JSON.stringify(result));
    }
};