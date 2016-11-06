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

    /**
     * 초기화하기
     *
     * 예제) Utility.pagination.initialize("grid");
     * @param identifier String
     * @param configuration JSON
     */
    initialize: function(identifier, configuration) {

        Utility.pagination.self[identifier] = {

            entries: $('#' + identifier + '-pagination>div>div.pull-left>h5'),
            pages: $('#' + identifier + '-pagination>div>div.pull-right>ul>li'),
            pageOnClick: function() {

                var pageOffset;
                var index;

                if ("not-allowed" == $(this).css("cursor")) return;

                index = $(this).parent().index();

                if (0 == index) { // First

                    pageOffset = parseInt(Utility.pagination.self[identifier].pages.eq(2).text()) - 1;
                } else if (1 == index) { // Previous

                    pageOffset = parseInt(Utility.pagination.self[identifier].pages.eq(0).parent().find('[class~="active"]').prev().find('a').text()) - 1;
                } else if (7 == index) { // Next

                    pageOffset = parseInt(Utility.pagination.self[identifier].pages.eq(0).parent().find('[class~="active"]').next().find('a').text()) - 1;
                } else if (8 == index) { // Last

                    pageOffset = parseInt(Utility.pagination.self[identifier].pages.eq(0).parent().find('li:not([class~="disabled"])>a:not([title]):last').text()) - 1;
                } else { // Page

                    pageOffset = parseInt($(this).text()) - 1;
                }

                if (null != configuration && null != configuration["onClick"]) configuration["onClick"](pageOffset);
            }
        };

        Utility.pagination.self[identifier].pages.find('a').click(Utility.pagination.self[identifier].pageOnClick);
    },

    clear: function(identifier) {

        Utility.pagination.self[identifier].entries.text("");
        Utility.pagination.self[identifier].pages.addClass("disabled").find('a').css("cursor", "not-allowed");
    },

    set: function(identifier, data) {

        var PAGE = data["page"];
        var SIZE = data["size"];
        var NUMBER_OF_ELEMENTS = data["numberOfElements"];
        var TOTAL_PAGE = data["totalPage"];

        var START = PAGE * SIZE + 1;
        var END = (data["last"]? NUMBER_OF_ELEMENTS: (PAGE + 1) * data["size"]);
        var PAGE_NUMBER = parseInt((TOTAL_PAGE - 1) / 5) * 5;

        var thisPageNumber;
        var thisLi;
        var thisA;
        // first=true, last=true, numberOfElements=1, totalElements=1, totalPage=1, page=0, size=10

        // 건수를 설정한다.
        Utility.pagination.self[identifier].entries.text("Showing " + START + " to " + END + " of " + NUMBER_OF_ELEMENTS + " entries");

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
    }
};})();