
$(document).ready(function () {
    
    if (typeof template_is_mobile !== 'undefined' && template_is_mobile == true )
        return;
    
    $(document).on("click", ".b-filter_tag__delete", function() {
        $('#total').hide();
        var type = $(this).attr('data-type');
        var parent = $(this).parent().parent().parent();
        
        var liLength = $('.b-filter-chosen li').length;
        
        if (type == 'option')
        {
            var option_id = $(this).attr('data-option_id');
            var option_value_id = $(this).attr('data-option_value_id');
            
            if (option_value_id == 'slider')
            {
                console.log(no_ui_range_elems[option_id]);
                console.log($(no_ui_range_elems[option_id]).attr('data-min-limit'));
                no_ui_range_elems[option_id].noUiSlider.set([$(no_ui_range_elems[option_id]).attr('r_min'), $(no_ui_range_elems[option_id]).attr('r_max')]);
            }
            else
            {
                $('.b-options-list__item input#' + option_id + '-' + option_value_id).prop( "checked", false );
            }
            $('.b-filter_selected_' + option_id + '-' + option_value_id).animate({opacity: 0}, 300, function(){
                $('.b-filter_selected_' + option_id + '-' + option_value_id).remove();
            });
        }
        if (type == 'price')
        {
            var price_range2 = document.getElementById('price_range__');
            if (price_range2 != null)
            {
                price_range2.noUiSlider.set([$(price_range2).attr('data-min-limit'), $(price_range2).attr('data-max-limit')]);
            }
            $('.b-filter_selected_price').animate({opacity: 0}, 300, function(){
                $('.b-filter_selected_price').remove();
            });
        }
        if (type == 'filter_name')
        {
            $('#filter_name').val('');
            $('#filter_name').attr('value', '');
        }
        if (type == 'manufacturer')
        {
            var manufacturer_id = $(this).attr('data-manufacturer_id');
            
            $('.b-filter_selected_man_' + manufacturer_id).animate({opacity: 0}, 300, function(){
                $('.b-filter_selected_man_' + manufacturer_id).remove();
            });
            $('.b-filter-brands-list__item input[value='+manufacturer_id+']').prop( "checked", false );
            
        }
        
        liLength--;
        
        if (liLength == 0)
        {
            parent = $('#price_range__');
            $('.b-catalog-page__chosen').slideUp(400);
            $('.b-sidebar-block-chosen').slideUp(400);
        }
        
        // РµСЃР»Рё СѓРґР°Р»СЏРµРј Р·РЅР°С‡РµРЅРёРµ С„РёР»СЊС‚СЂР° РЅР° РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё - С‚Рѕ СЃСЂР°Р·Сѓ РїРµСЂРµР·Р°РіСЂСѓР¶Р°РµРј С‚РѕРІР°СЂС‹
        if ($(this).parents('.b-catalog-page__chosen').length)
        {
            $('#button-search1').click();
        }
        else
        {
            setTimeout(function(){
                getTotalProducts(parent)
            }, 300);
        }
    });
});

$(document).ready(function () {
    $(".load-more-btn").click(function(){
        if ($(".load-more-btn").attr('disabled') == 1)
        {
            return;
        }
        
        $(".load-more-btn").attr('disabled', 1);
        runFilterNextPage();
    });
    
    $('.b-catalog-sort__limit-link').click(function(){
        $('#limit').attr('value', $(this).data('value'));
        $('#button-search1').click();
        $('.b-catalog-sort__limit-link').removeClass('active');
        $(this).addClass('active');
    });
});


$(document).ready(function () {
    
    if (typeof template_is_mobile !== 'undefined' && template_is_mobile == true )
        return;

    $('.title').append('<span></span>');
    $('.title span').each(function () {
        var trigger = $(this), state = false, el = trigger.parent().next('.box-filter');
        trigger.click(function () {
            state = !state;
            el.toggle(0);
            el.toggleClass('inactive');
            trigger.parent().parent().toggleClass('inactive');
        });
    });

    getOptions(-1);

});

function getOptions(category_id, path) {

    var path;

    var sort = $('.temp input[id=\'sort\']').attr('value');
    var order = $('.temp input[id=\'order\']').attr('value');
    var limit = $('.temp input[id=\'limit\']').attr('value');
    var path = $('.temp input[id=\'path\']').attr('value');
    var attr = $('.temp input[id=\'attr\']').attr('value');
    var opt = $('.temp input[id=\'opt\']').attr('value');
    var filter_man = $('.temp input[id=\'filter_man\']').attr('value');
    var filter_price = $('.temp input[id=\'filter_price\']').attr('value');
    var filter_name = $('.temp input[id=\'filter_name\']').attr('value');

    var minCost1 = $('.formCost input[id=\'minCost1\']').val();
    var maxCost1 = $('.formCost input[id=\'maxCost1\']').val();
    
    minCost1 = (minCost1!==undefined) ? minCost1.replace(/\s/g, '') : 0;
    maxCost1 = (maxCost1!==undefined) ? maxCost1.replace(/\s/g, '') : 0;
    
    var data_min_limit = $('#price_range__').attr('data-min-limit');
    var data_max_limit = $('#price_range__').attr('data-max-limit');

    if ((minCost1 && maxCost1) && ((minCost1 != data_min_limit) || (maxCost1 != data_max_limit)) ) {
        filter += '&filter_price=' + encodeURIComponent(minCost1);
        filter += '-';
        filter += encodeURIComponent(maxCost1);
    }

    if (category_id > 0) {
        $('.temp input[id=\'path\']').attr('value', path);
    }
    path = $('.temp input[id=\'path\']').attr('value');

    if (category_id > 0) {
        cat_list = category_id;
    } else {
        if (typeof (path)) {
            if (typeof (path) == "number") {
                cat_list = path.toString();
            }

            cat_list = path;
            //if (cat_list.indexOf("_") < 0) {
            //    $(".options").html('РќРµС‚ РїР°СЂР°РјРµС‚СЂРѕРІ.');
            //    return;
            //}
        }
    }

    var filter = '';

    if (path) {
        filter += '&path=' + encodeURIComponent(path);
    }

    if (attr) {
        filter += '&filter_attr=' + encodeURIComponent(attr);   //attr_list;
    }

    if (opt) {
        filter += '&filter_opt=' + encodeURIComponent(opt);   //opt_list;
    }

    if (sort && order) {
        filter += '&sort=' + sort + '&order=' + order;
    }

    if (limit) {
        filter += '&limit=' + limit;
    }

    if (typeof is_manufacturer_page !== 'undefined') {
        filter += '&is_manufacturer_page=1';
    }
    if (typeof filter_man_id !== 'undefined') {
        filter += '&filter_man=' + filter_man_id;
    } 
    else if (filter_man)
    {
        filter += '&filter_man=' + encodeURIComponent(filter_man);
    }
    if (filter_price) {
        filter += '&filter_price=' + encodeURIComponent(filter_price);
    }
    if (filter_name) {
        filter += '&filter_name=' + encodeURIComponent(filter_name);
    }
    

    filter += '&options_only=1';

    //if (cat_list) {
    //	filter += '&filter_cat=' + encodeURIComponent(cat_list);
    //}

//    $.prettyLoader.show();

    //alert(filter);
    send_query(filter, 0);

}
;

