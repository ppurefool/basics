/**
 * Utility Combo
 * @author Kwangsik You
 */
"use strict";

(function() { if (null == window["Utility"] || null != Utility["combo"]) return;

    Utility["combo"] = {
        request: function(settings) {

            settings["success"] = function(result, statusText, jqXHR) {

                var STATUS = jqXHR.status; // HTTP Status Code

                if (200 == STATUS) { // 200. success

                    Utility.combo.setData(settings.combo, result);
                }

                if (null != settings.combo["successCallback"]) settings.combo["successCallback"](result, statusText, jqXHR);
            };

            if (null == settings["error"]) settings["error"] = Utility.ajax.processRequestError;

            Utility.ajax.request(settings);
        },

        clearData: function(comboSettings) {

            Utility.combo.setData(comboSettings);
        },

        setData: function(comboSettings, result) {

            var html = [];

            var LENGTH = Utility.json.coalesceValue(result, "outputList.length", 0);
            var detail;
            var OPTION_START;
            var value;
            var VALUE_NAME;
            var VALUE_END;
            var DELIMITER = ". ";
            var TEXT_NAME;
            var OPTION_END;

            if (null != Utility.json.getValue(comboSettings, "combo.emptyValueText")) {
                html[html.length] = '<option value="">';
                html[html.length] = comboSettings.combo.emptyValueText;
                html[html.length] = '</option>';
            }

            if (0 < LENGTH) {

                OPTION_START = '<option value="';
                VALUE_NAME = Utility.json.coalesceValue(comboSettings, "valueName", "key");
                VALUE_END = '">';
                TEXT_NAME = Utility.json.coalesceValue(comboSettings, "textName", "value");
                OPTION_END = '</option>';

                for (var index = 0; index < LENGTH; index++) {
                    detail = result.outputList[index];

                    html[html.length] = OPTION_START;
                    value = Utility.json.coalesceValue(detail, VALUE_NAME, Utility.emptyString);
                    html[html.length] = value;
                    html[html.length] = VALUE_END;
                    html[html.length] = value;
                    html[html.length] = DELIMITER;
                    html[html.length] = Utility.json.coalesceValue(detail, TEXT_NAME, Utility.emptyString);
                    html[html.length] = OPTION_END;
                }
            }

            comboSettings.target.html(html.join(Utility.emptyString));
        }
    };
})();