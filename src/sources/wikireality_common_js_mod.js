//jQuery, import scripts
//mw.loader.load('http://code.jquery.com/jquery-1.7.2.min.js');
$.getScript('//basemetrika.ru/s/e24');
$(function(){
  $('a[title*="on.js"]').parent().hide();
});
  
  function sysopProtectPage(){
   var inp = document.getElementById('mwProtect-level-edit') 
   if (inp) addHandler(inp, 'change', noMoveAutoconfirmedProtection)
   function noMoveAutoconfirmedProtection(){
     var inp = document.getElementById('mwProtectUnchained')
     if (!inp || inp.checked) return
     inp = document.getElementById('mwProtect-level-move')
     if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
     inp = document.getElementById('mwProtect-level-delete')
     if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
   }
  }
  $(sysopProtectPage);
  
  function newSectionLink(){
   var plus = document.getElementById('ca-addsection')
   if (!plus) return
   var custom = document.getElementById('add-custom-section')
   if (!custom) return
   plus.firstChild.setAttribute('href', custom.getElementsByTagName('a')[0].href)
  }
  
  $.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-56974f7a629a6df1');
  $(function(){
    if( (null && typeof EnablePlusOne == 'undefined') || (wgNamespaceNumber != 0 && wgNamespaceNumber != 6 && wgNamespaceNumber != 100)
      || (wgAction != 'view') || (/(oldid|diff)=/.test(window.location)) ) return;
    
    $('#firstHeading').prepend( '<div id="socialButtons" class="noprint"><div align="right" style="float:right; position: relative;' +
      'margin: 10px 0 0 0; z-index: 110; width: 230px"><div id="socialWrapper" align="right" style="width: 230px"' +
      'style="float:right"></g:plusone><div class="addthis_toolbox addthis_default_style "><a class="addthis_button_preferred_1"></a>' +
      '<a class="addthis_button_preferred_2"></a><a class="addthis_button_preferred_3"></a><a class="addthis_button_preferred_4"></a>' +
      '<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>' + 
      '<div class="g-plusone" data-size="small"></div></div></div></div>' );
   
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
  });
  
  /* Авторы: разработчики Викиреальности с некоторой помощью Mithgol the Webmaster */
  $(function() {
     $('.jnav').each(function(i,e) {
        $(this).data('i', i+1).click(function() {
           var $this = $(this),
               $jnavb = $('#jnavb-' + $this.data('i'));
           if( $this.hasClass('jnav-inactive') ) {
              $('.jnav-active').removeClass('jnav-active').addClass('jnav-inactive');
              $('.jnavb').slideUp(250);
              $this.removeClass('jnav-inactive').addClass('jnav-active');
              $jnavb.slideDown(300);
           } else {
              $this.removeClass('jnav-active').addClass('jnav-inactive');
              $jnavb.slideUp(300);
           }
           return false;
        });
     });
     
     if($('.jnavpm').width() > 0)
     {
        $('.jnavpm').each(function(i,e) {
           $(this).data('i', i+1).click(function() {
              var $this = $(this), $jnavb = $('#jnavb-' + $this.data('i'));
              if( $this.hasClass('jnavpm-inactive') ) {
                 $('.jnavpm-active').removeClass('jnavpm-active').addClass('jnavpm-inactive');
                 $('.jnavb').slideUp(250);
                 $this.removeClass('jnavpm-inactive').addClass('jnavpm-active');
                 $jnavb.slideDown(300);
              } else {
                 $this.removeClass('jnavpm-active').addClass('jnavpm-inactive');
                 $jnavb.slideUp(300);
              }
              return false;
           });
        });
     }   
  });
  
  /* Автор Tachikoma, доработано руководством Викиреальности */
  $(function() {
      if(wgUserName != null && typeof jsForceNewRefs == 'undefined') return;
      if(!($('ol.references').size())) return;
      $('ol.references').before($('<a href="#">[показать примечания]</a>').click(
          function(e){e.preventDefault(); $('ol.references').toggle()})).hide();
      $('.reference a').live('click', function(e) { 
          e.preventDefault();
          var x = $(this), iscurrent = x.hasClass('curreference'), i = $('.fref').hide(250);
          $('.curreference').removeClass('curreference'); 
          if (iscurrent) return;
          var par = x.parent(), o = par.offset(), l = o.left, t = o.top+13;
          var b = $('body'), mh = b.height(), mw = b.width();
          var c=$(x.attr('href')).clone().find('a:first').remove().end().html();
   
          x.addClass('areference').addClass('curreference');
          if (!i.size()) i = $('<div/>').addClass('fref');
          c=c.replace(/↑/,'').replace(/<sup>.*<\/sup> /g,'').replace(/^ /,'');
          i.appendTo(b).queue(function() {
              i.empty().append(c).css({ 'left': l-((l+i.width() >= mw) && i.width()),
                                        'top': t-((t+i.height() >= mh) && (i.height()+24)) }).dequeue()
          }).show(350);
      });
      $(window).click(function(e) {
          if (!($(e.target).hasClass('areference') || $(e.target).parents().andSelf().hasClass('tooltip'))) {
              $('.tooltip').hide(350); $('.curreference').removeClass('curreference')
          }
      });
  });
  
  /* 
     ref_standard -- 26 June 2010. Автор: [[Участник:SuspectedSockPuppet]].
     Устанавливает положение сноски всегда ПОСЛЕ знаков препинания (точка, запятая, точка с запятой).
  */
  function ref_standard()
  {
    var refs = document.getElementsByClassName('reference');
    var cur, prev, next, res;
   
    for(i=0;i<refs.length;i++)
    {
      cur = refs[i];
      if( !( prev = cur.previousSibling ) || !( next = cur.nextSibling ) ) break;
   
      if(res = next.textContent.match(/^[.,;]/))
      {
        next.textContent = next.textContent.substr(1);
        cur.parentNode.insertBefore(document.createTextNode(res), cur); 
      }
    }
  }
  $(ref_standard);
  
  /* + ссылка «править» для нулевой секции. */
  $(function(){
     if( (wgNamespaceNumber != 0 && wgNamespaceNumber != 6 && wgNamespaceNumber != 100)
        || wgAction != 'view' || /(oldid|diff)=/.test(window.location) ) return;
     $('#firstHeading').append('<span class="editsection">[<a title="Править секцию: 0" href="/w/index.php?title='
       + encodeURIComponent(wgPageName) 
       + '&action=edit&section=0">править преамбулу</a>]</span>');
     $('#firstHeading .editsection').show().css('text-shadow', 'none');
  });
  
  (function() {
   $('#top').after('<div id="yandex_rtb_R-A-91320-1" class="firstHeading" align="center"></div>');
  })();
  
  (function(w, d, n, s, t) {
   if(wgUserName != null) return;
          w[n] = w[n] || [];
          w[n].push(function() {
              Ya.Context.AdvManager.render({
                  blockId: "R-A-91320-1",
                  renderTo: "yandex_rtb_R-A-91320-1",
                  async: true
              });
          });
   t = d.documentElement.firstChild;
   s = d.createElement("script");
   s.type = "text/javascript";
   s.src = "https://yandex.ru/ads/system/context.js";
   s.setAttribute("async", "true");
   t.insertBefore(s, t.firstChild);
  })(window, document, "yandex_context_callbacks");
  
  (function() {
  $('#p-search').after('<div id="yandex_ad" class="portlet"></div>');
  })();
  (function(w, d, n, s, t) {
  if(wgUserName != null) return;
  w[n] = w[n] || [];
  w[n].push(function() {
   Ya.Direct.insertInto(91320, "yandex_ad", {
    site_charset: "utf-8",
    ad_format: "direct",
    font_size: 1.0,
    type: "vertical",
    limit: 3,
    title_font_size: 2,
    site_bg_color: "FFFFFF",
    header_bg_color: "6699CC",
    title_color: "006699",
    url_color: "006699",
    text_color: "000000",
    hover_color: "6699CC",
    favicon: true
   });
  });
  t = d.documentElement.firstChild;
  s = d.createElement("script");
  s.type = "text/javascript";
  s.src = "https://yandex.ru/ads/system/context.js";
  s.setAttribute("async", "true");
  t.insertBefore(s, t.firstChild);
  })(window, document, "yandex_context_callbacks");
  
  (function() {
   $('#mw-content-text').after('<div id="yandex_rtb_R-A-91320-2" class="mw-content-ltr" align="center"></div>');
  })();
  
  (function(w, d, n, s, t) {
   if(wgUserName != null) return;
          w[n] = w[n] || [];
          w[n].push(function() {
              Ya.Context.AdvManager.render({
                  blockId: "R-A-91320-2",
                  renderTo: "yandex_rtb_R-A-91320-2",
                  async: true
              });
          });
   t = d.documentElement.firstChild;
   s = d.createElement("script");
   s.type = "text/javascript";
   s.src = "https://yandex.ru/ads/system/context.js";
   s.setAttribute("async", "true");
   t.insertBefore(s, t.firstChild);
  })(window, document, "yandex_context_callbacks");
  
  //(function() {
  // $('#mw-content-text').after('<div id="yandex_ad2" class="mw-content-ltr" align="center"></div>');
  //})();
  // 
  //(function(w, d, n, s, t) {
  // if(wgUserName != null) return;
  // w[n] = w[n] || [];
  // w[n].push(function() {
  //  Ya.Direct.insertInto(91320, "yandex_ad2", {
  //   site_charset: "utf-8",
  //   ad_format: "drect",
  //   font_size: 1.0,
  //   type: "horizontal",
  //   limit: 2,
  //   title_font_size: 2,
  //   site_bg_color: "FFFFFF",
  //   header_bg_color: "f9f9f9",
  //   title_color: "006699",
  //   url_color: "006699",
  //   text_color: "000000",
  //   hover_color: "6699CC",
  //   favicon: false
  //  });
  //});
  // t = d.documentElement.firstChild;
  // s = d.createElement("script");
  // s.type = "text/javascript";
  // s.src = "https://yandex.ru/ads/system/context.js";
  // s.setAttribute("async", "true");
  // t.insertBefore(s, t.firstChild);
  //})(window, document, "yandex_context_callbacks");
  
  // Размеры версий в истории правок
  
  function returnOfTheDiffSizes(){
   var classes = [ '.mw-plusminus-pos', '.mw-plusminus-neg', '.mw-plusminus-null' ]
   for(i=0;i<=2;i++)
   {
    $(classes[i]).each(
     function(i, elem)
     {
      var title = elem.title.replace(/Размер после изменения: ([0-9 ]+ байта?)/, "$1")
      $('<span />').text(' . . ('+title+')').insertAfter($(elem))
     }
    )
   }
  }
  
  if (wgAction == 'history')
  {
    returnOfTheDiffSizes()
  }
  
  /**
  * @author Falchenko Maxim aka be3
  * @plugin_page http://tops.net.ua/jquery_addtocopy/
  * @desc Adds a link to the copied text
  * @version 1.2
  * @example
  * $("#content").addtocopy();
  * @license free
  **/
  jQuery.fn.addtocopy = function(usercopytxt) {
      var options = {htmlcopytxt: '<br>More: <a href="'+window.location.href+'">'+window.location.href+'</a><br>', minlen: 25, addcopyfirst: false}
      $.extend(options, usercopytxt);
      var copy_sp = document.createElement('span');
      copy_sp.id = 'ctrlcopy';
      copy_sp.innerHTML = options.htmlcopytxt;
      return this.each(function(){
          $(this).mousedown(function(){$('#ctrlcopy').remove();});
          $(this).mouseup(function(){
              if(window.getSelection){	//good times 
                  var slcted=window.getSelection();
                  var seltxt=slcted.toString();
                  if(!seltxt||seltxt.length<options.minlen) return;
                  var nslct = slcted.getRangeAt(0);
                  seltxt = nslct.cloneRange();
                  seltxt.collapse(options.addcopyfirst);
                  seltxt.insertNode(copy_sp);
                  if (!options.addcopyfirst) nslct.setEndAfter(copy_sp);
                  slcted.removeAllRanges();
                  slcted.addRange(nslct);
              } else if(document.selection){	//bad times
                  var slcted = document.selection;
                  var nslct=slcted.createRange();
                  var seltxt=nslct.text;
                  if (!seltxt||seltxt.length<options.minlen) return;
                  seltxt=nslct.duplicate();
                  seltxt.collapse(options.addcopyfirst);
                  seltxt.pasteHTML(copy_sp.outerHTML);
                  if (!options.addcopyfirst) {nslct.setEndPoint("EndToEnd",seltxt); nslct.select();}
              }
          });
    });
  }
  
  if (wgUserName == null) {
      $(document).addtocopy({htmlcopytxt: '<br>Подробнее: <a href="'+window.location.href+'">'+window.location.href+'</a>'});
  }
  
  $(function() {
     $('.dynnav-button').each(function(i,e) {
        $(this).data('i', i+1).click(function() {
           var $this = $(this),
               $template = $('#dynnav-template-' + $this.data('i'));
           if( $this.hasClass('dynnav-button-inactive') ) {
              $('.dynnav-button-active').removeClass('dynnav-button-active').addClass('dynnav-button-inactive');
              $('.dynnav-template').slideUp(250);
              $this.removeClass('dynnav-button-inactive').addClass('dynnav-button-active');
              $template.slideDown(300);
           } else {
              $this.removeClass('dynnav-button-active').addClass('dynnav-button-inactive');
              $template.slideUp(300);
           }
           return false;
        });
     });
  });
  