$('#content input[name=\'filter_name\']').keydown(function (e) {
    if (e.keyCode == 13) {
        $('#button-search').trigger('click');
    }
});

$('#button-search2').bind('click', function () {
    $('#button-search1').trigger('click');
});

$('.title_attr span').on('click', function () {
    //alert('==');
    send_display('');
});


/*
 $('.pagination .links a').live('click', function() {
 
 var params = $.parseQuery($(this).attr('href'));
 $('.temp input[id=\'page\']').attr('value', params.page);
 runFilterClick();
 return false;
 });
 */

$('#button-search1').bind('click', function () {
    runFilterFirst();
});

$('#filters-clear, .filters-clear').bind('click', function () {
    
    url = 'index.php?route=product/category';

    var sort = $('.temp input[id=\'sort\']').attr('value');
    var order = $('.temp input[id=\'order\']').attr('value');
    var limit = $('.temp input[id=\'limit\']').attr('value');
    var path = $('.temp input[id=\'path\']').attr('value');

    if (sort && order) {
        url += '&sort=' + sort + '&order=' + order;
    }

    if (limit) {
        url += '&limit=' + limit;
    }

    if (path) {
        url += '&path=' + encodeURIComponent(path);
    }

    $("input[name=cb_m]").removeAttr("checked");
    $("input[name=cb_a]").removeAttr("checked");
    $("input[name=cb_o]").removeAttr("checked");
    
    var newLocation = $('#filter_params_category').attr('default_filter_url');
    location = newLocation;
});

function get_display() {

    var elements_box = document.getElementsByName('box-attr');
    //alert(elements_box.length);

    var display_list = '';

    for (var i = 0; i < elements_box.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_box[i];
        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РёРјСЏ РєР»Р°СЃСЃР°:
        if (element.className.indexOf('inactive') < 0) {
            // РќР°С€Р»Рё ...
            if (display_list) {
                display_list += '_';
            }
            display_list += element.title;
        }
    }
    //alert(display_list);

    return display_list;
}
;

function send_display(redirect) {

    display_list = get_display();
    //alert(display_list);
    // Р·Р°РїРѕРјРёРЅР°РµРј СЃРѕСЃС‚РѕСЏРЅРёРµ Р±Р»РѕРєРѕРІ
    /*$.ajax({
     type:'POST',
     url: 'index.php?route=module/filters/set_display',
     data: '&display_list=' + display_list,
     dataType: 'json',
     success: function(json) {
     //alert(json['data']);
     
     if (redirect != '') {
     //location = redirect;
     }
     
     }
     });*/
}
;

function display_checkbox(value_list) {
    var code_values = '';
    var attr = 0;

    code_values += '<ul class="opt">';

    for (j in value_list) {
        code_values += '  <li>';
        code_values += '    <input type="checkbox" name="cb_a" id="" value="' +
                value_list[j]['value_id'] + '~' +
                value_list[j]['value_name'] + '"';

        if (value_list[j]['value_state']) {
            code_values += ' checked';
        }

        code_values += ' />';
        code_values += '    <label for="cb_a">' + value_list[j]['value_name'] + '</label>';
        code_values += '  </li>';

        attr++;
    }
    code_values += '</ul>';

    if (attr) {
        return code_values;
    }
    return '';
}

function display_select(value_list) {
    var code_values = '';
    var attr = 0;

    code_values += '<select name="cb_a" id="" class="attr_select" onChange="runFilter()">';
    code_values += '  <option value="">' + value_list['attribute_name'] + '</option>';

    for (j in value_list['attribute_values']) {
        code_values += '  <option value="';
        code_values += value_list['attribute_values'][j]['value_id'] + '~' + value_list['attribute_values'][j]['value_name'];
        code_values += '" ';

        if (value_list['attribute_values'][j]['value_state']) {
            code_values += ' selected="selected"';
        }

        code_values += ' >';
        code_values += value_list['attribute_values'][j]['value_name'];
        code_values += '</option>';

        attr++;
    }

    code_values += '</select>';

    if (attr) {
        return code_values;
    }

    return '';
}

function display_link(value_list) {
    var code_values = '';
    var attr = 0;

    code_values += '<ul class="opt">';

    for (j in value_list) {
        code_values += '  <li>';
        code_values += '    <a name="cb_a" id="" onClick="runFilter(\'' +
                value_list[j]['value_id'] + '~' +
                value_list[j]['value_name'];

        code_values += '\')"';
        code_values += ' type="link"';
        code_values += '>';
        code_values += value_list[j]['value_name'];
        code_values += '</a></li>';

        attr++;
    }
    code_values += '</ul>';

    if (attr) {
        return code_values;
    }

    return '';
}

function display_attributes(json, active_mode) {
    
    if (typeof template_is_mobile !== 'undefined' && template_is_mobile == true )
        return;

    var code = '';
    var attr = 100;
    var out = '';
    var mode = 1;

    for (i in json['attribute_list']) {
        code += '<div name="box-attr" class="box-attr';
        if (json['attribute_list'][i]['display'] == 0 && active_mode > 0) {
            code += ' inactive';
        }

        mode = json['attribute_list'][i]['attribute_mode'];

        if (mode == 1) {
            code += '" title="' + json['attribute_list'][i]['attribute_id'] + '">';
            code += '  <div class="title_attr title"><span></span>';
            code += '  ' + json['attribute_list'][i]['attribute_name'] + ':&nbsp;';
            code += '<div class="vtip i-qv" title="' + json['attribute_list'][i]['attribute_description'] + '">&nbsp;</div>';
            code += '  </div>';
            code += '  <div class="entry_opt">';

            code += display_checkbox(json['attribute_list'][i]['attribute_values']);

            code += '  </div>';
        }

        if (mode == 2) {
            code += '">';
            code += '  <div class="entry_opt">';
            code += display_select(json['attribute_list'][i]);
            code += '  </div>';
        }
        code += '</div>';
    }

    $(".attributes").html(code);
    //vtip();
    //$('.i-qv').tipsy({gravity: 'w'});

    if (attr) {
        $('.box-attributes-wrap').slideDown("0");

        $('.attributes .box-attr .title_attr span').each(function () {
            var trigger = $(this), state = false, el = trigger.parent().next('.entry_opt');
            trigger.click(function () {
                state = !state;
                el.toggle(0);
                el.toggleClass('inactive');
                trigger.parent().parent().toggleClass('inactive');
            });
        });
    } else {
        //$(".attributes").html('РќРµС‚ РїР°СЂР°РјРµС‚СЂРѕРІ.');
        $('.box-attributes-wrap').hide("0");
    }

}
;

