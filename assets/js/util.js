var Util = {};

Util.globalTopTip = function(a, b, c, d, e) {
    if ("undefined" != typeof a) {
        null == c && (c = 5e3),
        null == b && (b = "top_success");
        var f = $("#global_top_dialog");
        f.length > 0 && f.remove(),
        f = $('<div id="global_top_dialog" class="global_top_dialog"><div class="left_arrow"></div>' + a + '<div class="right_arrow"></div></div>').appendTo("body"),
        f.addClass(b),
        e && (f.find(".left_arrow").remove(),
        f.find(".right_arrow").remove(),
        f.addClass("noarrow"));
        var g = f.outerWidth();
        d ? f.css("top", $(d).offset().top + "px") : 0 == $("#header").length && f.css("top", "0px"),
        f.css({
            "margin-left": -(.5 * g) + "px"
        }).show(),
        setTimeout(function() {
            f.addClass("show"),
            setTimeout(function() {
                f.removeClass("show"),
                setTimeout(function() {
                    f.fadeOut("slow").remove()
                }, 250)
            }, c)
        }, 50)
    }
}

$.confirm = function(a) {
  var b = $("#global_confirm_window")
    , c = "确定";
  a.okval && (c = a.okval),
  b.length ? (b.find(".dlg-content").html(a.content),
  b.find(".okbtn").html(c)) : b = $("<div id='global_confirm_window' tabindex='-1' class='confirm-box' title='请确认'><div class='dlg-content'>" + a.content + "</div><div class='dlg-buttons'><span class='button default okbtn'>" + c + "</span>&nbsp;&nbsp;<span class='button cancelbtn close'>取消</span></div></div>").appendTo("body"),
  a.width && b.css("width", a.width),
  a.height && b.css("height", a.height),
  b.dialog(),
  $(document).off("keyup.confirm").on("keyup.confirm", function(a) {
      13 == a.keyCode && b.find(".okbtn").trigger("click")
  }),
  b.find(".okbtn").off().on("click", function() {
      b.dialog("close"),
      a.onConfirm && a.onConfirm()
  }),
  b.find(".cancelbtn").off("click.cancel").on("click.cancel", function() {
      a.onCancel && a.onCancel()
  })
}
/**
 * 说明： 在页面指定元素中构建分页条
 * @param curPage 当前第几页
 * @param totalPage 一共有多少页
 * @param clickHandler 点击事件，传入参数为当前第几页
 * @param barCount 分页条共显示多少个按钮
 */
$.fn.pagination = function(curPage, totalPage, records, clickHandler, barCount){
 var pageBarNum = 5;
 if(barCount){
  pageBarNum = barCount;
 }
 var pageToal = '<span style="font-size:14px;position:absolute;left:0;float:left;display:inline-block;padding-left:0;margin:25px 0;border-radius:4px;">共'+ records +'条记录 </span>';
 $(pageToal).appendTo($(this));
 if(totalPage <= 1){
  return;
 }
 var pager = $('<ul></ul>').appendTo($(this));
 var tar = pager.addClass("pagination");
 var start = 1;
 var end = totalPage;
 if(totalPage > pageBarNum){
  var index = Math.floor(pageBarNum/2);
  var start = (curPage-index) > 0 ? (curPage-index) : 1;
  if(totalPage - start < pageBarNum){
   start = totalPage - pageBarNum + 1;
  }
  var end = start + pageBarNum - 1;
 }
 var pageHtml = "";
 if(curPage > 1){
  pageHtml += "<li><a p='" + (curPage - 1) + "'>«</a ></li>";
 }else{
  pageHtml += "<li class='disabled'><a>«</a ></li>";
 }
 if(start >= 2){
  pageHtml += "<li><a p='1'>1</a ></li>";
 }
 if(start >= 3){
  pageHtml += "<li class='disabled ellipsis'><a>...</a ></li>";
 }
 for (var i = start; i <= end; i++) {
  if (i > totalPage)
   break;
  if (i == curPage) {
   pageHtml += '<li class="disabled"><a>' + i + '</a ></li>';
  } else {
   pageHtml += "<li><a p='" + i + "'>" + i + "</a ></li>";
  }
 }
 if(end <= totalPage - 2){
  pageHtml += "<li class='disabled ellipsis'><a>...</a ></li><li><a p='"+totalPage+"'>"+totalPage+"</a ></li>";
 }else if(end <= totalPage - 1){
  pageHtml += "<li><a p='"+ totalPage +"'>"+totalPage+"</a ></li>";
 }
 if(curPage < totalPage){
  pageHtml += "<li><a p='" + (curPage + 1) + "'>»</a ></li>";
 }else{
  pageHtml += "<li class='disabled'><a>»</a ></li>";
 }
 tar.html(pageHtml);
 if(clickHandler){
  tar.find("a[p]").on("click", function(){
   var page = $(this).attr("p");
   clickHandler(parseInt(page));
  });
 }
};

