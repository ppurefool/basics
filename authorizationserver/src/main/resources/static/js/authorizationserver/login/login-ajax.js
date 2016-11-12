/**
 * 로그인 AJAX JS
 */
"use strict";

// Data 요청
var DataRequest = {

    login: function() {

        $.ajax({
            url: "/log-in", // 로그인
            type: "post", // 상세 등록
            data: {
                "user-email": $("input:eq(0)").val(),
                "password-hash": keccak_512($("input:eq(1)").val())
            },
            dataType: "json",
            success: DataResponse.success,
            error: Utility.ajax.processRequestError
        });
    }
};

// Data 응답
var DataResponse = {

    success: function(result, statusText, jqXHR) {

        var ERROR = Utility.json.getValue(result, "error");

        if (-1 == ERROR) {

            Utility.notification.pushWarning("E-mail 이 일치하지 않습니다. 다시 시도해주세요.");
            $("input:eq(0)").select();
        } else if (-2 == ERROR) {

            Utility.notification.pushWarning("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
            $("input:eq(1)").select();
        } else if (-3 == ERROR) {

            Utility.notification.pushWarning("사용할 수 없는 E-mail 입니다. 다시 시도해주세요.");
            $("input:eq(0)").select();
        } else if (-4 == ERROR) {

            Utility.notification.pushWarning("비밀번호가 만료되어 사용할 수 없습니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (-5 == ERROR) {

            Utility.notification.pushWarning("잠겨진 사용자입니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (-6 == ERROR) {

            Utility.notification.pushWarning("E-mail 이 만료되어 사용할 수 없습니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (-7 == ERROR) {

            Utility.notification.pushWarning("다른 사용자가 로그인하고 있습니다. 관리자에게 문의해주세요.");
            $("input:eq(0)").select();
        } else if (null != ERROR) {

            Utility.ajax.processResponseError(jqXHR, jqXHR.status);
        } else {

            if (null != opener) {

                opener.location.reload(true);
                window.close();
            } else {

                location.href = Utility.json.getValue(result, "redirectURL");
            }
        }
    }
};