/**
 * Utility Formatter
 * @author Kwangsik You
 */
"use strict";

(function() { if (null == window["Utility"] || null != Utility["formatter"]) return;

    Utility["formatter"] = {
        self: {
            date: {
                keyup: function() {

                    var VALUE = $(this).val();
                    var newValue = VALUE.replace(/[^0-9]/g, "");

                    while (!Utility.formatter.isDateString(newValue + "19700101".substring(newValue.length, 8))) {

                        newValue = newValue.substring(0, newValue.length - 1);
                    }

                    newValue = Utility.formatter.formatDateString(newValue, false);
                    if (newValue != VALUE) $(this).val(newValue);
                },
                minimumYear: 1970
            }
        },

        isDateString: function(cause) {

            var YEAR;
            var MONTH;
            var DAY;
            var MAXIMUM_DAY;

            if (null == cause || 8 != cause.length) return false;

            YEAR = parseInt(cause.substring(0, 4));
            if (Utility.formatter.self.date.minimumYear > YEAR) return false;
            MONTH = parseInt(cause.substring(4, 6));
            if (0 >= MONTH || 12 < MONTH) return false;
            DAY = parseInt(cause.substring(6, 8));
            MAXIMUM_DAY = (2 == MONTH && (0 == YEAR % 4 && 0 != YEAR % 100 || 0 == YEAR % 400)?
                29: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][MONTH - 1]);

            return (0 >= DAY || MAXIMUM_DAY < DAY);
        },

        clear: function(object) {

            object.attr("maxlength", null);
            object.attr("placeholder", "");
            object.off("keyup");
            object.removeClass("text-center");
        },

        initializeDate: function(object) {

            Utility.formatter.clear(object);

            object.addClass("text-center");
            object.attr("maxlength", 10);
            object.attr("placeholder", "yyyy-mm-dd");
            object.on("keyup", Utility.formatter.self.date.keyup);
        },

        formatDateString: function(cause, isDateStringIfTrue) {

            var LENGTH;

            if ((null == isDateStringIfTrue || !isDateStringIfTrue) && Utility.formatter.isDateString(cause)) {

                cause = cause.substring(0, 4) + "-" + cause.substring(4, 6) + "-" + cause.substring(6);
            } else {

                LENGTH = cause.length;

                if (6 < LENGTH) cause = cause.substring(0, 4) + "-" + cause.substring(4, 6) + "-" + cause.substring(6);
                else if (4 < LENGTH) cause = cause.substring(0, 4) + "-" + cause.substring(4);
            }

            return cause;
        }
    };
})();