/**
 * Utility Grid - handsontable
 * 참고) handsontable.full.min.css, handsontable.full.min.js, jQuery.min.js 등의 File 을 Include 해야한다.
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
            var HANDSONTABLE_SELECTING = Utility.json.coalesceValue(configuration, "handsontable.selecting", true);
            var COL_HEADERS = "colHeaders";
            var COLUMNS = "columns";
            var AFTER_CHANGE;
            var AFTER_ON_CELL_MOUSE_DOWN;

            if (HANDSONTABLE_SELECTING) {

                configuration[COL_HEADERS] = ['<i class="fa fa-check"></i>'].concat(configuration[COL_HEADERS]);
                configuration[COLUMNS] = [{data: Utility.grid.handsontable.selectedColumnData, width: 30, type: "checkbox", className: "htCenter"}]
                    .concat(configuration[COLUMNS]);

                AFTER_CHANGE = configuration["afterChange"];
                AFTER_ON_CELL_MOUSE_DOWN = configuration["afterOnCellMouseDown"];

                configuration["afterChange"] = function(changes, source) {

                    if (null != AFTER_CHANGE) AFTER_CHANGE(changes, source);
                    Utility.grid.handsontable.checkbox.afterChange(changes, source, identifier,
                        Utility.grid.handsontable.checkbox.selectedColumnData);
                };

                configuration["afterOnCellMouseDown"] = function(event, coords, TD) {

                    if (null != AFTER_ON_CELL_MOUSE_DOWN) AFTER_ON_CELL_MOUSE_DOWN(event, coords, TD);
                    Utility.grid.handsontable.checkbox.afterOnCellMouseDown(event, coords, TD,
                        identifier, 0);
                };
            }

            if (null == Utility.grid.self) Utility.grid.self = {};
            Utility.grid.self[identifier] = new Handsontable(document.getElementById(identifier),
                $.extend(true, Utility.grid.handsontable.defaultConfiguration, configuration));

            Utility.grid.selectingKeys[identifier] = null;

            Utility.pagination.initialize(identifier, Utility.json.getValue(configuration, "pagination"));
        }
    };

    Utility.grid.clear = function(identifier) {

        Utility.grid.self[identifier].loadData(null);

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
            if (0 <= rowIndex) grid.setDataAtRowProp(rowIndex, Utility.grid.handsontable.selectedColumnData, true);
        }

        Utility.grid.clearSelectingKeyArray(identifier);
    };

    Utility.grid.addRow = function(identifier, data) {

        Utility.grid.self[identifier].getSourceData().push($.extend(true, {}, data));

        Utility.pagination.addRow(identifier);
    };

    Utility.grid.getData = function(identifier, isSelected) {

        var result = Utility.grid.self[identifier].getSourceData();

        if (isSelected) result = $.grep(result, function(detail) {return detail[Utility.grid.handsontable.selectedColumnData];});

        return result;
    };

    Utility.grid.isSelected = function(identifier, index) {

        return Utility.grid.self[identifier].getSourceDataAtRow(index)[Utility.grid.handsontable.selectedColumnData];
    };

    Utility.grid.getPageOffset = function(identifier) {

        return Utility.pagination.getPageOffset(identifier);
    };

    Utility.grid.getDataAtRow = function(identifier, index) {

        return Utility.grid.self[identifier].getSourceDataAtRow(index);
    };

    // -----------------------------------------------------------------------------------------------------------------

    Utility.grid["handsontable"] = {
        checkbox: {
            afterChange: function(changes, source, identifier, columnData) {

                var GRID;
                var length;

                if (0 <= "autofill|edit|paste".indexOf(source) && columnData != changes[0][1]) {

                    GRID = Utility.grid.self[identifier];
                    length = changes.length;

                    for (var index = 0; index < length; index++) {

                        if (changes[index][2] == changes[index][3]) return;
                        GRID.setDataAtRowProp(changes[index][0], Utility.grid.handsontable.selectedColumnData, true, "utility-grid");
                    }
                }
            },
            afterOnCellMouseDown: function(event, coords, TD, identifier, columnIndex) {

                var COLUMN_INDEX = coords.col;
                var ROW_INDEX;
                var GRID;
                var COUNT;
                var value;
                var data;

                if (columnIndex == COLUMN_INDEX) {

                    GRID = Utility.grid.self[identifier];
                    COUNT = GRID.countSourceRows();

                    if (0 < COUNT) {

                        ROW_INDEX = coords.row;

                        if (0 <= ROW_INDEX) {

                            GRID.setDataAtCell(ROW_INDEX, COLUMN_INDEX, !GRID.getDataAtCell(ROW_INDEX, COLUMN_INDEX));
                        } else {

                            value = !(0 <= $.inArray(true, GRID.getSourceDataAtCol(COLUMN_INDEX)));
                            data = [];

                            for (var index = 0; index < COUNT; index++) {

                                data[index] = [index, COLUMN_INDEX, value];
                            }

                            GRID.setDataAtCell(data);
                        }
                    }
                }
            },
            selectedColumnData: "__selected__"
        },
        defaultConfiguration: {
            columnHeaderHeight: 30,
            columnSorting: true,
            data: [],
            // disableVisualSelection: "area",
            fillHandle: {
                autoInsertRow: false,
                direction: "vertical"
            },
            fixedColumnsLeft: 1,
            // multiSelect: false,
            outsideClickDeselects: false,
            sortIndicator: true,
            stretchH: "all",
            wordWrap: false
        }
    };
})();