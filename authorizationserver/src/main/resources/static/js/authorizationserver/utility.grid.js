/**
 * Utility Grid
 * 참고) Slick Grid 를 이용한다.
 *
 * @author Kwangsik You
 */
"use strict";

(function() { var selfName = "Utility"; if (null == window[selfName] || null == Utility["grid"]) return;

    // =================================================================================================================
    // Utility Grid 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility["grid"] = {

        self: {}, // Utility.grid.initialize() 호출시 재설정된다.
        selectingKeys: {},

        /**
         * 초기화하기
         * 참고) slick.core, slick.grid 등의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.initialize("grid", ...);
         *
         * @param identifier String
         * @param configuration JSON
         */
        initialize: function(identifier, configuration) {

            if (!verifyGrid(true)) return;

            $("#" + identifier).jsGrid({
                width: "100%",
                // height: "400px",
                height: "434px",

                inserting: true,
                editing: true,
                sorting: true,
                paging: true,

                // data: clients,

                fields: [
                    // { name: "Name", type: "text", width: 150, validate: "required" },
                    // { name: "Age", type: "number", width: 50 },
                    // { name: "Address", type: "text", width: 200 },
                    // { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
                    // { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
                    // { type: "control" }

                    {name: "number", title: "번호", width: 100},
                    {name: "typeName", title: "로그인 유형", width: 120},
                    {name: "errorName", title: "오류", width: 100},
                    {name: "address", title: "IP 주소", width: 160},
                    {name: "registrationDate", title: "등록 일시", width: 170},
                    {name: "registrationUserEmail", title: "사용자 E-mail", width: 260}
                ]
            });
        },

        /**
         * 정리하기
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.clear("grid");
         *
         * @param identifier String
         */
        clear: function(identifier) {

            if (!verifyGrid()) return;
        },

        /**
         * Data 설정
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.setData("grid", ...);
         *
         * @param identifier String
         * @param data JSON
         */
        setData: function(identifier, data) {

            if (!verifyGrid()) return;
        },

        /**
         * 선택 Key 배열 정리하기
         *
         * 예제) Utility.grid.clearSelectingKeyArray("grid");
         *
         * @param identifier String
         */
        clearSelectingKeyArray: function(identifier) {

            Utility.grid.setSelectingKeyArray(identifier, null);
        },

        /**
         * 선택 Key 배열 설정
         *
         * 예제) Utility.grid.setSelectingKeyArray("grid", ["key1", "key2"]);
         *
         * @param identifier
         * @param keys
         */
        setSelectingKeyArray: function(identifier, keys) {

            Utility.grid.selectingKeys[identifier] = keys;
        },

        /**
         * 선택하기
         * 참고) 해당 Grid, jQuery 등의 javascript file 을 include 해야한다.
         *      Utility.setSelectingKeyArray() 을 이용하여 선택 Key 배열을 미리 설정해야한다.
         *
         * 예제) Utility.grid.setSelectingKeyArray("grid", ["key1", "key2"]);
         *      Utility.grid.select(GridSetting["firstGrid"], "key");
         *
         * @param identifier String
         * @param key String
         */
        select: function(identifier, key) {

            var KEYS;
            var SELECTING_KEY_ARRAY;
            var SELECTING_KEY_ARRAY_LENGTH;
            var rowIndex;

            if (!verifyJQuery() || !verifyGrid()) return;
            if (null == Utility.grid.selectingKeys[identifier]) return;

            // keys = $.map(grid.getList(), function(detail) {return detail[key];});
            SELECTING_KEY_ARRAY = Utility.grid.selectingKeys[identifier];
            SELECTING_KEY_ARRAY_LENGTH = SELECTING_KEY_ARRAY.length;

            for (var index = 0; index < SELECTING_KEY_ARRAY_LENGTH; index++) {

                rowIndex = $.inArray(SELECTING_KEY_ARRAY[index], KEYS);
                // if (0 <= rowIndex) ;
            }

            Utility.grid.clearSelectingKeyArray(identifier);
        },

        /**
         * 행 추가하기
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.addRow("grid", ...);
         *
         * @param identifier String
         * @param data JSON
         */
        addRow: function(identifier, data) {

            if (!verifyGrid()) return;
        },

        /**
         * Data 가져오기
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.getData("grid");
         *
         * @param identifier String
         * @param isSelected boolean 참고) null 인 경우 기본값으로 false 를 사용한다.
         * @returns Array
         */
        getData: function(identifier, isSelected) {

            if (!verifyGrid()) return [];
            var IS_SELECTED = Utility.coalesce(isSelected, false);
        },

        /**
         * 선택여부
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.isSelected("grid");
         *
         * @param identifier String
         * @param index number
         * @returns {boolean}
         */
        isSelected: function(identifier, index) {

            if (!verifyGrid()) return false;
        },

        /**
         * Page Offset 가져오기
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.getPageOffset("grid");
         *
         * @param identifier String
         * @returns {number}
         */
        getPageOffset: function(identifier) {

            if (!verifyGrid()) return -1;
        },

        /**
         * has No Data
         *
         * 예제) if (Utility.grid.hasNoData("grid", "선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.", true)) return;
         *
         * @param identifier String
         * @param messageIfTrue String
         * @param isSelected boolean 참고) null 인 경우 기본값으로 false 를 사용한다.
         * @returns {boolean}
         */
        hasNoData: function(identifier, messageIfTrue, isSelected) {

            return Utility.isEmptyArray(Utility.grid.getData(identifier, isSelected), messageIfTrue);
        }
    };
})();