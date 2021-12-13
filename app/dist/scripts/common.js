$(document).ready(function() {
        
    //$(".nano").nanoScroller();
    
/*
$.ajax({
        url: 'index.php?route=error/not_found/log_error',
        type:'POST',
        dataType: 'json',
        data: {'id:':window.localStorage.getItem("_ym13546952_lsid")},					
        success: function() {						
            },
        error: function(xhr, ajaxOptions, thrownError) {						
            }
});
*/
/* Search */
$('#close_info_nosobakin').bind('click', function() {
        $('.nosobakin_bar').hide();            
        $.ajax({
                url: '/index.php?route=account/transaction/setNoViewSobakBar',
                type: 'post',
                data: '',
                dataType: 'json',
                success: function(json) {                            
                }
            });
        
});
    
/* Search */
$('.button-search').bind('click', function() {
    url = '/index.php?route=product/search';
             
    var filter_name = $('input[name=\'filter_name\']').attr('value')
    
    if (filter_name) {
        url += '&filter_name=' + encodeURIComponent(filter_name);
    }
    
    location = url;
});

$('#header input[name=\'filter_name\']').keydown(function(e) {
    if (e.keyCode == 13) {
        url = '/index.php?route=product/search';
         
        var filter_name = $('input[name=\'filter_name\']').attr('value')
        
        if (filter_name) {
            url += '&filter_name=' + encodeURIComponent(filter_name);
        }
        
        location = url;
    }
});

/* Ajax Cart */
    var hide_cart_timeout = null;
$('#cart > a').bind('click', function() {
    $('#cart').addClass('active');
    
    $.ajax({
        url: '/index.php?route=checkout/cart/update',
        dataType: 'json',
        success: function(json) {
            if (json['output']) {
                $('#cart .content').html(json['output']);
            }
        }
    });			
    
    $('#cart').bind('mouseleave', function() {
                clearTimeout(hide_cart_timeout);
                var that = this;
                hide_cart_timeout = setTimeout(function(){
                    $(that).removeClass('active');
                }, 500);
    });
            $('#cart').bind('mouseenter', function() {
                clearTimeout(hide_cart_timeout);
    });
});

/* Mega Menu */
$('#menu ul > li > a + div').each(function(index, element) {
    // IE6 & IE7 Fixes
    if ($.browser.msie && ($.browser.version == 7 || $.browser.version == 6)) {
        var category = $(element).find('a');
        var columns = $(element).find('ul').length;
        
        $(element).css('width', (columns * 143) + 'px');
        $(element).find('ul').css('float', 'left');
    }		
    
    var menu = $('#menu').offset();
    var dropdown = $(this).parent().offset();
    
    i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
    
    if (i > 0) {
        $(this).css('margin-left', '-' + (i + 5) + 'px');
    }
});

// IE6 & IE7 Fixes
if ($.browser.msie) {
    if ($.browser.version <= 6) {
        $('#column-left + #column-right + #content, #column-left + #content').css('margin-left', '195px');
        
        $('#column-right + #content').css('margin-right', '195px');
    
        $('.box-category ul li a.active + ul').css('display', 'block');	
    }
    
    if ($.browser.version <= 7) {
        $('#menu > ul > li').bind('mouseover', function() {
            $(this).addClass('active');
        });
            
        $('#menu > ul > li').bind('mouseout', function() {
            $(this).removeClass('active');
        });	
    }
}

$('.success img, .warning img, .attention img, .information img').on('click', function() {
    $(this).parent().fadeOut('slow', function() {
        $(this).remove();
    });
});	
    
    //qtipShowroom();
    
    $( "#quickOrderModal" ).on('shown.bs.modal hidden.bs.modal', function(e){
        $('#quickOrderModalResult').hide();
        $('#quickOrderModalForm').show();
    });
    
    // Р¤СѓРЅРєС†РёСЏ РѕР±СЂР°Р±РѕС‚РєРё РєРЅРѕРїРєРё "РєСѓРїРёС‚СЊ РІ РѕРґРёРЅ РєР»РёРє"        
    $('#order_one_click').click(function(){
        
        var btn = $('#order_one_click_btn');
        var product_id = btn.attr('data-product_id');
        var is_checked = btn.attr('data-checked') == 1;
        
        var products = [];
        if (is_checked)
        {
            var divs = $(".related_parts[id*='item_']");

            var related_products = $('input[name="product_id"]', divs);
            var checked_related_products = $('input[name="product_id"]:checked', divs);


            // РґРѕР±Р°РІР»СЏРµРј РѕС‚РјРµС‡РµРЅРЅРѕРµ
            checked_related_products.each(function () {
                    products.push({product_id: $(this).val()});
            });
        }
        else
        {
            products.push({product_id: product_id});
        }
    
        var form = $(this).closest("form"),
            phone = form.find('input[name=callback_phone]').val(),
            phone_error = false,
            msg_error = '';
            
        if (phone == ''){
            phone_error = true;
            msg_error = 'РќРµРѕР±С…РѕРґРёРјРѕ СѓРєР°Р·Р°С‚СЊ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°';
        }

        if (phone.substr(0,5) == '+7 (8'){
            var tel_code = phone.substr(3,5);
            phone_error = true;
            msg_error = 'РџРѕР¶Р°Р»СѓР№СЃС‚Р° РїСЂРѕРІРµСЂСЊС‚Рµ С‚РµР»РµС„РѕРЅРЅС‹Р№ РєРѕРґ, РѕРЅ РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ '+tel_code;
        }             
      
        $('#quickOrderModalForm').find(".hint--error").attr('data-hint', '');
        $('#quickOrderModalForm input[name=\'callback_phone\']').removeClass('has-error');
        
        if (phone_error)
        {
            $('#quickOrderModalForm input[name=\'callback_phone\']').addClass('has-error');
            
            if ($('#quickOrderModalForm').find(".hint--error").length)
            {
                $('#quickOrderModalForm').find(".hint--error").attr('data-hint', msg_error);
            }
            else
            {
                $('#quickOrderModalForm #row_phone').wrap('<span class="hint--error hint--top hint--always" data-hint="'+msg_error+'"></span>');                    
            }
           
        }else{    
            
            var data = {name : form.find('input[name=callback_name]').val(),
                        phone: phone,
                        products: products
                    };

            $.ajax({
                url: '/index.php?route=checkout/checkout/orderOneClick',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(json) {
                    if (typeof json['status'] !== 'undefined' && json['status'] == 'error'){                           
                        if ($('#quickOrderModalForm').find(".hint--error").length){
                            $('#quickOrderModalForm').find(".hint--error").addClass('hint--error-wrap').attr('data-hint', json['result']);
                        }else{
                            $('#quickOrderModalForm').before('<span class="hint--error-wrap hint--error hint--top hint--always" data-hint="'+json['result']+'"></span>');     
                        }                            
                       
                    }else{
                        if (typeof yaCounter13546952 !== 'undefined'){
                            yaCounter13546952.reachGoal('SALE');
                            gtag('event','SALE');
                        }
                        $('#quickOrderModalResult').html(json['result']);
                        $('#quickOrderModalResult').show();
                        $('#quickOrderModalForm').hide();
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $.ajax({
                        url: '/index.php?route=error/not_found/log_order_error',
                        type: 'POST',
                        dataType: 'json',
                        data: {'From': '#order_one_click', 'data': data},
                        success: function () {                                    
                        },

                    });
                }
            });
        }
        return false;
    });
    
    
    $( "#callbackModal" ).on('shown.bs.modal', function(e){
        yaCounter13546952.reachGoal('CLICK-ZVONOK-FORM');
        gtag('event','CLICK-ZVONOK-FORM');
    });
    $( "#callbackModal" ).on('shown.bs.modal hidden.bs.modal', function(e){
        $('#callbackModalResult').hide();
        $('#callbackModalForm').show();
    });
    $('.callback_btn').click(function(){
        var form = $(this).closest("form");
        var phone = form.find('input[name=callback_phone]').val();
        var data = {name : form.find('input[name=callback_name]').val(),
                    phone: phone,
                    comment: form.find('textarea[name=callback_comment]').val(),
                    page: window.location.href 
                };
        
        if ($('#callbackModalForm input[name=callback_phone]').hasClass("tooltipstered")){
            $('#callbackModalForm input[name=callback_phone]').tooltipster('destroy');
        }
        
                
        if (phone == '')
        {
            
            $('#callbackModalForm input[name=callback_phone]')
                .focus()
                .tooltipster({interactive:true,
                                autoClose : false,
                                content: 'РЈРєР°Р¶РёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ'
                            })                                       
                .tooltipster('open');
        }
        else
        {
            if (phone.substr(0,5) == '+7 (8'){
                var tel_code = phone.substr(3,5);                    
                $('#callbackModalForm input[name=callback_phone]')
                .focus()                    
                .tooltipster({interactive:true,  
                                autoClose : false,
                            content: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р° РїСЂРѕРІРµСЂСЊС‚Рµ С‚РµР»РµС„РѕРЅРЅС‹Р№ РєРѕРґ, РѕРЅ РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ '+tel_code
                            })                           
                .tooltipster('open');
        
            }else{                
                $.ajax({
                    url: '/index.php?route=checkout/checkout/orderCallback',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function(json) {
                        if (typeof json['status'] !== 'undefined' && json['status'] == 'error'){                                 
                           $('#callbackModalForm input[name=callback_phone]')
                            .focus()                                
                            .tooltipster({content: json['result']})
                            .tooltipster('open'); 
                            
                        }else{
                            $('#callbackModalResult').html(json['result']);
                            $('#callbackModalResult').show();
                            $('#callbackModalForm').hide();

                            yaCounter13546952.reachGoal('ZAKAZ-ZVONKA'); gtag('event','ZAKAZ-ZVONKA');
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.ajax({
                            url: '/index.php?route=error/not_found/log_order_error',
                            type: 'POST',
                            dataType: 'json',
                            data: {'From': '.callback_btn', 'data': data},
                            success: function () {                                    
                            },

                        });
                    }
                });
            }
        }
        
        return false;
    });
    
    // РљР»РёРє РїРѕ РєРЅРѕРїРєРµ "Р—Р°РєР°Р·Р°С‚СЊ РІРёРґРµРѕРєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЋ РёР· С€РѕСѓСЂСѓРј" РЅР° СЃС‚СЂР°РЅРёС†Рµ-Р»РµРЅРґРёРЅРіРµ РІРёРґРµРѕРєРѕРЅСЃСѓР»СЊС‚Р°С†РёР№
    $('.callback_videoconsult_btn').click(function(){
        var form = $('#callback_videoconsult_form');
        var phone = form.find('input[name=client_phone]').val();            
        var data = {name : form.find('input[name=client_name]').val(),
                    phone: phone,
                    comment: 'Р—Р°РєР°Р· РІРёРґРµРѕР·РІРѕРЅРєР° РёР· С€РѕСѓСЂСѓРјР°',
                    page: window.location.href 
                };
        if (form.find('input[name=client_phone]').hasClass("tooltipstered")){
            form.find('input[name=client_phone]').tooltipster('destroy');
        }
        
        if (phone == '')
        {
            form.find('input[name=client_phone]')
                .focus()
                .tooltipster({content: 'РЈРєР°Р¶РёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ'})
                .tooltipster('open');
        }
        else
        {
            if (phone.substr(0,5) == '+7 (8'){
                var tel_code = phone.substr(3,5);
                form.find('input[name=client_phone]')
                .focus()
                .tooltipster({content: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р° РїСЂРѕРІРµСЂСЊС‚Рµ С‚РµР»РµС„РѕРЅРЅС‹Р№ РєРѕРґ, РѕРЅ РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ '+tel_code})
                .tooltipster('open');  
        
            }else{
                $.ajax({
                    url: '/index.php?route=checkout/checkout/orderCallback',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function(json) {
                        form.html(json['result']);
                                                    
                        yaCounter13546952.reachGoal('ZAKAZ-VIDEO-ZVONKA');
                        gtag('event','ZAKAZ-VIDEO-ZVONKA');

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.ajax({
                            url: '/index.php?route=error/not_found/log_order_error',
                            type: 'POST',
                            dataType: 'json',
                            data: {'From': '.callback_videoconsult_btn', 'data': data},
                            success: function () {                                    
                            },

                        });
                    }
                });
            }
        }
        
        return false;
    });
    
    initPopupCartSpinnerListener();
});

// РћР±СЂР°Р±РѕС‚РєР° РєР»РёРєР° РїРѕ РєРЅРѕРїРєРµ "Р·Р°РєР°Р·Р°С‚СЊ РІРёРґРµРѕ" РёР· РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°
function  call_back_video_product_card(){
        var form = $('.tooltipster-content').find('#callback_videoconsult_form');            
        var phone = form.find('input[name=client_phone]').val();            
        var data = {name : form.find('input[name=client_name]').val(),
                    phone: phone,
                    comment: 'Р—Р°РєР°Р· РІРёРґРµРѕР·РІРѕРЅРєР° РёР· С€РѕСѓСЂСѓРјР°',
                    page: window.location.href 
                };
        if (form.find('input[name=client_phone]').hasClass("tooltipstered")){
            form.find('input[name=client_phone]').tooltipster('destroy');
        }
        
        if (phone == '')
        {
            //form.find('.tel_error').text('РЈРєР°Р¶РёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ');
            
            form.find('input[name=client_phone]')
                    .focus()
                    .tooltipster({content: 'РЈРєР°Р¶РёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ'})
                    .tooltipster('open');                
                    
        }else{
            if (phone.substr(0,5) == '+7 (8'){
                var tel_code = phone.substr(3,5);
                form.find('input[name=client_phone]')
                .focus()
                .tooltipster({content: 'РџРѕР¶Р°Р»СѓР№СЃС‚Р° РїСЂРѕРІРµСЂСЊС‚Рµ С‚РµР»РµС„РѕРЅРЅС‹Р№ РєРѕРґ, РѕРЅ РЅРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ '+tel_code})
                .tooltipster('open');  
        
            }else{
                $.ajax({
                    url: '/index.php?route=checkout/checkout/orderCallback',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function(json) {
                        form.html(json['result']);
                        
                        yaCounter13546952.reachGoal('ZAKAZ-VIDEO-ZVONKA');
                        gtag('event','ZAKAZ-VIDEO-ZVONKA');
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.ajax({
                            url: '/index.php?route=error/not_found/log_order_error',
                            type: 'POST',
                            dataType: 'json',
                            data: {'From': 'call_back_video_product_card()', 'data': data},
                            success: function () {                                    
                            },

                        });
                    }
                });
            }
        }
}


function initPopupCartSpinnerListener()
{
$('.b-popup_cart .input-quantity').on('change', function(){
    recalculateProductQuantityInCart(true);
});
$('.b-popup_cart .spinner').spinner('changing', function() {
    recalculateProductQuantityInCart(true);
});

}

function recalculateProductQuantityInCart(doServerUpdate)
{
var totalNum = 0;
var totalPrice = 0;
var updateCartData = [];
$('.b-popup_cart .input-quantity').each(function(i, input){
    totalNum += parseInt($(this).val());
    totalPrice += $(this).val() * $(this).attr('data-price');
    updateCartData.push({key: $(this).attr('data-cart-key'), num: $(this).val()});
});
var totalPriceHtml = totalPrice.toFixed(0).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
});

$('.cart-total-count').html(totalNum);
$('.checkout-page-total-count').html(totalNum);
$('.b-popup_region-product__quantity').html(totalNum + ' ' + pluralize2(totalNum, 'С‚РѕРІР°СЂ', 'С‚РѕРІР°СЂР°', 'С‚РѕРІР°СЂРѕРІ'));
$('.b-popup_cart__col-goods .b-popup_cart__value').html(totalNum);
$('.c-popup-cart-pic .b-header_cart__value').html(totalPriceHtml + ' <span class="b-header_cart__value-small">СЂСѓР±</span>');
$('.b-nav_cart .b-nav_cart__value').html(totalPriceHtml + ' <span class="b-nav_cart__value-small">СЂСѓР±</span>');
$('.b-popup_cart__col-price .b-popup_cart__value').html(totalPriceHtml + ' СЂСѓР±');
$('.c-header-cart .b-header_cart__value').html(totalPriceHtml + ' <span class="b-header_cart__value-small">СЂСѓР±</span>');

if (doServerUpdate)
{
    $.ajax({
        url: '/index.php?route=checkout/cart/updateCartQuantity',
        type: 'post',
        data: {products: updateCartData},
        dataType: 'json',
        success: function(json) {
        }
    });
}
}


function qtipShowroom()
{
$('.showroom').click(function(){
    yaCounter13546952.reachGoal('CLICK_SHOWROOM');
    gtag('event','CLICK_SHOWROOM');
});
// http://qtip2.com/options#global.defaults
$('.showroom').qtip({
        content: { 
            title: "Р’С‹СЃС‚Р°РІРѕС‡РЅС‹Р№ Р·Р°Р»",
            text: "<a href='/showroom' target='_blank' onclick=\"yaCounter13546952.reachGoal('CLICK_SHOWROOM'); gtag('event','CLICK_SHOWROOM'); return true;\"><img src='/image/showroom_tooltip.jpg'></a><br><a href='/showroom' target='_blank' onclick=\"yaCounter13546952.reachGoal('CLICK_SHOWROOM'); gtag('event','CLICK_SHOWROOM'); return true;\" style='line-height: 16px;'>РџРѕРґСЂРѕР±РЅРµРµ в†’</a>",
            button: true
        },
        hide: {
            fixed: true
        },
        position: {
            my: 'bottom center',  // Position my top left...
            at: 'top center',
            adjust: {
                x: 10
            }
        },
        style: {
            width: 320,
            height: 215,
        },
        events: {
            show: function (event, api) {
                //event.preventDefault(); // Stop it!
                yaCounter13546952.reachGoal('HOVER_SHOWROOM');
                gtag('event','HOVER_SHOWROOM');
            }
        }
    });
}
function qtipOptionDescription()
{
// http://qtip2.com/options#global.defaults
$('.optionDescription').each(function(){
    $(this).qtip({
        content: { 
            //title: $(this).find('.optionDescriptionTitle').html(),
            text: $(this).find('.optionDescriptionText').html(),
            button: true
        },
        hide: {
            fixed: true,
            delay: 200
        },
        position: {
            my: 'bottom center',  // Position my top left...
            at: 'top center',
            adjust: {
                x: 3
            }
        },
        style: {
            classes: 'option_description_qtip',
            width: 320,
            tip: {
                corner: true
            }
        },
        events: {
            show: function (event, api) {
                //event.preventDefault(); // Stop it!
                yaCounter13546952.reachGoal('SHOW_OPTION_DESCRIPTION');
                gtag('event','SHOW_OPTION_DESCRIPTION');
            }
        }
    });
});
}

function addToCartOne(product_id, showpopup) {

    if (Modernizr.mq('only all and (max-width: 809px)'))
    {
        showpopup = false;
    }

$.ajax({
    url: '/index.php?route=checkout/cart/update',
    type: 'post',
    data: 'product_id=' + product_id,
    data: $('.product-info input[type=\'text\'], .product-info input[type=\'hidden\'], .product-info input[type=\'radio\']:checked, .product-info input[type=\'checkbox\']:checked, .product-info select, .product-info textarea'),
    dataType: 'json',
    success: function(json) {
        $('.success, .warning, .attention, .information, .error').remove();
        
        if (json['redirect']) {
            location = json['redirect'];
        }
        
        if (json['error']) {
            if (json['error']['warning']) {
                $('#notification').html('<div class="warning" style="display: none;">' + json['error']['warning'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
                
                $('.warning').fadeIn('slow');
                
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            }
        }	 
                    
        if (json['success']) {
//				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
            
//				$('.success').fadeIn('slow');
//				
//				$('#cart_total').html(json['total']);
//				
//				$('html, body').animate({ scrollTop: 0 }, 'slow'); 

                            $('#cart_total').html(json['total']);
            
                            $('#cart_block').html(json['output']);
                            
                            $('.cart-total-count').html(json['total_count']);
                            var total_price = json['total_price'].toFixed(0).replace(/./g, function(c, i, a) {
                                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
                                });
                            $('.b-header_cart .b-header_cart__value').html(total_price + ' <span class="b-header_cart__value-small">СЂСѓР±</span>');
                            $('.b-nav_cart__value').html(total_price + ' <span class="b-nav_cart__value-small">СЂСѓР±</span>');
                            
                            if (showpopup == true)
                            {
                                $('#cartAddedModal .modal-content').html('');
                                $('#cartAddedModal .modal-content').html(json['modal_content']);
                                $('#cartAddedModal').modal();
                                setTimeout(function(){
                                    App.Cart.initCarouselPopup();
                                }, 200);
                            }
                            
                            initPopupCartSpinnerListener();
                            
        }	
    }
});
}

function addToCartByTarget(target)
{
link = $(target);
product_id = $(link).attr('data-product_id');
    
showpopup = $(link).attr('data-showpopup') != 0;
showheaderCart = $(link).attr('data-showheaderCart') == 1;

$(link).html('Р’ РєРѕСЂР·РёРЅРµ');
$(link).addClass('btn').removeClass('btn-fill').addClass('btn-in-cart')
        .attr('href', '/index.php?route=checkout/quickcheckout')
        .attr('onClick', '');

// Р”Р»СЏ popup'Р°  Р”РѕР±Р°РІР»РµРЅРѕ РІ РєРѕСЂР·РёРЅСѓ Рё РљРѕСЂР·РёРЅР° (slick РєР°СЂСѓСЃРµР»СЊ)
$('.slick-slide.item_'+product_id+' a[data-product_id]').addClass('btn').removeClass('btn-fill').addClass('btn-in-cart')
        .attr('href', '/index.php?route=checkout/quickcheckout')
        .attr('onClick', '');

$('li#item_'+product_id).find('.b-product-cart-catalog__col-4').css({display: 'none'});
$('li#item_'+product_id).find('.b-product-cart-catalog__col-5').css({display: 'block'});

addToCart(product_id, showpopup, showheaderCart);
}

function setButtonInCart(target)
{
if (Modernizr.mq('only all and (max-width: 809px)'))
{
    link = $(target);
    $(link).html('Р’ РєРѕСЂР·РёРЅРµ');
    $(link).addClass('btn').removeClass('btn-fill').addClass('btn-in-cart')
            .attr('href', '')
            .attr('onClick', 'return false;');
}
}

function queryStringToJSON(queryString) {
if(queryString.indexOf('?') > -1){
queryString = queryString.split('?')[1];
}
var pairs = queryString.split('&');
var result = {};
pairs.forEach(function(pair) {
pair = pair.split('=');
result[pair[0]] = decodeURIComponent(pair[1] || '');
});
return result;
}

function addToCart(product_id, showpopup, showheaderCart) {

//console.log(showheaderCart);

var showpopup = typeof showpopup !== 'undefined' ?  showpopup : true;
var showheaderCart = typeof showheaderCart !== 'undefined' ?  showheaderCart : false;

if (Modernizr.mq('only all and (max-width: 809px)'))
{
    showpopup = false;
}

var send_data = {};
    
// РїРѕРєСѓРїРєР° РєРѕРјРїР»РµРєС‚Р° РїРѕ С‡Р°СЃС‚СЏРј, СЃСЂР°Р·Сѓ РЅРµСЃРєРѕР»СЊРєРѕ С‚РѕРІР°СЂРѕРІ
if (product_id instanceof Array)
{
    send_data = {'products': []};
    for (var i = 0; i < product_id.length; i++) {
        var one_product_id = product_id[i];


        var one_send_data = $('#item_' + one_product_id  + ' input[type=\'text\'], #item_' + one_product_id  + ' input[type=\'hidden\'], #item_' + one_product_id  + ' input[type=\'radio\']:checked, #item_' + one_product_id  + ' input[type=\'checkbox\']:checked, #item_' + one_product_id  + ' select, #item_' + one_product_id  + ' textarea');
        one_send_data = one_send_data.serializeArray();

        //console.log('#item_' + one_product_id  + ' input[type=\'text\'], #item_' + one_product_id  + ' input[type=\'hidden\'], #item_' + one_product_id  + ' input[type=\'radio\']:checked, #item_' + one_product_id  + ' input[type=\'checkbox\']:checked, #item_' + one_product_id  + ' select, #item_' + one_product_id  + ' textarea');
        
        //send_data.products.push(queryStringToJSON(one_send_data));
        send_data.products.push(one_send_data);
    }
}
else
{
    send_data = $('#item_' + product_id  + ' input[type=\'text\'], #item_' + product_id  + ' input[type=\'hidden\'], #item_' + product_id  + ' input[type=\'radio\']:checked, #item_' + product_id  + ' input[type=\'checkbox\']:checked, #item_' + product_id  + ' select, #item_' + product_id  + ' textarea');
}

    

$.ajax({
    url: '/index.php?route=checkout/cart/update',
    type: 'post',
    data: send_data,
    dataType: 'json',
    success: function(json) {
        $('.success, .warning, .attention, .information, .error').remove();
        
        if (json['redirect']) {
            location = json['redirect'];
        }
        
        if (json['error']) {
            if (json['error']['warning']) {
                //$('#notification').html('<div class="warning" style="display: none;">' + json['error']['warning'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
                
                //$('.warning').fadeIn('slow');
                
                //$('html, body').animate({ scrollTop: 0 }, 'slow');
            }
        }	 
                    
        if (json['success']) {
            //$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
            
            //$('.success').fadeIn('slow');
            
            $('#cart_total').html(json['total']);
            
                            $('#cart_block').html(json['output']);
                            
                            $('.cart-total-count').html(json['total_count']);
                            var total_price = json['total_price'].toFixed(0).replace(/./g, function(c, i, a) {
                                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
                                });
                            $('.b-header_cart .b-header_cart__value').html(total_price + ' <span class="b-header_cart__value-small">СЂСѓР±</span>');
                            $('.b-nav_cart__value').html(total_price + ' <span class="b-nav_cart__value-small">СЂСѓР±</span>');
                            
                            if (showpopup == true)
                            {
                                $('#cartAddedModal .modal-content').html('');
                                $('#cartAddedModal .modal-content').html(json['modal_content']);
                                
                                $('#cartAddedModal').modal();
                                $('#cartAddedModal').on('shown.bs.modal', function() {
                                    setTimeout(function(){
                                        App.Cart.initCarouselPopup();
                                        setTimeout(function(){
                                            $('.modal .b-showcase-tab__tab-content.active').animate(
                                                {opacity: 100},
                                                200
                                            )
                                        }, 100);
                                    }, 100);
                                });
                                $('#cartAddedModal').on('hidden.bs.modal', function() {
                                    setTimeout(function(){
                                        App.Cart.slickPauseAllPopupAddCart();
                                    }, 100);
                                });
                            }
                            
                            if (showheaderCart == true)
                            {
                                setTimeout(function(){
                                    App.Cart.initCarousel();
                                    App.Cart.initScrollBar();
                                    App.Cart.show();
                                }, 200);
                            }
                                
                            initPopupCartSpinnerListener();
                            
        }	
    }
});
}

function removeCart(key) {
$.ajax({
    url: '/index.php?route=checkout/cart/update',
    type: 'post',
    data: 'remove=' + key,
    dataType: 'json',
    success: function(json) {
        $('.success, .warning, .attention, .information').remove();
        
//			if (json['output']) {
//				$('#cart_total').html(json['total']);
//				
//				$('#cart .content').html(json['output']);
//			}	

                
                $('#popup_cart_item_' + key).remove();
                recalculateProductQuantityInCart(false);
    }
});
}

function removeVoucher(key) {
$.ajax({
    url: '/index.php?route=checkout/cart/update',
    type: 'post',
    data: 'voucher=' + key,
    dataType: 'json',
    success: function(json) {
        $('.success, .warning, .attention, .information').remove();
        
        if (json['output']) {
            $('#cart_total').html(json['total']);
            
            $('#cart .content').html(json['output']);
        }			
    }
});
}

function addToWishList(product_id) {
$.ajax({
    url: '/index.php?route=account/wishlist/update',
    type: 'post',
    data: 'product_id=' + product_id,
    dataType: 'json',
    success: function(json) {
        $('.success, .warning, .attention, .information').remove();
                    
        if (json['success']) {
            $('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
            
            $('.success').fadeIn('slow');
            
            $('#wishlist_total').html(json['total']);
            
            $('html, body').animate({ scrollTop: 0 }, 'slow'); 				
        }	
    }
});
}

function addToCompare(product_id) { 
$.ajax({
    url: '/index.php?route=product/compare/update',
    type: 'post',
    data: 'product_id=' + product_id,
    dataType: 'json',
    success: function(json) {
        $('.success, .warning, .attention, .information').remove();
                    
        if (json['success']) {
            $('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
            
            $('.success').fadeIn('slow');
            
            $('#compare_total').html(json['total']);
            
            $('html, body').animate({ scrollTop: 0 }, 'slow'); 
        }	
    }
});
}


// ----------------------- Littlespicy --------------------- //

function addToCartChecked(set_id, mode) { // mode = 1, РµСЃР»Рё С‚РѕРІР°СЂ РЅР° СЃС‚СЂР°РЅРёС†Рµ СЏРІР». РєРѕРјРїР»РµРєС‚РѕРј

var divs = $(".related_parts[id*='item_']");

var related_products = $('input[name="product_id"]', divs);
var checked_related_products = $('input[name="product_id"]:checked', divs);


// РґРѕР±Р°РІР»СЏРµРј РѕС‚РјРµС‡РµРЅРЅРѕРµ
    var product_id = [];
checked_related_products.each(function () {
    product_id.push($(this).val());
    
});
    if (product_id.length == 1)
    {
        product_id = product_id[0];
    }

    addToCart(product_id, true);
}

//СЃСѓРјРјР°, РЅР° РєРѕС‚РѕСЂСѓСЋ РІС‹Р±СЂР°РЅС‹ С‚РѕРІР°СЂС‹
function process_checked_products () {
    
var p = 0;
    var num = 0;
var re = /(\D+)/g;

// РѕС‡РёС‰Р°РµРј РїРѕРјРµС‚РєРё (РѕСЃРЅ. С‚РѕРІР°СЂ, РєРѕРјРїР»РµРєС‚)
$("div#sel span#notice").html("");

// РїР°СЂСЃРёРј РїСЂР°Р№СЃ РѕСЃРЅ. С‚РѕРІР°СЂР° РёР· РєРѕРЅС‚РµР№РЅРµСЂР°, С‚.Рє. СЋР·РµСЂ РјРѕРі РІС‹Р±СЂР°С‚СЊ РµРіРѕ РѕРїС†РёСЋ, Рё РµРµ С†РµРЅР° РґСЂСѓРіР°СЏ
//	var main_price = $("div.product-info .price").html();
//	var mp = parseInt (main_price.replace (re, ""));

$(".related_parts[id*='item_']").each (function() {

    var add_price = $(".related_add_price", this).val();
    var set = $(".related_set", this).val();

    if ($("input[name='product_id']", this).prop('checked'))
    {
        var pr = $(".price", this).html();
                    var prNew = $(this).find('.price.price-new');
                    if (prNew.length != 0)
                    {
                        pr = $(".price.price-new", this).html();
                    }
                    
        var pr_orig = pr.replace (re, "");
        p += parseInt (pr_orig);
                    num++;
    }
});

$("#sum #sum_value").html(p.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
    }));
    
    $('.checked_items').html(pluralize2(num, 'Р’С‹Р±СЂР°РЅР°', 'Р’С‹Р±СЂР°РЅС‹', 'Р’С‹Р±СЂР°РЅРѕ')+' <span class="total-items">'+num+' '+pluralize2(num, 'РїРѕР·РёС†РёСЏ', 'РїРѕР·РёС†РёРё', 'РїРѕР·РёС†РёР№')+'</span>');
}

//function pr (p) { var re = /(\d+)/; var str = $("div.price").html(); var newpr = str.replace(re, p); $("div.price").html(newpr); }

// С†РµРЅР°
function pr (p) {
var re = /(\d+)/; 
var str = $("div.product-info .price").html(); 
var newpr = str.replace(re, p); 
$("div.product-info > .price").html(newpr);
}

// С†РµРЅС‹ СЃРѕРїСѓС‚СЃС‚РІ. С‚РѕРІР°СЂРѕРІ
function relpr (c) {
$("div.related_parts[id*='item_']").each (function() {

    var price = $(".related_price_" + c, this).val(); // РѕСЂРёРі. С†РµРЅР°
    // РїРѕРєР°Р·С‹РІР°РµРј РѕСЂРёРі. С†РµРЅСѓ
    $(".price", this).html(price);

    var price_diff = $(".related_price_diff_" + c, this).val(); // РґРѕР±Р°РІРєР°
    if (price_diff != undefined && price_diff > 0)
    {
        var prefix = $(".related_prefix_" + c, this).val(); // РїСЂРµС„РёРєСЃ

        var re = /(\D+)/g;
        // РѕС‡РёС‰Р°РµРј РґРѕР±Р°РІРєСѓ
        var price_diff_orig = price_diff.replace(re, "");
        //РѕС‡РёС‰Р°РµРј СЃР°РјСѓ С†РµРЅСѓ
        var price_orig = price.replace(re, "");
        // РїРѕРґСЃС‡РёС‚С‹РІР°РµРј РЅРѕРІСѓСЋ С†РµРЅСѓ
        eval ("var new_orig_price = parseInt(price_orig)" + prefix + "parseInt(price_diff_orig);");
        //РїСЂРѕРїРёСЃС‹РІР°РµРј РµРµ РІ div
        var re = /(\d+)/;
        var new_price = price.replace(re, new_orig_price); $(".price", this).html(new_price);
    }
});
}

// С†РІРµС‚ С‚РѕРІР°СЂР°
function co (s,n) {
$(".product-info > .left .image img#image").attr("src", s); $(".product-info > .left .image a").attr("href", s); $(".related_part_color").html(n);
}

// С†РІРµС‚ С‚РѕРІР°СЂР° 2
function co2 (s,n, a, id, s_big) 
{
if (typeof(s_big)==='undefined') s_big = '';

var img_src = s;
var a_href = s_big;
if (a_href == '')
{
    a_href = img_src;
}

    $('.category-color-img-a-'+id).removeClass('category-color-img-a-selected').addClass('category-color-img-a');
    $(a).addClass('category-color-img-a-selected');

$(".product-info > .left .image img#image").attr("src", img_src); $(".product-info > .left .image a").attr("href", a_href); $(".related_part_color").html(n);
}


function reset (s,u) { so(null); im(s); $(".image a").attr("href", u); $("div.price").html("' . $price . '"); }
                    
// С†РІРµС‚ СЃРѕРїСѓС‚СЃС‚РІ. С‚РѕРІР°СЂРѕРІ
function rco (oid) {
$("div.related_parts[id*='item_']").each (function() {
    var thumb = $('#thumb_'+oid, this).val();
    var photo = $('#photo_'+oid, this).val();
    if (thumb != undefined && photo != undefined)
    {
        $('.image img', this).attr("src", thumb);
        $('.image a', this).attr('href', photo);
    }
});
}

//function so (id) { $(".options select").val(""); $(".options input").attr("checked", false); if (id) { var id = "#option-value-" + id; $(id).attr("selected", true); $(id).attr("checked", true); } }

function im (s) { $(".image img#image").attr("src", s); $(".image a").attr("href", s); }

// РІС‹РґРµР»РµРЅРёРµ РѕРїС†РёР№
function so (id, c) {
$(".options select").val(""); $(".options input").attr("checked", false); $('span[class*="col_"]').attr("checked", false); $('span[class*="col_"]').attr("selected", false); 
if (id) { var id = "#option-value-" + id; $(id).attr("selected", true); $(id).attr("checked", true); $(".col_" + c).attr("checked", true); $(".col_" + c).attr("selected", true); }
}

// СЂРµСЃРµС‚
function rst (s,n,c,u) {
so(null,null); co(s,n); $(".image a").attr("href", u); $("div.product-info .price").html("");
}

// ----------------------- / Littlespicy --------------------- //


var isMobile = {
Android: function() {
    return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};