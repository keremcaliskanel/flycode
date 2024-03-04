
/*
Sidebar Action
Pencere genişliği 991px'den küçük ve eşit ise sidebar'ı açar kapatır
*/
function sideBarAction(width) {

  if(width <= '991'){
    var $sidebar = $('#sidebar').toggleClass("collapse click",true);
    /*console.log($('#sidebar').width());*/
  }else{
    var $sidebar = $('#sidebar').toggleClass("collapse click",false);
    /*console.log($('#sidebar').width());*/
  }

  if ($sidebar.hasClass('click')) {
    $('#header, #main').css('margin-left','115px');
  }else{
    $('#header, #main').css('margin-left','330px');
  }
}

/*------------ BOOTSTRAP TABLE REFRESH FUNCTION ------------*/
function bootstrap_table_refresh(tbl_id) {
  $('#'+tbl_id).bootstrapTable('refresh');
}
/*------------ BOOTSTRAP TABLE REFRESH FUNCTION ------------*/

/*------------ PAGE RESIZE ------------*/
$(window).on('resize', function() {

  /* Sidebar Action - Start */
  sideBarAction($('body').width());

  /* Pencere genişiliği 1200'den büyük ve eşit olduğunda */
  /* Mobil filtre canvas'ı açıksa kapat */
  if($('body').width() >= '1200'){
    if($('#header_filter_mobile').length > 0){
      if($('#header_filter_mobile').hasClass('show')){
        $('#header_filter_mobile').find('.offcanvas-header').find('.btn-close').click();
      }
    }
  }

});
/*------------ PAGE RESIZE ------------*/

