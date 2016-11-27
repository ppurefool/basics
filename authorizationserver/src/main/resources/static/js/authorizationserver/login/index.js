/**
 * Index JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Ready Event
$(document).ready(function() {

    Utility.initialize();
    Utility.formatter.date.initialize($('[name$="Ymd"]'));
    ScreenSetting.processReadyEvent();

    $('#inquiryButton').click();
});

// 화면 Event
var ScreenEvent = {

    clickInquiryButton: function() {

        if (!ScreenVerification.isVerifiedInquiryCondition()) return;

        DataRequest.inquiry();
    }
};

// 화면 검증
var ScreenVerification = {

    isVerifiedInquiryCondition: function () {

        var OBJECT_EMAIL = $('[name="email"]');
        var OBJECT_START_YMD = $('[name="startYmd"]');
        var OBJECT_END_YMD = $('[name="endYmd"]');
        var VERIFICATION_EMAIL = Utility.formatter.verifyEmail(OBJECT_EMAIL.val());
        var VERIFICATION_PERIOD;

        if (-10 > VERIFICATION_EMAIL) {

            Utility.notification.pushWarning("사용자 E-mail 입력값이 잘못되었습니다. 다시 입력해주세요.", OBJECT_EMAIL);
            return false;
        }

        VERIFICATION_PERIOD = Utility.formatter.verifyPeriodString(OBJECT_START_YMD.val(), OBJECT_END_YMD.val());

        if (-11 == VERIFICATION_PERIOD) {

            Utility.notification.pushWarning("등록기간이 잘못되었습니다. 다시 입력해주세요.", OBJECT_START_YMD);
            return false;
        } else if (-13 == VERIFICATION_PERIOD) {

            Utility.notification.pushWarning("등록기간 시작일이 잘못되었습니다. 다시 입력해주세요.", OBJECT_START_YMD);
            return false;
        } else if (-15 == VERIFICATION_PERIOD) {

            Utility.notification.pushWarning("등록기간 종료일이 잘못되었습니다. 다시 입력해주세요.", OBJECT_END_YMD);
            return false;
        }

        return true;
    }
};

// Grid 설정
var GridSetting = {

    initialize: function() {

        Utility.grid.initialize("grid", {
            colHeaders: ['번호', "로그인 유형", "오류", "사용자 E-mail", "로그인/아웃 일시", "IP 주소"],
            columns: [
                {data: "number", width: 40, className: "htRight"},
                {data: "typeName", width: 130},
                {data: "errorName", width: 130},
                {data: "registrationUserEmail", width: 200},
                {data: "registrationDate", width: 160,
                    renderer: function(instance, TD, row, col, prop, value) {

                        var date = new Date(value);

                        TD.className = "htDimmed htCenter";
                        TD.innerHTML = date.toISOString().substring(0, 10) + " " + date.toTimeString().substring(0, 8);
                    }},
                {data: "address", width: 200}
            ],
            disableVisualSelection: true,
            handsontable: {selecting: false},
            readOnly: true,
            pagination: {onClick: function(pageOffset) {DataRequest.inquiry(pageOffset);}}
        });
    }
};

// 화면 설정
var ScreenSetting = {

    // Ready Event 처리
    processReadyEvent: function() {

        GridSetting.initialize();

        // 이벤트 핸들러 설정
        $('#inquiryButton').click(ScreenEvent.clickInquiryButton); // 조회 버튼

        Utility.setConditionChangeCallback("condition", ScreenEvent.clickInquiryButton);
    }
};