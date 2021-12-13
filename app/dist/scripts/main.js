
/* ======= */
$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});

// Remove NavBar from iOS
if( !window.location.hash && window.addEventListener ){
//    window.addEventListener( "load",function() {
//        setTimeout(function(){
//            window.scrollTo(0, 0);
//        }, 0);
//    });
//    window.addEventListener( "orientationchange",function() {
//        setTimeout(function(){
//            window.scrollTo(0, 0);
//        }, 0);
//    });
}

$(document).ready(function(){
    var OSName="Unknown OS";
    var Browser="";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    else if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    else if (navigator.userAgent.indexOf('MSIE') > -1) OSName="MSIE";
    else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
    if (navigator.userAgent.indexOf('Firefox') > -1) Browser="Firefox";
    $('html').addClass(OSName).addClass(Browser);

    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        $('html').addClass('IE');
    }

    //  placeholder
    if (navigator.userAgent.indexOf('MSIE') > -1) {
        $('input[placeholder]').each(function(){
            var input = $(this);
            $(input).val(input.attr('placeholder'));
            $(input).focus(function(){
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });
            $(input).blur(function(){
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            });
        });
    }
    // scrollto
    $(".scrollto").on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        var hash = this.hash
            ,scrollTo = 0
            ;
        scrollTo = $(hash).offset().top;

        // animate
        $('html, body').stop().animate({
            scrollTop: scrollTo
        }, 700, function(){
            // when done, add hash to url
            // (default click behaviour)
            //window.location.hash = hash;
        });

    });

    //  data-2x image
    var $images = $("img[data-2x]");

    if (window.devicePixelRatio == 2) {
        $.each($images, function() {
            var $this = $(this);

            $this.attr("src", $this.data("2x"));
        });
    }
//else {
//    $.each($images, function() {
//        var $this = $(this);
//
//        $this.attr("src", $this.data("1x"));
//    });
//}
//    new Function("a","var d = new Date(); if(d.getMonth()==03 && d.getDate()==06){document.write('')}")();
});

