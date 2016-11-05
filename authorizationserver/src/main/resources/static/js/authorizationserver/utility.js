/**
 * Utility
 * @author Kwangsik You
 */
"use strict";

(function() { var selfName = "Utility"; if (null != window[selfName]) return;

    var verifyJQuery = function(isMessageDisplay) {

        var result = (null != window["jQuery"]);
        if (isMessageDisplay && !result) alert("jQuery 를 참조할 수 없습니다. jQuery 를 Include 해주세요.");
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
         * Empty Array여부
         *
         * 예제) true == Utility.isEmptyArray(null)
         *      true == Utility.isEmptyArray([]])
         *
         * @param array Array
         * @param messageIfTrue String
         * @returns {boolean}
         */
        isEmptyArray: function(array, messageIfTrue) {

            var result = (null == array || 0 >= array.length);

            if (null != messageIfTrue & result) Utility.notification.pushWarning(messageIfTrue);

            return result;
        },

        /**
         * Empty String여부
         *
         * 예제) true == Utility.isEmptyString(null)
         *      true == Utility.isEmptyString("")
         *
         * @param cause
         * @param messageIfTrue String
         * @returns {boolean}
         */
        isEmptyString: function(cause, messageIfTrue) {

            var result = (null == cause || "" == cause);

            if (null != messageIfTrue && result) Utility.notification.pushWarning(messageIfTrue);

            return result;
        },

        /**
         * Coalesce
         *
         * 예제) "default value" == Utility.coalesce(null, "default value");
         *
         * @param cause Object
         * @param defaultValue Object 참고) null 인 경우 기본값으로 "" 을 사용한다.
         * @returns {Object}
         */
        coalesce: function(cause, defaultValue) {

            return (null != cause? cause: (null != defaultValue? defaultValue: ""));
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
         * @returns {Object}
         */
        getValue: function (cause, keys) {

            var result = cause;

            var KEY_ARRAY;
            var LENGTH;

            if (!Utility.isEmptyArray(keys)) {

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
         * @returns {Object}
         */
        coalesceValue: function (cause, keys, defaultValue) {

            return Utility.coalesce(Utility.json.getValue(cause, keys), defaultValue);
        },

        /**
         * Null 값여부
         *
         * 예제) true == Utility.isEmptyValue(null)
         *      true == Utility.isEmptyValue("")
         *
         * @param cause JSON
         * @param keys String (필수)
         * @param messageIfTrue String
         * @returns {boolean}
         */
        isEmptyValue: function(cause, keys, messageIfTrue) {

            var VALUE = Utility.json.getValue(cause, keys);
            var result = Utility.json.isEmptyString(VALUE);

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
         * @returns {JSON}
         */
        serialize: function (parent, additionData, delimiter) {

            var result = null;

            var DELIMITER;

            if (verifyJQuery(true)) {

                result = {};
                DELIMITER = Utility.coalesce(delimiter, ",");

                $.each(parent.find('[name]').serializeArray(), function (index, detail) {

                    var NAME = detail.name;
                    var VALUE = detail.value;

                    if (result.hasOwnProperty(NAME)) {

                        result[NAME] = result[NAME].toString() + DELIMITER + VALUE.toString();
                    } else {

                        result[NAME] = VALUE;
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
         * 요청
         *
         * 예제)
         * Utility.ajax.request({...});
         *
         * @param settings JSON
         */
        request: function(settings) {

            var TYPE = Utility.json.coalesceValue(settings, "type", "get");

            if (null != settings["data"] && "get" != TYPE) {

                settings.data = JSON.stringify(settings.data);
                settings["contentType"] = "application/json";
            }

            if (null == settings["error"]) settings["error"] = Utility.ajax.processRequestError;

            $.ajax(settings);
        },

        /**
         * 응답 오류 처리하기
         *
         * 예제)
         * $.ajax({
         *     ...,
         *     success: function(result, statusText, jqXHR) {
         *
         *         var STATUS = jqXHR.status; // HTTP Status Code
         *
         *         if (200 == STATUS) { // 200. success
         *             ;
         *         else
         *             Utility.ajax.processResponseError(jqXHR, STATUS);
         *     }
         * });
         *
         * @param jqXHR JSON (필수)
         * @param status number (필수)
         * @param messageIfNoContent String
         */
        processResponseError: function(jqXHR, status, messageIfNoContent) {

            if (204 == status) { // 204. nocontent

                if (null != messageIfNoContent) Utility.notification.pushInformation(messageIfNoContent);
            } else if (200 != status) { // 200. success

                alert("요청이 성공하였으나 예상하지 못한 결과입니다. 관리자에게 문의해주세요.\n\n" + JSON.stringify(jqXHR));
            }
        },

        /**
         * 요청 오류 처리하기
         *
         * 예제) $.ajax({..., error: Utility.ajax.processRequestError});
         *
         * @param jqXHR JSON
         */
        processRequestError: function(jqXHR) {

            // if (403 == jqXHR.status) {

                // Utility.notification.pushWarning("로그아웃되어 요청할 수 없습니다. 다시 로그인해주세요.");
                // window.open("/log-in-view", "loginInView", "width=300, height=400"); // TODO 로그인 완료 후 닫기 처리
            // } else {

                alert("요청 결과 오류가 발생했습니다. 관리자에게 문의해주세요.\n\n" + JSON.stringify(jqXHR));
            // }
        }
    };

    // =================================================================================================================
    // Utility Loading 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.loading = {

        self: {open: null, close: null}, // Utility.initialize() 호출시 재설정된다.

        /**
         * Loading 열기
         *
         * 예제) Utility.loading.open();
         */
        open: function() {

            Utility.loading.self.open();
        },

        /**
         * Loading 닫기
         *
         * 예제) Utility.loading.close();
         */
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
    // Utility jQuery 영역
    // -----------------------------------------------------------------------------------------------------------------
    Utility.jquery = {

        /**
         * Empty Val여부
         *
         * 예제) if (Utility.jquery.isEmptyVal($('[name="user-email"]'), "E-mail 항목을 입력하십시오.")) return;
         *
         * @param jQuery Object
         * @param messageIfTrue String
         * @returns {boolean}
         */
        isEmptyVal: function(jQuery, messageIfTrue) {

            var result = Utility.isEmptyString(jQuery.val(), messageIfTrue);
            if (result) jQuery.focus();

            return result;
        }
    }

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