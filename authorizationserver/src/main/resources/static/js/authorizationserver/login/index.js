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

        var gridIdentifier = "jsGrid";

        Utility.grid.initialize(gridIdentifier, {
            fields: [
                {name: "number", title: "번호", visible: false},
                {name: "typeName", title: "로그인 유형", width: 120},
                {name: "errorName", title: "오류", width: 120},
                {name: "address", title: "IP 주소", width: 200},
                {name: "registrationDate", title: "로그인/아웃 일시", width: 160, align: "center"/*, itemTemplate: Utility.grid.itemTemplate.date*/},
                {name: "registrationUserEmail", title: "사용자 E-mail", width: 240}
            ],
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