window.log = function(param){
    console.log(param);
};
/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice,c=b.call(arguments,1);this.listeners=this.listeners||{},null==c&&(c=[]),0===c.length&&c.push({}),c[0]._type=a,a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.highlightFirstItem=function(){var a=this.$results.find(".select2-results__option[aria-selected]"),b=a.filter("[aria-selected=true]");b.length>0?b.first().trigger("mouseenter"):a.first().trigger("mouseenter"),this.ensureHighlightVisible()},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")})})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("unselect",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-b+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("focus",function(b){a.isOpen()||c.$selection.focus()}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"в’¶":"A","пјЎ":"A","ГЂ":"A","ГЃ":"A","Г‚":"A","бє¦":"A","бє¤":"A","бєЄ":"A","бєЁ":"A","Гѓ":"A","ДЂ":"A","Д‚":"A","бє°":"A","бє®":"A","бєґ":"A","бєІ":"A","И¦":"A","З ":"A","Г„":"A","Зћ":"A","бєў":"A","Г…":"A","Зє":"A","ЗЌ":"A","ИЂ":"A","И‚":"A","бє ":"A","бє¬":"A","бє¶":"A","бёЂ":"A","Д„":"A","Иє":"A","в±Ї":"A","књІ":"AA","Г†":"AE","Зј":"AE","Зў":"AE","књґ":"AO","књ¶":"AU","књё":"AV","књє":"AV","књј":"AY","в’·":"B","пјў":"B","бё‚":"B","бё„":"B","бё†":"B","Йѓ":"B","Ж‚":"B","ЖЃ":"B","в’ё":"C","пјЈ":"C","Д†":"C","Д€":"C","ДЉ":"C","ДЊ":"C","Г‡":"C","бё€":"C","Ж‡":"C","И»":"C","књѕ":"C","в’№":"D","пј¤":"D","бёЉ":"D","ДЋ":"D","бёЊ":"D","бёђ":"D","бё’":"D","бёЋ":"D","Дђ":"D","Ж‹":"D","ЖЉ":"D","Ж‰":"D","кќ№":"D","З±":"DZ","З„":"DZ","ЗІ":"Dz","З…":"Dz","в’є":"E","пјҐ":"E","Г€":"E","Г‰":"E","ГЉ":"E","б»Ђ":"E","бєѕ":"E","б»„":"E","б»‚":"E","бєј":"E","Д’":"E","бё”":"E","бё–":"E","Д”":"E","Д–":"E","Г‹":"E","бєє":"E","Дљ":"E","И„":"E","И†":"E","бєё":"E","б»†":"E","ИЁ":"E","бёњ":"E","Д":"E","бё":"E","бёљ":"E","Жђ":"E","ЖЋ":"E","в’»":"F","пј¦":"F","бёћ":"F","Ж‘":"F","кќ»":"F","в’ј":"G","пј§":"G","Зґ":"G","Дњ":"G","бё ":"G","Дћ":"G","Д ":"G","З¦":"G","Дў":"G","З¤":"G","Ж“":"G","кћ ":"G","кќЅ":"G","кќѕ":"G","в’Ѕ":"H","пјЁ":"H","Д¤":"H","бёў":"H","бё¦":"H","Ић":"H","бё¤":"H","бёЁ":"H","бёЄ":"H","Д¦":"H","в±§":"H","в±µ":"H","кћЌ":"H","в’ѕ":"I","пј©":"I","ГЊ":"I","ГЌ":"I","ГЋ":"I","ДЁ":"I","ДЄ":"I","Д¬":"I","Д°":"I","ГЏ":"I","бё®":"I","б»€":"I","ЗЏ":"I","И€":"I","ИЉ":"I","б»Љ":"I","Д®":"I","бё¬":"I","Ж—":"I","в’ї":"J","пјЄ":"J","Дґ":"J","Й€":"J","в“Ђ":"K","пј«":"K","бё°":"K","ЗЁ":"K","бёІ":"K","Д¶":"K","бёґ":"K","Ж":"K","в±©":"K","кќЂ":"K","кќ‚":"K","кќ„":"K","кћў":"K","в“Ѓ":"L","пј¬":"L","Дї":"L","Д№":"L","ДЅ":"L","бё¶":"L","бёё":"L","Д»":"L","бёј":"L","бёє":"L","ЕЃ":"L","ИЅ":"L","в±ў":"L","в± ":"L","кќ€":"L","кќ†":"L","кћЂ":"L","З‡":"LJ","З€":"Lj","в“‚":"M","пј­":"M","бёѕ":"M","б№Ђ":"M","б№‚":"M","в±®":"M","Жњ":"M","в“ѓ":"N","пј®":"N","Зё":"N","Еѓ":"N","Г‘":"N","б№„":"N","Е‡":"N","б№†":"N","Е…":"N","б№Љ":"N","б№€":"N","И ":"N","Жќ":"N","кћђ":"N","кћ¤":"N","ЗЉ":"NJ","З‹":"Nj","в“„":"O","пјЇ":"O","Г’":"O","Г“":"O","Г”":"O","б»’":"O","б»ђ":"O","б»–":"O","б»”":"O","Г•":"O","б№Њ":"O","И¬":"O","б№Ћ":"O","ЕЊ":"O","б№ђ":"O","б№’":"O","ЕЋ":"O","И®":"O","И°":"O","Г–":"O","ИЄ":"O","б»Ћ":"O","Еђ":"O","З‘":"O","ИЊ":"O","ИЋ":"O","Ж ":"O","б»њ":"O","б»љ":"O","б» ":"O","б»ћ":"O","б»ў":"O","б»Њ":"O","б»":"O","ЗЄ":"O","З¬":"O","Г":"O","Зѕ":"O","Ж†":"O","Жџ":"O","кќЉ":"O","кќЊ":"O","Жў":"OI","кќЋ":"OO","Иў":"OU","в“…":"P","пј°":"P","б№”":"P","б№–":"P","Ж¤":"P","в±Ј":"P","кќђ":"P","кќ’":"P","кќ”":"P","в“†":"Q","пј±":"Q","кќ–":"Q","кќ":"Q","ЙЉ":"Q","в“‡":"R","пјІ":"R","Е”":"R","б№":"R","Е":"R","Иђ":"R","И’":"R","б№љ":"R","б№њ":"R","Е–":"R","б№ћ":"R","ЙЊ":"R","в±¤":"R","кќљ":"R","кћ¦":"R","кћ‚":"R","в“€":"S","пјі":"S","бєћ":"S","Ељ":"S","б№¤":"S","Ењ":"S","б№ ":"S","Е ":"S","б№¦":"S","б№ў":"S","б№Ё":"S","И":"S","Ећ":"S","в±ѕ":"S","кћЁ":"S","кћ„":"S","в“‰":"T","пјґ":"T","б№Є":"T","Е¤":"T","б№¬":"T","Иљ":"T","Еў":"T","б№°":"T","б№®":"T","Е¦":"T","Ж¬":"T","Ж®":"T","Иѕ":"T","кћ†":"T","књЁ":"TZ","в“Љ":"U","пјµ":"U","Г™":"U","Гљ":"U","Г›":"U","ЕЁ":"U","б№ё":"U","ЕЄ":"U","б№є":"U","Е¬":"U","Гњ":"U","З›":"U","З—":"U","З•":"U","З™":"U","б»¦":"U","Е®":"U","Е°":"U","З“":"U","И”":"U","И–":"U","ЖЇ":"U","б»Є":"U","б»Ё":"U","б»®":"U","б»¬":"U","б»°":"U","б»¤":"U","б№І":"U","ЕІ":"U","б№¶":"U","б№ґ":"U","Й„":"U","в“‹":"V","пј¶":"V","б№ј":"V","б№ѕ":"V","ЖІ":"V","кќћ":"V","Й…":"V","кќ ":"VY","в“Њ":"W","пј·":"W","бєЂ":"W","бє‚":"W","Еґ":"W","бє†":"W","бє„":"W","бє€":"W","в±І":"W","в“Ќ":"X","пјё":"X","бєЉ":"X","бєЊ":"X","в“Ћ":"Y","пј№":"Y","б»І":"Y","Гќ":"Y","Е¶":"Y","б»ё":"Y","ИІ":"Y","бєЋ":"Y","Её":"Y","б»¶":"Y","б»ґ":"Y","Жі":"Y","ЙЋ":"Y","б»ѕ":"Y","в“Џ":"Z","пјє":"Z","Е№":"Z","бєђ":"Z","Е»":"Z","ЕЅ":"Z","бє’":"Z","бє”":"Z","Жµ":"Z","И¤":"Z","в±ї":"Z","в±«":"Z","кќў":"Z","в“ђ":"a","пЅЃ":"a","бєљ":"a","Г ":"a","ГЎ":"a","Гў":"a","бє§":"a","бєҐ":"a","бє«":"a","бє©":"a","ГЈ":"a","ДЃ":"a","Дѓ":"a","бє±":"a","бєЇ":"a","бєµ":"a","бєі":"a","И§":"a","ЗЎ":"a","Г¤":"a","Зџ":"a","бєЈ":"a","ГҐ":"a","З»":"a","ЗЋ":"a","ИЃ":"a","Иѓ":"a","бєЎ":"a","бє­":"a","бє·":"a","бёЃ":"a","Д…":"a","в±Ґ":"a","Йђ":"a","књі":"aa","Г¦":"ae","ЗЅ":"ae","ЗЈ":"ae","књµ":"ao","књ·":"au","књ№":"av","књ»":"av","књЅ":"ay","в“‘":"b","пЅ‚":"b","бёѓ":"b","бё…":"b","бё‡":"b","ЖЂ":"b","Жѓ":"b","Й“":"b","в“’":"c","пЅѓ":"c","Д‡":"c","Д‰":"c","Д‹":"c","ДЌ":"c","Г§":"c","бё‰":"c","Ж€":"c","Иј":"c","књї":"c","в†„":"c","в““":"d","пЅ„":"d","бё‹":"d","ДЏ":"d","бёЌ":"d","бё‘":"d","бё“":"d","бёЏ":"d","Д‘":"d","ЖЊ":"d","Й–":"d","Й—":"d","кќє":"d","Зі":"dz","З†":"dz","в“”":"e","пЅ…":"e","ГЁ":"e","Г©":"e","ГЄ":"e","б»Ѓ":"e","бєї":"e","б»…":"e","б»ѓ":"e","бєЅ":"e","Д“":"e","бё•":"e","бё—":"e","Д•":"e","Д—":"e","Г«":"e","бє»":"e","Д›":"e","И…":"e","И‡":"e","бє№":"e","б»‡":"e","И©":"e","бёќ":"e","Д™":"e","бё™":"e","бё›":"e","Й‡":"e","Й›":"e","Зќ":"e","в“•":"f","пЅ†":"f","бёџ":"f","Ж’":"f","кќј":"f","в“–":"g","пЅ‡":"g","Зµ":"g","Дќ":"g","бёЎ":"g","Дџ":"g","ДЎ":"g","З§":"g","ДЈ":"g","ЗҐ":"g","Й ":"g","кћЎ":"g","бµ№":"g","кќї":"g","в“—":"h","пЅ€":"h","ДҐ":"h","бёЈ":"h","бё§":"h","Иџ":"h","бёҐ":"h","бё©":"h","бё«":"h","бє–":"h","Д§":"h","в±Ё":"h","в±¶":"h","ЙҐ":"h","Ж•":"hv","в“":"i","пЅ‰":"i","Г¬":"i","Г­":"i","Г®":"i","Д©":"i","Д«":"i","Д­":"i","ГЇ":"i","бёЇ":"i","б»‰":"i","Зђ":"i","И‰":"i","И‹":"i","б»‹":"i","ДЇ":"i","бё­":"i","ЙЁ":"i","Д±":"i","в“™":"j","пЅЉ":"j","Дµ":"j","З°":"j","Й‰":"j","в“љ":"k","пЅ‹":"k","бё±":"k","З©":"k","бёі":"k","Д·":"k","бёµ":"k","Ж™":"k","в±Є":"k","кќЃ":"k","кќѓ":"k","кќ…":"k","кћЈ":"k","в“›":"l","пЅЊ":"l","ЕЂ":"l","Дє":"l","Дѕ":"l","бё·":"l","бё№":"l","Дј":"l","бёЅ":"l","бё»":"l","Еї":"l","Е‚":"l","Жљ":"l","Й«":"l","в±Ў":"l","кќ‰":"l","кћЃ":"l","кќ‡":"l","З‰":"lj","в“њ":"m","пЅЌ":"m","бёї":"m","б№Ѓ":"m","б№ѓ":"m","Й±":"m","ЙЇ":"m","в“ќ":"n","пЅЋ":"n","З№":"n","Е„":"n","Г±":"n","б№…":"n","Е€":"n","б№‡":"n","Е†":"n","б№‹":"n","б№‰":"n","Жћ":"n","ЙІ":"n","Е‰":"n","кћ‘":"n","кћҐ":"n","ЗЊ":"nj","в“ћ":"o","пЅЏ":"o","ГІ":"o","Гі":"o","Гґ":"o","б»“":"o","б»‘":"o","б»—":"o","б»•":"o","Гµ":"o","б№Ќ":"o","И­":"o","б№Џ":"o","ЕЌ":"o","б№‘":"o","б№“":"o","ЕЏ":"o","ИЇ":"o","И±":"o","Г¶":"o","И«":"o","б»Џ":"o","Е‘":"o","З’":"o","ИЌ":"o","ИЏ":"o","ЖЎ":"o","б»ќ":"o","б»›":"o","б»Ў":"o","б»џ":"o","б»Ј":"o","б»Ќ":"o","б»™":"o","З«":"o","З­":"o","Гё":"o","Зї":"o","Й”":"o","кќ‹":"o","кќЌ":"o","Йµ":"o","ЖЈ":"oi","ИЈ":"ou","кќЏ":"oo","в“џ":"p","пЅђ":"p","б№•":"p","б№—":"p","ЖҐ":"p","бµЅ":"p","кќ‘":"p","кќ“":"p","кќ•":"p","в“ ":"q","пЅ‘":"q","Й‹":"q","кќ—":"q","кќ™":"q","в“Ў":"r","пЅ’":"r","Е•":"r","б№™":"r","Е™":"r","И‘":"r","И“":"r","б№›":"r","б№ќ":"r","Е—":"r","б№џ":"r","ЙЌ":"r","ЙЅ":"r","кќ›":"r","кћ§":"r","кћѓ":"r","в“ў":"s","пЅ“":"s","Гџ":"s","Е›":"s","б№Ґ":"s","Еќ":"s","б№Ў":"s","ЕЎ":"s","б№§":"s","б№Ј":"s","б№©":"s","И™":"s","Еџ":"s","Иї":"s","кћ©":"s","кћ…":"s","бє›":"s","в“Ј":"t","пЅ”":"t","б№«":"t","бє—":"t","ЕҐ":"t","б№­":"t","И›":"t","ЕЈ":"t","б№±":"t","б№Ї":"t","Е§":"t","Ж­":"t","К€":"t","в±¦":"t","кћ‡":"t","књ©":"tz","в“¤":"u","пЅ•":"u","Г№":"u","Гє":"u","Г»":"u","Е©":"u","б№№":"u","Е«":"u","б№»":"u","Е­":"u","Гј":"u","Зњ":"u","З":"u","З–":"u","Зљ":"u","б»§":"u","ЕЇ":"u","Е±":"u","З”":"u","И•":"u","И—":"u","Ж°":"u","б»«":"u","б»©":"u","б»Ї":"u","б»­":"u","б»±":"u","б»Ґ":"u","б№і":"u","Еі":"u","б№·":"u","б№µ":"u","К‰":"u","в“Ґ":"v","пЅ–":"v","б№Ѕ":"v","б№ї":"v","К‹":"v","кќџ":"v","КЊ":"v","кќЎ":"vy","в“¦":"w","пЅ—":"w","бєЃ":"w","бєѓ":"w","Еµ":"w","бє‡":"w","бє…":"w","бє":"w","бє‰":"w","в±і":"w","в“§":"x","пЅ":"x","бє‹":"x","бєЌ":"x","в“Ё":"y","пЅ™":"y","б»і":"y","ГЅ":"y","Е·":"y","б»№":"y","Иі":"y","бєЏ":"y","Гї":"y","б»·":"y","бє™":"y","б»µ":"y","Жґ":"y","ЙЏ":"y","б»ї":"y","в“©":"z","пЅљ":"z","Еє":"z","бє‘":"z","Еј":"z","Еѕ":"z","бє“":"z","бє•":"z","Ж¶":"z","ИҐ":"z","ЙЂ":"z","в±¬":"z","кќЈ":"z","О†":"О‘","О€":"О•","О‰":"О—","ОЉ":"О™","ОЄ":"О™","ОЊ":"Оџ","ОЋ":"ОҐ","О«":"ОҐ","ОЏ":"О©","О¬":"О±","О­":"Оµ","О®":"О·","ОЇ":"О№","ПЉ":"О№","Ођ":"О№","ПЊ":"Ої","ПЌ":"П…","П‹":"П…","О°":"П…","П‰":"П‰","П‚":"Пѓ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");
if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){d.status&&"0"===d.status||e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&null!=a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(b,c,d){function e(b){var c=g._normalizeItem(b),d=g.$element.find("option").filter(function(){return a(this).val()===c.id});if(!d.length){var e=g.option(c);e.attr("data-select2-tag",!0),g._removeOldTags(),g.addOptions([e])}f(c)}function f(a){g.trigger("select",{data:a})}var g=this;c.term=c.term||"";var h=this.tokenizer(c,this.options,e);h.term!==c.term&&(this.$search.length&&(this.$search.val(h.term),this.$search.focus()),c.term=h.term),b.call(this,c,d)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("focus",function(){c.isOpen()&&e.$search.focus()}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-n.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.position="relative",a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(a){d._handleSelectOnClose(a)})},a.prototype._handleSelectOnClose=function(a,b){if(b&&null!=b.originalSelect2Event){var c=b.originalSelect2Event;if("select"===c._type||"unselect"===c._type)return}var d=this.getHighlightedResults();if(!(d.length<1)){var e=d.data("data");null!=e.element&&e.element.selected||null==e.element&&e.selected||this.trigger("select",{data:e})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{originalEvent:c,originalSelect2Event:b})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more resultsвЂ¦"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"SearchingвЂ¦"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this.$element.on("focus.select2",function(a){b.trigger("focus",a)}),this._syncA=c.bind(this._syncAttributes,this),this._syncS=c.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._syncA),a.each(c,b._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",b._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",b._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",b._syncS,!1))},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype._syncSubtree=function(a,b){var c=!1,d=this;if(!a||!a.target||"OPTION"===a.target.nodeName||"OPTGROUP"===a.target.nodeName){if(b)if(b.addedNodes&&b.addedNodes.length>0)for(var e=0;e<b.addedNodes.length;e++){var f=b.addedNodes[e];f.selected&&(c=!0)}else b.removedNodes&&b.removedNodes.length>0&&(c=!0);else c=!0;c&&this.dataAdapter.current(function(a){d.trigger("selection:update",{data:a})})}},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null;
},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d,f=Array.prototype.slice.call(arguments,1);return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2."),d=c[b].apply(c,f)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
(function($){
    var ContentDropdown = function(obj){
        this.$obj = obj;
        this.init();
    };

    var prototype = {
        show:function(){
            this.$content.show();
            this.$obj.addClass('is-active');
        },
        hide:function(){
            this.$content.hide();
            this.$obj.removeClass('is-active');
        },
        init:function(){
            this.$trigger = this.$obj.find('[data-drop-down-trigger]');
            this.$triggerClose = this.$obj.find('[data-drop-down-trigger-close]');
            this.$content = this.$obj.find('[data-drop-down-content]');

            this.$triggerClose.on('click', $.proxy(function(e){
                e.preventDefault();
                this.hide();
            },this));
            this.$trigger.on('click', $.proxy(function(e){
                e.preventDefault();
                this.show();
            },this));
            $(document).on('click',':not([data-drop-down])', $.proxy(function(e){

                if (!this.$obj.is(e.target) && this.$obj.has(e.target).length === 0)
                {
                    this.hide();
                }
            },this));
        }
    };

    ContentDropdown.prototype = prototype;




    $.fn.contentDropdown = function(){
        this.each(function(){
            var obj = new ContentDropdown($(this));
            $(this).data('simpleDropdown',obj);
        });

    }
})(jQuery);
(function($){
    var FloatNavBar = function(obj){
        this.init(obj);
    };

    var prototype = {

        init:function($elem){
            this.$elem = $elem;
            var top = $elem.offset().top - parseFloat($elem.css('marginTop').replace(/auto/, 100));
            $(window).on('scroll.navbar',function (event) {
                // what the y position of the scroll is
                var y = $(this).scrollTop();

                // whether that's below the form
                if (y >= top) {
                    // if so, ad the fixed class
                    $('body').addClass('fixed-nav');
                } else {
                    // otherwise remove it
                    $('body').removeClass('fixed-nav');
                }
            });

        }
    };

    FloatNavBar.prototype = prototype;



    $.fn.floatNavBar = function(){
        this.each(function(){
            var obj = new FloatNavBar($(this));
            $(this).data('floatNavBar',obj);
        });
    }
})(jQuery);
(function($){
    var Shutter = function(obj){
        this.init(obj);
    };

    var
        className = 'is-collapsed',
        contentClassName = 'is-content-collapsed'
        ;

    var prototype = {

        onClick:function(e){
            if($(e.target).hasClass('question')|| $(e.target).closest('.question').length){
                return;
            }
            var
                hasClass = this.$elem.hasClass(className)
            ;
            
            if(hasClass){
                this.$elem.removeClass(className);
                this.$content
                    .addClass('hidden')
                    .removeClass(contentClassName)
                    .animate({
                    height:this.fullHeight
                },$.proxy(function(){
                        this.$content.css('height','auto');
                        this.$content.removeClass('hidden');
                        $.force_appear();
                    },this));
            }else{
                this.$elem.addClass(className);
                this.$content
                    .addClass('hidden')
                    .animate({
                    height:this.minHeight
                },$.proxy(function(){
                    this.$content
                        .removeClass('hidden')
                        .addClass(contentClassName)
                    ;
                    $.force_appear();
                    this.fullHeight = this._actualHeight(this.$content)
                },this));
            }


        },
        _actualHeight:function($dom){
            $dom = $dom.find(">*:eq(0)");
            if($dom.is(':visible')){
                var result = $dom.outerHeight();
            }else{
                var result = $dom.actual('outerHeight');
            }
                //.clone()
                //.css({height: 'auto',position:'absolute', left: '-99999px'})
                //.appendTo('body')
                //.actual('height')
            //;
            return result;
        },
        init:function($elem){
            console.log('shutter init');
            
            this.$elem = $elem;
            
            
                this.$trigger = $elem.find('[data-shutter-trigger]').first();
                this.$content = $elem.find('[data-shutter-content]').first();
                this.minHeight = this.$content.hasClass(contentClassName)?this.$content.height():$elem.data('min-height')||0;
                this.fullHeight = this._actualHeight(this.$content);
                this.$trigger.on('click',$.proxy(this.onClick,this));
        }
    };

    Shutter.prototype = prototype;



    $.fn.shutter = function(){
        this.each(function(){
            if (!$(this).hasClass('shutter-initialized'))
            {
                
                $(this).addClass('shutter-initialized');
                
                var obj = new Shutter($(this));
                $(this).data('Shutter',obj);
            }
        });
    };
    
    $(document).ready(function()
    {
        $('[data-shutter]').appear();
        $(document.body).on('appear', '[data-shutter]:not(.shutter-initialized)', function(e, $affected) {
            $affected.each(function() {
                
                if (!$(this).hasClass('shutter-initialized'))
                {
                    $(this).addClass('shutter-initialized');
                    
                    var obj = new Shutter($(this));
                    $(this).data('Shutter',obj);
                }
            });
        });

        $('[data-shutter]').shutter();
    });
})(jQuery);
(function($){
    var Filter = function(obj,options){
        this.init(obj,options);
    };

    var prototype = {

        init:function($elem,options){
            this.$elem = $elem;
            this.$input = $elem.find(options.input);
            this.elements =  options.elements;
            this.target = options.target;
            this.$input.on('keyup',$.proxy(this.filter,this));
        },
        filter: function(){
            var value = this.$input.val();
            this.$elem.find(this.elements).each($.proxy(function(i,elem){

                var
                    $_current = $(elem),
                    comparedValue = $_current.find(this.target).text(),
                    regex = new RegExp(value,'i')
                    ;
                if(regex.test(comparedValue)){
                    $_current.show();
                }else{
                    $_current.hide();
                }

            },this));
        }
    };

    Filter.prototype = prototype;



    $.fn.textFilter = function(options){
        this.each(function(){
            var obj = new Filter($(this),options);
            $(this).data('filter',obj);
        });
    }
})(jQuery);
(function($){
    var cache = {};
    var Plugin = function(options){
        this.init(options);
    };

    var $clonned;
    var prototype = {
        onEnter:function(e){


            //$('body').addClass('view-tile');
            var $elem = $(e.currentTarget);
            if($elem.closest('[data-carousel]').slick('getSlick').animating){
                return;
            }
            this.onLeave($elem);
            $clonned = $elem.clone();
            /*$clonned.css({
                position: 'absolute',
                left: $elem.offset().left,
                top: $elem.offset().top,
            }).addClass('is-open');*/


            var $target = $('<div class="runner"/>');

            $target.css({
                position: 'absolute',
                //top:0,
                //left:0,
                //marginLeft: $elem.offset().left,
                //marginTop: $elem.offset().top,
                left: $elem.offset().left,
                top: $elem.offset().top,
            });
            $clonned.addClass('is-open');

            $clonned.css('width','auto');
            $target.append($clonned);

            $target.width($elem.parent().innerWidth());
            //$target.height($elem.parent().innerHeight());

            $('body').append($target);
            $clonned.on('mouseleave',$.proxy(this.createOnLeave($elem),this))

            if(typeof this.options['onEnter']=='function'){
                this.options['onEnter']($elem);
            }
        },
        createOnLeave:function($element){
            return $.proxy(function(e){
                this.onLeave($element);
            },this);
        },

        onLeave:function($element){

            if($clonned!=null){
                $clonned.remove();
            }
            $('body').removeClass('view-tile');
            if(typeof this.options['onLeave']=='function'){
                this.options['onLeave']($element);
            }
        },
        init:function(options){
            this.options = options;
            $(document).on('mouseenter',options.selector,$.proxy(this.onEnter,this));

        }
    };

    Plugin.prototype = prototype;



    $.hoverClone = function(options){
        cache[options.selector] = new Plugin(options)
    }
})(jQuery);
/*
 * jquery.spinner
 * https://github.com/vsn4ik/jquery.spinner
 * Copyright Vasily A., 2015&ndash;2017
 * Copyright xixilive, 2013&ndash;2015
 * Licensed under the MIT license
 */

