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
 var pageToal = '<span style="font-size:14px;float:left;display:inline-block;padding-left:0;margin:25px 0;border-radius:4px;">共'+ records +'条记录 </span>';
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