function display_options(json, active_mode) {
    
    if (typeof template_is_mobile !== 'undefined' && template_is_mobile == true )
        return;

    var codeResult = '';
    var opt = 0;

    for (i in json['option_list']) {
    
        code = '';
        isOptionActive = false;
        
        
        code += '<div class="b-shutter %isCollapsed%" data-shutter>';
        code += '   <div class="b-shutter__trigger" data-shutter-trigger>';
        code += '        <span>';
        code += '            <span>' + json['option_list'][i]['option_name']+'</span>';

        if (json['option_list'][i]['option_description'].length > 0)
        {
            code += '            <a href="#" class="question tooltip-link" data-tooltipster="{&quot;parent&quot;:&quot;.b-filter-mobile&quot;}" data-tooltip-content="#filter-tooltip-' + json['option_list'][i]['option_id'] + '" onclick="yaCounter13546952.reachGoal(\'SHOW_OPTION_DESCRIPTION\');"><span>?</span></a>';
        }
        code += '        </span>';
        code += '        <i class="b-shutter__status icon "></i>';

        if (json['option_list'][i]['option_description'].length > 0)
        {
            code += '        <div class="b-sidebar_tooltip__container">';
            code += '            <div id="filter-tooltip-' + json['option_list'][i]['option_id'] + '" >';
            code += '                <div class="b-tooltip__content">';
            code += '                    <a class="close b-tooltip__close" href="#"></a>';
            code += '                    <h3 class="b-tooltip__title">' + json['option_list'][i]['option_name']+'</h3>';
            code += '                    <div>'+json['option_list'][i]['option_description']+'</div>';
            code += '                </div>';
            code += '            </div>';
            code += '        </div>';
        }

        code += '    </div>';
        code += '    <div class="b-shutter__content %isContentCollapsed%" data-shutter-content style="%isContentCollapsed2%">';
        code += '        <div class="b-shutter__content-inner">';


        
        if (json['option_list'][i]['type'] == "slider") // РЁРёСЂРёРЅР°
        {
            
            var optionId = json['option_list'][i]['option_id'];
            var selectedValues = [];
            var wOptI = 0;
            var firstOpt = null;
            var lastOpt = null;
            sliderValues[optionId] = [];
            sliderValues[optionId+'_no_ui'] = {};
            var is_first=false; var is_last = false;
            var option_values_length = Object.keys(json['option_list'][i]['option_values']).length;
            for (j in json['option_list'][i]['option_values']) {
                is_first = false;
                is_last = false;
                optValue = parseInt(json['option_list'][i]['option_values'][j]['value_name']);
                optValueId = parseInt(json['option_list'][i]['option_values'][j]['value_id']);
                if (wOptI == 0)
                {
                    firstOpt = optValue;
                    sliderValues[optionId+'_no_ui']['min'] = optValue;
                    is_first = true;
                }
                sliderValues[optionId].push({"n":optValue,"s":optValue,"id":optValueId});
                if (json['option_list'][i]['option_values'][j]['value_state'] == 1)
                {
                    isOptionActive = true;
                    selectedValues.push(optValue);
                }
                wOptI++;
                if (wOptI == Object.keys(json['option_list'][i]['option_values']).length)
                {
                    lastOpt = optValue;
                    sliderValues[optionId+'_no_ui']['max'] = optValue;
                    is_last = true;
                }
                
                if (!is_first && !is_last)
                {
                    percent = ((wOptI-1)*(100/(option_values_length-1))).toFixed(2);
                    percent += "%";
                    sliderValues[optionId+'_no_ui'][percent] = optValue;
                }
            }
            
            middleOpt = firstOpt + Math.ceil((lastOpt-firstOpt)/2);
            
            isOptionActive = isOptionActive || json['option_list'][i]['expanded'] == 1;
            
            if (selectedValues.length > 2)
            {
                tmpFirst = selectedValues.slice(0, 1)[0];
                tmpLast = selectedValues.slice(-1)[0];
                selectedValues = [tmpFirst, tmpLast];
            }

            if (selectedValues.length == 0)
            {
                selectedValues.push(firstOpt);
                selectedValues.push(lastOpt);
            }
            if (selectedValues.length == 1)
            {
                selectedValues.push(selectedValues[0]);
            }

            selectedValues.sort(function (a,b) {
                return a - b;
            });
            
            var slideValuesRange = getSliderValuesRange(selectedValues, sliderValues[optionId], '3');
            
            code += '<div class="b-range-slider">';
            code += '<div class="formCost b-range-slider__inputs">';
            code += '<input type="text" id="'+optionId+'_no_ui_range_min" class="minCost b-range-slider__inputs-min" value="'+selectedValues[0]+'" data-option-id="'+optionId+'"/>';
            code += '<i class="b-range-slider__inputs-divider"></i>';
            code += '<input type="text" id="'+optionId+'_no_ui_range_max" class="maxCost b-range-slider__inputs-max" value="'+selectedValues[1]+'" data-option-id="'+optionId+'"/>';
            code += '</div>';
            code += '<div id="'+optionId+'_no_ui_range" class="no_ui_range b-range-slider__bar" data-option-id="'+optionId+'" r_min="'+firstOpt+'" r_max="'+lastOpt+'" r_smin="'+selectedValues[0]+'" r_smax="'+selectedValues[1]+'"></div>'
            code += '<div class="b-range-slider__scale">';
            code += '    <div>'+firstOpt+'</div>';
            code += '    <div>'+middleOpt+'</div>';
            code += '    <div>'+lastOpt+'</div>';
            code += '</div>';
            code += '        <input type="hidden" name="cb_o" value="'+slideValuesRange+'" class="'+optionId+'_no_ui_range_cba1">';
            code += '</div>';
        }
        else
        {
            
            code += '    <ul class="b-options-list">';
            for (j in json['option_list'][i]['option_values']) {
                   
                code += '      <li class="b-options-list__item option-item-id-'+json['option_list'][i]['option_id']+'">';
                code += '        <input class="with-gap v-center" type="checkbox" name="cb_o" id="' + json['option_list'][i]['option_id'] + '-' +
                        json['option_list'][i]['option_values'][j]['value_id'] + '" onclick="getTotalProducts(this);"  value="' +
                        json['option_list'][i]['option_id'] + '~' +
                        json['option_list'][i]['option_values'][j]['value_id'] + '"';

                if (json['option_list'][i]['option_values'][j]['value_state'] == 1) {
                    isOptionActive = true;
                    code += ' checked';
                }

                code += ' />';
                code += '<label for="' + json['option_list'][i]['option_id'] + '-' + json['option_list'][i]['option_values'][j]['value_id'] + '">';

                if (json['option_list'][i]['type'] === 'image') {
                    code += '<span class="b-filter-colors__item"><img src="/image/' + json['option_list'][i]['option_values'][j]['value_img'] + '" alt="" title="" /></span>';
                }
                code += '<span>' + json['option_list'][i]['option_values'][j]['value_name'] + '</span></label>';
                code += '      </li>';

                opt++;
            }
            
            isOptionActive = isOptionActive || json['option_list'][i]['expanded'] == 1;
            
            code += '    </ul>';
        }
        
        code += '        </div>';
        code += '    </div>';
        code += '</div>';
        
        code = code.replace('%isCollapsed%', (isOptionActive ? '' : 'is-collapsed'));
        code = code.replace('%isContentCollapsed%', (isOptionActive ? '' : 'is-content-collapsed'));
        code = code.replace('%isContentCollapsed2%', (isOptionActive ? '' : 'height: 0px;'));

        codeResult += code;
    }
    
    $(".options").html(codeResult);
    initSliders();
    
    App.Tooltip.init();
//    $('.options [data-shutter]').shutter();

    if (opt) {
//        $('.box-options-wrap').slideDown("0");
//
//        $('.options .box-attr .title_attr_dotted, .title_attr span').each(function () {
//            var trigger = $(this), state = false, el = trigger.parent().next('.entry_opt');
//            trigger.click(function () {
//                state = !state;
//                el.toggle(0);
//                el.toggleClass('inactive');
//                trigger.parent().toggleClass('inactive');
//            });
//        });

    } else {
        //$(".options").html('РќРµС‚ РїР°СЂР°РјРµС‚СЂРѕРІ.');
        $('.box-options-wrap').hide("0");
    }
    

}
;