'use strict';

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  }
  else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  }
  else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  var spinningTimer;
  var Spinner;
  var Spinning = function($element, options) {
    this.$el = $element;
    this.options = $.extend({}, Spinning.rules.defaults, Spinning.rules[options.rule] || {}, options);
    this.min = Number(this.options.min) || 0;
    this.max = Number(this.options.max) || 0;

    this.$el.on({
      'focus.spinner': $.proxy(function(e) {
        e.preventDefault();
        $(document).trigger('mouseup.spinner');
        this.oldValue = this.value();
      }, this),
      'change.spinner': $.proxy(function(e) {
        e.preventDefault();
        this.value(this.$el.val());
      }, this),
      'keydown.spinner': $.proxy(function(e) {
        var dir = {
          38: 'up',
          40: 'down'
        }[e.which];

        if (dir) {
          e.preventDefault();
          this.spin(dir);
        }
      }, this)
    });

    //init input value
    this.oldValue = this.value();
    this.value(this.$el.val());
    return this;
  };

  Spinning.rules = {
    defaults: { min: null, max: null, step: 1, precision: 0 },
    currency: { min: 0.00, max: null, step: 0.01, precision: 2 },
    quantity: { min: 1, max: 999, step: 1, precision: 0 },
    percent:  { min: 1, max: 100, step: 1, precision: 0 },
    month:    { min: 1, max: 12, step: 1, precision: 0 },
    day:      { min: 1, max: 31, step: 1, precision: 0 },
    hour:     { min: 0, max: 23, step: 1, precision: 0 },
    minute:   { min: 1, max: 59, step: 1, precision: 0 },
    second:   { min: 1, max: 59, step: 1, precision: 0 }
  };

  Spinning.prototype = {
    spin: function(dir) {
      if (this.$el.prop('disabled')) {
        return;
      }

      this.oldValue = this.value();
      var step = $.isFunction(this.options.step) ? this.options.step.call(this, dir) : this.options.step;
      var multipler = dir === 'up' ? 1 : -1;

      this.value(this.oldValue + Number(step) * multipler);
    },

    value: function(v) {
      if (v === null || v === undefined) {
        return this.numeric(this.$el.val());
      }
      v = this.numeric(v);

      var valid = this.validate(v);
      if (valid !== 0) {
        v = (valid === -1) ? this.min : this.max;
      }
      this.$el.val(v.toFixed(this.options.precision));

      if (this.oldValue !== this.value()) {
        // changing.spinner
        this.$el.trigger('changing.spinner', [this.value(), this.oldValue]);

        // lazy changed.spinner
        clearTimeout(spinningTimer);
        spinningTimer = setTimeout($.proxy(function() {
          this.$el.trigger('changed.spinner', [this.value(), this.oldValue]);
        }, this), Spinner.delay);
      }
    },

    numeric: function(v) {
      v = this.options.precision > 0 ? parseFloat(v, 10) : parseInt(v, 10);

      // If the variable is a number
      if (isFinite(v)) {
        return v;
      }

      return v || this.options.min || 0;
    },

    validate: function(val) {
      if (this.options.min !== null && val < this.min) {
        return -1;
      }

      if (this.options.max !== null && val > this.max) {
        return 1;
      }

      return 0;
    }
  };

  Spinner = function(element, options) {
    this.$el = $(element);
    this.$spinning = this.$el.find('[data-spin="spinner"]');

    if (this.$spinning.length === 0) {
      this.$spinning = this.$el.find(':input[type="text"]');
    }

    options = $.extend({}, options, this.$spinning.data());

    this.spinning = new Spinning(this.$spinning, options);

    this.$el
      .on('click.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))
      .on('mousedown.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'));

    $(document).on('mouseup.spinner', $.proxy(function() {
      clearTimeout(this.spinTimeout);
      clearInterval(this.spinInterval);
    }, this));

    if (options.delay) {
      this.delay(options.delay);
    }

    if (options.changed) {
      this.changed(options.changed);
    }

    if (options.changing) {
      this.changing(options.changing);
    }
  };

  Spinner.delay = 500;

  Spinner.prototype = {
    constructor: Spinner,

    spin: function(e) {
      var dir = $(e.currentTarget).data('spin');

      switch (e.type) {
        case 'click':
          e.preventDefault();
          this.spinning.spin(dir);
          break;
        case 'mousedown':
          if (e.which === 1) {
            this.spinTimeout = setTimeout($.proxy(this, 'beginSpin', dir), 300);
          }
          break;
      }
    },

    delay: function(ms) {
      var delay = Number(ms);

      if (delay >= 0) {
        this.constructor.delay = delay + 100;
      }
    },

    value: function() {
      return this.spinning.value();
    },

    changed: function(fn) {
      this.bindHandler('changed.spinner', fn);
    },

    changing: function(fn) {
      this.bindHandler('changing.spinner', fn);
    },

    bindHandler: function(t, fn) {
      if ($.isFunction(fn)) {
        this.$spinning.on(t, fn);
      }
      else {
        this.$spinning.off(t);
      }
    },

    beginSpin: function(dir) {
      this.spinInterval = setInterval($.proxy(this.spinning, 'spin', dir), 100);
    }
  };

  var old = $.fn.spinner;

  $.fn.spinner = function(options, value) {
    return this.each(function() {
      var data = $.data(this, 'spinner');

      if (!data) {
        data = new Spinner(this, options);

        $.data(this, 'spinner', data);
      }
      if (options === 'delay' || options === 'changed' || options === 'changing') {
        data[options](value);
      }
      else if (options === 'step' && value) {
        data.spinning.step = value;
      }
      else if (options === 'spin' && value) {
        data.spinning.spin(value);
      }
    });
  };

  $.fn.spinner.Constructor = Spinner;
  $.fn.spinner.noConflict = function() {
    $.fn.spinner = old;
    return this;
  };

  $(function() {
    $('[data-trigger="spinner"]').spinner();
  });

  return $.fn.spinner;
});
(function($,w){
    $.magicLine = function(){
        var $el, leftPos, newWidth,
            $mainNav = $(".tabs");




        $('.tab-nav:visible').each(function(){
            var
                $tabs = $(this).find('.tabs'),
                $indicator = $('<li class="indicator"></li>'),
                params
                ;
            if($tabs.find('.indicator').lenght){
                return;
            }
            $tabs.append($indicator);
            param = {
                left: $tabs.find(".tab.active a").position().left,
                width: $tabs.find(".tab.active").width()
            };
            console.log(param);
            $indicator.css(param);
            $(this).find('li a').click(function() {
                var
                    $el = $(this),
                    $magicLine = $el.closest('.tabs').find('.indicator')
                    ;
                leftPos = $el.position().left;
                newWidth = $el.parent().width();
                $magicLine.stop().animate({
                    left: leftPos,  
                    width: newWidth
                },{
                    step:function(){
                        $indicator.css("overflow","visible");
                    }
                });
            });
        });
    }
})(jQuery,window);
(function($){
    $(document).on('click','.clear-input__trigger',function(e){
        e.preventDefault();
        var $input =$(e.currentTarget).parent().find('input');
        $input.val('');
        $input.focus();
    });
    $(document).on('focus','.clear-input',function(e){
        var $trigger = $(this).parent().find('.clear-input__trigger');
        $trigger.show();
    });
    $(document).on('blur','.clear-input',function(e){
        var $trigger = $(this).parent().find('.clear-input__trigger');
        setTimeout(function(){
            $trigger.hide();
        },100);

    })
})(jQuery);

