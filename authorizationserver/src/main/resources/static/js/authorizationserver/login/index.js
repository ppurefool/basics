/**
 * Index JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Ready Event
$(document).ready(function() {

    Utility.initialize();
    ScreenSetting.processReadyEvent();

    $('#inquiryButton').click();
});

// 화면 Event
var ScreenEvent = {

    clickInquiryButton: function() {

        DataRequest.inquiry();
    }
};

// Grid 설정
var GridSetting = {

    initialize: function() {

        var gridIdentifier = "grid";

        Utility.grid.initialize(gridIdentifier, {
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
            readOnly: true,
            pagination: {
                onClick: function(pageOffset) {

                    DataRequest.inquiry(pageOffset);
                }
            }
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
    }
};