function showStub()
{
    $('.b-catalog-list .b-catalog-list__item').addClass('b-catalog-list__item-blurred');
}
function hideStub()
{
    $('.b-catalog-list .b-catalog-list__item').removeClass('b-catalog-list__item-blurred');
}

var is_query_sent = false;
function send_query(params, mode)
{

    if (typeof template_is_mobile !== 'undefined' && template_is_mobile == true )
        return;
    
    if (is_query_sent) return;
    
    is_query_sent = true;
    
    if (mode)
    {
        showStub();
    }
    
    $.ajax({
        type: 'POST',
        url: '/index.php?route=module/filters/run_query',
        data: params + '&mode='+mode,
        timeout: 30000,
        dataType: 'json',
        success: function (json) {
            
            if (json['filter_params'])
            {
                var fp_url = json['filter_params'];
                $('#filter_params_category').attr('href', json['filter_params']);
                $('#filter_params_category').attr('default_filter_url', json['default_filter_url']);
                
                var attr = $('#filter_params_category').attr('default_filter_params');
                if (typeof attr !== 'undefined' && attr !== false) {
                    
                }
                else
                {
                    $('#filter_params_category').attr('default_filter_params', json['default_filter_params']);
                }
            }
            
            if (mode != 1)
            {
                display_options(json, mode);
            }
//            else
//            {
                if ($(json.selected_filters_html_center).css('display') != 'none')
                {
                    $('.b-catalog-page__chosen').show()
                }
                else
                {
                    $('.b-catalog-page__chosen').hide()
                }
                
                if ($(json.selected_filters_html_left).css('display') != 'none')
                {
                    $('.b-sidebar-block-chosen').show();
                }
                else
                {
                    $('.b-sidebar-block-chosen').hide();
                }
                
                $('.b-sidebar-block-chosen .b-filter_tag-list').html($(json.selected_filters_html_left).find('.b-filter_tag-list').html());
                
                $('.b-catalog-page__chosen .b-filter_tag-list').html($(json.selected_filters_html_center).find('.b-filter_tag-list').html());
//            }
            
            if (App.FilterMobile.isOpen)
            {
                App.FilterMobile.hide();
            }
            
            $('#total').hide();

            var code = '';
            if (mode) {
                $(".total-ptoduct").html(json['product_total'] + ' ' + pluralize2(json['product_total'], 'С‚РѕРІР°СЂ', 'С‚РѕРІР°СЂР°', 'С‚РѕРІР°СЂРѕРІ'));

                for (i in json['products']) {
                    var id = json['products'][i]['product_id'];

                    code += json['products'][i]['html'];
                }
                
                json.code = code;
                
                if (doAppendProductsFilter)
                {
                    $(".b-catalog-list").append(code);
                    $.force_appear();
                }
                else
                {
                    $(".b-catalog-list").html(code);
                }
                doAppendProductsFilter = false;
                
                
                var params2 = params.replace(/([&;]?path=[^&;]+)/, '');
                var newLocation = $('#filter_params_category').attr('default_filter_url');
                if (newLocation.indexOf("?") == -1)
                {
                    newLocation += '?';
                }
                newLocation += params2;
                
                
                if (params != $('#filter_params_category').attr('default_filter_params'))
                {
                    try {
                        history.pushState({
                            json: json,
                            params: params,
                            mode: mode
                        }, null, newLocation);
                    } catch (err) {
                        console.log('pushState failed');
                    }                    
                } 
                
                $('.b-catalog-sort__link').each(function( index, element )
                {
                    $.query.parseNew('?'+params2);
                    var new_params = $.parseQuery($(this).data('url_params'));
                    for (var key in new_params) 
                    {
                        if (new_params.hasOwnProperty(key)) 
                        {
                            $.query.SET(key, new_params[key]);
                        }
                    }
                    
                    new_sort_href = location.protocol + '//' + location.host + location.pathname + $.query.toString();
                    $( this ).attr('href', new_sort_href);
                });
                
                $(".pagination-container").html($(json['pagination']));
                
                if (json['products'].length == 0)
                {
                    if ($(".load-more-btn").attr('disabled') == 1)
                    {
                        $(".load-more-btn").hide();
                        $('.temp input[id=\'page\']').attr('value', Math.max(parseInt($('.temp input[id=\'page\']').eq(0).attr('value')) - 1, 1));
                    }
                    else
                    {
                        code = "РўРѕРІР°СЂС‹ СЃ РґР°РЅРЅС‹РјРё РїР°СЂР°РјРµС‚СЂР°РјРё РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚."
                    }
                    
                }
                else
                {
//                    $(".load-more-btn").show();
                }
                
                if (json['product_total'] > json['limit'] * json['page'])
                {
                    $('.load-more-box').show();
                }
                else
                {
                    $('.load-more-box').hide();
                }
                
                App.Tooltip.showroomTooltip();
                App.Tooltip.freeDeliveryTooltip();
                App.Tooltip.sizesTooltip();
                App.Tooltip.colorsTooltip();
            }
            
            if (mode != 1)
            {
                updateManufacturers(json.filter_man);
            }

            hideStub();
            if (mode)
            {
                if (json.products.length == 0)
                {
                    $(".load-more-btn").hide();
                    $('.temp input[id=\'page\']').attr('value', Math.max(parseInt($('.temp input[id=\'page\']').eq(0).attr('value')) - 1, 1));
                }
                
            }
            $(".load-more-btn").attr('disabled', 0);
                        
            is_query_sent = false;
        },
        complete: function () {
            //alert('complete');
        },
        error: function (jqXHR, textStatus, errorThrown, params) {

            hideStub();
            
            //alert('AJAX request responded with error code:', textStatus, 'The error:', errorThrown, 'was thrown.');
            $.ajax({
                url: 'index.php?route=error/not_found/log_error',
                type: 'POST',
                dataType: 'json',
                data: {'Filter_error:': jqXHR, 'textStatus': textStatus, 'errorThrown': errorThrown, 'params':params},
                success: function () {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
            });
            
            is_query_sent = false;
        }
    });
    

};

window.addEventListener('load', function() {
  setTimeout(function() {
    window.onpopstate = function( e ) 
    {
        console.log('window.onpopstate: ' + e.state);
        if (e.state != null && e.state.json != null)
        {
            if (e.state.mode)
            {
                $(".b-catalog-list").html(e.state.json.code);
                $.force_appear();
                $(".b-pagination").html($(e.state.json.pagination).html());
                
                $('.b-catalog-page__chosen').show();
                $('.b-sidebar-block-chosen').show();
                $('.b-sidebar-block-chosen .b-filter_tag-list').html($(e.state.json.selected_filters_html_left).find('.b-filter_tag-list').html());
                $('.b-catalog-page__chosen .b-filter_tag-list').html($(e.state.json.selected_filters_html_center).find('.b-filter_tag-list').html());
            }
            updatePriceSlider(e.state.json.filter_price);
            updateManufacturers(e.state.json.filter_man);
            
            display_options(e.state.json, e.state.mode);
            $('#total').hide();
            
            $(".total-ptoduct").html(e.state.json['product_total'] + ' ' + pluralize2(e.state.json['product_total'], 'С‚РѕРІР°СЂ', 'С‚РѕРІР°СЂР°', 'С‚РѕРІР°СЂРѕРІ'));
        }
        else
        {
            location.reload();
        }
    }
  }, 0);
});

function arrange_list() {

    //alert('arrange_list');

    $('.product-list > div').each(function (index, element) {
        html = '<div class="right">';
        html += '  <div class="cart">' + $(element).find('.cart').html() + '</div>';
        //html += '  <div class="wishlist">' + $(element).find('.wishlist').html() + '</div>';
        //html += '  <div class="compare">' + $(element).find('.compare').html() + '</div>';
        html += '</div>';

        html += '<div class="left">';

        var image = $(element).find('.image').html();

        if (image != null) {
            html += '<div class="image">' + image + '</div>';
        }

        var price = $(element).find('.price').html();

        if (price != null) {
            html += '<div class="price">' + price + '</div>';
        }

        html += '  <div class="name">' + $(element).find('.name').html() + '</div>';
        html += '  <div class="description">' + $(element).find('.description').html() + '</div>';

        var rating = $(element).find('.rating').html();

        if (rating != null) {
            html += '<div class="rating">' + rating + '</div>';
        }

        html += '</div>';


        $(element).html(html);
    });

    $('.display').html('<b><?php echo $text_display; ?></b> <?php echo $text_list; ?> <b>/</b> <a onclick="display(\'grid\');"><?php echo $text_grid; ?></a>');

    $.cookie('display', 'list');
}

function arrange_grid() {

    //alert('arrange_grid');

    $('.product-grid > div').each(function (index, element) {
        html = '';

        var image = $(element).find('.image').html();

        if (image != null) {
            html += '<div class="image">' + image + '</div>';
        }

        html += '<div class="name">' + $(element).find('.name').html() + '</div>';
        html += '<div class="description">' + $(element).find('.description').html() + '</div>';

        var price = $(element).find('.price').html();

        if (price != null) {
            html += '<div class="price">' + price + '</div>';
        }

        var rating = $(element).find('.rating').html();

        if (rating != null) {
            html += '<div class="rating">' + rating + '</div>';
        }

        html += '<div class="cart">' + $(element).find('.cart').html() + '</div>';
        //html += '<div class="wishlist">' + $(element).find('.wishlist').html() + '</div>';
        //html += '<div class="compare">' + $(element).find('.compare').html() + '</div>';

        $(element).html(html);
    });

    $('.display').html('<b><?php echo $text_display; ?></b> <a onclick="display(\'list\');"><?php echo $text_list; ?></a> <b>/</b> <?php echo $text_grid; ?>');

    $.cookie('display', 'grid');
}

function runLimit() {

    var params = $.parseQuery($('#select_limit').attr('value'));

    $('.temp input[id=\'limit\']').attr('value', params.limit);

    runFilter();
}

function runSort(obj) {

    var params = $.parseQuery($(obj).attr('href'));

    $('.sort .active').removeClass('active');
    $(obj).addClass('active');

    $('.temp input[id=\'sort\']').attr('value', params.sort);
    $('.temp input[id=\'order\']').attr('value', params.order);
    $('.temp input[id=\'path\']').attr('value', params.path);

    runFilter();
}

function runFilter() {
    var url = 'index.php?route=product/category';
    var filter = '';

    var sort = $('.temp input[id=\'sort\']').attr('value');
    var order = $('.temp input[id=\'order\']').attr('value');
    var limit = $('.temp input[id=\'limit\']').attr('value');
    var page = $('.temp input[id=\'page\']').attr('value');
    var path = $('.temp input[id=\'path\']').attr('value');
    var opt_list = $('.temp input[id=\'opt\']').attr('value');
    var filter_name = $('.temp input[id=\'filter_name\']').attr('value');

    var minCost1 = $('.formCost input[id=\'minCost1\']').val().replace(/\s/g, '');
    var maxCost1 = $('.formCost input[id=\'maxCost1\']').val().replace(/\s/g, '');
    var data_min_limit = $('#price_range__').attr('data-min-limit');
    var data_max_limit = $('#price_range__').attr('data-max-limit');

    if ((minCost1 && maxCost1) && ((minCost1 != data_min_limit) || (maxCost1 != data_max_limit)) ) {
        filter += '&filter_price=' + encodeURIComponent(minCost1);
        filter += '-';
        filter += encodeURIComponent(maxCost1);
    }

    var elements_c = document.getElementsByName('cb_c');
    //alert(arrElements.length);
    var cat_list = '';
    for (var i = 0; i < elements_c.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_c[i];

        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
        if (element.checked) {
            // РќР°С€Р»Рё ...
            if (cat_list) {
                cat_list += '-';
            }
            cat_list += element.value;
        }
    }

    //alert(cat_list);

    var elements_m = document.getElementsByName('cb_m');
    //alert(arrElements.length);
    var man_list = '';
    for (var i = 0; i < elements_m.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_m[i];

        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
        if (element.checked) {
            // РќР°С€Р»Рё ...
            if (man_list) {
                man_list += '-';
            }
            man_list += element.value;
        }
    }

    //alert(man_list);

    var elements_a = document.getElementsByName('cb_a');
    //alert(arrElements.length);
    var attr_list = '';
    for (var i = 0; i < elements_a.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_a[i];

        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
        if (element.checked) {
            // РќР°С€Р»Рё ...
            if (attr_list) {
                attr_list += '_';
            }
            attr_list += element.value;
        }
    }

    //alert(attr_list);

    //var elements_o = document.getElementsByName('cb_o');
    //alert(arrElements.length);
    //var opt_list   = '';
    //for (var i = 0; i < elements_o.length;i++) {
    // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
    //var element = elements_o[i];

    // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
    //if (element.checked) {
    // РќР°С€Р»Рё ...
    //if (opt_list) {
    //opt_list += '_';
    //}
    //opt_list   += element.value;
    //}
    //}

    //alert(opt_list);


    if (sort && order) {
        filter += '&sort=' + sort + '&order=' + order;
    }

    if (limit) {
        filter += '&limit=' + limit;
    }

    if (page) {
        filter += '&page=' + page;
    }

    if (path) {
        filter += '&path=' + encodeURIComponent(path);
    }

    if (cat_list) {
        filter += '&filter_cat=' + encodeURIComponent(cat_list);
    }
    
    if (filter_name) {
        filter += '&filter_name=' + encodeURIComponent(filter_name);
    }
    

    if (man_list) {
        filter += '&filter_man=' + encodeURIComponent(man_list);
    } else if (typeof filter_man_id !== 'undefined')
    {
        filter += '&filter_man=' + encodeURIComponent(filter_man_id);
    }

    if (typeof is_manufacturer_page !== 'undefined') {
        filter += '&is_manufacturer_page=1';
    }

    if (attr_list) {
        filter += '&filter_attr=' + encodeURIComponent(attr_list);   //attr_list;
        //filter += '&filter_attr=' + attr_list;
    }

    if (opt_list) {
        //alert(encodeURIComponent(opt_list));
        filter += '&filter_opt=' + encodeURIComponent(opt_list);   //opt_list;
        //filter += '&filter_opt=' + opt_list;
    }

    //alert(opt_list);

    //display_list = get_display();
    //filter += '&display_list=' + display_list;
    filter += '&display_list=';

    //alert(filter);
    //console.log(filter);

    // send_display();
    send_query(filter, 1);
    //location = url + filter;	

}
;

var doAppendProductsFilter = false;
function runFilterNextPage() {
    $('.temp input[id=\'page\']').attr('value', parseInt($('.temp input[id=\'page\']').eq(0).attr('value')) + 1);
    
    doAppendProductsFilter = true;
    runFilterClick();
}

function runFilterFirst() {
    $('.temp input[id=\'page\']').attr('value', 1);
    
    runFilterClick();
}

function runFilterClick() {


    var url = 'index.php?route=product/category';
    var filter = '';

    var sort = $('.temp input[id=\'sort\']').attr('value');
    var order = $('.temp input[id=\'order\']').attr('value');
    var limit = $('.temp input[id=\'limit\']').attr('value');
    var page = $('.temp input[id=\'page\']').attr('value');
    var path = $('.temp input[id=\'path\']').attr('value');
    var filter_name = $('.temp input[id=\'filter_name\']').attr('value');
    //var opt_list    = $('.temp input[id=\'opt\']').attr('value');

    var minCost1 = $('.formCost input[id=\'minCost1\']').val().replace(/\s/g, '');
    var maxCost1 = $('.formCost input[id=\'maxCost1\']').val().replace(/\s/g, '');
    var data_min_limit = $('#price_range__').attr('data-min-limit');
    var data_max_limit = $('#price_range__').attr('data-max-limit');

    if ((minCost1 && maxCost1) && ((minCost1 != data_min_limit) || (maxCost1 != data_max_limit)) ) {
        filter += '&filter_price=' + encodeURIComponent(minCost1);
        filter += '-';
        filter += encodeURIComponent(maxCost1);
    }

    var elements_c = document.getElementsByName('cb_c');
    //alert(arrElements.length);
    var cat_list = '';
    for (var i = 0; i < elements_c.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_c[i];

        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
        if (element.checked) {
            // РќР°С€Р»Рё ...
            if (cat_list) {
                cat_list += '-';
            }
            cat_list += element.value;
        }
    }

    //alert(cat_list);

    var elements_m = document.getElementsByName('cb_m');
    //alert(arrElements.length);
    var man_list = '';
    for (var i = 0; i < elements_m.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_m[i];

        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
        if (element.checked) {
            // РќР°С€Р»Рё ...
            if (man_list) {
                man_list += '-';
            }
            man_list += element.value;
        }
    }

    //alert(man_list);

    var elements_a = document.getElementsByName('cb_a');
    //alert(arrElements.length);
    var attr_list = '';
    for (var i = 0; i < elements_a.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_a[i];
        if (element.type == 'checkbox') {
            // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
            if (element.checked) {
                // РќР°С€Р»Рё ...
                if (attr_list) {
                    attr_list += '_';
                }
                attr_list += element.value;
            }
        } else if (element.type == 'link') {
            attr_list += value;
            break;
        } else {
            if (element.value) {
                if (attr_list) {
                    attr_list += '_';
                }
                attr_list += element.value;
            }
        }
        //alert(element.rel);
    }

    //alert(attr_list);

    var elements_o = document.getElementsByName('cb_o');
    //alert(arrElements.length);
    var opt_list = '';
    for (var i = 0; i < elements_o.length; i++) {
        // РџРѕР»СѓС‡РёС‚СЊ СѓРєР°Р·Р°С‚РµР»СЊ РЅР° С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚:
        var element = elements_o[i];

        // РџСЂРѕРІРµСЂСЏРµРј РЅР° РЅСѓР¶РЅС‹Р№ Р°С‚СЂРёР±СѓС‚:
        if (element.type == 'checkbox') {
            if (element.checked) {
                if (opt_list) {
                    opt_list += '_';
                }
                opt_list += element.value;
            }
        } else {
            if (element.value) {
                if (opt_list) {
                    opt_list += '_';
                }
                opt_list += element.value;
            }
        }
    }

    //alert(opt_list);

    if (sort && order) {
        filter += '&sort=' + sort + '&order=' + order;
    }

    if (limit) {
        filter += '&limit=' + limit;
    }

    if (page) {
        filter += '&page=' + page;
    }

    if (path) {
        filter += '&path=' + encodeURIComponent(path);
    }

    if (cat_list) {
        filter += '&filter_cat=' + encodeURIComponent(cat_list);
    }

    if (man_list) {
        filter += '&filter_man=' + encodeURIComponent(man_list);
    } else if (typeof filter_man_id !== 'undefined')
    {
        filter += '&filter_man=' + encodeURIComponent(filter_man_id);
    }

    if (typeof is_manufacturer_page !== 'undefined') {
        filter += '&is_manufacturer_page=1';
    }

    if (attr_list) {
        filter += '&filter_attr=' + encodeURIComponent(attr_list);   //attr_list;
        //filter += '&filter_attr=' + attr_list;
    }
    
    if (filter_name) {
        filter += '&filter_name=' + encodeURIComponent(filter_name);
    }
    
    

    if (opt_list) {
        filter += '&filter_opt=' + encodeURIComponent(opt_list);   //opt_list;
        //filter += '&filter_opt=' + opt_list;
    }

    //display_list = get_display();
    //filter += '&display_list=' + display_list;

    //alert(filter);

    //send_display(url + filter);

    send_query(filter, 1);
    //location = url + filter;	  

}
;



$('#total a').click(function (e) {
    e.preventDefault();
    $('#button-search1').click();
    
    if (Modernizr.mq('only all and (max-width: 809px)'))
    {
        $('html, body').animate({
            scrollTop: $("#mobile-show-filter-btn-center").offset().top
        }, 700);
    }
    if (Modernizr.mq('only all and (max-width: 1186px)'))
    {
        App.FilterMobile.hide();
    }
    
});

var canGetTotalProducts = true;
function getTotalProducts(obj) {
    
    if (!canGetTotalProducts) return;

    var url = 'index.php?route=product/category';
    var filter = '';
    var sort = $('.temp input[id=\'sort\']').attr('value');
    var order = $('.temp input[id=\'order\']').attr('value');
    var limit = $('.temp input[id=\'limit\']').attr('value');
    var page = $('.temp input[id=\'page\']').attr('value');
    var path = $('.temp input[id=\'path\']').attr('value');
    var filter_name = $('.temp input[id=\'filter_name\']').val();
    var minCost1 = $('.formCost input[id=\'minCost1\']').val().replace(/\s/g, '');
    var maxCost1 = $('.formCost input[id=\'maxCost1\']').val().replace(/\s/g, '');
    var data_min_limit = $('#price_range__').attr('data-min-limit');
    var data_max_limit = $('#price_range__').attr('data-max-limit');
    
//    console.log(minCost1);
//    console.log(maxCost1);
//    console.log(data_min_limit);
//    console.log(data_max_limit);
    

    if ((minCost1 && maxCost1) && ((minCost1 != data_min_limit) || (maxCost1 != data_max_limit)) ) {
        filter += '&filter_price=' + encodeURIComponent(minCost1);
        filter += '-';
        filter += encodeURIComponent(maxCost1);
    }
    
//    console.log(filter);

    var elements_c = document.getElementsByName('cb_c');
    var cat_list = '';
    for (var i = 0; i < elements_c.length; i++) {
        var element = elements_c[i];
        if (element.checked) {
            if (cat_list) {
                cat_list += '-';
            }
            cat_list += element.value;
        }
    }

    var elements_m = document.getElementsByName('cb_m');
    var man_list = '';
    for (var i = 0; i < elements_m.length; i++) {
        var element = elements_m[i];
        if (element.checked) {
            if (man_list) {
                man_list += '-';
            }
            man_list += element.value;
        }
    }

    var elements_a = document.getElementsByName('cb_a');
    var attr_list = '';
    for (var i = 0; i < elements_a.length; i++) {
        var element = elements_a[i];
        if (element.type == 'checkbox') {
            if (element.checked) {
                if (attr_list) {
                    attr_list += '_';
                }
                attr_list += element.value;
            }
        } else if (element.type == 'link') {
            attr_list += value;
            break;
        } else {
            if (element.value) {
                if (attr_list) {
                    attr_list += '_';
                }
                attr_list += element.value;
            }
        }
    }

    var elements_o = document.getElementsByName('cb_o');
    var opt_list = '';
    for (var i = 0; i < elements_o.length; i++) {
        var element = elements_o[i];
        if (element.type == 'checkbox') {
            if (element.checked) {
                if (opt_list) {
                    opt_list += '_';
                }
                opt_list += element.value;
            }
        } else {
            if (element.value) {
                if (opt_list) {
                    opt_list += '_';
                }
                opt_list += element.value;
            }
        }
        
    }

    if (sort && order) {
        filter += '&sort=' + sort + '&order=' + order;
    }

    if (limit) {
        filter += '&limit=' + limit;
    }

    if (page) {
        filter += '&page=' + page;
    }

    if (path) {
        filter += '&path=' + encodeURIComponent(path);
    }

    if (cat_list) {
        filter += '&filter_cat=' + encodeURIComponent(cat_list);
    }

    if (man_list) {
        filter += '&filter_man=' + encodeURIComponent(man_list);
    } else if (typeof filter_man_id !== 'undefined')
    {
        filter += '&filter_man=' + encodeURIComponent(filter_man_id);
    }

    if (attr_list) {
        filter += '&filter_attr=' + encodeURIComponent(attr_list);   //attr_list;
    }

    if (opt_list) {
        filter += '&filter_opt=' + encodeURIComponent(opt_list);   //opt_list;
    }
    
    if (filter_name) {
        filter += '&filter_name=' + encodeURIComponent(filter_name);   //opt_list;
    }
    
    

    $.ajax({
        type: 'POST',
        url: '/index.php?route=module/filters/get_total',
        data: filter,
        timeout: 30000,
        dataType: 'json',
        beforeSend: function() {
            var totalLeft = '257';
            if (Modernizr.mq('only all and (max-width: 809px)'))
            {
                totalLeft = '80';
            }
            var li = $(obj).closest('li');
            if (li.length)
            {
                var labelW = $(li.find('label'));
                if (labelW.length)
                {
                    totalLeft = labelW.width() + 35;
                }
            }
            
            var top = $(obj).offset();
            var top_block = $('.b-sidebar-block__filter').offset();
            var totalTop = (top.top - top_block.top);
            
            if (Modernizr.mq('only all and (max-width: 809px)'))
            {
                if ($(obj).hasClass('noUi-target'))
                {
                    totalTop += 25;
                }
            }
            
            $('#total .progress').css('display', 'inline');
            $('#total b').css('visibility', 'hidden');
            $('#total span.num').html('').parent().parent().css('top', totalTop + 'px').css('left', totalLeft+'px').show();
        },
        success: function (json) {
            
            
            
            //$('#total a').attr('href', url + filter);
            var totalNum = json['product_total'];
            var totalText = '<span class="b-sidebar-block__filtertotal__found-txt">' + pluralize2(totalNum, 'РќР°Р№РґРµРЅ', 'РќР°Р№РґРµРЅРѕ', 'РќР°Р№РґРµРЅРѕ') + ' </span>' + totalNum + ' ' + pluralize2(totalNum, 'С‚РѕРІР°СЂ', 'С‚РѕРІР°СЂР°', 'С‚РѕРІР°СЂРѕРІ'); 
            
            $('#total .progress').css('display', 'none');
            $('#total b').css('visibility', '');
            $('#total span.num').html(totalText);
//            $.prettyLoader.hide();
        },
        complete: function () {
            //alert('complete');
        },
        error: function (jqXHR, textStatus, errorThrown, filter) {
            //alert('AJAX request responded with error code:', textStatus, 'The error:', errorThrown, 'was thrown.');
            $.ajax({
                url: '/index.php?route=error/not_found/log_error',
                type: 'POST',
                dataType: 'json',
                data: {'Filter_get_total_error': textStatus, 'errorThrown': errorThrown, 'filter':filter},
                success: function () {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
            });
        }
    });
}


$(window).load(function () {
    initSliders();
    
    var price_range2 = document.getElementById('price_range__');
    if (price_range2 != null)
    {
        price_range2.noUiSlider.on('set', function(){
            getTotalProducts(price_range2);
        });
    }
    
    var price_range = document.getElementById('price_range');
    if (price_range != null)
    {
        var price_input_timeout = null;
        var price_input_do_update = true;

        price_range.style.width = '227px';
        //price_range.style.height = '10px';
        //price_range.style.margin = '40px auto 10px';

        //console.log(parseInt($(price_range).attr('r_sMin')));

        noUiSlider.create(price_range, {
                start: [parseInt($(price_range).attr('r_sMin')), parseInt($(price_range).attr('r_sMax'))],
                snap: false,
                step: 1000,
                connect: true,
                //tooltips: [wNumb({ decimals: 0, thousand: ' '}), wNumb({ decimals: 0, thousand: ' '})],
                range: {
                    'min': parseInt($(price_range).attr('r_min')),
                    '60%': [30000, 5000],
                    'max': parseInt($(price_range).attr('r_max'))
                }
        });
        price_range.noUiSlider.on('update', function(){
            if (price_input_do_update)
            {
                $('#minCost1').val(parseInt(price_range.noUiSlider.get()[0]));
                $('#maxCost1').val(parseInt(price_range.noUiSlider.get()[1]));
            }
            setTimeout(function(){price_input_do_update = true}, 100);

            if (parseInt($(price_range).attr('r_min')) == parseInt(price_range.noUiSlider.get()[0]))
                $('#minCost1').addClass('gray');
            else
                $('#minCost1').removeClass('gray');

            if (parseInt($(price_range).attr('r_max')) == parseInt(price_range.noUiSlider.get()[1]))
                $('#maxCost1').addClass('gray');
            else
                $('#maxCost1').removeClass('gray');
        });
        price_range.noUiSlider.on('set', function(){
            getTotalProducts(price_range);
        });

        $('#minCost1').keyup(function(e){
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46)
            {
                $('#minCost1').removeClass('gray');
                clearTimeout(price_input_timeout);
                price_input_timeout = setTimeout(function(){
                    price_input_do_update = false;
                    price_range.noUiSlider.set([$('#minCost1').val(), $('#maxCost1').val()]);
                    getTotalProducts(price_range);
                }, 1500);
            }
            if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
            {
                this.value = this.value.replace(/[^0-9\.]/g,'');
            }
        });
        $('#maxCost1').keyup(function(e){
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46)
            {
                $('#maxCost1').removeClass('gray');
                clearTimeout(price_input_timeout);
                price_input_timeout = setTimeout(function(){
                    price_input_do_update = false;
                    price_range.noUiSlider.set([$('#minCost1').val(), $('#maxCost1').val()]);
                    getTotalProducts(price_range);
                }, 1500);
            }
            if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
            {
                this.value = this.value.replace(/[^0-9\.]/g,'');
            }
        });
    }
});

