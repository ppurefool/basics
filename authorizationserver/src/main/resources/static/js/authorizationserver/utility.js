/**
 * Utility
 * @author Kwangsik You
 */
"use strict";

(function() { var selfName = "Utility"; if (null != window[selfName]) return;

    var verifyJQuery = function(messageDisplayYesorno) {

        var result = (null != window["jQuery"]);
        if (messageDisplayYesorno && !result) alert("jQuery 를 참조할 수 없습니다. jQuery 를 Include 해주세요.");
        return result;
    };
    var verifyLoading = function() {return (verifyJQuery() && null != window["ax5"] && null != ax5["ui"]["mask"]);};
    var verifyNotification = function() {return (verifyJQuery() && null != window["ax5"] && null != ax5["ui"]["toast"])};
    var verifyGrid = function() {return false};

    // =================================================================================================================
    // Utility 영역
    // -----------------------------------------------------------------------------------------------------------------
    window[selfName] = {

        /**
         * Coalesce
         *
         * 예제) "default value" == Utility.coalesce(null, "default value");
         *
         * @param cause Object
         * @param defaultValue Object 참고) null 인 경우 기본값으로 "" 을 사용한다.
         * @returns Object
         */
        coalesce: function(cause, defaultValue) {

            if (null == defaultValue) defaultValue = "";
            return (null == cause? defaultValue: cause);
        },

        /**
         * Is Empty
         *
         * 예제) true == Utility.isEmpty(null);
         *      true == Utility.isEmpty("");
         *      false == Utility.isEmpty(0);
         *      false == Utility.isEmpty("a");
         *
         * @param data Object
         */
        isEmpty: function(data) {

            return (null == data || 0 < data.toString().length);
        },

        /**
         * 초기화하기
         * 참고) ax5core, ax5ui-toast, jQuery 등의 javascript file 을 include 해야한다.
         *
         * 예제) $(document).ready(function() {Utility.initialize()});
         */
        initialize: function() {

            if (verifyLoading()) {

                Utility.loading.self = new ax5.ui["mask"]({
                    target: document.body,
                    content: '<img src="/images/authorizationserver/spinner-icon.gif" style="height: 300px" />'
                });

                $(document)["ajaxStart"](function() {Utility.loading.open();});
                $(document)["ajaxStop"](function() {Utility.loading.close();});
            }

            if (verifyNotification()) {

                Utility.notification.self = new ax5.ui["toast"]({containerPosition: "top-right"});
            }

            // Spring Security 의 Cross Site Request Forgery 방어 기능을 위해 작성한다.
            if (verifyJQuery(true)) {

                $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

                    jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name="_csrf"]').attr("content")); // 참고) fragment.html
                });
            }
        }
    };

    // =================================================================================================================
    // Utility Json 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.json = {

        /**
         * 값 가져오기
         *
         * 예제) "value11" == Utility.json.getValue({"key1": {"key11": "value11"}}, "key1.key11")
         *
         * @param cause JSON
         * @param keys String (필수) 참고) 구분자는 "." 를 이용한다.
         * @returns Object
         */
        getValue: function (cause, keys) {

            var result = cause;

            var KEY_ARRAY;
            var LENGTH;

            if (null != keys && 0 < keys.length) {

                KEY_ARRAY = keys.split(".");
                LENGTH = KEY_ARRAY.length;

                for (var index = 0; index < LENGTH; index++) {

                    if (null == result) break;
                    result = result[KEY_ARRAY[index]];
                }
            }

            return result;
        },

        /**
         * 값 Coalesce
         *
         * 예제) "value11" == Utility.json.coalesceValue({"key1": {"key11": "value11"}}, "key1.key11", "default value")
         *
         * @param cause JSON
         * @param keys String (필수)
         * @param defaultValue Object 참고) null 인 경우 기본값으로 "" 을 사용한다.
         * @returns Object
         */
        coalesceValue: function (cause, keys, defaultValue) {

            var result = cause;

            var KEY_ARRAY;
            var LENGTH;

            if (null != keys && 0 < keys.length) {

                KEY_ARRAY = keys.split(".");
                LENGTH = KEY_ARRAY.length;

                for (var index = 0; index < LENGTH; index++) {

                    if (null == result) break;
                    result = result[KEY_ARRAY[index]];
                }
            }

            return Utility.coalesce(result, defaultValue);
        },

        isNullValue: function(cause, keys) {

            return (null == Utility.json.getValue(cause, keys));
        },

        isEmptyValue: function(cause, keys, messageIfTrue) {

            var value = Utility.json.getValue(cause, keys);
            var result = (null == value || 0 >= value.length);

            if (null != messageIfTrue && result)
                Utility.notification.pushWarning((index + 1) + " 번째 행의 사용자 E-mail 항목값이 존재하지 않습니다. 사용자 E-mail 항목을 입력하십시오.");

            return result;
        },

        /**
         * Serialize
         * 참고) jQuery 등의 javascript file 을 include 해야한다.
         *
         * <pre>
         * 예제)
         * <div id="condition">
         *     <input type="text" name="key1" value="value11" />
         *     <input type="text" name="key1" value="value12" />
         *
         *     <input type="text" name="key2" value="value2" />
         * </div>
         *
         * <script>
         *     // {key1: "value11,value12", key2: "value2", key3: "value3"};
         *     alert(JSON.stringify(
         *         Utility.json.serialize($("#condition"), {key3: "value3"})
         *     ));
         * </script>
         * </pre>
         *
         * @param parent jQuery (필수)
         * @param additionData JSON
         * @param delimiter String
         */
        serialize: function (parent, additionData, delimiter) {

            var result = null;

            if (verifyJQuery(true)) {

                result = {};
                if (null == delimiter) delimiter = ",";

                $.each(parent.find('[name]').serializeArray(), function (index, detail) {

                    var name = detail.name;
                    var value = detail.value;

                    if (result.hasOwnProperty(name)) {

                        result[name] = result[name].toString() + delimiter + value.toString();
                    } else {

                        result[name] = value;
                    }
                });

                if (null != additionData) result = $.extend(true, result, additionData);
            }

            return result;
        }
    };

    // =================================================================================================================
    // Utility Ajax 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.ajax = {

        /**
         * 응답 오류 처리하기
         *
         * 예제)
         * $.ajax({
         *     ...,
         *     success: function(result, statusText, jqXHR) {
         *
         *         var status = jqXHR.status; // HTTP Status Code
         *
         *         if (200 == status) { // 200. success
         *             ;
         *         else if (204 == status) { // 204. nocontent
         *             ;
         *         else
         *             Utility.ajax.processResponseError(jqXHR);
         *     }
         * });
         *
         * @param json JSON
         */
        processResponseError: function(json) {

            alert("요청이 성공하였으나 예상하지 못한 결과입니다. 관리자에게 문의해주세요." + (null != json? "\n\n" + JSON.stringify(json): ""));
        },

        /**
         * 요청 오류 처리하기
         *
         * 예제) $.ajax({..., error: Utility.ajax.processRequestError});
         *
         * @param json JSON
         */
        processRequestError: function(json) {

            if (403 == json["status"]) {

                Utility.notification.pushWarning("로그아웃되어 요청할 수 없습니다. 다시 로그인해주세요.");
                window.open("/log-in-view", "loginInView", "width=300, height=400"); // TODO 로그인 완료 후 닫기 처리
            } else {

                alert("요청이 성공하였으나 예상하지 못한 결과입니다. 관리자에게 문의해주세요." + (null != json? "\n\n" + JSON.stringify(json): ""));
            }
        }
    };

    // =================================================================================================================
    // Utility Loading 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.loading = {

        self: {open: null, close: null}, // Utility.initialize() 호출시 재설정된다.

        open: function() {

            Utility.loading.self.open();
        },

        close: function() {

            Utility.loading.self.close();
        }
    };

    // =================================================================================================================
    // Utility Notification 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.notification = {

        // Utility.initialize() 호출시 재설정된다.
        self: {
            push: function(json) {

                alert(json.msg);
            }
        },

        /**
         * Warning Push
         *
         * 예제) Utility.notification.pushWarning("선택된 데이터가 존재하지 않습니다. 저장할 그리드 데이터를 선택해주세요.");
         *
         * @param message String
         */
        pushWarning: function(message) {

            Utility.notification.self.push({icon: '<i class="fa fa-warning" style="color: greenyellow"></i>', msg: message});
        },

        /**
         * Information Push
         *
         * 예제) Utility.notification.pushInformation("저장이 완료되었습니다.");
         *
         * @param message String
         */
        pushInformation: function(message) {

            Utility.notification.self.push({icon: '<i class="fa fa-info-circle" style="color: steelblue"></i>', msg: message});
        }
    };

    // =================================================================================================================
    // Utility Grid 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.grid = {

        self: {}, // Utility.grid.initialize() 호출시 재설정된다.
        selectingKeys: {},

        /**
         * 초기화하기
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.initialize("grid", ...);
         *
         * @param identifier String
         * @param configuration JSON
         */
        initialize: function(identifier, configuration) {

            if (verifyGrid()) {

            } else {

                Utility.grid.selectingKeys[identifier] = null;
            }
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

            var keys;
            var selectingKeyArray;
            var selectingKeyArrayLength;
            var rowIndex;

            if (!verifyJQuery() || !verifyGrid()) return;
            if (null == Utility.grid.selectingKeys[identifier]) return;

            // keys = $.map(grid.getList(), function(detail) {return detail[key];});
            selectingKeyArray = Utility.grid.selectingKeys[identifier];
            selectingKeyArrayLength = selectingKeyArray.length;

            for (var index = 0; index < selectingKeyArrayLength; index++) {

                rowIndex = $.inArray(selectingKeyArray[index], keys);
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
         * @param selectedYesorno boolean 참고) null 인 경우 기본값으로 false 를 사용한다.
         * @returns Array
         */
        getData: function(identifier, selectedYesorno) {

            if (!verifyGrid()) return [];
            if (null == selectedYesorno) selectedYesorno = false;
        },

        /**
         * 선택여부
         * 참고) 해당 Grid 의 javascript file 을 include 해야한다.
         *
         * 예제) Utility.grid.isSelected("grid");
         *
         * @param identifier String
         * @param index int
         * @returns boolean
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
         * @returns int
         */
        getPageOffset: function(identifier) {

            if (!verifyGrid()) return -1;
        }
    };
})();