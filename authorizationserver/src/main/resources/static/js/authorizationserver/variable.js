/**
 * 변수 JS
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
    },

    clickAdditionButton: function() {

        Utility.grid.addRow("firstGrid");
    },

    clickSavingButton: function() {

        if (!ScreenVerification.verifySavingData()) return;

        DataRequest.save();
    },

    clickDeletingButton: function() {

        if (!ScreenVerification.verifyDeletingData()) return;

        DataRequest.delete();
    }
};

// 화면 검증
var ScreenVerification = {

    verifySavingData: function() {

        var gridIdentifier = "firstGrid";
        var list;
        var length;

        if (0 >= Utility.grid.getData(gridIdentifier, true).length) {

            Utility.notification.pushWarning("선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.");
            return false;
        }

        list = Utility.grid.getData(gridIdentifier);
        length = list.length;

        for (var index = 0; index < length; index++) {

            if (!Utility.grid.isSelected(gridIdentifier, index)) continue;

            if (Utility.json.isEmptyValue(list[index], "key",
                    (index + 1) + " 번째 행의 변수 이름 항목값이 존재하지 않습니다. 변수 이름 항목을 입력하십시오.")) return false;
            if (Utility.json.isEmptyValue(list[index], "value",
                    (index + 1) + " 번째 행의 변수 값 항목값이 존재하지 않습니다. 변수 값 항목을 입력하십시오.")) return false;
            if (Utility.json.isEmptyValue(list[index], "detail",
                    (index + 1) + " 번째 행의 변수 내용 항목값이 존재하지 않습니다. 변수 내용 항목을 입력하십시오.")) return false;
        }

        return true;
    },

    verifyDeletingData: function() {

        if (0 >= DataRequest.getDeletingKeys().length) {

            Utility.notification.pushWarning("선택된 데이터가 존재하지 않습니다. 삭제할 그리드 데이터를 선택해주세요.");
            return false;
        }

        return true;
    }
};

// Grid 설정
var GridSetting = {

    initialize: function() {

        var gridIdentifier = "firstGrid";

        Utility.grid.initialize(gridIdentifier, {
            columns: [ // 컬럼 목록 설정 // key. Data 바인딩시 Mapping 할 field 이름
                {key: "key", label: "변수 이름", width: 174 , editor: {type: "text"}},
                {key: "value", label: "변수 값", width: 210, editor: {type: "text"}},
                {key: "detail", label: "변수 내용", width: 400, editor: {type: "text"}}
            ],
            page: {
                onChange: function() {

                    DataRequest.inquiry(this.page.selectPage);
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
        $('#additionButton').click(ScreenEvent.clickAdditionButton); // 추가 버튼
        $('#savingButton').click(ScreenEvent.clickSavingButton); // 저장 버튼
        $('#deletingButton').click(ScreenEvent.clickDeletingButton); // 삭제 버튼
    }
};