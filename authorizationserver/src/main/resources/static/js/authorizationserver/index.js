/**
 * Index JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Ready Event
$(document).ready(function() {

    ScreenUtility.initialize(ScreenSetting);

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

        var dataAX5GridIdentifier = "firstGrid";

        ScreenUtility.initializeGrid(GridSetting, dataAX5GridIdentifier, {
            columns: [ // 컬럼 목록 설정 // key. Data 바인딩시 Mapping 할 field 이름
                {key: "number", label: "번호", width: 0},
                {key: "typeName", label: "로그인 유형", width: 120},
                {key: "errorName", label: "오류", width: 100},
                {key: "address", label: "IP 주소", width: 160},
                {key: "registrationDate", label: "등록 일시", width: 170, align: "center", formatter: "date"},
                {key: "registrationUserEmail", label: "사용자 E-mail", width: 260}
            ],
            page: { // 페이지 설정
                onChange: function() { // 페이지 변경

                    DataRequest.inquiry(this.page.selectPage);
                }
            },
            showRowSelector: false // 체크박스 컬럼 표시여부
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