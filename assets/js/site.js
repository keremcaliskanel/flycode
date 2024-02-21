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
    var $sidebar = $('#sidebar').toggleClass("collapse click");
    if ($sidebar.hasClass('click')) {
      $('#header, #main').css('margin-left','115px');
    }else{
      $('#header, #main').css('margin-left','330px');
    }
  });
  $('.sidebar-nav, .sidebar-footer').on('mouseover',function () {
    if($('#sidebar').hasClass('click')){
      $('#sidebar').toggleClass("collapse",false);
      $('#header, #main').css('margin-left','330px');
    }
  }).on('mouseleave',function () {
    if($('#sidebar').hasClass('click')){
      $('#sidebar').toggleClass("collapse",true);
      $('#header, #main').css('margin-left','115px');
    }
  });
  /* Sidebar Action - End */



});