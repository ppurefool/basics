/**
 * Utility Formatter
 * @author Kwangsik You
 */
"use strict";

(function() { if (null == window["Utility"] || null != Utility["formatter"]) return;

    Utility["formatter"] = {
        self: {
            date: {
                delimiter: "-",
                joinDateString: function(cause) {

                    return cause.join(Utility.formatter.self.date.delimiter);
                },
                keyup: function() {

                    var result = Utility.emptyString;

                    var VALUE = $(this).val();
                    var NUMBER_VALUE = VALUE.replace(/[^0-9]/g, Utility.emptyString);
                    var dateArray;
                    var dateIndex;
                    var NUMBER_STRING_ARRAY;
                    var LENGTH;

                    if (Utility.emptyString != NUMBER_VALUE) {

                        dateArray = Utility.formatter.self.date.minimumDate.split(Utility.emptyString);
                        dateIndex = -1;
                        NUMBER_STRING_ARRAY = NUMBER_VALUE.split(Utility.emptyString);
                        LENGTH = NUMBER_STRING_ARRAY.length;

                        for (var index = 0; index < LENGTH; index++) {

                            dateArray[dateIndex + 1] = NUMBER_STRING_ARRAY[index];
                            if (Utility.formatter.isDateString(dateArray.join(Utility.emptyString))) dateIndex++;
                        }

                        if (0 <= dateIndex)
                            result = Utility.formatter.self.date.joinDateString(Utility.formatter.self.date.splitDateString(
                                dateArray.slice(0, dateIndex + 1).join(Utility.emptyString)));
                    }

                    if (VALUE != result) $(this).val(result);
                },
                minimumDate: "19700101",
                splitDateString: function(cause) {

                    var result = [];
                    var LENGTH = cause.length;

                    if (0 < LENGTH) {

                        result[0] = cause.substring(0, 4);
                        if (4 < LENGTH) result[1] = cause.substring(4, 6);
                        if (6 < LENGTH) result[2] = cause.substring(6, 8);
                    }

                    return result;
                }
            }
        },

        isDateString: function(cause) {

            var YEAR;
            var MONTH;
            var DAY;
            var MAXIMUM_DAY;

            if (null == cause || 8 != cause.length) return false;

            YEAR = parseInt(cause.substring(0, 4));
            if (parseInt(Utility.formatter.self.date.minimumDate.substring(0, 4)) > YEAR) return false;
            MONTH = parseInt(cause.substring(4, 6));
            if (0 >= MONTH || 12 < MONTH) return false;
            DAY = parseInt(cause.substring(6, 8));
            MAXIMUM_DAY = (2 == MONTH && (0 == YEAR % 4 && 0 != YEAR % 100 || 0 == YEAR % 400)?
                29: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][MONTH - 1]);

            return (0 < DAY && MAXIMUM_DAY >= DAY);
        },

        clear: function(object) {

            object.attr("maxlength", null);
            object.attr("placeholder", "");
            object.off("keyup");
            object.removeClass("text-center");
        },

        // 날짜
        date: {
            /**
             * 초기화하기
             * @param object jQuery
             */
            initialize: function(object) {

                Utility.formatter.clear(object);

                object.addClass("text-center");
                object.attr("maxlength", 10);
                object.attr("placeholder", "yyyy-mm-dd");
                object.on("keyup", Utility.formatter.self.date.keyup);
            },

            /**
             * Format
             * @param cause String
             * @param delimiterIfTrue boolean 참고) null 인 경우 기본값으로 true 을 사용한다.
             * @returns String
             */
            format: function(cause, delimiterIfTrue) {

                var result;
                var VALUE = cause.replace(/-/g, Utility.emptyString);

                if ((null == delimiterIfTrue || delimiterIfTrue) && Utility.formatter.isDateString(VALUE)) {

                    result = Utility.formatter.self.date.joinDateString(Utility.formatter.self.date.splitDateString(VALUE));
                } else {

                    result = VALUE;
                }

                return result;
            }
        },
    };
})();