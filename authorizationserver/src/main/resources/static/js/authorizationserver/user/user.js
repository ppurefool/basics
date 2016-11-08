/**
 * 사용자 JS
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

        Utility.grid.addRow("grid");
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

        var gridIdentifier = "grid";
        var list;
        var length;

        if (Utility.grid.hasNoData(gridIdentifier, "선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.", true)) return false;

        list = Utility.grid.getData(gridIdentifier);
        length = list.length;

        for (var index = 0; index < length; index++) {

            if (!Utility.grid.isSelected(gridIdentifier, index)) continue;

            if (Utility.json.isEmptyValue(list[index], "email",
                    (index + 1) + " 번째 행의 사용자 E-mail 항목값이 존재하지 않습니다. 사용자 E-mail 항목을 입력하십시오.")) return false;
            if (Utility.json.isEmptyValue(list[index], "name",
                    (index + 1) + " 번째 행의 사용자 이름 항목값이 존재하지 않습니다. 사용자 이름 항목을 입력하십시오.")) return false;
        }

        return true;
    },

    verifyDeletingData: function() {

        return (!Utility.isEmptyArray(DataRequest.getDeletingKeys(), "선택된 데이터가 존재하지 않습니다. 삭제할 그리드 데이터를 선택해주세요."));
    }
};

// Grid 설정
var GridSetting = {

    initialize: function() {

        var identifier = "grid";

        Utility.grid.initialize(identifier, {
            colHeaders: ['<i class="fa fa-check"></i>', "사용자 E-mail", "사용자 이름"],
            columns: [
                {data: "__selected__", width: 30, type: "checkbox", className: "htCenter"},
                {data: "email", width: 520},
                {data: "name", width: 300}
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
        $('#additionButton').click(ScreenEvent.clickAdditionButton); // 추가 버튼
        $('#savingButton').click(ScreenEvent.clickSavingButton); // 저장 버튼
        $('#deletingButton').click(ScreenEvent.clickDeletingButton); // 삭제 버튼
    }
};