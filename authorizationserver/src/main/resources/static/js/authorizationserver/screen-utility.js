/**
 * 화면 Utility
 * @author kwangsik
 */
"use strict";

(function() { if (null != window["ScreenUtility"]) return; window["ScreenUtility"] = {

    /**
     * JSON 값 가져오기
     *
     * 예제) "value11" == ScreenUtility.getJSONValue({"key1": {"key11": "value11"}}, "key1.key11")
     *
     * @param cause JSON
     * @param properties String
     * @returns Object
     */
    getJSONValue: function(cause, properties) {

        var result = cause;

        var PROPERTIES;
        var LENGTH;

        if (null != properties && 0 < properties.length) {

            PROPERTIES = properties.split(".");
            LENGTH = PROPERTIES.length;

            for (var index = 0; index < LENGTH; index++) {

                if (null == result) break;
                result = result[PROPERTIES[index]];
            }
        }

        return result;
    },

    /**
     * Coalesce
     *
     * <pre>
     * 예제) ScreenUtility.coalesce(null, "default value");
     * </pre>
     *
     * @param cause
     * @param defaultValue
     * @returns {*}
     */
    coalesce: function(cause, defaultValue) {

        if (null == defaultValue) defaultValue = "";
        return (null == cause? defaultValue: cause);
    },

    /**
     * JSON 값 Coalesce
     *
     * 예제) "value11" == ScreenUtility.coalesceJSONValue({"key1": {"key11": "value11"}}, "key1.key11", "default value")
     *
     * @param cause JSON
     * @param properties String
     * @param defaultValue
     * @returns Object
     */
    coalesceJSONValue: function(cause, properties, defaultValue) {

        var result = cause;

        var PROPERTIES;
        var LENGTH;

        if (null != properties && 0 < properties.length) {

            PROPERTIES = properties.split(".");
            LENGTH = PROPERTIES.length;

            for (var index = 0; index < LENGTH; index++) {

                if (null == result) break;
                result = result[PROPERTIES[index]];
            }
        }

        return ScreenUtility.coalesce(result, defaultValue);
    },

    /**
     * 초기화하기
     * 참고) ax5core, ax5ui-toast, ax5ui-grid, jQuery 등의 javascript file 을 include 해야한다.
     *
     * 예제) "value11" == ScreenUtility.coalesceJSONValue({"key1": {"key11": "value11"}}, "key1.key11", "default value")
     *
     * @param target
     * @returns Object
     */
    initialize: function(target) {

        if (null != window["ax5"]) {

            if (null == target["loading"] && null != ax5["ui"]["mask"]) {

                target["loading"] = new ax5.ui["mask"]({

                    target: document.body,
                    content: '<img src="/images/authorizationserver/spinner-icon.gif" style="height: 300px" />'
                    // content: '<i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i> <h1 class="fa-5x" style="display: inline">Loading</h1>'
                });

                if (null != window["$"]) {

                    $(document)["ajaxStart"](function () {

                        ScreenSetting.loading.open();
                    });

                    $(document)["ajaxStop"](function() {

                        ScreenSetting.loading.close();
                    });
                }
            }

            if (null != ax5["ui"]["toast"]) {

                if (null == target["notification"]) {

                    target["notification"] = new ax5.ui["toast"]({containerPosition: "top-right"});
                }
            }

            if (null != ax5["ui"]["grid"] && null == ax5.ui.grid.formatter["date"]) {

                ax5.ui.grid.formatter["date"] = function() {

                    return (new Date(this.value)).toLocaleString();
                };
            }
        }

        if (null != window["$"]) {

            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

                jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name="_csrf"]').attr("content")); // 참고) fragment.html
            });
        }
    },

    /**
     * Grid 초기화하기
     * 참고) ax5core, ax5ui-grid, jQuery 등의 javascript file 을 include 해야한다.
     *      ESC Key 를 누르지 않고 다른 방법으로 edit mode 탈출시 modified: true,
     *      RowSelector Header 에 전체를 선택하고 선택해제하는 Checkbox 가 없는..
     *
     * 예제)
     * var dataAX5GridIdentifier = "firstGrid";
     *
     * ScreenUtility.initializeGrid(this, dataAX5GridIdentifier, {
     *     target: $('[data-ax5grid="' + dataAX5GridIdentifier + '"]'), // DIV jQuery 객체
     *     columns: [ // 컬럼 목록 설정 // key. Data 바인딩시 Mapping 할 field 이름
     *         {key: "number", label: "번호", width: 0},
     *         {key: "typeName", label: "로그인 유형", width: 120},
     *         {key: "resultName", label: "결과", width: 100},
     *         {key: "address", label: "IP 주소", width: 160},
     *         {key: "registrationDate", label: "등록 일시", width: 170, align: "center", formatter: "date"},
     *         {key: "registrationUserEmail", label: "사용자 E-mail", width: 260}
     *     ],
     *     page: { // 페이지 설정
     *         onChange: function() { // 페이지 변경
     *
     *              DataRequest.inquiry(this.page.selectPage);
     *         }
     *     },
     *     showRowSelector: false // 체크박스 컬럼 표시여부
     * });
     *
     * @param target JSON
     * @param gridIdentifier String
     * @param configuration JSON
     */
    initializeGrid: function(target, gridIdentifier, configuration) {

        if (null == window["ax5"] || null == ax5["ui"]["grid"] || null == window["$"]) return;

        target[gridIdentifier] = new ax5.ui["grid"]();

        target[gridIdentifier].setConfig($.extend(true, {
            target: $('[data-ax5grid="' + gridIdentifier + '"]'), // DIV jQuery 객체
            header: { // Header 설정
                align: "center"
            },
            body: {
                onDataChanged: function() {

                    if (!this.self.config["showRowSelector"]) return;
                    if ("__selected__" == this.key) return;
                    if (this.item["__selected__"]) return;

                    this.self.select(this.dindex);
                }
            },
            page: { // 페이지 설정
                // navigationItemCount: 5,
                // height: 30,
                // display: true,
                firstIcon: '<i class="fa fa-step-backward" aria-hidden="true"></i>',
                prevIcon: '<i class="fa fa-caret-left" aria-hidden="true"></i>',
                nextIcon: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
                lastIcon: '<i class="fa fa-step-forward" aria-hidden="true"></i>'
            },
            multiSort: true,
            showLineNumber: true,
            showRowSelector: true,
            sortable: true
        }, configuration));
    },

    /**
     * Grid Data 정리하기
     * 참고) ax5core, ax5ui-grid 등의 javascript file 을 include 해야한다.
     *
     * 예제) ScreenUtility.clearGridData(GridSetting["firstGrid"]);
     *
     * @param grid Object
     */
    clearGridData: function(grid) {

        if (null == window["ax5"] || null == ax5["ui"]["grid"]) return;

        grid.setData({list: [], page: null});
    },

    /**
     * Grid Data 설정하기
     * 참고) ax5core, ax5ui-grid 등의 javascript file 을 include 해야한다.
     *
     * 예제) ScreenUtility.setGridData(GridSetting["firstGrid"], result);
     *
     * @param grid Object
     * @param result JSON
     */
    setGridData: function(grid, result) {

        if (null == window["ax5"] || null == ax5["ui"]["grid"]) return;
        if (null == result["outputList"]) return;

        grid.setData({
            list: result["outputList"],
            page: {
                currentPage: result["page"],
                pageSize: result["size"],
                totalElements: result["totalElements"],
                totalPages: result["totalPage"]
            }
        });
    },

    /**
     * Grid Data Select
     * 참고) ax5core, ax5ui-grid, jQuery 등의 javascript file 을 include 해야한다.
     *      ScreenUtility.selectingGridData 을 미리 설정한다.
     *
     * 예제) ScreenUtility.selectingGridData = ["key1", "key2"];
     *      ScreenUtility.selectGridData(GridSetting["firstGrid"], "key");
     *
     * @param grid Object
     * @param property String
     */
    selectingGridData: null,
    selectGridData: function(grid, property) {

        if (null == window["ax5"] || null == ax5["ui"]["grid"] || null == window["$"]) return;
        if (null == ScreenUtility.selectingGridData) return;

        var identifiers = $.map(grid.getList(), function(detail) {return detail[property];});
        var selectingIdentifiersLength = ScreenUtility.selectingGridData.length;

        for (var index = 0; index < selectingIdentifiersLength; index++) {

            grid.select($.inArray(ScreenUtility.selectingGridData[index], identifiers));
        }

        identifiers = null;
    },

    /**
     * Warning Push
     *
     * 예제) ScreenUtility.pushWarning("선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.");
     *
     * @param message String
     */
    pushWarning: function(message) {

        ScreenSetting.notification.push({icon: '<i class="fa fa-warning" style="color: greenyellow"></i>', msg: message});
    },

    /**
     * Information Push
     *
     * 예제) ScreenUtility.pushInformation("저장이 완료되었습니다.");
     *
     * @param message String
     */
    pushInformation: function(message) {

        ScreenSetting.notification.push({icon: '<i class="fa fa-info-circle" style="color: steelblue"></i>', msg: message});
    },

    /**
     * 응답 오류 처리하기
     * @param jqXHR JSON
     */
    processResponseError: function(jqXHR) {

        alert("요청이 성공하였으나 예상하지 못한 결과입니다. 관리자에게 문의해주세요.\n\n" + JSON.stringify(jqXHR));
    },

    /**
     * 요청 오류 처리하기
     * @param jqXHR JSON
     */
    processRequestError: function(jqXHR) {

        ScreenUtility.selectingGridData = null;

        if (403 == jqXHR.status) {

            ScreenUtility.pushWarning("로그아웃되어 요청할 수 없습니다. 다시 로그인해주세요."); // TODO
        } else {

            alert("요청시 오류가 발생하였습니다. 관리자에게 문의해주세요.\n\n" + JSON.stringify(jqXHR));
        }
    }};
})();