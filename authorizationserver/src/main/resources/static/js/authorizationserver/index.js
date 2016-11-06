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
                {name: "registrationDate", title: "로그인/아웃 일시", width: 160, align: "center", itemTemplate: Utility.grid.itemTemplate.date},
                {name: "registrationUserEmail", title: "사용자 E-mail", width: 240}
            ],
            onPageClick: function(pageOffset) {

                DataRequest.inquiry(pageOffset);
            }
            //
            // columns: [ // 컬럼 목록 설정 // key. Data 바인딩시 Mapping 할 field 이름
            //     {key: "number", label: "번호", width: 0},
            //     {key: "typeName", label: "로그인 유형", width: 120},
            //     {key: "errorName", label: "오류", width: 100},
            //     {key: "address", label: "IP 주소", width: 160},
            //     {key: "registrationDate", label: "등록 일시", width: 170, align: "center", formatter: "date"},
            //     {key: "registrationUserEmail", label: "사용자 E-mail", width: 260}
            // ],
            // page: { // 페이지 설정
            //     onChange: function() { // 페이지 변경
            //
            //         DataRequest.inquiry(this.page.selectPage);
            //     }
            // },
            // showRowSelector: false // 체크박스 컬럼 표시여부
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