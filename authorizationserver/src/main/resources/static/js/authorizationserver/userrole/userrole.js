/**
 * 사용자 Role JS
 * jQuery 를 이용하여 작성한다.
 */
"use strict";

// Ready Event
$(document).ready(function() {

    Utility.initialize();
    ScreenSetting.processReadyEvent();
    DataRequest.inquiryCombo(function() {$('#inquiryButton').click();});
});

// 화면 Event
var ScreenEvent = {

    clickInquiryButton: function() {

        if (!ScreenVerification.isVerifiedInquiryCondition()) return;

        DataRequest.inquiry();
    },

    clickSavingButton: function() {

        if (!ScreenVerification.isVerifiedSavingData()) return;

        DataRequest.save();
    }
};

// 화면 검증
var ScreenVerification = {

    isVerifiedInquiryCondition: function() {

        return true;
    },

    isVerifiedSavingData: function() {

        var gridIdentifier = "grid";
        var list;
        var length;

        if (Utility.grid.hasNoData(gridIdentifier, "선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.", true)) return false;

        list = Utility.grid.getData(gridIdentifier);
        length = list.length;

        for (var index = 0; index < length; index++) {

            if (!Utility.grid.isSelected(gridIdentifier, index)) continue;

            if (Utility.json.isEmptyValue(list[index], "email",
                    (index + 1) + " 번째 행의 Key 항목값이 존재하지 않습니다. Key 항목을 입력하십시오.")) return false;
            if (Utility.json.isEmptyValue(list[index], "value",
                    (index + 1) + " 번째 행의 Value 항목값이 존재하지 않습니다. Value 항목을 입력하십시오.")) return false;
        }

        return true;
    }
};

// Grid 설정
var GridSetting = {

    initialize: function() {

        var identifier = "grid";

        Utility.grid.initialize(identifier, {
            afterOnCellMouseDown: function(event, coords, TD) {
                Utility.grid.handsontable.checkbox.afterOnCellMouseDown(event, coords, TD, identifier, 0);
            },
            colHeaders: [
                '<i class="fa fa-check"></i>',
                '사용자 E-mail',
                '사용자 이름'
            ],
            columns: [
                {data: "roleRegistrationYesorno", width: 30, type: "checkbox", className: "htCenter", readOnly: false},
                {data: "email", width: 510},
                {data: "name", width: 320}
            ],
            currentRowClassName: 'current-row',
            fillHandle: false,
            handsontable: {selecting: false},
            readOnly: true,
            pagination: {
                onClick: function(pageOffset) {DataRequest.inquiry(pageOffset);}
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
        $('#savingButton').click(ScreenEvent.clickSavingButton); // 저장 버튼
        $('#deletingButton').click(ScreenEvent.clickDeletingButton); // 삭제 버튼

        Utility.setConditionChangeCallback("condition", ScreenEvent.clickInquiryButton);
    }
};