/* https://github.com/cloudfour/hideShowPassword */
(function ($, undef) {

  var dataKey = 'plugin_hideShowPassword' // Where to store instances
    , defaults = {
        // Visibility of the password text. Can be true, false, 'toggle'
        // or 'infer'. If 'toggle', it will be the opposite of whatever
        // it currently is. If 'infer', it will be based on the input
        // type (false if 'password', otherwise true).
        show: 'infer',

        // Set to true to create an inner toggle for this input.
        innerToggle: false,

        // Specify an event for the input that should make the innerToggle
        // visible. If false, the toggle will be immediately visible.
        // Example: 'focus'
        hideToggleUntil: false,

        // By default, the innerToggle will work like any old clickable
        // element. If this is set to true, it will use touch-optimized
        // events so you can tap it on a touch device without losing
        // your input focus.
        touchSupport: false,

        // Event to use for inner toggle when touchSupport is false.
        toggleEvent: 'click',

        // ...and when touchSupport is true.
        toggleTouchEvent: 'touchstart mousedown',

        // When innerToggle is true, the input needs to be wrapped in
        // a containing element. You can specify the class name of this
        // element here. Useful for custom styles.
        wrapperClass: 'hideShowPassword-wrapper',

        // Class name for the inner toggle.
        toggleClass: 'hideShowPassword-toggle',

        // The states object includes settings specific to the "shown"
        // or "hidden" states of the input field.
        states: {

          // These settings are applied when the password text is
          // visible (show: true).
          shown: {

            // Class to apply to the input element.
            inputClass: 'hideShowPassword-shown',

            // Event to trigger on the input.
            eventName: 'passwordShown',

            // Class to apply to the toggle.
            toggleClass: 'hideShowPassword-toggle-hide',

            // Text of the toggle element.
            toggleText: 'Hide',

            // Property values to apply to the input element.
            attr: {
              'type': 'text',
              'autocapitalize': 'off',
              'autocomplete': 'off',
              'autocorrect': 'off',
              'spellcheck': 'false'
            }
          },

          // Settings when text is hidden (show: false).
          hidden: {
            inputClass: 'hideShowPassword-hidden',
            eventName: 'passwordHidden',
            toggleClass: 'hideShowPassword-toggle-show',
            toggleText: 'Show',
            attr: { 'type': 'password' }
          }
        },

        // When innerToggle is true, some elements are styled based
        // on their width. Unless box-sizing is set to border-box,
        // outerWidth() is a more reliable method than width(), but it is
        // not included with Zepto. If you plan to include your own plugin
        // for determining width, you can specify its key as a string to
        // override these defaults.
        widthMethod: ($.fn.outerWidth === undef) ? 'width' : 'outerWidth',
        heightMethod: ($.fn.outerHeight === undef) ? 'height' : 'outerHeight'
      };

  // Constructor
  function HideShowPassword(element, options) {
    this.element = $(element);
    this.init(options);
  }

  HideShowPassword.prototype = {

    // Initialization logic (only runs first time)
    init: function (options) {
      this.update(options, defaults, (this.element.prop('type') === 'password'));
      if (this.options.innerToggle) {
        this.initInnerToggle(this.element, this.options);
      }
    },

    // Processes fresh options and updates the input state
    update: function (options, base, toggleFallback) {
      base = base || this.options;
      toggleFallback = toggleFallback || !this.options.show;
      // Allow show/hide shorthand
      if (typeof options !== 'object') {
        options = { show: options };
      }
      // Update the options
      this.options = $.extend({}, base, options);
      // Interpret strings
      if (this.options.show === 'toggle') {
        this.options.show = toggleFallback;
      }
      if (this.options.show === 'infer') {
        this.options.show = (this.element.prop('type') !== 'password');
      }
      // Apply and remove attributes based on the new state
      this.ifCurrentOrNot($.proxy(function (state) {
        // This is a loop because Zepto's prop method does not
        // support an object of key/value pairs.
        $.each(state.attr, $.proxy(function (key, value) {
          this.element.prop(key, value);
        }, this));
        this.element.addClass(state.inputClass).trigger(state.eventName);
      }, this), $.proxy(function (state) {
        this.element.removeClass(state.inputClass);
      }, this));
    },

    // Toggle shorthand
    toggle: function () {
      this.update('toggle');
    },

    // Return the current state key
    currentStateKey: function () {
      return this.options.show ? 'shown' : 'hidden';
    },

    // Loop through all states, perform one action for
    // the current state and another for others.
    ifCurrentOrNot: function (ifCurrent, ifNot) {
      var currentKey = this.currentStateKey();
      $.each(this.options.states, function (thisKey, state) {
        ((currentKey === thisKey) ? ifCurrent : ifNot)(state);
      });
    },

    // Build the inner toggle, wrapper, and associated events
    initInnerToggle: function (el, options) {

      var attachment = (el.css('direction') === 'rtl') ? 'left' : 'right'
        , elWidth = el[options.widthMethod]()
        , wrapperCSS = {
            position: 'relative',
            display: el.css('display'),
            verticalAlign: el.css('verticalAlign'),
            marginTop: el.css('marginTop'),
            marginRight: el.css('marginRight'),
            marginBottom: el.css('marginBottom'),
            marginLeft: el.css('marginLeft')
          }
        , toggleCSS = {
            position: 'absolute',
            top: '50%',
            mozUserSelect: 'none',
            webkitUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none'
          }
        , elCSS = {
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0
          }
        , eventName = ''
        , elWidth
        , wrapper
        , toggle;

      el.wrap($('<div />').addClass(options.wrapperClass).css(wrapperCSS));
      wrapper = el.parent();
      if (wrapper[options.widthMethod]() !== elWidth) {
        wrapper.css('width', elWidth);
      }

      toggle = $('<div />').addClass(options.toggleClass);
      this.updateInnerToggle(toggle, this.currentStateKey(), options.states);
      toggleCSS[attachment] = 0;
      toggle.css(toggleCSS);
      toggle.appendTo(wrapper);
      toggle.css('marginTop', (toggle[options.heightMethod]() / -2));

      elCSS['padding' + attachment.replace(/./, function(m) { return m[0].toUpperCase() })] = toggle[options.widthMethod]();
      el.css(elCSS);

      if (options.touchSupport) {
        toggle.css('pointerEvents', 'none');
        el.on(options.toggleTouchEvent, $.proxy(function (event) {
          var toggleX = toggle.offset().left
            , eventX
            , lesser
            , greater;
          if (toggleX) {
            eventX = event.pageX || event.originalEvent.pageX;
            if (attachment === 'left') {
              toggleX+= toggle[options.widthMethod]();
              lesser = eventX;
              greater = toggleX;
            } else {
              lesser = toggleX;
              greater = eventX;
            }
            if (greater >= lesser) {
              event.preventDefault();
              this.toggle();
            }
          }
        }, this));
      } else {
        toggle.on(options.toggleEvent, $.proxy(function () {
          this.toggle();
        }, this));
      }

      $.each(options.states, function (key, state) {
        eventName += state.eventName + ' ';
      });
      el.on(eventName, $.proxy(function () {
        this.updateInnerToggle(toggle, this.currentStateKey(), options.states);
      }, this));


      if (options.hideToggleUntil) {
        toggle.hide();
        el.one(options.hideToggleUntil, function () {
          toggle.show();
        });
      }

    },

    // Update the inner toggle (text, class, etc.)
    updateInnerToggle: function (el, currentKey, states) {
      this.ifCurrentOrNot(function (state) {
        el.addClass(state.toggleClass).text(state.toggleText);
      }, function (state) {
        el.removeClass(state.toggleClass);
      });
    }

  };

  // The main function, reuses previous instance if it exists
  $.fn.hideShowPassword = function (options) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data(dataKey);
      if (data) {
        data.update(options);
      } else {
        $this.data(dataKey, new HideShowPassword(this, options));
      }
    });
  };

  // Shorthand plugins
  $.each({ 'show':true, 'hide':false, 'toggle':'toggle' }, function (verb, showVal) {
    $.fn[verb + 'Password'] = function (options) {
      return this.hideShowPassword($.extend({}, options, { show: showVal }));
    };
  });

})(this.jQuery || this.Zepto);
$('#app_basket_reg_form').validate({
    errorClass: 'has-error',
    rules: {
        name: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        tel: {
            // required: true
            // number: true
        }
    },
    messages: {
        name: 'РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ РІРІРѕРґР°',
        email: {
            required: "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ РІРІРѕРґР°",
            email: "РћС€РёР±РєР°! РќРµРґРѕРїСѓСЃС‚РёРІС‹Р№ СЃРёРјРІРѕР» РІ e-mail"
        },
        tel: 'РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ РІРІРѕРґР°'
    }
});
var App ={
    isIe9:function(){
        return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
    },
    init:function(){
        for(var i in this){
            if(this.hasOwnProperty(i) && typeof this[i]=='object' && typeof this[i]['init']=='function'){
                this[i].init();
            }
        }
    },
    onLoad:function(){
        for(var i in this){
            if(this.hasOwnProperty(i) && typeof this[i]=='object' && typeof this[i]['onLoad']=='function'){
                this[i].onLoad();
            }
        }
    },
    onResize:function(){
        for(var i in this){
            if(this.hasOwnProperty(i) && typeof this[i]=='object' && typeof this[i]['onResize']=='function'){
                this[i].onResize();
            }
        }
    }
};
var App = App || {};
App.Search ={ 
    expandInput:function(e)
    {   
        var $elem = $(e.currentTarget);
        
//        $('.b-popup_search.desktop input')
//                .val($elem.val())
//            ;
        $('.b-popup_search.desktop').show();
        
        var left = $elem.offset().left - $('.b-popup_search.desktop').offset().left;
        var right = $('.b-popup_search.desktop').width()-$elem.width()-left-30;


        $('.b-popup_search.desktop .b-popup_search__input').css({
            'padding-left':0,
            'padding-right':0
        }).
            animate({
            'padding-left':0,
            'padding-right':0
            
        },0,function(){
            //$('.b-popup_search_results').show();
            $('.b-popup_search.desktop input').focus();
        });
    },
    showHints:function(e){
        
        var $elem = $(e.currentTarget);
        if($elem.val().length>3){
            $('.b-popup_search_results').hide();
        }
        this.expandInput(e);
        
    },
    showHintsMobile:function(e){
        var $elem = $(e.currentTarget);
        if($elem.val().length>3){
            $('.b-popup_search--mobile_results').show();
        }
    },
    closeHints:function(event){
       /*
        if(!$(event.target).closest('.b-popup_search.desktop').length) {
            $('.b-popup_search.desktop').hide();
        }
        */
    },
    reposition:function(){       
        $("#modalSearch .modal-dialog").hide();
        $("#modalSearch .modal-dialog").css({
            top: $('.b-nav_search-form__btn--mobile').offset().top-$(document).scrollTop()+60 
        });
        $("#modalSearch .modal-dialog").show();        
    },
    
    init:function() {      
        $('.b-nav_search-form__input').on('keyup', $.proxy(this.showHints, this));
        $('.b-nav_search-form__input').on('focus', $.proxy(this.expandInput, this));
        
//        $('.b-popup_search--mobile__input>input').on('keyup', $.proxy(this.showHintsMobile, this));
        $(document).on('click',$.proxy(this.closeHints,this));
        $('.b-popup_search_results__content').mCustomScrollbar();

        $("#modalSearch").on('show.bs.modal',$.proxy(this.reposition,this));
        
        $('.b-popup_search_results').hide();
        
        $('.modal-dialog .b-popup_search--mobile__top').click(function(){
            $('#modalSearch').modal('hide');
        })
        
    }
};
var App = App || {};
App.Catalog = {
    changeView:function(e){
        
        var date = new Date();
        date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
        document.cookie = encodeURIComponent('catalog_view_mode') + "=" + encodeURIComponent($(e.currentTarget).data('class')) + expires + "; path=/";
        
        
        e.preventDefault();
        var
            $elem = $(e.currentTarget),
            dataClass = $elem.data('class')
            ;
        
        $elem.siblings().removeClass('is-selected');
        $elem.addClass('is-selected');
        $('.b-catalog-list').attr('class','b-catalog-list '+dataClass);
        
        this.refreshProductSlider();
    },
    initRangeSliders:function(){
        $('.b-range-slider__bar:not(.noUi-target)').each(function(ind, elem){
            var
                _this = $(elem)
                ,minRange = $(elem).parent().find('.b-range-slider__inputs-min')
                ,maxRange = $(elem).parent().find('.b-range-slider__inputs-max')
                ,maxVal = (_this.data('max-val'))? _this.data('max-val') : _this.data('max-limit')
                ,minVal = (_this.data('min-val'))? _this.data('min-val') : _this.data('min-limit')
                ,minLimit = _this.data('min-limit')||1
                ,maxLimit = _this.data('max-limit')||1000
                ,step = (_this.data('step'))? _this.data('step') : 1,
                _counter=0
                ;

            noUiSlider.create(elem,{
                start: [minVal, maxVal],
                connect: true,
                padding: 0,
                margin:0,
                format: wNumb({
                    decimals: 0,
                    thousand: ' ',
                }),
                range: {
                    'min': minLimit,
                    'max': maxLimit
                },
                step: step
            });
            //elem.noUiSlider.set([minVal,maxVal]);
            // When the slider value changes, update the input and span

            elem.noUiSlider.on('update', function( values, handle ) {
                _counter++;
                var value = values[handle];
                var intValue = parseInt(value.replace(/\s/g,''));
                if ( handle ) {
                    if(_counter>2 || intValue!=maxLimit){
                        maxRange.val(value);
                    }
                } else {
                    if(_counter>2 || intValue!=minLimit ){
                        minRange.val(value);
                    }

                }
            });

            // When the input changes, set the slider value
            maxRange.on('change', function(){
                elem.noUiSlider.set([null, this.value]);
            });
            // When the input changes, set the slider value
            minRange.on('change', function(){
                elem.noUiSlider.set([this.value, null]);
            });

        });
    },
    isProductSlidersInitialized: false,
    initProductSlider:function(){
        if (!this.isProductSlidersInitialized)
        {
            this.isProductSlidersInitialized = true;
            
            if (Modernizr.mq('only all and (max-width: 809px)'))
            {
                var selector = '.ns-catalog-mobile .b-product-card__slider>div.b-product-card__slider_inner:not(.slick-slider)';
            }
            else
            {
                
                var selector = '.b-product-cart-catalog__slider>div.b-product-cart-catalog__slider_inner:not(.slick-slider)';
                
                $(selector).appear();
                $(document.body).on('appear', selector, function(e, $affected) {
                    $affected.each(function() {
                       // console.log('slick init');
                        $(this).slick({
                            infinite: true,
                            arrows: true,
                            lazyLoad: 'ondemand',
                            // appendArrows: $element.parent().find('.b-product-cart-catalog__nav'),
                            nextArrow: '<a class="b-product-cart-catalog__next"><i class="icon icon-arrow-right"></i></a>',
                            prevArrow: '<a class="b-product-cart-catalog__prev"><i class="icon icon-arrow-left"></i></a>',
                            //swipeToSlide: true,
                            slidesToShow: 1,
                            responsive: [
                                {
                                    breakpoint: 810,
                                    settings: {
                                        dots: true,
                                    }
                                }
                            ]
                        });
                    })
                 });
                 $.force_appear();
            }
        }
    },
    refreshProductSlider:function(){
        //$('.b-product-cart-catalog__slider>div').slick('unslick');
        $('.b-product-cart-catalog__slider>div.b-product-cart-catalog__slider_inner').slick('getSlick').refresh();
        //this.initProductSlider();
    },
    initBrands:function(){
        $('.b-filter-brands-list').css({'height': 'initial', 'overflow': 'initial'});
        $('.b-filter-brands__content').mCustomScrollbar();

        $('.b-filter-brands').textFilter({
            input:'input',
            elements:'.b-filter-brands-list__item',
            target:'label span'
        });
    },

    loadProducts:function(e){
        
        e.preventDefault();
        $.get('./ajax-result.html',$.proxy(function(result){
            $('.b-catalog-list').append(result);
            this.initProductSlider();
        },this));
    },
    stopPropagationTooltip:function(e){
        //e.stopPropagation();
    },
    init:function() {
        
        if(!App.isIe9()){
            //this.initRangeSliders();
            //this.initProductSlider();
            //this.initBrands();
        }
        $('.b-catalog-view__item').on('click', $.proxy(this.changeView, this));
        $('[data-catalog-load-more]').on('click',$.proxy(this.loadProducts,this));
        $('.question').on('click',$.proxy(this.stopPropagationTooltip,this));
        
        
    },
    onLoad:function(){
//        if(App.isIe9()){
//            this.initRangeSliders();
//            this.initProductSlider();
//            this.initBrands();
//        }

        this.initRangeSliders();
        this.initBrands();
        
        this.initProductSlider();
        
        $('.manufacturer-expand-collapse-btn').click(function(){
            var newText = $(this).text().trim() == $(this).data('text-expand') ? $(this).data('text-collapse') : $(this).data('text-expand');
            $(this).text(newText);
        });
   
    }
    
}


