/**
 * Utility Grid - handsontable
 * 참고) handsontable.full.min.css, handsontable.full.min.js 등의 File 을 Include 해야한다.
 *
 * @author Kwangsik You
 */
"use strict";

(function() { if (null == window["Utility"] || null == Utility["grid"]) return;

    // -----------------------------------------------------------------------------------------------------------------
    // Utility Grid 영역
    // -----------------------------------------------------------------------------------------------------------------

    /**
     * 초기화하기
     *
     * 예제) Utility.grid.initialize("grid", ...);
     *
     * @param identifier String
     * @param configuration JSON
     */
    Utility.grid.initialize = function(identifier, configuration) {

        // if (null == Utility["pagination"]) {
        //
        //     alert("utility.pagination.js 등의 File 이 누락되었습니다. 관리자에게 문의하십시오.");
        // } else {
        {
            var PAGINATION_ON_CLICK = Utility.json.getValue(configuration, "pagination.onClick");

            Utility.grid.self = {};
            Utility.grid.self[identifier] = new Handsontable(document.getElementById(identifier),
                $.extend(true, configuration, {
                    columnHeaderHeight: 30,
                    columnSorting: true,
                    data: [],
                    multiSelect: false,
                    afterOnCellMouseDown: function(event, coords) {

                        var columnIndex = coords.col;

                        if ("__selected__" == configuration.columns[columnIndex].data) {

                            var selectedArray = [];
                            selectedArray[0] = [0, columnIndex, true];
                            selectedArray[1] = [1, columnIndex, true];
                            selectedArray[2] = [2, columnIndex, true];
                            selectedArray[3] = [3, columnIndex, true];
                            Utility.grid.self[identifier].setDataAtCell(selectedArray);
                            return false;
                        }
                    },
                    outsideClickDeselects: false,
                    sortIndicator: true,
                    wordWrap: false,
                    // stretchH: "all"
                }));

            Utility.pagination.initialize(identifier, {
                onClick: (null != PAGINATION_ON_CLICK? PAGINATION_ON_CLICK: null)
            });
        }
    };

    /**
     * 정리하기
     * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
     *
     * 예제) Utility.grid.clear("grid");
     *
     * @param identifier String
     */
    Utility.grid.clear = function(identifier) {

        Utility.pagination.clear(identifier);
    };

    /**
     * Data 설정
     * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
     *
     * 예제) Utility.grid.setData("grid", ...);
     *
     * @param identifier String
     * @param data JSON
     */
    Utility.grid.setData = function(identifier, data) {

        Utility.grid.self[identifier].loadData(data["outputList"]);

        Utility.pagination.set(identifier, data);
    };
})();