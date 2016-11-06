/**
 * Utility Grid - jsGrid
 * 참고) jsgrid.min.css, jsgrid-theme.min.css, jsgrid.min.js 등의 File 을 Include 해야한다.
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

        if (null == window["jsGrid"]) {

            alert("jsGrid 관련 File 들이 누락되었습니다. 관리자에게 문의하십시오. : jsGrid is null!");
        } else {

            var HEIGHT_NAME = "height";
            var HEIGHT = $("#jsGrid").css(HEIGHT_NAME);
            if (null == configuration[HEIGHT_NAME] && "0px" != HEIGHT) configuration[HEIGHT_NAME] = HEIGHT;

            $("#" + identifier).jsGrid($.extend(true, {
                // fields: [
                //     {
                //         type: "",
                //         name: "",
                //         title: "",
                //         align: "",
                //         width: 100,
                //         visible: true,
                //
                //         css: "",
                //         headercss: "",
                //         filtercss: "",
                //         insertcss: "",
                //         editcss: "",
                //
                //         filtering: true,
                //         inserting: true,
                //         editing: true,
                //         sorting: true,
                //         sorter: "string",
                //
                //         headerTemplate: function() { ... },
                //         itemTemplate: function(value, item) { ... },
                //         filterTemplate: function() { ... },
                //         insertTemplate: function() { ... },
                //         editTemplate: function(value, item) { ... },
                //
                //         filterValue: function() { ... },
                //         insertValue: function() { ... },
                //         editValue: function() { ... },
                //
                //         cellRenderer: null,
                //
                //         validate: null
                //     }
                // ],
                // data: [],
                //
                autoload: true,// autoload: false,
                // controller: {
                //     loadData: $.noop,
                //     insertItem: $.noop,
                //     updateItem: $.noop,
                //     deleteItem: $.noop
                // },
                //
                width: "100%",// width: "auto", // TODO
                // height: "auto",
                //
                // heading: true,
                // filtering: false,
                // inserting: false,
                // editing: false,
                selecting: false,// selecting: true,
                sorting: true,// sorting: false,
                // paging: false,
                // pageLoading: false,
                //
                // rowClass: function(item, itemIndex) { ... },
                // rowClick: function(args) { ... },
                // rowDoubleClick: function(args) { ... },
                //
                noDataContent: "조회 결과가 존재하지 않습니다.",// noDataContent: "Not found",
                //
                // confirmDeleting: true,
                // deleteConfirm: "Are you sure?",
                //
                // pagerContainer: null,
                // pageIndex: 1,
                // pageSize: 20,
                // pageButtonCount: 15,
                // pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
                // pagePrevText: "Prev",
                // pageNextText: "Next",
                // pageFirstText: "First",
                // pageLastText: "Last",
                // pageNavigatorNextText: "...",
                // pageNavigatorPrevText: "...",
                //
                // invalidNotify: function(args) { ... }
                // invalidMessage: "Invalid data entered!",
                //
                // loadIndication: true,
                // loadIndicationDelay: 500,
                // loadMessage: "Please, wait...",
                // loadShading: true,
                //
                // updateOnResize: true,
                //
                // rowRenderer: null,
                // headerRowRenderer: null,
                // filterRowRenderer: null,
                // insertRowRenderer: null,
                // editRowRenderer: null
            }, configuration));

            Utility.pagination.initialize(identifier, {
                onClick: (null != configuration["onPageClick"]? configuration["onPageClick"]: null)
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

        $("#" + identifier).jsGrid("option", "data", []);

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

        $("#" + identifier).jsGrid("option", "data", data["outputList"]);

        Utility.pagination.set(identifier, data);
    };

    // -----------------------------------------------------------------------------------------------------------------
    // Custom... 영역
    // -----------------------------------------------------------------------------------------------------------------

    Utility.grid.itemTemplate = {

        date: function(value) {

            if (null != value) {

                var date = new Date(value);
                return date.toISOString().substring(0, 10) + " " + date.toTimeString().substring(0, 8);
            } else {

                return null;
            }
        }
    };
})();