/**
 * 변수 JS
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
    },

    clickAdditionButton: function() {

        GridSetting["firstGrid"].addRow({__selected__: true, key: null, value: null, detail: null});
        ScreenUtility.pushInformation(JSON.stringify(GridSetting["firstGrid"].getList("modified")));
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

        var list;
        var length;

        if (0 >= GridSetting["firstGrid"].getList("selected").length) {

            ScreenUtility.pushWarning("선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.");
            return false;
        }

        list = GridSetting["firstGrid"].getList();
        length = list.length;

        for (var index = 0; index < length; index++) {

            if (!list[index]["__selected__"]) continue;

            if (0 >= ScreenUtility.coalesceJSONValue(list[index], "key")) {

                ScreenUtility.pushWarning((index + 1) + " 번째 행의 변수 이름 항목값이 존재하지 않습니다. 변수 이름 항목을 입력하십시오.");
                return false;
            } else if (0 >= ScreenUtility.coalesceJSONValue(list[index], "value")) {

                ScreenUtility.pushWarning((index + 1) + " 번째 행의 변수 값 항목값이 존재하지 않습니다. 변수 값 항목을 입력하십시오.");
                return false;
            } else if (0 >= ScreenUtility.coalesceJSONValue(list[index], "detail")) {

                ScreenUtility.pushWarning((index + 1) + " 번째 행의 변수 내용 항목값이 존재하지 않습니다. 변수 내용 항목을 입력하십시오.");
                return false;
            }
        }

        return true;
    },

    verifyDeletingData: function() {

        if (0 >= DataRequest.getList().length) {

            ScreenUtility.pushWarning("선택된 데이터가 존재하지 않습니다. 삭제할 그리드 데이터를 선택해주세요.");
            return false;
        }

        return true;
    }
};

// Grid 설정
var GridSetting = {

    initialize: function() {

        var dataAX5GridIdentifier = "firstGrid";

        ScreenUtility.initializeGrid(GridSetting, dataAX5GridIdentifier, {
            columns: [ // 컬럼 목록 설정 // key. Data 바인딩시 Mapping 할 field 이름
                {key: "key", label: "변수 이름", width: 170, editor: {type: "text"}},
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
        $('#addButton').click(ScreenEvent.clickAdditionButton); // 추가 버튼
        $('#saveButton').click(ScreenEvent.clickSavingButton); // 저장 버튼
        $('#deleteButton').click(ScreenEvent.clickDeletingButton); // 삭제 버튼
    }
};