function updatePriceSlider(filter_price)
{
    canGetTotalProducts = false;
    if (typeof price_range !== 'undefined' && price_range != null && typeof filter_price !== 'undefined')
    {
        var price_min = null;
        var price_max = null;
        if (filter_price.constructor === Array)
        {
            if (filter_price[0] !== undefined)
            {
                price_min = filter_price[0];
            }
            if (filter_price[1] !== undefined)
            {
                price_max = filter_price[1];
            }
        }
        price_range.noUiSlider.set([price_min, price_max]);
    }
    canGetTotalProducts = true;
}
function updateManufacturers(filter_man)
{
    canGetTotalProducts = false;
    if (typeof filter_man !== 'undefined' && filter_man.constructor === Array)
    {
        $('.b-filter-brands-list input[type="checkbox"]').prop('checked', false);
        for (var i = 0; i < filter_man.length; i++) {
            $('.b-filter-brands-list input[type="checkbox"][value="'+parseInt(filter_man[i])+'"]').prop('checked', true);
        }
    }
    canGetTotalProducts = true;
}


var sliderValues = [];
sliderValues['width'] = [];
sliderValues['width_no_ui'] = {};
var no_ui_range_timeouts = {};
var no_ui_range_updates = {};
var no_ui_range_elems = {};

