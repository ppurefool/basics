/**
 * Utility Grid - jsGrid
 * 참고) jQuery.min.js 등의 File 을 Include 해야한다.
 *      <div> 의 identifier 는  = (Grid Identifier) + "-pagination" 로 설정한다.
 *      utility.grid.js 에서 이용한다.
 *
 * @author Kwangsik You
 */
"use strict";

(function() {Utility["pagination"] = {

    self: {}, // Utility.pagination.initialize() 호출시 재설정한다.
    totalPage: {},

    /**
     * 초기화하기
     *
     * 예제) Utility.pagination.initialize("grid");
     * @param identifier String
     * @param configuration JSON
     */
    initialize: function(identifier, configuration) {

        if (0 >= $('#' + identifier + '-pagination').length) {

            alert('화면 Page 에 <div id="' + identifier + '-pagination">...</div> 태그가 존재하지 않습니다. 다시 확인해주세요.');
        } else {

            Utility.pagination.self[identifier] = {

                entries: $('#' + identifier + '-pagination>div>div.pull-left>h5'),
                entriesText: "Showing {START} to {END} of {TOTAL_ELEMENTS} entries",
                pages: $('#' + identifier + '-pagination>div>div.pull-right>ul>li'),
                pageOnClick: function () {

                    var pageOffset;
                    var index;

                    if ("not-allowed" == $(this).css("cursor")) return;

                    index = $(this).parent().index();

                    if (0 == index) { // First

                        pageOffset = 0;
                    } else if (1 == index) { // Previous

                        pageOffset = parseInt(Utility.pagination.self[identifier].pages.eq(0).parent().find('[class~="active"]').find('a').text()) - 2;
                    } else if (7 == index) { // Next

                        pageOffset = parseInt(Utility.pagination.self[identifier].pages.eq(0).parent().find('[class~="active"]').find('a').text());
                    } else if (8 == index) { // Last

                        pageOffset = Utility.pagination.totalPage[identifier] - 1;
                    } else { // Page

                        pageOffset = parseInt($(this).text()) - 1;
                    }

                    Utility.pagination.self[identifier].pages.removeClass("active");

                    if (null != configuration && null != configuration["onClick"]) configuration["onClick"](pageOffset);
                }
            };

            if (null != configuration && null != configuration["entriesText"]) Utility.pagination.self[identifier].entriesText = configuration["entriesText"];
            Utility.pagination.self[identifier].pages.find('a').click(Utility.pagination.self[identifier].pageOnClick);
            Utility.pagination.totalPage[identifier] = null;
        }
    },

    clear: function(identifier) {

        Utility.pagination.self[identifier].entries.text("");
        Utility.pagination.self[identifier].pages.addClass("disabled").find('a').css("cursor", "not-allowed");

        // Page Number 를 설정한다.
        for (var index = 2; index < 7; index++) {

            Utility.pagination.self[identifier].pages.eq(index).find('a').text(index - 1);
        }

        Utility.pagination.totalPage[identifier] = null;
    },

    set: function(identifier, data) {

        var PAGE = data["page"];
        var TOTAL_PAGE = data["totalPage"];

        var PAGE_NUMBER = parseInt(PAGE / 5) * 5;

        var thisPageNumber;
        var thisLi;
        var thisA;
        // first=true, last=true, numberOfElements=1, totalElements=1, totalPage=1, page=0, size=10

        // Page Number 를 설정한다.
        for (var index = 2; index < 7; index++) {

            thisPageNumber = PAGE_NUMBER + index - 1;

            thisLi = Utility.pagination.self[identifier].pages.eq(index);
            thisA = thisLi.find('a');

            thisA.text(thisPageNumber);

            if (TOTAL_PAGE >= thisPageNumber) {
                thisLi.removeClass("disabled");

                if ((PAGE + 1) == thisPageNumber) thisLi.addClass("active");
                else thisA.css("cursor", "pointer");
            }
        }

        if (!data["first"]) {

            Utility.pagination.self[identifier].pages.eq(0).removeClass("disabled").find('a').css("cursor", "pointer");
            Utility.pagination.self[identifier].pages.eq(1).removeClass("disabled").find('a').css("cursor", "pointer");
        }

        if (!data["last"]) {

            Utility.pagination.self[identifier].pages.eq(7).removeClass("disabled").find('a').css("cursor", "pointer");
            Utility.pagination.self[identifier].pages.eq(8).removeClass("disabled").find('a').css("cursor", "pointer");
        }

        Utility.pagination.totalPage[identifier] = TOTAL_PAGE;
    },

    getPageOffset: function(identifier) {

        var result = Utility.pagination.self[identifier].pages.eq(0).parent().find('[class~="active"]>a').text();
        return (null != result? parseInt(result) - 1: null);
    },

    setEntriesText: function(identifier, data) {

        var PAGE = data["page"];
        var SIZE = data["size"];
        var TOTAL_ELEMENTS = data["totalElements"];

        var START = PAGE * SIZE + 1;
        var END = (data["last"]? TOTAL_ELEMENTS: (PAGE + 1) * data["size"]);

        Utility.pagination.self[identifier].entries.text(Utility.pagination.self[identifier].entriesText.replace("{START}", START).replace("{END}", END).replace("{TOTAL_ELEMENTS}", TOTAL_ELEMENTS));
    },

    addRow: function(identifier) {

        var START_TEXT_ARRAY = Utility.pagination.self[identifier].entries.text().split(" to ");
        var END_TEXT_ARRAY = START_TEXT_ARRAY[1].split(" of ");
        var TOTAL_ELEMENTS = END_TEXT_ARRAY[1].split(" entries");

        Utility.pagination.self[identifier].entries.text(
            START_TEXT_ARRAY[0] + " to " + (parseInt(END_TEXT_ARRAY[0]) + 1) + " of " + (parseInt(TOTAL_ELEMENTS) + 1) + " entries");
    }
};})();