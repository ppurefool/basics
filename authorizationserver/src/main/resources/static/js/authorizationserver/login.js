/**
 * 로그인 JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Ready Event
$(document).ready(function() {

    ScreenUtility.initialize(ScreenSetting);

    ScreenSetting.processReadyEvent();
});

// 화면 Event
var ScreenEvent = {

    // 로그인 버튼 클릭
    clickLoginButton: function() {

        if (!ScreenVerification.verify()) return;

        DataRequest.login();
    }
};

// 화면 검증
var ScreenVerification = {

    // 검증
    verify: function() {

        return true;
    }
};

// 화면 설정
var ScreenSetting = {

    // Ready Event 처리
    processReadyEvent: function() {

        // 이벤트 핸들러 설정
        $("#loginButton").click(ScreenEvent.clickLoginButton);
    }
};