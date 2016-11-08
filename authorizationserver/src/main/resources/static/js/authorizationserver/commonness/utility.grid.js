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
                    afterChange: function(changes, source) {

                        var length;
                        var grid;

                        if ("edit" != source && "autofill" != source) return;
                        if ("__selected__" == changes[0][1]) return;

                        length = changes.length;
                        grid = Utility.grid.self[identifier];
                        for (var index = 0; index < length; index++) {

                            if (changes[index][2] == changes[index][3]) return;
                            grid.setDataAtRowProp(changes[index][0], "__selected__", true);
                        }
                    },
                    afterOnCellMouseDown: function(event, coords) {

                        var columnIndex = coords.col;
                        var grid;
                        var value;
                        var count;
                        var data;

                        if ("__selected__" != configuration.columns[columnIndex].data || 0 <= coords.row) return;

                        grid = Utility.grid.self[identifier];
                        value = !(0 <= $.inArray(true, grid.getSourceDataAtCol(columnIndex)));
                        count = grid.countSourceRows();
                        data = [];
                        for (var index = 0; index < count; index++) {

                            data[index] = [index, columnIndex, value];
                        }
                        grid.setDataAtCell(data);

                        return false;
                    },
                    columnHeaderHeight: 30,
                    columnSorting: true,
                    data: [],
                    fillHandle: {
                        autoInsertRow: false,
                        direction: "vertical"
                    },
                    multiSelect: false,
                    outsideClickDeselects: false,
                    sortIndicator: true,
                    stretchH: "all",
                    wordWrap: false
                }));

            Utility.grid.selectingKeys[identifier] = null;

            Utility.pagination.initialize(identifier, {
                onClick: (null != PAGINATION_ON_CLICK? PAGINATION_ON_CLICK: null)
            });
        }
    };

    Utility.grid.clear = function(identifier) {

        Utility.grid.self[identifier].loadData([]);

        Utility.pagination.clear(identifier);
    };

    Utility.grid.setData = function(identifier, data) {

        Utility.grid.self[identifier].loadData(data["outputList"]);

        Utility.pagination.setEntriesText(identifier, data);
        Utility.pagination.set(identifier, data);
    };

    Utility.grid.select = function(identifier, key) {

        var selectingKeys = Utility.grid.selectingKeys[identifier];
        var grid;
        var keys;
        var length;
        var rowIndex;

        if (null == selectingKeys) return;
        grid = Utility.grid.self[identifier];
        keys = grid.getDataAtProp(key);
        length = selectingKeys.length;

        for (var index = 0; index < length; index++) {

            rowIndex = $.inArray(selectingKeys[index], keys);
            if (0 <= rowIndex) grid.setDataAtRowProp(rowIndex, "__selected__", true);
        }

        Utility.grid.clearSelectingKeyArray(identifier);
    };

    Utility.grid.addRow = function(identifier, data) {

        Utility.grid.self[identifier].getSourceData().push($.extend(true, {}, data));

        Utility.pagination.addRow(identifier);
    };

    Utility.grid.getData = function(identifier, isSelected) {

        var result = Utility.grid.self[identifier].getSourceData();

        if (isSelected) {

            result = $.grep(result, function(detail) {return detail.__selected__;});
        }

        return result;
    };

    Utility.grid.isSelected = function(identifier, index) {

        return Utility.grid.self[identifier].getSourceDataAtRow(index)["__selected__"];
    };

    Utility.grid.getPageOffset = function(identifier) {

        return Utility.pagination.getPageOffset(identifier);
    };
})();