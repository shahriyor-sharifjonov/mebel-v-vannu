function pr(id, p) {
    var re = /(\d+)/;
    var str = $("div#price_" + id).html();
    var newpr = str.replace(re, p);
    $("div#price_" + id).html(newpr);
}
function im2(id, s, a) {
    if ($('.category-color-img-a-'+id).size() > 1)
    {
        $('.category-color-img-item-'+id).removeClass('selected');
        $(a).find('img').addClass('selected');
        $('.category-color-img-a-'+id).removeClass('category-color-img-a-selected').addClass('category-color-img-a');
        $(a).addClass('category-color-img-a-selected');

        $("div#img_" + id + " a img").attr("src", s);
    }
}
function so(opid, id) {
    $(".options#op_" + opid + " select").val("");
    $(".options#op_" + opid + " input").attr("checked", false);
    if (id) {
        var id = "#option-value-" + id;
        $(id).attr("selected", true);
        $(id).attr("checked", true);
    }
}
function reset(id, s, p) {
    so(id, null);
    im(id, s);
    $("div#price_" + id).html(p);
}

function show(ele) {
    var srcElement = document.getElementById(ele);
    if (srcElement) {
        if (srcElement.style.display == "block") {
            srcElement.style.display = 'none';
        } else {
            srcElement.style.display = 'block';
        }
    }
}

var last_page_click = '';
var thumb = null;
function hint(which, e) {
    thumb = document.getElementById('thumb');
    if (e.pageX == undefined) {   
        e.pageX = e.clientX + document.documentElement.scrollLeft;
        e.pageY = e.clientY + document.documentElement.scrollTop;
    }
    if ((thumb && thumb.style.visibility == 'hidden') || (last_page_click > e.pageX + e.pageY + 10 || last_page_click < e.pageX + e.pageY - 10)) {
        last_page_click = e.pageX + e.pageY;
        thumb.style.left = e.pageX + 20 + "px";		// e.pageX+20 +"px";		//			e.pageX ? pageXOffset + e.clientX + 20 +"px": document.body.scrollLeft + e.x + 20 +"px"; 
        thumb.style.top = e.pageY + 20 + "px"; 		//e.pageY ? pageYOffset + e.clientY +"px" : document.body.scrollTop  + e.y +"px";		//e.pageY+0 +"px"; 	//
        thumb.style.width = "146px";
        thumb.style.visibility = 'visible';
        thumb.innerHTML = '<span style="FONT-FAMILY: Trebuchet MS, Tahoma, Verdana, Arial, Geneva">' + which + '</span>';
    } else if (thumb) {
        thumb.innerHTML = "";
        thumb.style.visibility = 'hidden';
    }
}
function hidehint(e) {
    thumb = document.getElementById('thumb');
    if (thumb && thumb.style.visibility == 'visible') {
        thumb.innerHTML = "";
        thumb.style.visibility = 'hidden';
    }
}