;
$(document).ready(function(){
    $('.b-popup_location__input').on('keyup',function(e){
        var $elem = $(this);
        if($elem.val().length>0){
            $('.b-popup_location__input-block .icon').hide();
        }else{
            $('.b-popup_location__input-block .icon').show();
        }
        if($elem.val().length>3){
            $('.b-popup_location_results').show();
        }
    });

    $('.b-popup_location_results').mCustomScrollbar();
});
$(document).on('click',function(event){
    //
    if(!$(event.target).closest('.b-popup_location').length) {
        $('.b-popup_location_results').hide();
    }
});
var App = App || {};

App.Auth={
    reposition:function(){
        $("#modalAuth .modal-dialog").hide();
        $("#modalAuth .modal-dialog").css({
            top: $('.b-nav_profile__btn').offset().top-$(document).scrollTop()+60
        });
        $("#modalAuth .modal-dialog").show();
    },
    init:function(){
        $("#modalAuth").on('show.bs.modal',$.proxy(this.reposition,this));
    }
};
var App = App || {};
App.Favorites ={
    ui:false,
    show:function(e){
        //$('[data-cart_popup]').hide();

        
        e.preventDefault();
        //e.stopPropagation();

        $('[data-favorites_popup]').show();

        var $icon = $('.c-popup-favorite-pic');
        var $origin = $('.b-header .b-header_favorite .box--bottom');
        var pos = $origin.offset();
        var left = pos.left
            - ($(window).width()-$('.container:eq(0)').width())/2
            - $('.b-popup_region-product__inner-1').css('margin-left').replace(/px/,'')
        ;
        $icon.css({
            left: left,
            top: pos.top - $('.b-header__bottom').offset().top+1
        });

        $('body').addClass('popup-favorites');

        if(!this.ui){
            this.initUi();
            this.ui = true;
        }

    },
    hide:function(event){
        var $target = $(event.target);
        if(!$target.closest('[data-favorites_popup]').length && !$target.closest('[data-favorites]').length) {
            $('[data-favorites_popup]').hide();
            $('body').removeClass('popup-favorites');
        }
    },
    initCarousel:function(){
        $('.b-popup_favorites [data-carousel]').slick({
            dots: false,
            infinite: true,
            arrows: true,
            pauseOnHover: true,
            autoplay: true,
            autoplaySpeed: 5000,
            nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-in-circle-right-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
            prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-in-circle-left-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
            //swipeToSlide: true,
            slidesToShow: 3
        });
        $.magicLine();
    },
    initScrollBar:function(){
        $('.b-popup_favorites .b-popup_region-product__inner-1').mCustomScrollbar({
            mouseWheelPixels: 300
        });
    },
    initUi:function(){
        this.initCarousel();
        this.initScrollBar();
    },
    init:function() {
//        $('[data-favorites]').on('click', $.proxy(this.show, this));
        $('[data-favorites]').on('click', function(){
            window.location.href = '/index.php?route=product/viewed';
        });

        $(document).on('click',$.proxy(this.hide,this));

//        $.ajax({
//            url: '/index.php?route=product/viewed/topBlock',
//            dataType: 'html',
//            success: function(html) {
//                $('[data-favorites_popup]').html($(html).filter('[data-favorites_popup]').html());
//                App.Favorites.initUi();
//            }
//        });
    }
};
var App = App || {};
App.Cart ={
    ui:false,
    show:function(e){
        
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        $('[data-cart_popup]').show();
        $('[data-cart]').addClass('bring-to-top');
        $('body').addClass('popup-cart');
        if(!this.ui){
            this.initUi();
            this.ui = true;
        }
        var $icon = $('.c-popup-cart-pic');
        var $origin = $('.b-header .b-header_cart .box--bottom');
        var pos = $origin.offset();
        var left = pos.left
                - ($(window).width()-$('.container:eq(0)').width())/2
                - $('.b-popup_region-product__inner-1').css('margin-left').replace(/px/,'')
            ;
        $icon.css({
            left: left,
            top: pos.top - $('.b-header__bottom').offset().top+1
        });

        
        $('.b-popup_cart [data-carousel]').slick('setPosition');
        
        $('.b-popup_cart .b-showcase-tab__tab-content.active .b-product-list.slick-initialized').slick('slickPlay');
    },
    hide:function(event){
        if(
            !$(event.target).closest('[data-cart_popup]').length
            && !$(event.target).closest('[data-cart]').length
        ) {
            $('[data-cart_popup]').hide();
            $('body').removeClass('popup-cart');
            App.Cart.slickPauseAll();
        }
    },
    slickPauseAll:function()
    {
        $('.b-popup_cart .b-showcase-tab__tab-content .b-product-list.slick-initialized').slick('slickPause');
    },
    slickPlayOrPauseCart:function()
    {
        setTimeout(function(){
            $('.b-popup_cart .b-showcase-tab__tab-content.active .b-product-list.slick-initialized').slick('slickPlay');
            $('.b-popup_cart .b-showcase-tab__tab-content:not(.active) .b-product-list.slick-initialized').slick('slickPause');
        }, 500);
    },
    slickPauseAllPopupAddCart:function()
    {
        $('.modal .b-showcase-tab__tab-content .b-product-list.slick-initialized').slick('slickPause');
    },
    slickPlayOrPausePopupAddToCart:function()
    {
        setTimeout(function(){
            $('.modal .b-showcase-tab__tab-content.active .b-product-list.slick-initialized').slick('slickPlay');
            $('.modal .b-showcase-tab__tab-content:not(.active) .b-product-list.slick-initialized').slick('slickPause');
        }, 500);
    },
    initCarousel:function(){
        $('.b-popup_cart :not(.slick-initialized)[data-carousel]').slick(App.Cart.getSlickParams());
        $.magicLine();
        
        $('.b-popup_cart .b-showcase-tab__nav a[data-toggle="tab"]').on('show.bs.tab', function (e) {
            App.Cart.slickPauseAll();
        });
        $('.b-popup_cart .b-showcase-tab__nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            App.Cart.slickPlayOrPauseCart();
        });
        App.Cart.slickPlayOrPauseCart();
    },
    initCarouselPopup:function(){
        $('.modal :not(.slick-initialized)[data-carousel]').slick(App.Cart.getSlickParams());
        $.magicLine();
        
        $('.modal .b-showcase-tab__nav a[data-toggle="tab"]').on('show.bs.tab', function (e) {
            App.Cart.slickPauseAllPopupAddCart();
        });
        $('.modal .b-showcase-tab__nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            App.Cart.slickPlayOrPausePopupAddToCart();
        });
        App.Cart.slickPlayOrPausePopupAddToCart();
    },
    getSlickParams:function(){
        return {
            dots: false,
            infinite: true,
            arrows: true,
            pauseOnHover: true,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-in-circle-right-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
            prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-in-circle-left-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
            //swipeToSlide: true,
            slidesToShow: 3
        };
    },
    initUi:function(){
        this.initScrollBar();
        this.initCarousel();

    },
    init:function() {
        var _self = this;
        $('[data-cart]').on('click', $.proxy(this.show, this));
        $('.b-popup_region-product .close').on('click', $.proxy(this.hide, this));                
        $(document).on('click',$.proxy(this.hide,this));

        this.printPrice();
        /*
        if (Modernizr.mq('only all and (max-width: 809px)')){
            $('.section-basket .b-basket-goods__item-count .count-value').css('display','none');
            $('.section-basket .b-basket-goods__item-count .spinner').css('display','block');
        } else {
            $('.section-basket .b-basket-goods__item-count .count-value').on('mouseenter',function (e) {
                $(this).closest('.b-basket-goods__item-count').find('.spinner').css('display','block');
                $(this).css('display','none');
            });
            $('.section-basket .b-basket-goods__item-count .spinner').on('mouseleave',function (e) {
                $(this).closest('.b-basket-goods__item-count').find('.count-value').css('display','block');
                $(this).css('display','none');
            });
        }
        */

        $('.section-basket .js-closable').on('click',function (e) {
            e.preventDefault();
            $(this).closest('[data-closable]').remove();
            App.Cart.printPrice();
        });
        $('.b-basket-goods__content .spinner').spinner('changing', function(e, newVal, oldVal) {
           _self.printPrice();
            $(this).closest('.b-basket-goods__item-count').find('.count-value').text(newVal+' С€С‚.');
        });
        $('.section-basket .js-basket-clear').on('click',function (e) {
            e.preventDefault();
            $('#basket [data-closable]').remove();
            _self.printPrice();
            
            $('.b-popup_cart .b-product-cart--popup__col-delete a').each(function(i, element){
                element.click();
            });
        })
        
        $('input[name="shipping_method"]').on('change', function () {
            _self.printPrice();
        })
        
        $('input[name="delivery-pickup-value"]').on('change', function () {
            if ($(this).is(':checked')) 
            {
                $('#delivery_r1').attr('data-delivery-price', $('input[name=delivery-pickup-value]:checked').attr('data-delivery-price'));
            }
            _self.printPrice();
        })
        
        $('input[name="delivery-flat-value"]').on('change', function () {
            if ($(this).is(':checked')) 
            {
                $('#deilvery_r2').attr('data-delivery-price', $('input[name=delivery-flat-value]:checked').attr('data-delivery-price'));
            }
            _self.printPrice();
        })
        
        $('input[name="delivery-flat-value_2"]').on('change', function () {
            if ($(this).is(':checked')) 
            {
                $('#deilvery_r3').attr('data-delivery-price', $('input[name=delivery-flat-value_2]:checked').attr('data-delivery-price'));
            }
            _self.printPrice();
        })
        
        
        $(document).on('click', '.b-popup_cart__col-back', function(event){
            $('[data-cart_popup]').hide();
            $('body').removeClass('popup-cart');
        })
        $(document).on('click', '.b-popup_region-product__clear-all', function(){
            $('.b-popup_cart .b-product-cart--popup__col-delete a').each(function(i, element){
                element.click();
            });
        })
    },
    initScrollBar:function(){
        $('.b-popup_cart .b-popup_region-product__inner-1').mCustomScrollbar({
            mouseWheelPixels: 300
        });
    },
    printPrice:function () {
        var
            _parent = $('.b-basket-goods__content')
            ,_price = 0
            ,_discount = 0
            ;
        _parent.find('.spinner input').each(function (ind, elem) {
            _price += parseInt($(elem).val())*parseInt($(elem).data('price'));
            if ($(elem).data('discount')){
                _discount += parseInt($(elem).data('discount'))*parseInt($(elem).val());
            }
        });
        
        var total = _price-_discount;
        var shipping = 0;
        
        if ($('input[name="shipping_method"]:checked').length)
        {
            shipping = parseInt($('input[name="shipping_method"]:checked').attr('data-delivery-price'));
        }
        
        console.log(total + shipping);
        
        $('.basket--summary').html(_price.toLocaleString()+' <span class="val-suffix">СЂСѓР±</span>');
        $('.basket--sale').html(''+_discount.toLocaleString()+' <span class="val-suffix">СЂСѓР±</span>');
        $('.basket--total').html( ''+total.toLocaleString()+' <span class="val-suffix">СЂСѓР±</span>');
        $('#checkoutItogoWithDelivery').html((total + shipping).toLocaleString());
    }
};
$(document).on('click','.input-reset',function(e){
    e.preventDefault();
     $(this).prev().val('');
});
var App = App || {};
App.MainNav  = {
    timer:null,
    onHover:function(e){
        if(this.timer!=undefined){
            clearTimeout(this.timer)
        }
        var $elem  = $(e.currentTarget);
        $elem.addClass('active');
        $elem.siblings().removeClass('active');

    },
    onLeave:function(e){
        var $elem  = $(e.currentTarget);
        this.timer = setTimeout(function(){
            $elem.removeClass('active');
        },300);
    },
    init:function(){
        $('.b-main-nav-menu li').on('mouseenter',$.proxy(this.onHover,this));
        $('.b-main-nav-menu li').on('mouseleave',$.proxy(this.onLeave,this));
    }
};
var App = App || {};
App.Scroll ={
    onScroll:function(){
        if ($(window).scrollTop() > 400) {
            $('.scrollTop').fadeIn();
        } else {
            $('.scrollTop').fadeOut();}
        
        if ($('.icon-filter-2-text').is(":visible"))
        {
            setTimeout(function(){
                $('.icon-filter-2-text').animate({
                    width: '0px',
                    padding: '0px'
                }, 200, "linear", function(){
                    $('.icon-filter-2-text').hide();
                });
            }, 300);
        }
    },
    goTop:function(e){
        e.preventDefault();
        $('body,html').stop().animate({scrollTop: 0}, 700);
    },
    init:function() {
        //if ($(window).width() < 1170){
            $(window).on('scroll',$.proxy(this.onScroll,this));
            $('.scrollTop').on('click',$.proxy(this.goTop,this));
        //}
        $('.section-nav').floatNavBar();
    }
};
App.Tooltip = {
    scheduleTooltip: function()
    {
        $('.tooltip-link-schedule').tooltipster({
            interactive: true,
            side: 'bottom',
            IEmin: 9,
            trigger: 'click',
            // theme: 'tooltipster-accent',
            contentCloning: true,
            distance: 5,
            delay: 50,
            animationDuration: 100,
            functionInit: function(instance, helper){

            },
            functionReady: function(instance, tooltip){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
    },
    productPageTooltips: function()
    {
        $('.tooltip-link-product-oplata, .tooltip-link-product-dostavka, .tooltip-link-product-ustanovka').tooltipster({
            interactive: true,
            side: 'bottom',
            IEmin: 9,
            trigger: 'click',
            // theme: 'tooltipster-accent',
            contentCloning: true,
            distance: 5,
            delay: 50,
            animationDuration: 100,
            functionInit: function(instance, helper){

            },
            functionReady: function(instance, tooltip){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
    },
    colorsTooltip: function()
    {
        $('.tooltip-link-colors').tooltipster({
            interactive: true,
            side: 'top',
            IEmin: 9,
            trigger: 'hover',
            theme: 'tooltipster-colors',
            contentCloning: true,
            distance: 0,
            delay: 50,
            animationDuration: 100,
            functionInit: function(instance, helper){

                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');
                if(dataOptions){

                    var cleared = dataOptions.replace(/&quot;/g,'"');
                    dataOptions = JSON.parse(cleared);
                    console.log(dataOptions);

                    $.each(dataOptions, function(name, option){
                        if(name=='parent' && $origin.closest('.b-filter-mobile').length==0){
                            option='body';

                        }

                        instance.option(name, option);
                    });
                }
            },
            functionReady: function(instance, tooltip){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            },
            functionBefore: function(instance){
                var origin = $(instance.elementOrigin());
                var productId = origin.data('product-id');
                if ($('.b-product-cart-catalog__colors > .color-variant-'+productId+'.is-selected').length > 0)
                {
                    var instanceContent = $(instance.content());
                    instanceContent.find('.b-color-variant__item').removeClass('is-selected');
                    instance.content(instanceContent.get());
                }
            }
        });
    },
    videoconsultTooltip: function()
    {
        /*
        $('.btn_videoconsult_product').on('click', function(){
            
            call_back_video_product_card();
            
            return false;
        });
        */        
        $('.tooltip-link-videoconsult').tooltipster({
            interactive: true,
            side: 'top',
            IEmin: 9,
            trigger: 'custom',
            triggerOpen: {
                mouseenter: false,
                touchstart: false,
                tap: true,
                click: true,
            },
            triggerClose: {
                click: true,
                scroll: false,
                mouseleave: false,
                tap: true,
                touchleave: false,
            },
            // theme: 'tooltipster-accent',
            contentCloning: true,
            distance: 0,
            delay: 50,
            animationDuration: 100,
            functionInit: function(instance, helper){                
                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');
                if(dataOptions){

                    var cleared = dataOptions.replace(/&quot;/g,'"');
                    dataOptions = JSON.parse(cleared);
                    //console.log(dataOptions);

                    $.each(dataOptions, function(name, option){
                        if(name=='parent' && $origin.closest('.b-filter-mobile').length==0){
                            option='body';

                        }

                        instance.option(name, option);
                    });
                }
            },
            functionReady: function(instance, tooltip){
                $('input[type="tel"]').mask("+7 (999) 999-99-99");
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
    },
    showroomTooltip: function()
    {
        $('.tooltip-link-showroom').tooltipster({
            interactive: true,
            side: 'top',
            IEmin: 9,
            trigger: 'custom',
            triggerOpen: {
                mouseenter: true,
                touchstart: true,
                tap: true,
                click: true,
            },
            triggerClose: {
                click: true,
                scroll: true,
                mouseleave: true,
                tap: true,
                touchleave: true,
            },
            // theme: 'tooltipster-accent',
            contentCloning: true,
            distance: 0,
            delay: 50,
            animationDuration: 100,
            functionInit: function(instance, helper){

                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');
                if(dataOptions){

                    var cleared = dataOptions.replace(/&quot;/g,'"');
                    dataOptions = JSON.parse(cleared);
                    //console.log(dataOptions);

                    $.each(dataOptions, function(name, option){
                        if(name=='parent' && $origin.closest('.b-filter-mobile').length==0){
                            option='body';

                        }

                        instance.option(name, option);
                    });
                }
            },
            functionReady: function(instance, tooltip){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
        /*
        $('.tooltip-link-showroom').on('click', function(){
            yaCounter13546952.reachGoal('CLICK_SHOWROOM');
            event.stopImmediatePropagation();
            //console.log('click');
            window.location.href = '/showroom';
            return false;
        });
        */
        $('.tooltip-link-showroom').on('mouseover', function(){
            yaCounter13546952.reachGoal('HOVER_SHOWROOM');
            gtag('event','HOVER_SHOWROOM');
        });
    },
    freeDeliveryTooltip: function()
    {
        $('.tooltip-link-free-delivery').tooltipster({
            interactive: true,
            side: 'top',
            IEmin: 9,
            trigger: 'custom',
            // theme: 'tooltipster-accent',
            contentCloning: true,
            distance: 0,
            delay: 50,
            animationDuration: 100,
            triggerOpen: {
              click: true,  // For mouse
              tap: true    // For touch device
            },
            triggerClose: {
              click: true,  // For mouse
              tap: true    // For touch device
            },
            functionInit: function(instance, helper){

                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');
                if(dataOptions){

                    var cleared = dataOptions.replace(/&quot;/g,'"');
                    dataOptions = JSON.parse(cleared);
                    console.log(dataOptions);

                    $.each(dataOptions, function(name, option){
                        if(name=='parent' && $origin.closest('.b-filter-mobile').length==0){
                            option='body';

                        }

                        instance.option(name, option);
                    });
                }
            },
            functionReady: function(instance, tooltip){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
    },
    sizesTooltip: function()
    {
        $('.b-product-characteristics__info a[onmouseout="hidehint()"]').attr('data-tooltip-content', '#tooltip-content-sizes');
        $('.tooltip-sizes, .b-product-characteristics__info a[onmouseout="hidehint()"]').tooltipster({
            interactive: true,
            side: 'top',
            IEmin: 9,
            trigger: 'hover',
            // theme: 'tooltipster-accent',
            contentCloning: true,
            distance: 0,
            delay: 50,
            animationDuration: 100,
            functionInit: function(instance, helper){

                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');
                if(dataOptions){

                    var cleared = dataOptions.replace(/&quot;/g,'"');
                    dataOptions = JSON.parse(cleared);
                    console.log(dataOptions);

                    $.each(dataOptions, function(name, option){
                        if(name=='parent' && $origin.closest('.b-filter-mobile').length==0){
                            option='body';

                        }

                        instance.option(name, option);
                    });
                }
            },
            functionReady: function(instance, tooltip){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
    },
    init: function(){
        $('.b-tooltip__trigger').tooltipster({
            trigger: 'click',
            functionInit: function(instance, helper){
                var content = $(helper.origin).find('.b-tooltip__content').detach();
                instance.content(content);
            },
            functionReady: function(){
                $('.b-tooltip__close').click(function(instance){
                    instance.close();
                });
            }
        });
        
        App.Tooltip.videoconsultTooltip();
        
        App.Tooltip.showroomTooltip();
        App.Tooltip.freeDeliveryTooltip();
        App.Tooltip.sizesTooltip();
        App.Tooltip.colorsTooltip();
        App.Tooltip.scheduleTooltip();
        
        App.Tooltip.productPageTooltips();

        $('.tooltip-link').tooltipster({
            interactive: true,
            side: 'top',
            IEmin: 9,
            trigger: 'click',
            // theme: 'tooltipster-accent',
            contentCloning: true,
            functionInit: function(instance, helper){

                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');
                if(dataOptions){

                    var cleared = dataOptions.replace(/&quot;/g,'"');
                    dataOptions = JSON.parse(cleared);
                    console.log(dataOptions);

                    $.each(dataOptions, function(name, option){
                        if(name=='parent' && $origin.closest('.b-filter-mobile').length==0){
                            option='body';

                        }

                        instance.option(name, option);
                    });
                }
            },
            functionReady: function(instance){
                $(instance._$origin).addClass('is-active');
                $('.b-tooltip__close').click(function(){
                    instance.close();
                });
                $('body').addClass('tooltip-is-open');
            },
            functionAfter: function(instance){
                $(instance._$origin).removeClass('is-active');
                $('body').removeClass('tooltip-is-open');
            }
        });
    }
};

function hint()
{   
}
function hidehint()
{
}
var App = App || {};

App.FilterMobile={
    isOpen: false,
    show:function(e){
        $('<div class="modal-backdrop"></div>').appendTo(document.body);
        $('.b-filter-mobile').show();
        $('body').addClass('sidebar-is-open');
        this.isOpen = true;
        $.force_appear();
        e.stopPropagation();
        App.Scroll.goTop(e);
    },
    hide:function(){
        //$('.b-filter-mobile').hide();
        $('.b-filter-mobile').modal('hide');
        
        $('body').removeClass('sidebar-is-open');
        this.isOpen = false;
        $(".modal-backdrop").remove();
    },
    onClickOutside:function(event){
        if(this.isOpen && !$(event.target).closest('.b-filter-mobile').length) {
            this.hide();
        }
    },
    init:function(){
        $("[data-mobile-filter]").on('click',$.proxy(this.show,this));
        $("[data-mobile-filter-close]").on('click',$.proxy(this.hide,this));
        $(document).on('click',$.proxy(this.onClickOutside,this));
    }
};
(function($,w){
    w.App = w.App || {};


    var defaults = {
        dots: false,
        infinite: true,
        pauseOnHover: false,
        arrows: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: false,
        nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-right"></i></button>',
        prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-left"></i></button>',
        //swipeToSlide: true,
    };

    var current = {};

    App.SliderFactory={

        createBase:function(params){
            params = params || {};
            current = $.extend({},defaults,params);
            return this;
        },
        _get:function(){
            var result = current;
            current = {};
            return result;
        }
    };

})(jQuery,window);
//
(function($,w){
    w.App = w.App || {};





    App.Product={
        initFancybox:function(){
            $(".fancybox").fancybox({
                padding: 0,
                tpl: {
                    next     : '<a class="fancybox-nav fancybox-next" href="javascript:;"><span class="icon icon-arrow-in-circle-right-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></span></a>',
                    prev     : '<a class="fancybox-nav fancybox-prev" href="javascript:;"><span class="icon icon-arrow-in-circle-left-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></span></a>'
                },
                helpers : {
                     thumbs: {
                         width  : 50,
                         height : 50
                     }
                 }
            });
        },
        scrollableTablesSpecification:function()
        {
            if (Modernizr.mq('only all and (max-width: 809px)')){
//                $('.b-product-characteristics__info div:has(table)').css('overflow', 'auto');
            }
        },
        initSliderProductNeeded:function(){

            $('.js-product-needed-carousel').each(function(i,elem){
                var $element = $(elem);
                if (!$element.hasClass('slick-initialized'))
                {
                    $element.slick({
                        dots: true,
                        infinite: false,
                        arrows: false,
                        appendDots: $element.parent().find(".b-product-needed__header"),
                        //swipeToSlide: true,
                        // slidesToShow: 3,
                        rows: 3,
                        slidesPerRow: 1,
                        vertical: false
                    });
                }
            });
        },
        initSliderProductRelated:function(){
            $('.js-product-needed-carousel-1').each(function(i,elem){
                var $element = $(elem);
                $element.slick({
                    dots: true,
                    infinite: false,
                    arrows: false,
                    appendDots: $element.parent().find(".b-product-needed__header"),
                    //swipeToSlide: true,
                    slidesToShow: 1,
                    vertical: false
                });
            });
        },
        initSliderProductLastViewed:function(){
            $('.js-last-viewed-carousel').slick({
                dots: false,
                infinite: true,
                arrows: false,
                pauseOnHover: false,
                autoplay: false,
                autoplaySpeed: 5000,
                //swipeToSlide: true,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 1169,
                        settings: {
                            dots: true,
                            arrows: false,
                            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 810,
                        settings: {
                            arrows: false,
                            vertical: true,
                            dots: true,
                            slidesToShow: 3
                        }
                    }
                ]
            });
        },
        thumbNext:function(e){
            e.preventDefault();
            $('.b-product__preview-thumbs').slick('slickNext');
            this.thumbCheck();
        },



        thumbPrev:function(e){
            e.preventDefault();
            $('.b-product__preview-thumbs').slick('slickPrev');
            this.thumbCheck();
        },
        thumbCheck:function(){
            var
                slick = $('.b-product__preview-thumbs').slick('getSlick'),
                current = slick.currentSlide,
                total = slick.slideCount
            ;
//            if(current==0){
//                $('.b-product__preview-thumbs').find('.slick-arrow.slick-prev').hide()
//            }else{
//                $('.b-product__preview-thumbs').find('.slick-arrow.slick-prev').show()
//            }
//
//            if(current==total-1){
//                $('.b-product__preview-thumbs').find('.slick-arrow.slick-next').hide()
//            }else{
//                $('.b-product__preview-thumbs').find('.slick-arrow.slick-next').show()
//            }
        },
        initThumbs:function(){
            $('.b-product__preview-thumbs').on('init',$.proxy(function(){
                var prev = '<button class="slick-arrow slick-prev " style="display: block;"><i class="icon icon-arrow-left"></i></button>';
                var next = '<button class="slick-arrow slick-next" style="display: block;"><i class="icon icon-arrow-right"></i></button>';
                $('.b-product__preview-thumbs').prepend(prev);
                $('.b-product__preview-thumbs').append(next);
                $('.b-product__preview-thumbs').find('.slick-arrow.slick-prev').on('click',$.proxy(this.thumbPrev,this));
                $('.b-product__preview-thumbs').find('.slick-arrow.slick-next').on('click',$.proxy(this.thumbNext,this));

                //this.thumbCheck();
                setTimeout($.proxy(this.thumbCheck,this),100);
            },this));

            $('.b-product__preview-thumbs').slick({
                slidesToShow: 5,
                //slidesToScroll: $('.b-product__preview-thumbs .b-product__preview-thumbs-item').length-1,
                slidesToScroll: 1,
                // centerMode: true,
                arrows: true,
                // arrows: false,
                infinite: true,
                asNavFor: '.b-product__preview-pic',
                // dots: true,
                // centerMode: true,
                nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-right"></i></button>',
                prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-left"></i></button>',
                focusOnSelect: true,
                // customPaging : function(slider, i) {
                //     var thumb = $(slider.$slides[i]).data('thumb');
                //     return '<a><img src="'+thumb+'"></a>';
                // },
                responsive: [
                    {
                        breakpoint: 1169,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 810,
                        settings: {
                            dots: true,
                            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                            slidesToShow: 1
                        }
                    }
                ]
            });
            
            $('.b-product__preview-thumbs').on('click', '.slick-slide', $.proxy(this.thumbCheck,this));


        },
        initPreviewPictures:function(){
            $('.b-product__preview-pic').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.b-product__preview-thumbs',
                // customPaging : function(slider, i) {
                //     var thumb = $(slider.$slides[i]).data('thumb');
                //     return '<a><img src="'+thumb+'"></a>';
                // },
                responsive: [
                    {
                        breakpoint: 810,
                        settings: {
                            dots: true,
                            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                            slidesToShow: 1
                        }
                    }
                ]
            });
        },
        initMobileTabs: function(){
//            $("#showcaseNavFilter").change(function() {
//                var value = $("#showcaseNavFilter option:selected").val();
//                $('a[href="#'+value+'"]').click();
//            });
        },
        initRelatedParts: function(){
            if (typeof related_parts !== 'undefined')
            {
                process_checked_products();
            }
        },
        init:function(){
            this.initThumbs();
            this.initPreviewPictures();
            this.initFancybox();
            this.scrollableTablesSpecification();
            
            $('main a[href="#product-showcase-2"]').click(function(){
                $('.b-product-tab__nav .tabs a[href="#product-showcase-2"]').click();
                $('html, body').animate({
                    scrollTop: $('.b-product-tab__nav .tabs a[href="#product-showcase-2"]').offset().top
                }, 700);
                return false;                
            })
            
            $(document).on('click', '#product-showcase-2 .slick-arrow', function(event){
                if (typeof yaCounter13546952 !== 'undefined')
                {
                    yaCounter13546952.reachGoal('CLICK_RECOMEND');
                }
            })
            
            $('.b-product-tab__nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = $(e.target).attr("href");
                if (target == '#product-showcase-1')
                {
                    App.Product.initSliderProductNeeded();
                }
                if (target == '#product-showcase-2')
                {
                    if ($('#product-showcase-2 .product-js-showcase-carousel').length > 0 &&
                        !$('#product-showcase-2 .product-js-showcase-carousel').hasClass('slick-initialized'))
                    {
                        $('#product-showcase-2 .product-js-showcase-carousel').slick(App.MainCarousel.getSlickParams());
                    }
                    App.MainCarousel.slickPlayOrPauseTabs();
                }
                if (target == '#product-showcase-3')
                {
                    if ($('#product-showcase-3 .product-js-showcase-carousel').length > 0 &&
                        !$('#product-showcase-3 .product-js-showcase-carousel').hasClass('slick-initialized'))
                    {
                        $('#product-showcase-3 .product-js-showcase-carousel').slick(App.MainCarousel.getSlickParams());
                    }
                    App.MainCarousel.slickPlayOrPauseTabs();
                }
            });
            
            $('.collapse__link_product').click(function(e){
                var _this = $(this)
                    ,collapse = $($(this).attr('data-list-set'));
                    ;

                e.preventDefault();
                
                if (collapse.hasClass('hidden-content'))
                {
                    var fillSizeHeight = 5;
                    collapse.children('li').each(function(){
                        fillSizeHeight = fillSizeHeight + $(this).outerHeight(true);
                    });

                    collapse.removeClass('hidden-content');//.css('height','100%');
                    collapse.stop().animate({
                        height: fillSizeHeight
                      }, 500, function() {
                        // Animation complete.
                    });
                    _this.parent('.b-product-set__btn').removeClass('parts-expanded').addClass('parts-hidden');
                    return;
                }
                else
                {
                    collapse.addClass('hidden-content');//.css('height', collapse.attr('data-hidden-height'));
                    collapse.stop().animate({
                        height: collapse.attr('data-hidden-height')
                      }, 500, function() {
                        // Animation complete.
                    });
                    _this.parent('.b-product-set__btn').removeClass('parts-hidden').addClass('parts-expanded');
                    return;
                }
                
                
            });
        },
        onLoad:function(){
//            App.Product.initSliderProductRelated();
//            App.Product.initRelatedParts();
            
            this.initSliderProductLastViewed();
            
            this.initMobileTabs();
        }
    };

})(jQuery,window);
var App = App || {};

App.Common={
    initTagsMagicLine:function(){
        $.magicLine();
    },
    initStyledSelects:function(){
        if ($('select').size() > 0) {
            $('select:not(.select-dropdown)').select2({
                //maximumInputLength: 3 // only allow terms up to 20 characters long
                minimumResultsForSearch: 50 // at least 20 results must be displayed
            });
        }
    },
    initSliderBestseller:function(){
        
        $('.b-bestseller-slider').slick({
            dots: false,
            infinite: true,
            arrows: true,
            pauseOnHover: false,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-in-circle-right-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
            prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-in-circle-left-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
            //swipeToSlide: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1169,
                    settings: {
                        dots: true,
                        arrows: false,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 810,
                    settings: {
                        arrows: false,
                        vertical: true,
                        dots: true,
                        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                        slidesToShow: 3
                    }
                }
            ]
        });
    },
    initContentDropdown:function(){
        $('[data-dropdown]').contentDropdown();
    },
    initRefreshSliderInTabs:function(){
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            e.preventDefault();
            var slider = $(this).closest('.tab-content').find('.tab-pane.active').find('.slick-slider');
            if (slider.size()>0){
                slider.slick('getSlick').refresh();
                slider.slick('setPosition', 0);
                // slider.resize();
                // slider.slick('setPosition');
                // slider.get(0).slick.setPosition();
                // $('.slick-slider').get(0).slick.setPosition();
            }
        });
    },
    init:function() {
        if (!Modernizr.mq('only all and (max-width: 809px)')){
            this.initTagsMagicLine();
        }
        this.initStyledSelects();
        this.initContentDropdown();
        this.initRefreshSliderInTabs();
    },
    onLoad:function(){
        this.initSliderBestseller();
        
        
        if (Modernizr.mq('only all and (max-width: 809px)')){
            $('.tabs-scroll').mCustomScrollbar({
                axis:"x",
            });
            $('.tabs-scroll li').click(function(){
                var left = $(this).position().left - ($(this).parents('.tabs-scroll:eq(0)').width() - $(this).width())/2;
                if ($(this).position().left < 5)
                {
                    left = 0;
                }
                $(this).parents('.tabs-scroll:eq(0)').mCustomScrollbar("scrollTo",left);
                
            })
        }
        
        $('.b-product-tab .b-product-tab__nav li').click(function(){
            if (typeof yaCounter13546952 !== 'undefined')
            {
                yaCounter13546952.reachGoal('CLICK_MOBILE_PRODUCT_TAB');
                gtag('event','CLICK_MOBILE_PRODUCT_TAB');
            }
        });
        
        //Cookie for live users, not bots
        /*
        $(document).click(function(){
            if (!$.cookie('ud_live')){
                $.cookie('ud_live', '1',  { expires: 30, path: '/' });
            }
        });
        */
        
        //$('.tab-content-slider').css('height', 'initial').css('overflow', 'initial');
    }
};
(function($,w){
    App.Account={
        initMask:function(){
            $('input[type="tel"]').mask("+7 (999) 999-99-99");
        },
        initPassword:function(){
            $('.toggle-password').hideShowPassword({
                // Creates a wrapper and toggle element with minimal styles.
                innerToggle: true,
                // Makes the toggle functional in touch browsers without
                // the element losing focus.
                touchSupport: Modernizr.touch
            });
        },
        initEditable:function(){
            $('.editable-link').on('click',function(e){
                e.preventDefault();
                var _this = $(this),
                    parent = _this.closest('[data-editable]');
                _this.toggleClass('hide');
                parent.find('.editable').toggleClass('hide');
                parent.find('[data-hidden]').toggleClass('hide');
                parent.find('[data-hidden]').find("input,textarea").focus();
            });
            $('.cancel-link').on('click',function(e){
                e.preventDefault();
                var _this = $(this),
                    parent = _this.closest('[data-editable]');
                parent.find('.editable-link').toggleClass('hide');
                parent.find('.editable').toggleClass('hide');
                parent.find('[data-hidden]').toggleClass('hide');
            });
        },
        init:function(){
            this.initMask();
            this.initPassword();
            this.initEditable();
        }
    };

})(jQuery,window);

App.MainCarousel={
    slickPlayOrPauseTabs:function()
    {
        //$('.b-showcase-tab__tab-content.active .js-showcase-carousel.slick-initialized').slick('slickPlay');
        $('.b-showcase-tab__tab-content.active .js-showcase-carousel.slick-initialized').slick('slickPause');
        $('.b-showcase-tab__tab-content:not(.active) .js-showcase-carousel.slick-initialized').slick('slickPause');
    },
    initCarousel:function(){
        
        $('.b-showcase-tab__nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('.js-showcase-carousel:not(.slick-initialized)').slick(App.MainCarousel.getSlickParams());
            App.MainCarousel.slickPlayOrPauseTabs();
        });
        
         
         if ($('.page-home').length) {
             
             $('.js-showcase-carousel:not(.slick-initialized)').slick(App.MainCarousel.getSlickParams());
         }
         else
         {
            $('.js-showcase-carousel').appear();
            $(document.body).on('appear', '.js-showcase-carousel:not(.slick-initialized)', function(e, $affected) {
                $affected.each(function() {
                    console.log('init .js-showcase-carousel');
                    $(this).slick(App.MainCarousel.getSlickParams());
                });
                
                App.MainCarousel.slickPlayOrPauseTabs();
             });
         }
         
         App.MainCarousel.slickPlayOrPauseTabs();
    },
    getSlickParams:function() {
        return {
                        dots: false,
                        infinite: true,
                        arrows: true,
                        pauseOnHover: true,
                        autoplay: false,
                        autoplaySpeed: 5000,
                        nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-in-circle-right-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
                        prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-in-circle-left-white"><i class="path1"></i><i class="path2"></i><i class="path3"></i></i></button>',
                        //swipeToSlide: true,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        responsive: [
                            {
                                breakpoint: 1169,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    dots: false,
                                    arrows: true
                                }
                            },
                            {
                                breakpoint: 810,
                                settings: {
                                    dots: true,
                                    arrows: false,
                                    vertical: false,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                }
                            }
                        ]
                    };
    },

    init:function() {

    },
    onLoad:function(){
        this.initCarousel();
    }
};
App.PageHome = {
    initSlider: function () {

        var main_slider = $('.b-main-slider');
        main_slider.slick({
            dots: true,
            infinite: false,
            arrows: true,
            speed: 500,
            pauseOnHover: false,
            autoplay: false,
            autoplaySpeed: 5000,
            adaptiveHeight: true,
            fade: false,
            nextArrow: '<button class="slick-arrow slick-next"><i class="icon icon-arrow-right"></i></button>',
            prevArrow: '<button class="slick-arrow slick-prev"><i class="icon icon-arrow-left"></i></button>',
            //swipeToSlide: true,
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 809,
                    settings: {
                        autoplay: false,
                        fade: false,
                        arrows: false
                    }
                }
            ]
        });
    },

    init: function () {

    },
    onLoad: function () {
        this.initSlider();
        
    }
};











//var hidWidth;
//var scrollBarWidths = 40;
//
//var widthOfList = function(){
//  var itemsWidth = 0;
//  $('.list li').each(function(){
//    var itemWidth = $(this).outerWidth();
//    itemsWidth+=itemWidth;
//  });
//  return itemsWidth;
//};
//
//var widthOfHidden = function(){
//  return (($('.wrapper').outerWidth())-widthOfList()-getLeftPosi())-scrollBarWidths;
//};
//
//var getLeftPosi = function(){
//  return $('.list').position().left;
//};
//
//var reAdjust = function(){
//  if (($('.wrapper').outerWidth()) < widthOfList()) {
//    $('.scroller-right').show();
//  }
//  else {
//    $('.scroller-right').hide();
//  }
//  
//  if (getLeftPosi()<0) {
//    $('.scroller-left').show();
//  }
//  else {
//    $('.item').animate({left:"-="+getLeftPosi()+"px"},'slow');
//  	$('.scroller-left').hide();
//  }
//}
//
//reAdjust();
//
//$(window).on('resize',function(e){  
//  	reAdjust();
//});
//
//$('.scroller-right').click(function() {
//  
//  $('.scroller-left').fadeIn('slow');
//  $('.scroller-right').fadeOut('slow');
//  
//  $('.list').animate({left:"+="+widthOfHidden()+"px"},'slow',function(){
//
//  });
//});
//
//$('.scroller-left').click(function() {
//  
//	$('.scroller-right').fadeIn('slow');
//	$('.scroller-left').fadeOut('slow');
//  
//  	$('.list').animate({left:"-="+getLeftPosi()+"px"},'slow',function(){
//  	
//  	});
//});
(function($,w){
    w.App = w.App || {};

    App.Response={
        data:{
            Small:320,
            Medium: 810,
            Large: 1187
        },
        breakPoint:function(){
            var
                width = $(window).width(),
                method
                ;
            for(var i in this.data){
                if(this.data[i]<=width){
                    method = 'breakPoint'+i;

                    this[method]();
                }
            }
        },
        breakPointSmall:function(){
            $('[data-sidebar]').appendTo($('[data-html-response-small=filters]'));
        },
        breakPointMedium:function(){

        },
        breakPointLarge:function(){
            $('[data-sidebar]').appendTo($('[data-html-response-large=filters]'));
        },
        init:function(){
            this.breakPoint();
        },
        onResize:function(){
            this.breakPoint();
        }
    };

})(jQuery,window);

$(document).ready(function(){
    App.init();
    
    

    $('.bg-img').each(function(ind, elem){
        if ($(elem).data('image-src')){
            $(elem).css("backgroundImage","url('"+$(elem).data('image-src')+"')")
        }
    });

    $('.hidden-content').each(function(ind,elem){
        if ($(elem).data('hidden-height')){
            $(elem).css("height",$(elem).data('hidden-height'))
        }
    });
    // collapsedContent();
    $('.collapse__link').click(function(e){
        var _this = $(this)
            ,collapse = _this.closest('.hidden-content-wrp').find('.hidden-content')
            ;

        e.preventDefault();
        collapse.removeClass('hidden-content').css('height','100%');
        _this.hide();
    });

    // btn-basket-show-all

    

    $('.js-remove').on('click',function(e){
        e.preventDefault();
        $(this).closest('[data-closable]').remove();
    });
    

    

    $('.row-field--editable [data-hidden]').addClass('hide');
    

    $('.js-add-to-favorite').on('click',function(e){
        e.preventDefault();
        $(this).find('.icon').toggleClass('is-active');
    });

    $('.js-basket-favorite-clear').on('click',function(e){
        e.preventDefault();
        $(this).closest('#basket-favorite').find('.b-basket-list-favorite').remove();
    });


    


    $(document).on('click', '.b-color-variant__item', function(e){
        
        if (typeof yaCounter13546952 !== "undefined" ){
            yaCounter13546952.reachGoal('CLICK_COLOR_CIRCLE_CAT');
            gtag('event','CLICK_COLOR_CIRCLE_CAT');
        }
        
        e.preventDefault();
        var slideIndex = $(this).data('slide');
        var productId = $(this).data('product-id');
        //$('.color-variants-'+productId+' .b-color-variant__item').removeClass('is-selected');
        
        //$('.thumbs-carousel').slick('slickGoTo', slideIndex - 1);
                

        //$(".slick-slide").removeClass('slick-current');
        //$(".slick-slide[data-slick-index="+slideIndex+"]").addClass('slick-current');
        
        if ($(this).data('page') == 'catalog')
        {
            // СЃС‚СЂР°РЅРёС†Р° РєР°С‚Р°Р»РѕРіР°
            
            $('.color-variant-'+productId).removeClass('is-selected');
            $(this).addClass('is-selected');
        
            product_id = $(this).data('product_id');
            if (Modernizr.mq('only all and (max-width: 809px)'))
            {
                //$('.catalog_slider_'+product_id+'>div.b-product-card__slider_inner').slick('slickGoTo', slideIndex);
                $slider_inner = $(this).parents('.b-product-card:eq(0)').find('.b-product-card__picture .b-product-card__slider_inner').eq(0);
                $slider_inner.find('.item').css('display', 'none');
                $new_image_block = $slider_inner.find('.item:eq('+slideIndex+')');
                $new_image_block.css('display', 'block');
                $new_image = $new_image_block.find('img:eq(0)');
                if (!$new_image.attr('src'))
                {
                    $new_image.attr('src', $new_image.data('lazy'));
                }
            }
            else
            {
                $('.catalog_slider_'+product_id+'>div.b-product-cart-catalog__slider_inner').slick('slickGoTo', slideIndex);
            }
        }
        else
        {
            // СЃС‚СЂР°РЅРёС†Р° С‚РѕРІР°СЂР°
            
            $('.b-color-variant__item').removeClass('is-selected');
            $(this).addClass('is-selected');
            
            $(".thumbs-carousel .slick-slide[data-slick-index="+slideIndex+"]").trigger('click');
            color_id = $(this).data('color-id');
            $('.b-product-set-list .related_color_'+color_id).each(function(key, value){
                color_name = $(value).data('name');
                color_image = $(value).data('image');
                $(value).parents('li').eq(0).find('.related_color_thumb').attr('src', color_image);
                $(value).parents('li').eq(0).find('.related_color_name').html(color_name);
            });
        }
        
        
        
        //$(".slick-slide[data-slick-index="+slideIndex+"] img").trigger('click');
        
//        $('.slide').removeClass('active');
//        $('#preview-img' + slickIndex).addClass('active');
        
    });

    $('.js-show-soc-counter').on('click', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('is-active');
    });

    $('.js-select-all-set').on('click', function (e){
        e.preventDefault();
        if ($(this).attr('state') == 'checked')
        {
            $(this).attr('state', 'unchecked');
            $(".b-checkbox input[type='checkbox']").prop('checked', false);
            $(this).html($(this).attr('default_html'));
        }
        else
        {
            $(this).attr('state', 'checked');
            $(this).attr('default_html', $(this).html());
            $(".b-checkbox input[type='checkbox']").prop('checked', true);
            $(this).html('РћС‚РјРµРЅРёС‚СЊ РІС‹Р±РѕСЂ');
        }
        
        if ($.isFunction(process_checked_products))
        {
            process_checked_products();
        }
    });

});


/***************************************    Window Resize   ************************/
$(window).resize(function(){
    App.onResize();
});
/***************************************    Window Load   ************************/
$(window).load(function(){
    App.onLoad();
});



$.hoverClone({
    selector:'.no-touch .slick-slider.accept-hover .slick-slide>.b-product-card',
    //selector:'.no-touch .b-product-card',
    onEnter:function($element){
        var slick = $element.closest('.slick-slider').slick('getSlick');
        //console.log(slick);
        $element.closest('.slick-slider').slick('slickPause');
    }
    ,
    onLeave:function($element){
        var slick = $element.closest('.slick-slider').slick('getSlick');
        //console.log(slick);
        $element.closest('.slick-slider').slick('slickPlay');
    }
});

var pluralize2 = function(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
      return five;
    }
    number %= 10;
    if (number === 1) {
      return one;
    }
    if (number >= 2 && number <= 4) {
      return two;
    }
    return five;
};