function getSliderValuesRange(selected, range, optionId)
{
    var out = '';
    var outArr = [];
    var minVal = selected[0];
    var maxVal = selected[1];
    
    var firstVal = null;
    var lastVal = null;
    for (j in range)
    {
        if (firstVal == null) firstVal = range[j]['n'];
        lastVal = range[j]['n'];
        
        if (range[j]['n'] >= minVal && range[j]['n'] <= maxVal)
        {
            outArr.push(optionId+'~'+range[j]['id']);
        }
    }
    if (firstVal == minVal && lastVal == maxVal)
    {
        return '';
    }
    
    out = outArr.join('_');
    return out;
}

function initSliders() 
{
    $('.no_ui_range:not(.slider-initialized)').each(function(){
        
        var no_ui_range = $(this);
                
        var optionId = $(no_ui_range).attr('data-option-id');
        no_ui_range_timeouts[optionId] = null;
        no_ui_range_updates[optionId] = null;
        no_ui_range_elems[optionId] = $(this).get(0);
        //var width_input_timeout = null;
        //var width_input_do_update = true;

        if (no_ui_range_elems[optionId] != null)
        {
            //$(no_ui_range_elems[optionId]).css('width', '227px');
            
            //$(no_ui_range_elems[optionId]).css('height', '10px');
            //$(no_ui_range_elems[optionId]).css('margin',  '40px auto 10px');

            noUiSlider.create(no_ui_range_elems[optionId], {
                    start: [parseInt($(no_ui_range_elems[optionId]).attr('r_smin')), parseInt($(no_ui_range_elems[optionId]).attr('r_smax'))],
                    snap: true,
                    connect: true,
                    //tooltips: [wNumb({ decimals: 0, thousand: ' '}), wNumb({ decimals: 0, thousand: ' '})],
                    range: sliderValues[optionId+'_no_ui']
            });
            $(no_ui_range).addClass('slider-initialized');

            no_ui_range_elems[optionId].noUiSlider.on('update', function(){
                var optionId2 = $($(this).get(0).target).attr('data-option-id');
                if (no_ui_range_updates[optionId2])
                {
                    $('#'+optionId2+'_no_ui_range_min').val(parseInt($(this).get(0).target.noUiSlider.get()[0]));
                    $('#'+optionId2+'_no_ui_range_max').val(parseInt($(this).get(0).target.noUiSlider.get()[1]));
                }
                setTimeout(function(){no_ui_range_updates[optionId2] = true}, 100);

                if (parseInt($($(this).get(0).target).attr('r_min')) == parseInt($(this).get(0).target.noUiSlider.get()[0]))
                    $('#'+optionId2+'_no_ui_range_min').addClass('gray');
                else
                    $('#'+optionId2+'_no_ui_range_min').removeClass('gray');

                if (parseInt($($(this).get(0).target).attr('r_max')) == parseInt($(this).get(0).target.noUiSlider.get()[1]))
                    $('#'+optionId2+'_no_ui_range_max').addClass('gray');
                else
                    $('#'+optionId2+'_no_ui_range_max').removeClass('gray');
            });
            no_ui_range_elems[optionId].noUiSlider.on('set', function(){
                var optionId2 = $($(this).get(0).target).attr('data-option-id');
                $('.'+optionId2+'_no_ui_range_cba1').val(getSliderValuesRange([parseInt($(this).get(0).target.noUiSlider.get()[0]), parseInt($(this).get(0).target.noUiSlider.get()[1])], sliderValues[optionId2], optionId2));
                getTotalProducts($($(this).get(0).target));
            });
            $('#'+optionId+'_no_ui_range_min').keyup(function(e){
                var optionId2 = $(this).attr('data-option-id');
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46)
                {
                    $('#'+optionId2+'_no_ui_range_min').removeClass('gray');
                    clearTimeout(no_ui_range_timeouts[optionId2]);
                    no_ui_range_timeouts[optionId2] = setTimeout(function(){
                        width_input_do_update = false;
                        no_ui_range_elems[optionId2].noUiSlider.set([$('#'+optionId2+'_no_ui_range_min').val(), $('#'+optionId2+'_no_ui_range_max').val()]);
                        $('.'+optionId2+'_no_ui_range_cba1').val(getSliderValuesRange([parseInt(no_ui_range_elems[optionId2].noUiSlider.get()[0]), parseInt(no_ui_range_elems[optionId2].noUiSlider.get()[1])], sliderValues[optionId2], optionId2));
                        getTotalProducts($(no_ui_range_elems[optionId2]));
                    }, 1500);
                }
                if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
                {
                    this.value = this.value.replace(/[^0-9\.]/g,'');
                }
            });
            $('#'+optionId+'_no_ui_range_max').keyup(function(e){
                var optionId2 = $(this).attr('data-option-id');
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46)
                {
                    $('#'+optionId2+'_no_ui_range_max').removeClass('gray');
                    clearTimeout(no_ui_range_timeouts[optionId2]);
                    no_ui_range_timeouts[optionId2] = setTimeout(function(){
                        no_ui_range_updates[optionId2] = false;
                        no_ui_range_elems[optionId2].noUiSlider.set([$('#'+optionId2+'_no_ui_range_min').val(), $('#'+optionId2+'_no_ui_range_max').val()]);
                        $('.'+optionId2+'_no_ui_range_cba1').val(getSliderValuesRange([parseInt(no_ui_range_elems[optionId2].noUiSlider.get()[0]), parseInt(no_ui_range_elems[optionId2].noUiSlider.get()[1])], sliderValues[optionId2], optionId2));
                        getTotalProducts($(no_ui_range_elems[optionId2]));
                    }, 1500);
                }
                if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
                {
                    this.value = this.value.replace(/[^0-9\.]/g,'');
                }
            });
        }
        
    })
}