/*------------ PAGE LOAD ------------*/
$(document).ready(function() {

  /*const bsOffcanvas = new bootstrap.Offcanvas('#header_filter_mobile');
  bsOffcanvas.show();*/

  /*------------ HEADER BÖLÜMÜNDEKİ FİLTRE SEÇENEKLERİ OFFCANVASI ------------*/
  if($('#header_filter_mobile').length > 0){
    const header_filter_mobile_off_canvas = document.getElementById('header_filter_mobile');
    header_filter_mobile_off_canvas.addEventListener('shown.bs.offcanvas', event => {
      $('#header_filter_mobile').removeClass('d-none d-xl-block').addClass('offcanvas offcanvas-end').attr('data-bs-scroll',true);
      $('#header_filter_mobile').find('.btn-group').removeClass('btn-group').addClass('btn-group-vertical');
    })
    header_filter_mobile_off_canvas.addEventListener('hidden.bs.offcanvas', event => {
      $('#header_filter_mobile').removeClass('offcanvas offcanvas-end').addClass('d-none d-xl-block');
      $('#header_filter_mobile').find('.btn-group-vertical').removeClass('btn-group-vertical').addClass('btn-group');
    });
  }
  /*------------ HEADER BÖLÜMÜNDEKİ FİLTRE SEÇENEKLERİ OFFCANVASI ------------*/
  
  /*------------ LOAD DATA + REFRESH ACTION 1 ------------*/
  function loadData(element,index) {
    var $this = element;
    var url = $this.data('url');
    $.getJSON(url, function(data){
      var veri_tablosu = '<table class="table table-sm table-borderless mb-0 fly_static_table"><tbody>';
      var tablo_satirlari = '';
      $.each(data, function(key, value){
        var tablo_satir_class = '';
        if((key+1) > 2){
          tablo_satir_class += 'collapse collapseTable_'+index;
        }
        tablo_satirlari += '<tr class="'+tablo_satir_class+'">';
        tablo_satirlari += '<td>' + value.kisi_gorsel + '</td>';
        tablo_satirlari += '<td class="w-100 align-middle">' + value.ad_soyad + '</td>';
        tablo_satirlari += '</tr>';
      });
      veri_tablosu += tablo_satirlari;
      veri_tablosu += '</tbody></table>';
      $this.html(veri_tablosu);
    });
  }
  function countData(element,callback) {
    var $this = element;
    var url = $this.data('url');
    $.getJSON(url, function(data){
      var totalCount = data.length;
      callback(totalCount);
    });
  }
  /* sayadaki tüm load_data_containerlara veri yükler  */
  $('.load_data_container').each(function(index){
    if ($(this).length > 0) {
      var index = index+1;
        loadData($(this), index);
        var count_container = $(this).parent().parent().find('span.text_color_blue_flycode');
        countData($(this), function (totalCount) {
            count_container.html(totalCount + ' kişi');
        });
    }
  });
  $(document).on('click', '.refresh', function() {
    /* refresh classına sahip olan elemandan sonraki ilk load_data_container */
    var $obj = $(this).parent().find('div.load_data_container').first();
    if ($obj.length > 0) {
      var index = $(this).data('container-id');
      loadData($obj,index);

      var count_container = $(this).parent().find('span.text_color_blue_flycode');
      countData($obj, function(totalCount) {
        count_container.html(totalCount+' kişi');
      });
    }
  });
  /*------------ LOAD DATA + REFRESH ACTION 1 ------------*/

  /*------------ MENU # DISABLED ------------*/
  $('a[href="#"]').on('click',function (e) { e.preventDefault(); });
  /*------------ MENU # DISABLED ------------*/

  /*------------ NICE SCROLL PLUGIN - INIT ------------*/
  $(".sidebar-nav, .need_scroll").niceScroll({autohidemode:true});

  /*------------ BOOTSTRAP TOOLTIP - INIT ------------*/
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  /*------------ BOOTSTRAP TOOLTIP - INIT ------------*/

  /*------------ NICE SELECT PLUGIN - INIT ------------*/
  $('select[name="slcUnit"]').niceSelect();
  /*------------ NICE SELECT PLUGIN - INIT ------------*/

  /*------------ BOOTSTRAP TABLE PLUGIN - INIT ------------*/
  $('#table1, #table2, #table3, #table_fly').bootstrapTable({ classes: 'table' });
  /*------------ BOOTSTRAP TABLE PLUGIN - INIT ------------*/

  /*------------ SIDEBAR ACTION ------------*/
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
  /*------------ SIDEBAR ACTION ------------*/

  /*------------ DATE RANGE PLUGIN - INIT ------------*/
  if($('#date-range-container').length > 0){
    $('input[name="startDate"], input[name="endDate"]').dateRangePicker({
      autoClose: true,
      inline:true,
      container: '#date-range-container',
      alwaysOpen:true,
      language: 'tr',
      format: 'DD.MM.YYYY',
      separator : '',
      singleMonth: true,
      startOfWeek: 'monday',
      customArrowPrevSymbol: '<i class="far fa-chevron-left fa-lg fa-fw"></i>',
      customArrowNextSymbol: '<i class="far fa-chevron-right fa-lg fa-fw"></i>',
      getValue: function()
      {
        if ($('input[name="startDate"]').val() && $('input[name="endDate"]').val()){
          return $('input[name="startDate"]').val() + ' to ' + $('input[name="endDate"]').val();
        }else{
          return '';
        }
      },
      setValue: function(s,s1,s2)
      {
        /* Tarih Formatını Sorgulama Şekline Göre Düzenler */
        var s1Array = s1.split('.');
        var s1New = s1Array[2]+s1Array[1]+s1Array[0];
        /* Hidden Inputlara Değer Atanır */
        $('input[name="startDate"]').val(s1New);
        
        /* Tarih Formatını Sorgulama Şekline Göre Düzenler */
        var s2Array = s2.split('.');
        var s2New = s2Array[2]+s2Array[1]+s2Array[0];
        /* Hidden Inputlara Değer Atanır */
        $('input[name="endDate"]').val(s2New);

        /* Hidden Inputlara Değer Atandıktan Sonra Post İşlemi Yapılabilir */
        alert('POST DATA: ' + s1New + ' / ' + s2New);

        /* Tarih Aralığı Seçimi Dropdown'u Kapatır */
        bootstrap.Dropdown.getOrCreateInstance('.dropdown_date_range').toggle();
      }
    });
    /* Hidden Inputlarda Değer Var İse Takvimde Seçili Gelmesini Sağlar */
    if($('input[name="startDate"]').data('value') != '' && $('input[name="endDate"]').data('value')){
      var startDate = $('input[name="startDate"]').data('value');
      var endDate = $('input[name="endDate"]').data('value');
      $('input[name="startDate"], input[name="endDate"]').data('dateRangePicker').setDateRange(startDate,endDate);
    }
  }
  /*------------ DATE RANGE PLUGIN - INIT ------------*/

  /*------------ Dropdown Menuden Seçilen Değeri Hidden Inputa Atar - Selectbox gibi çalışır ------------*/
  $(document).on('click', '.dropdown-menu li', function() {
    var val = $(this).data('value');
    var caption = $(this).find('a').text();
    $(this).parent().prev('a.fly_select').find('input[type="hidden"]').val(val);
    $(this).parent().prev('a.fly_select').find('span').text(caption);
  });

  /*------------ YERİNDE MODAL AÇAR ------------*/
  $(document).on('click', '.fly_card_modal', function() {
    $(this).parent().parent().addClass('show');
    $(this).parent().find('a[role="link"]').text('Kapat X').addClass('close');
    $(this).parent().find('.table_scroll').css('height','150px');
    $(this).parent().find('.table_scroll').niceScroll({autohidemode:false}).resize();
    $('[data-bs-toggle="tooltip"]').tooltip('dispose');
  });
  $(document).on('click', '.fly_card_modal.close', function() {
    $(this).parent().parent().removeClass('show');
    $(this).parent().find('a[role="link"]').text('Tümünü Gör').removeClass('close');
    $(this).parent().find('.table_scroll').css('height','auto');
    $(this).parent().find('.table_scroll').niceScroll({autohidemode:false}).remove();
    $('[data-bs-toggle="tooltip"]').tooltip();
  });
  /*------------ YERİNDE MODAL AÇAR ------------*/

  /*------------ FORMUN input-group-text'lerinin GENİŞLİKLERİNİ EN GENİŞ OLANA GÖRE AYARLAR ------------*/
  var max_input_group_text = 0;
  $('#frm_fly .input-group-text').each(function(index){
    var currentWidth = $(this).width();
    if(currentWidth > max_input_group_text){
      max_input_group_text = currentWidth;
    }
  });
  $('#frm_fly .input-group-text').width(max_input_group_text);
  /*------------ FORMUN input-group-text'lerinin GENİŞLİKLERİNİ EN GENİŞ OLANA GÖRE AYARLAR ------------*/

  /*------------ FORM İÇİNDE btn_fix_width CLASS'INA SAHİP TÜM BUTTONLARIN GENİŞLİKLERİ EŞİTLER ------------*/
  var max_btn_fix_width = 0;
  $('#frm_fly .btn_fix_width').each(function(index){
    var currentWidth = $(this).width();
    if(currentWidth > max_btn_fix_width){
      max_btn_fix_width = currentWidth;
    }
  });
  $('#frm_fly .btn_fix_width').width(max_btn_fix_width);
  /*------------ FORM İÇİNDE btn_fix_width CLASS'INA SAHİP TÜM BUTTONLARIN GENİŞLİKLERİ EŞİTLER ------------*/

  /*------------ SAYFADA TAKVİM İÇİN INPUT KULLANILIYORSA ------------*/
  if($('.fly_single_date_container').length > 0){
    $('input[type="text"].fly_single_date').each(function(index){
      $(this).dateRangePicker({
        autoClose: true,
        singleDate : true,
        showShortcuts: false,
        language: 'tr',
        format: 'DD.MM.YYYY',
        singleDate : true,
        singleMonth: true,
        showTopbar: false,
        container: $(this).parent().find('.fly_single_date_container'),
        /*container: $(this).parent().next('.fly_single_date_container'),*/
        customArrowPrevSymbol: '<i class="far fa-chevron-left fa-lg fa-fw"></i>',
        customArrowNextSymbol: '<i class="far fa-chevron-right fa-lg fa-fw"></i>',
      }).bind('datepicker-open',function(){
        
      });
    });
  }
  /*------------ SAYFADA TAKVİM İÇİN INPUT KULLANILIYORSA ------------*/

  /*------------ TABLODA BİR SATIRA TIKLANINCA SEÇİLİ HALE GETİRİLMESİ ------------*/
  $(document).on('click', '#table_fly tr', function() {
    // Seçilen satırdaki diğer satırlardan 'selected' sınıfını kaldır
    $(this).siblings().removeClass('selected');
    // Tıklanan satıra 'selected' sınıfını ekle
    $(this).addClass('selected');
  });
  /*------------ TABLODA BİR SATIRA TIKLANINCA SEÇİLİ HALE GETİRİLMESİ ------------*/

  /*------------ TABLODA SEARCH OLACAKSA ------------*/
  if($('#table_fly').data('search')){
    $('#table_fly').parent().parent().parent().find('.search').addClass('table_fly_search_container');
  }
  /*------------ TABLODA SEARCH OLACAKSA ------------*/

  /*------------ SWEET CONFIRM MODAL ------------*/
  $(document).on('click', '.btn_delete', function() {
    var title = $(this).data('sweet-alert-title');
    Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonColor: "#F0F1F2",
      confirmButtonText: "Evet",
      cancelButtonColor: "#F0F1F2",
      cancelButtonText: "Hayır",
      iconHtml: '<img src="./images/logo-amblem.svg" width="95">'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Kayıt Silinmiştir!",
          confirmButtonColor: "#F0F1F2",
          confirmButtonText: "Tamam",
          iconHtml: '<img src="./images/logo-amblem.svg" width="95">'
        });
      }
    });
  });
  /*------------ SWEET CONFIRM MODAL ------------*/

  /*------------ BİRİMLER FORMUNDAKİ BİRİM LİSTESİ İŞLEMLERİ ------------*/
  $('#frm_fly .empty_list_group').css('min-height',$('#frm_fly #birim_listesi').height());
  /* Birim listesine tıklanınca */
  $(document).on('click', '#frm_birimler #birim_listesi .list-group-item', function() {
    $('input[name="birim_id"]').val($(this).data('id'));
    $('input[name="birim_adi"]').val($(this).text());
    var $this = $(this).parent();
    var url = $this.data('url');
    $.getJSON(url, function(data){
      var list_item = '';
      $.each(data, function(key, value){
        list_item += '<a class="list-group-item list-group-item-action" href="#" data-id="'+value.alt_birim_id+'">'+value.alt_birim_adi+'</a>';
      });
      $('#alt_birim_listesi').removeClass('empty_list_group').css('min-height','auto').html(list_item);
    });
  });
  /* Alt birim listesine tıklanınca */
  $(document).on('click', '#frm_birimler #alt_birim_listesi .list-group-item', function() {
    $('input[name="alt_birim_id"]').val($(this).data('id'));
    $('input[name="alt_birim_adi"]').val($(this).text());
  });
  /*------------ BİRİMLER FORMUNDAKİ BİRİM LİSTESİ İŞLEMLERİ ------------*/

  
  /*------------ TEXTBOX MASK ------------*/
  if($('div.time').length > 0){
    $("div.time input[type=text]").mask("99:99");
  }
  /*------------ TEXTBOX MASK ------------*/


});

