var maskStackCount = 0;
$.mask = function(a) {
    if ("undefined" == typeof a && (a = "open"),
    "open" == a) {
        if (0 == maskStackCount) {
            var b = $("<div id='window-mask' class='window-mask' style='display:none'></div>").appendTo("body");
            b.css({
                width: $(window).width() + "px",
                height: $(window).height() + "px",
                filter: "alpha(opacity=60)"
            }).show(),
            $(window).bind("resize.mask", function() {
                b.css({
                    width: $(window).width() + "px",
                    height: $(window).height() + "px"
                })
            })
        }
        maskStackCount++
    } else
        "close" == a && (maskStackCount--,
        0 == maskStackCount && ($("#window-mask").remove(),
        $(window).unbind("resize.mask")))
}

$.fn.dialog = function(option) {
  var dlgWin = $(this);
  if ("string" == typeof option)
    "close" == option && (dlgWin.find(".dialog-close").trigger("click"),
    null != $("#window-mask") && $("#window-mask").hide());
  else {
    var defaults = {
      fixed: !0,
      closable: !0,
      mask: !0
    };
    option = $.extend(defaults, option),
    option || (option = {});
    var title = "";
    option.title ? title = option.title : dlgWin.attr("title") && (title = dlgWin.attr("title"),
    dlgWin.attr("title", "")),
    dlgWin.addClass("dialog-box").show();
    var closeBtn = $("<div class='dialog-close'>&times;</div>").appendTo(dlgWin);
    closeBtn.bind("click", function() {
      if (!option.onClose || 0 != option.onClose()) {
        $.mask("close"),
        dlgWin.hide(),
        dlgWin.removeClass("dialog-box").find(".dialog-close").remove();
        var title = dlgWin.find(".dialog-title");
        dlgWin.attr("title", title.text()),
        title.remove(),
        $(window).unbind("resize.dialog")
      }
    }),
    dlgWin.find(".close").on("click", function() {
      closeBtn.click()
    }),
    option.closable && closeBtn.show(),
    "" != title && dlgWin.prepend("<h2 class='dialog-title'>" + title + "</h2>"),
    option.mask && $.mask(),
    $(window).bind("resize.dialog", function() {
      var outerWidth = dlgWin.outerWidth()
        , outerHeight = dlgWin.outerHeight()
        , top = 0;
      option.fixed ? (dlgWin.css("position", "fixed"),
      top = ($(window).height() - outerHeight) / 2 + "px") : (dlgWin.css("position", "absolute"),
      top = ($(window).height() - outerHeight) / 2 + $(document).scrollTop() + "px");
      var left = ($(window).width() - outerWidth) / 2 + "px";
      dlgWin.css({
        top: top,
        left: left
      })
    }),
    $(window).trigger("resize.dialog"),
    dlgWin.find(".dialog-title").draggable({
      target: dlgWin
    });
  }
  return dlgWin
}

$.fn.draggable = function(a) {
  var b = {
    target: "default",
    clone: !1,
    undrag: "",
    scroll: !0,
    start: function() {},
    drag: function() {},
    end: function() {}
  }
    , c = $.extend(b, a);
  return $(this).off("mousedown.drag").on("mousedown.drag", function(a) {
    $(document).on("selectstart.drag dragstart", function() {
      return !1
    });
    var b = $(this)
      , d = "string" == typeof c.target && "default" == c.target ? b : c.target
      , e = a.pageX
      , f = a.pageY
      , g = d.offset().left
      , h = d.offset().top;
    c.clone && (d = b.clone().removeAttr("id").css("position", "absolute").offset({
      left: g,
      top: h
    }),
    "function" == typeof c.clone && (c.clone.call(d, a),
    g = 1 * d.css("left").replace("px", ""),
    h = 1 * d.css("top").replace("px", "")),
    c.opacity && d.css("opacity", c.opacity)),
    $(document).on("mousemove.drag", function(a) {
      b.hasClass("ondrag") || (b.addClass("ondrag"),
      c.clone && d.appendTo(b.parent()),
      c.start.call(b[0], a));
      var i = a.pageX - e + g
        , j = a.pageY - f + h;
      if (c.bounding) {
        var k = c.bounding.offset().left
          , l = c.bounding.offset().top;
        i > k && j > l && i < k + c.bounding.outerWidth() - d.outerWidth() && j < l + c.bounding.outerHeight() - d.outerHeight() && d.offset({
          left: i,
          top: j
        })
      } else
        d.offset({
          left: i,
          top: j
        });
      c.drag.call(b[0], a)
    }),
    $(document).on("mouseup.drag", function(a) {
      c.end.call(b[0], a),
      c.clone && d.remove(),
      $(document).off("selectstart.drag dragstart"),
      $(document).off("mousemove.drag"),
      $(document).off("mouseup.drag"),
      $(".drop-hover").length || b.removeClass("ondrag")
    }),
    $(this).on("mouseup.drag", function(a) {
      $(document).trigger("mouseup.drag"),
      $(this).off("mouseup.drag")
    })
  }),
  c.undrag && $(this).find(c.undrag).off("mousemove.drag").on("mousemove.drag", function(a) {
    a.stopPropagation()
  }).on("dragstart", function() {
    return !1
  }),
  this
}