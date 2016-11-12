/**
 * 로그인 JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Ready Event
$(document).ready(function() {

    Utility.initialize();
    ScreenSetting.processReadyEvent();
});

// 화면 Event
var ScreenEvent = {

    clickLoginButton: function() {

        if (!ScreenVerification.isVerified()) return;

        DataRequest.login();
    }
};

// 화면 검증
var ScreenVerification = {

    // 검증
    isVerified: function() {

        var OBJECT_EMAIL = $('[name="user-email"]');
        var VERIFICATION_EMAIL = Utility.formatter.verifyEmail(OBJECT_EMAIL.val());

        if (-10 > VERIFICATION_EMAIL) {

            Utility.notification.pushWarning("E-mail 입력값이 잘못되었습니다. 다시 입력해주세요.", OBJECT_EMAIL);
            return false;
        } else if (0 > VERIFICATION_EMAIL) {

            Utility.notification.pushWarning("E-mail 항목을 입력하십시오.", OBJECT_EMAIL);
            return false;
        }

        return (!Utility.jquery.isEmptyVal($('[name="password-hash"]'), "Password 항목을 입력하십시오."));
    }
};

// 화면 설정
var ScreenSetting = {

    processReadyEvent: function() {

        // 이벤트 핸들러 설정
        $("#loginButton").click(ScreenEvent.clickLoginButton);
    }
};