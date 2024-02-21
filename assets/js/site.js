/*
Sidebar Action
Pencere genişliği 991px'den küçük ve eşit ise sidebar'ı açar kapatır
*/
function sideBarAction(width) {
  if(width <= '991'){
    $('#sidebar').toggleClass("collapse click",true);
  }else{
    $('#sidebar').toggleClass("collapse click",false);
  }
}



/*------------ PAGE RESIZE ------------*/
$(window).on('resize', function() {
  /* Sidebar Action - Start */
  sideBarAction($('body').width());
});
/*------------ PAGE RESIZE ------------*/


/*------------ PAGE LOAD ------------*/
$(document).ready(function() {

  /* Perfect Scrollbar - Init */
  new PerfectScrollbar('.sidebar-nav');

  /* Sidebar Action - Start */
  sideBarAction($('body').width());
  $('.toggle-btn, .logo-amblem').on('click', function () {
    $('#sidebar').toggleClass("collapse click");
  });
  $('.sidebar-nav, .sidebar-footer').on('mouseover',function () {
    if($('#sidebar').hasClass('click')){
      $('#sidebar').toggleClass("collapse",false);
    }
  }).on('mouseleave',function () {
    if($('#sidebar').hasClass('click')){
      $('#sidebar').toggleClass("collapse",true);
    }
  });
  /* Sidebar Action - End */



});