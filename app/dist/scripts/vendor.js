/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
(function($) {
    var selectors = [];
  
    var check_binded = false;
    var check_lock = false;
    var defaults = {
      interval: 250,
      force_process: false
    };
    var $window = $(window);
  
    var $prior_appeared = [];
  
    function appeared(selector) {
      return $(selector).filter(function() {
        return $(this).is(':appeared');
      });
    }
  
    function process() {
      check_lock = false;
      for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
        var $appeared = appeared(selectors[index]);
  
        $appeared.trigger('appear', [$appeared]);
  
        if ($prior_appeared[index]) {
          var $disappeared = $prior_appeared[index].not($appeared);
          $disappeared.trigger('disappear', [$disappeared]);
        }
        $prior_appeared[index] = $appeared;
      }
    }
  
    function add_selector(selector) {
      selectors.push(selector);
      $prior_appeared.push();
    }
  
    // "appeared" custom filter
    $.expr[':'].appeared = function(element) {
      var $element = $(element);
      if (!$element.is(':visible')) {
        return false;
      }
  
      var window_left = $window.scrollLeft();
      var window_top = $window.scrollTop();
      var offset = $element.offset();
      var left = offset.left;
      var top = offset.top;
  
      if (top + $element.height() >= window_top &&
          top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
          left + $element.width() >= window_left &&
          left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
        return true;
      } else {
        return false;
      }
    };
  
    $.fn.extend({
      // watching for element's appearance in browser viewport
      appear: function(options) {
        var opts = $.extend({}, defaults, options || {});
        var selector = this.selector || this;
        if (!check_binded) {
          var on_check = function() {
            if (check_lock) {
              return;
            }
            check_lock = true;
  
            setTimeout(process, opts.interval);
          };
  
          $(window).scroll(on_check).resize(on_check);
  //        $(window).on('scroll', on_check);
          check_binded = true;
        }
  
        if (opts.force_process) {
          setTimeout(process, opts.interval);
        }
        add_selector(selector);
        return $(selector);
      }
    });
  
    $.extend({
      // force elements's appearance check
      force_appear: function() {
        if (check_binded) {
          process();
          return true;
        }
        return false;
      }
    });
  })(function() {
    if (typeof module !== 'undefined') {
      // Node
      return require('jquery');
    } else {
      return jQuery;
    }
  }());
  /*
       _ _      _       _
   ___| (_) ___| | __  (_)___
  / __| | |/ __| |/ /  | / __|
  \__ \ | | (__|   < _ | \__ \
  |___/_|_|\___|_|\_(_)/ |___/
                     |__/
  
   Version: 1.6.0
    Author: Ken Wheeler
   Website: http://kenwheeler.github.io
      Docs: http://kenwheeler.github.io/slick
      Repo: http://github.com/kenwheeler/slick
    Issues: http://github.com/kenwheeler/slick/issues
  
   */
  !function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
  d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
  /*!
   * jQuery Mousewheel 3.1.13
   *
   * Copyright 2015 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */
  !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
  /* Modernizr 2.8.3 (Custom Build) | MIT & BSD
   * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
   */
  ;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
  // materialize/materialize.min.js
  /*!
   * Bootstrap v3.3.6 (http://getbootstrap.com)
   * Copyright 2011-2015 Twitter, Inc.
   * Licensed under the MIT license
   */
  if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
  d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
  /*
  == malihu jquery custom scrollbar plugin == 
  Version: 3.1.5 
  Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
  Author: malihu
  Author URI: http://manos.malihu.gr
  License: MIT License (MIT)
  */
  
  /*
  Copyright Manos Malihutsakis (email: manos@malihu.gr)
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  */
  
  /*
  The code below is fairly long, fully commented and should be normally used in development. 
  For production, use either the minified jquery.mCustomScrollbar.min.js script or 
  the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
  and dependencies (minified). 
  */
  
  (function(factory){
      if(typeof define==="function" && define.amd){
          define(["jquery"],factory);
      }else if(typeof module!=="undefined" && module.exports){
          module.exports=factory;
      }else{
          factory(jQuery,window,document);
      }
  }(function($){
  (function(init){
      var _rjs=typeof define==="function" && define.amd, /* RequireJS */
          _njs=typeof module !== "undefined" && module.exports, /* NodeJS */
          _dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
          _url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
      if(!_rjs){
          if(_njs){
              require("jquery-mousewheel")($);
          }else{
              /* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS 
              (works when mCustomScrollbar fn is called on window load) */
              $.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
          }
      }
      init();
  }(function(){
      
      /* 
      ----------------------------------------
      PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
      ----------------------------------------
      */
      
      var pluginNS="mCustomScrollbar",
          pluginPfx="mCS",
          defaultSelector=".mCustomScrollbar",
      
      
          
      
      
      /* 
      ----------------------------------------
      DEFAULT OPTIONS 
      ----------------------------------------
      */
      
          defaults={
              /*
              set element/content width/height programmatically 
              values: boolean, pixels, percentage 
                  option						default
                  -------------------------------------
                  setWidth					false
                  setHeight					false
              */
              /*
              set the initial css top property of content  
              values: string (e.g. "-100px", "10%" etc.)
              */
              setTop:0,
              /*
              set the initial css left property of content  
              values: string (e.g. "-100px", "10%" etc.)
              */
              setLeft:0,
              /* 
              scrollbar axis (vertical and/or horizontal scrollbars) 
              values (string): "y", "x", "yx"
              */
              axis:"y",
              /*
              position of scrollbar relative to content  
              values (string): "inside", "outside" ("outside" requires elements with position:relative)
              */
              scrollbarPosition:"inside",
              /*
              scrolling inertia
              values: integer (milliseconds)
              */
              scrollInertia:950,
              /* 
              auto-adjust scrollbar dragger length
              values: boolean
              */
              autoDraggerLength:true,
              /*
              auto-hide scrollbar when idle 
              values: boolean
                  option						default
                  -------------------------------------
                  autoHideScrollbar			false
              */
              /*
              auto-expands scrollbar on mouse-over and dragging
              values: boolean
                  option						default
                  -------------------------------------
                  autoExpandScrollbar			false
              */
              /*
              always show scrollbar, even when there's nothing to scroll 
              values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
              */
              alwaysShowScrollbar:0,
              /*
              scrolling always snaps to a multiple of this number in pixels
              values: integer, array ([y,x])
                  option						default
                  -------------------------------------
                  snapAmount					null
              */
              /*
              when snapping, snap with this number in pixels as an offset 
              values: integer
              */
              snapOffset:0,
              /* 
              mouse-wheel scrolling
              */
              mouseWheel:{
                  /* 
                  enable mouse-wheel scrolling
                  values: boolean
                  */
                  enable:true,
                  /* 
                  scrolling amount in pixels
                  values: "auto", integer 
                  */
                  scrollAmount:"auto",
                  /* 
                  mouse-wheel scrolling axis 
                  the default scrolling direction when both vertical and horizontal scrollbars are present 
                  values (string): "y", "x" 
                  */
                  axis:"y",
                  /* 
                  prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached 
                  values: boolean
                      option						default
                      -------------------------------------
                      preventDefault				null
                  */
                  /*
                  the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
                  values: "auto", integer 
                  "auto" uses the default OS/browser value 
                  */
                  deltaFactor:"auto",
                  /*
                  normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
                  values: boolean
                      option						default
                      -------------------------------------
                      normalizeDelta				null
                  */
                  /*
                  invert mouse-wheel scrolling direction 
                  values: boolean
                      option						default
                      -------------------------------------
                      invert						null
                  */
                  /*
                  the tags that disable mouse-wheel when cursor is over them
                  */
                  disableOver:["select","option","keygen","datalist","textarea"]
              },
              /* 
              scrollbar buttons
              */
              scrollButtons:{ 
                  /*
                  enable scrollbar buttons
                  values: boolean
                      option						default
                      -------------------------------------
                      enable						null
                  */
                  /*
                  scrollbar buttons scrolling type 
                  values (string): "stepless", "stepped"
                  */
                  scrollType:"stepless",
                  /*
                  scrolling amount in pixels
                  values: "auto", integer 
                  */
                  scrollAmount:"auto"
                  /*
                  tabindex of the scrollbar buttons
                  values: false, integer
                      option						default
                      -------------------------------------
                      tabindex					null
                  */
              },
              /* 
              keyboard scrolling
              */
              keyboard:{ 
                  /*
                  enable scrolling via keyboard
                  values: boolean
                  */
                  enable:true,
                  /*
                  keyboard scrolling type 
                  values (string): "stepless", "stepped"
                  */
                  scrollType:"stepless",
                  /*
                  scrolling amount in pixels
                  values: "auto", integer 
                  */
                  scrollAmount:"auto"
              },
              /*
              enable content touch-swipe scrolling 
              values: boolean, integer, string (number)
              integer values define the axis-specific minimum amount required for scrolling momentum
              */
              contentTouchScroll:25,
              /*
              enable/disable document (default) touch-swipe scrolling 
              */
              documentTouchScroll:true,
              /*
              advanced option parameters
              */
              advanced:{
                  /*
                  auto-expand content horizontally (for "x" or "yx" axis) 
                  values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
                      option						default
                      -------------------------------------
                      autoExpandHorizontalScroll	null
                  */
                  /*
                  auto-scroll to elements with focus
                  */
                  autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                  /*
                  auto-update scrollbars on content, element or viewport resize 
                  should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
                  values: boolean
                  */
                  updateOnContentResize:true,
                  /*
                  auto-update scrollbars each time each image inside the element is fully loaded 
                  values: "auto", boolean
                  */
                  updateOnImageLoad:"auto",
                  /*
                  auto-update scrollbars based on the amount and size changes of specific selectors 
                  useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
                  values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
                  a value of true (boolean) will auto-update scrollbars each time any element is changed
                      option						default
                      -------------------------------------
                      updateOnSelectorChange		null
                  */
                  /*
                  extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
                      option						default
                      -------------------------------------
                      extraDraggableSelectors		null
                  */
                  /*
                  extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
                      option						default
                      -------------------------------------
                      releaseDraggableSelectors	null
                  */
                  /*
                  auto-update timeout 
                  values: integer (milliseconds)
                  */
                  autoUpdateTimeout:60
              },
              /* 
              scrollbar theme 
              values: string (see CSS/plugin URI for a list of ready-to-use themes)
              */
              theme:"light",
              /*
              user defined callback functions
              */
              callbacks:{
                  /*
                  Available callbacks: 
                      callback					default
                      -------------------------------------
                      onCreate					null
                      onInit						null
                      onScrollStart				null
                      onScroll					null
                      onTotalScroll				null
                      onTotalScrollBack			null
                      whileScrolling				null
                      onOverflowY					null
                      onOverflowX					null
                      onOverflowYNone				null
                      onOverflowXNone				null
                      onImageLoad					null
                      onSelectorChange			null
                      onBeforeUpdate				null
                      onUpdate					null
                  */
                  onTotalScrollOffset:0,
                  onTotalScrollBackOffset:0,
                  alwaysTriggerOffsets:true
              }
              /*
              add scrollbar(s) on all elements matching the current selector, now and in the future 
              values: boolean, string 
              string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
              liveSelector values: string (selector)
                  option						default
                  -------------------------------------
                  live						false
                  liveSelector				null
              */
          },
      
      
      
      
      
      /* 
      ----------------------------------------
      VARS, CONSTANTS 
      ----------------------------------------
      */
      
          totalInstances=0, /* plugin instances amount */
          liveTimers={}, /* live option timers */
          oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
          touchActive=false,touchable, /* global touch vars (for touch and pointer events) */
          /* general plugin classes */
          classes=[
              "mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
              "mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
              "mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
          ],
          
      
      
      
      
      /* 
      ----------------------------------------
      METHODS 
      ----------------------------------------
      */
      
          methods={
              
              /* 
              plugin initialization method 
              creates the scrollbar(s), plugin data object and options
              ----------------------------------------
              */
              
              init:function(options){
                  
                  var options=$.extend(true,{},defaults,options),
                      selector=_selector.call(this); /* validate selector */
                  
                  /* 
                  if live option is enabled, monitor for elements matching the current selector and 
                  apply scrollbar(s) when found (now and in the future) 
                  */
                  if(options.live){
                      var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
                          $liveSelector=$(liveSelector); /* live selector(s) as jquery object */
                      if(options.live==="off"){
                          /* 
                          disable live if requested 
                          usage: $(selector).mCustomScrollbar({live:"off"}); 
                          */
                          removeLiveTimers(liveSelector);
                          return;
                      }
                      liveTimers[liveSelector]=setTimeout(function(){
                          /* call mCustomScrollbar fn on live selector(s) every half-second */
                          $liveSelector.mCustomScrollbar(options);
                          if(options.live==="once" && $liveSelector.length){
                              /* disable live after first invocation */
                              removeLiveTimers(liveSelector);
                          }
                      },500);
                  }else{
                      removeLiveTimers(liveSelector);
                  }
                  
                  /* options backward compatibility (for versions < 3.0.0) and normalization */
                  options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
                  options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
                  options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
                  options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
                  if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
                      options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
                  }
                  options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
                  options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
                  options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType); 
                  
                  _theme(options); /* theme-specific options */
                  
                  /* plugin constructor */
                  return $(selector).each(function(){
                      
                      var $this=$(this);
                      
                      if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */
                      
                          /* store options and create objects in jquery data */
                          $this.data(pluginPfx,{
                              idx:++totalInstances, /* instance index */
                              opt:options, /* options */
                              scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
                              overflowed:null, /* overflowed axis */
                              contentReset:{y:null,x:null}, /* object to check when content resets */
                              bindEvents:false, /* object to check if events are bound */
                              tweenRunning:false, /* object to check if tween is running */
                              sequential:{}, /* sequential scrolling object */
                              langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
                              cbOffsets:null, /* object to check whether callback offsets always trigger */
                              /* 
                              object to check how scrolling events where last triggered 
                              "internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
                              usage: object.data("mCS").trigger
                              */
                              trigger:null,
                              /* 
                              object to check for changes in elements in order to call the update method automatically 
                              */
                              poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}
                          });
                          
                          var d=$this.data(pluginPfx),o=d.opt,
                              /* HTML data attributes */
                              htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
                           
                          if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
                          if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
                          if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
                              o.theme=htmlDataTheme;
                              _theme(o); /* theme-specific options */
                          }
                          
                          _pluginMarkup.call(this); /* add plugin markup */
                          
                          if(d && o.callbacks.onCreate && typeof o.callbacks.onCreate==="function"){o.callbacks.onCreate.call(this);} /* callbacks: onCreate */
                          
                          $("#mCSB_"+d.idx+"_container img:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */
                          
                          methods.update.call(null,$this); /* call the update method */
                      
                      }
                      
                  });
                  
              },
              /* ---------------------------------------- */
              
              
              
              /* 
              plugin update method 
              updates content and scrollbar(s) values, events and status 
              ----------------------------------------
              usage: $(selector).mCustomScrollbar("update");
              */
              
              update:function(el,cb){
                  
                  var selector=el || _selector.call(this); /* validate selector */
                  
                  return $(selector).each(function(){
                      
                      var $this=$(this);
                      
                      if($this.data(pluginPfx)){ /* check if plugin has initialized */
                          
                          var d=$this.data(pluginPfx),o=d.opt,
                              mCSB_container=$("#mCSB_"+d.idx+"_container"),
                              mCustomScrollBox=$("#mCSB_"+d.idx),
                              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
                          
                          if(!mCSB_container.length){return;}
                          
                          if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */
                          
                          if(cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate==="function"){o.callbacks.onBeforeUpdate.call(this);} /* callbacks: onBeforeUpdate */
                          
                          /* if element was disabled or destroyed, remove class(es) */
                          if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
                          if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}
                          
                          /* css flexbox fix, detect/set max-height */
                          mCustomScrollBox.css("max-height","none");
                          if(mCustomScrollBox.height()!==$this.height()){mCustomScrollBox.css("max-height",$this.height());}
                          
                          _expandContentHorizontally.call(this); /* expand content horizontally */
                          
                          if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
                              mCSB_container.css("width",_contentWidth(mCSB_container));
                          }
                          
                          d.overflowed=_overflowed.call(this); /* determine if scrolling is required */
                          
                          _scrollbarVisibility.call(this); /* show/hide scrollbar(s) */
                          
                          /* auto-adjust scrollbar dragger length analogous to content */
                          if(o.autoDraggerLength){_setDraggerLength.call(this);}
                          
                          _scrollRatio.call(this); /* calculate and store scrollbar to content ratio */
                          
                          _bindEvents.call(this); /* bind scrollbar events */
                          
                          /* reset scrolling position and/or events */
                          var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
                          if(o.axis!=="x"){ /* y/yx axis */
                              if(!d.overflowed[0]){ /* y scrolling is not required */
                                  _resetContentPosition.call(this); /* reset content position */
                                  if(o.axis==="y"){
                                      _unbindEvents.call(this);
                                  }else if(o.axis==="yx" && d.overflowed[1]){
                                      _scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                                  }
                              }else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
                                  _resetContentPosition.call(this); /* reset content position */
                              }else{ /* y scrolling is required */
                                  _scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                                  d.contentReset.y=null;
                              }
                          }
                          if(o.axis!=="y"){ /* x/yx axis */
                              if(!d.overflowed[1]){ /* x scrolling is not required */
                                  _resetContentPosition.call(this); /* reset content position */
                                  if(o.axis==="x"){
                                      _unbindEvents.call(this);
                                  }else if(o.axis==="yx" && d.overflowed[0]){
                                      _scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                                  }
                              }else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
                                  _resetContentPosition.call(this); /* reset content position */
                              }else{ /* x scrolling is required */
                                  _scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                                  d.contentReset.x=null;
                              }
                          }
                          
                          /* callbacks: onImageLoad, onSelectorChange, onUpdate */
                          if(cb && d){
                              if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
                                  o.callbacks.onImageLoad.call(this);
                              }else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
                                  o.callbacks.onSelectorChange.call(this);
                              }else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
                                  o.callbacks.onUpdate.call(this);
                              }
                          }
                          
                          _autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
                          
                      }
                      
                  });
                  
              },
              /* ---------------------------------------- */
              
              
              
              /* 
              plugin scrollTo method 
              triggers a scrolling event to a specific value
              ----------------------------------------
              usage: $(selector).mCustomScrollbar("scrollTo",value,options);
              */
          
              scrollTo:function(val,options){
                  
                  /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
                  if(typeof val=="undefined" || val==null){return;}
                  
                  var selector=_selector.call(this); /* validate selector */
                  
                  return $(selector).each(function(){
                      
                      var $this=$(this);
                      
                      if($this.data(pluginPfx)){ /* check if plugin has initialized */
                      
                          var d=$this.data(pluginPfx),o=d.opt,
                              /* method default options */
                              methodDefaults={
                                  trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
                                  scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
                                  scrollEasing:"mcsEaseInOut", /* animation easing */
                                  moveDragger:false, /* move dragger instead of content */
                                  timeout:60, /* scroll-to delay */
                                  callbacks:true, /* enable/disable callbacks */
                                  onStart:true,
                                  onUpdate:true,
                                  onComplete:true
                              },
                              methodOptions=$.extend(true,{},methodDefaults,options),
                              to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;
                          
                          /* translate yx values to actual scroll-to positions */
                          to[0]=_to.call(this,to[0],"y");
                          to[1]=_to.call(this,to[1],"x");
                          
                          /* 
                          check if scroll-to value moves the dragger instead of content. 
                          Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
                          */
                          if(methodOptions.moveDragger){
                              to[0]*=d.scrollRatio.y;
                              to[1]*=d.scrollRatio.x;
                          }
                          
                          methodOptions.dur=_isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden
                          
                          setTimeout(function(){ 
                              /* do the scrolling */
                              if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
                                  methodOptions.dir="y";
                                  methodOptions.overwrite="all";
                                  _scrollTo($this,to[0].toString(),methodOptions);
                              }
                              if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
                                  methodOptions.dir="x";
                                  methodOptions.overwrite="none";
                                  _scrollTo($this,to[1].toString(),methodOptions);
                              }
                          },methodOptions.timeout);
                          
                      }
                      
                  });
                  
              },
              /* ---------------------------------------- */
              
              
              
              /*
              plugin stop method 
              stops scrolling animation
              ----------------------------------------
              usage: $(selector).mCustomScrollbar("stop");
              */
              stop:function(){
                  
                  var selector=_selector.call(this); /* validate selector */
                  
                  return $(selector).each(function(){
                      
                      var $this=$(this);
                      
                      if($this.data(pluginPfx)){ /* check if plugin has initialized */
                                          
                          _stop($this);
                      
                      }
                      
                  });
                  
              },
              /* ---------------------------------------- */
              
              
              
              /*
              plugin disable method 
              temporarily disables the scrollbar(s) 
              ----------------------------------------
              usage: $(selector).mCustomScrollbar("disable",reset); 
              reset (boolean): resets content position to 0 
              */
              disable:function(r){
                  
                  var selector=_selector.call(this); /* validate selector */
                  
                  return $(selector).each(function(){
                      
                      var $this=$(this);
                      
                      if($this.data(pluginPfx)){ /* check if plugin has initialized */
                          
                          var d=$this.data(pluginPfx);
                          
                          _autoUpdate.call(this,"remove"); /* remove automatic updating */
                          
                          _unbindEvents.call(this); /* unbind events */
                          
                          if(r){_resetContentPosition.call(this);} /* reset content position */
                          
                          _scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */
                          
                          $this.addClass(classes[3]); /* add disable class */
                      
                      }
                      
                  });
                  
              },
              /* ---------------------------------------- */
              
              
              
              /*
              plugin destroy method 
              completely removes the scrollbar(s) and returns the element to its original state
              ----------------------------------------
              usage: $(selector).mCustomScrollbar("destroy"); 
              */
              destroy:function(){
                  
                  var selector=_selector.call(this); /* validate selector */
                  
                  return $(selector).each(function(){
                      
                      var $this=$(this);
                      
                      if($this.data(pluginPfx)){ /* check if plugin has initialized */
                      
                          var d=$this.data(pluginPfx),o=d.opt,
                              mCustomScrollBox=$("#mCSB_"+d.idx),
                              mCSB_container=$("#mCSB_"+d.idx+"_container"),
                              scrollbar=$(".mCSB_"+d.idx+"_scrollbar");
                      
                          if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */
                          
                          _autoUpdate.call(this,"remove"); /* remove automatic updating */
                          
                          _unbindEvents.call(this); /* unbind events */
                          
                          _resetContentPosition.call(this); /* reset content position */
                          
                          $this.removeData(pluginPfx); /* remove plugin data object */
                          
                          _delete(this,"mcs"); /* delete callbacks object */
                          
                          /* remove plugin markup */
                          scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
                          mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
                          mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
                          /* remove plugin classes from the element and add destroy class */
                          $this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);
                      
                      }
                      
                  });
                  
              }
              /* ---------------------------------------- */
              
          },
      
      
      
      
          
      /* 
      ----------------------------------------
      FUNCTIONS
      ----------------------------------------
      */
      
          /* validates selector (if selector is invalid or undefined uses the default one) */
          _selector=function(){
              return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
          },
          /* -------------------- */
          
          
          /* changes options according to theme */
          _theme=function(obj){
              var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
                  nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
                  disabledScrollButtonsThemes=["minimal","minimal-dark"],
                  enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
                  scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
              obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
              obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
              obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
              obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
              obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
          },
          /* -------------------- */
          
          
          /* live option timers removal */
          removeLiveTimers=function(selector){
              if(liveTimers[selector]){
                  clearTimeout(liveTimers[selector]);
                  _delete(liveTimers,selector);
              }
          },
          /* -------------------- */
          
          
          /* normalizes axis option to valid values: "y", "x", "yx" */
          _findAxis=function(val){
              return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
          },
          /* -------------------- */
          
          
          /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
          _findScrollButtonsType=function(val){
              return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
          },
          /* -------------------- */
          
          
          /* generates plugin markup */
          _pluginMarkup=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
                  scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                  wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
                  scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
                  contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
                  autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
                  scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
              if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
              if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
              o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
              $this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir='"+d.langDir+"' /></div>");
              var mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container");
              if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
                  mCSB_container.css("width",_contentWidth(mCSB_container));
              }
              if(o.scrollbarPosition==="outside"){
                  if($this.css("position")==="static"){ /* requires elements with non-static position */
                      $this.css("position","relative");
                  }
                  $this.css("overflow","visible");
                  mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
              }else{
                  mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
                  mCSB_container.wrap(contentWrapper);
              }
              _scrollButtons.call(this); /* add scrollbar buttons */
              /* minimum dragger length */
              var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
              mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
              mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
          },
          /* -------------------- */
          
          
          /* calculates content width */
          _contentWidth=function(el){
              var val=[el[0].scrollWidth,Math.max.apply(Math,el.children().map(function(){return $(this).outerWidth(true);}).get())],w=el.parent().width();
              return val[0]>w ? val[0] : val[1]>w ? val[1] : "100%";
          },
          /* -------------------- */
          
          
          /* expands content horizontally */
          _expandContentHorizontally=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  mCSB_container=$("#mCSB_"+d.idx+"_container");
              if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
                  /* calculate scrollWidth */
                  mCSB_container.css({"width":"auto","min-width":0,"overflow-x":"scroll"});
                  var w=Math.ceil(mCSB_container[0].scrollWidth);
                  if(o.advanced.autoExpandHorizontalScroll===3 || (o.advanced.autoExpandHorizontalScroll!==2 && w>mCSB_container.parent().width())){
                      mCSB_container.css({"width":w,"min-width":"100%","overflow-x":"inherit"});
                  }else{
                      /* 
                      wrap content with an infinite width div and set its position to absolute and width to auto. 
                      Setting width to auto before calculating the actual width is important! 
                      We must let the browser set the width as browser zoom values are impossible to calculate.
                      */
                      mCSB_container.css({"overflow-x":"inherit","position":"absolute"})
                          .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
                          .css({ /* set actual width, original position and un-wrap */
                              /* 
                              get the exact width (with decimals) and then round-up. 
                              Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
                              */
                              "width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
                              "min-width":"100%",
                              "position":"relative"
                          }).unwrap();
                  }
              }
          },
          /* -------------------- */
          
          
          /* adds scrollbar buttons */
          _scrollButtons=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
                  tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
                  btnHTML=[
                      "<a href='#' class='"+classes[13]+"' "+tabindex+" />",
                      "<a href='#' class='"+classes[14]+"' "+tabindex+" />",
                      "<a href='#' class='"+classes[15]+"' "+tabindex+" />",
                      "<a href='#' class='"+classes[16]+"' "+tabindex+" />"
                  ],
                  btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
              if(o.scrollButtons.enable){
                  mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
              }
          },
          /* -------------------- */
          
          
          /* auto-adjusts scrollbar dragger length */
          _setDraggerLength=function(){
              var $this=$(this),d=$this.data(pluginPfx),
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
                  ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
                  l=[
                      parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
                      parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
                  ],
                  h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
              mCSB_dragger[0].css({
                  "height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
              }).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
              mCSB_dragger[1].css({
                  "width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
              });
          },
          /* -------------------- */
          
          
          /* calculates scrollbar to content ratio */
          _scrollRatio=function(){
              var $this=$(this),d=$this.data(pluginPfx),
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
                  scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
                  ratio=[
                      scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
                      scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
                  ];
              d.scrollRatio={y:ratio[0],x:ratio[1]};
          },
          /* -------------------- */
          
          
          /* toggles scrolling classes */
          _onDragClasses=function(el,action,xpnd){
              var expandClass=xpnd ? classes[0]+"_expanded" : "",
                  scrollbar=el.closest(".mCSB_scrollTools");
              if(action==="active"){
                  el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
                  el[0]._draggable=el[0]._draggable ? 0 : 1;
              }else{
                  if(!el[0]._draggable){
                      if(action==="hide"){
                          el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
                      }else{
                          el.addClass(classes[0]); scrollbar.addClass(classes[1]);
                      }
                  }
              }
          },
          /* -------------------- */
          
          
          /* checks if content overflows its container to determine if scrolling is required */
          _overflowed=function(){
              var $this=$(this),d=$this.data(pluginPfx),
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
                  contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false),
                  h=mCSB_container[0].scrollHeight,w=mCSB_container[0].scrollWidth;
              if(h>contentHeight){contentHeight=h;}
              if(w>contentWidth){contentWidth=w;}
              return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
          },
          /* -------------------- */
          
          
          /* resets content position to 0 */
          _resetContentPosition=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
              _stop($this); /* stop any current scrolling before resetting */
              if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
                  mCSB_dragger[0].add(mCSB_container).css("top",0);
                  _scrollTo($this,"_resetY");
              }
              if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
                  var cx=dx=0;
                  if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
                      cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
                      dx=Math.abs(cx/d.scrollRatio.x);
                  }
                  mCSB_container.css("left",cx);
                  mCSB_dragger[1].css("left",dx);
                  _scrollTo($this,"_resetX");
              }
          },
          /* -------------------- */
          
          
          /* binds scrollbar events */
          _bindEvents=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
              if(!d.bindEvents){ /* check if events are already bound */
                  _draggable.call(this);
                  if(o.contentTouchScroll){_contentDraggable.call(this);}
                  _selectable.call(this);
                  if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
                      function _mwt(){
                          mousewheelTimeout=setTimeout(function(){
                              if(!$.event.special.mousewheel){
                                  _mwt();
                              }else{
                                  clearTimeout(mousewheelTimeout);
                                  _mousewheel.call($this[0]);
                              }
                          },100);
                      }
                      var mousewheelTimeout;
                      _mwt();
                  }
                  _draggerRail.call(this);
                  _wrapperScroll.call(this);
                  if(o.advanced.autoScrollOnFocus){_focus.call(this);}
                  if(o.scrollButtons.enable){_buttons.call(this);}
                  if(o.keyboard.enable){_keyboard.call(this);}
                  d.bindEvents=true;
              }
          },
          /* -------------------- */
          
          
          /* unbinds scrollbar events */
          _unbindEvents=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  namespace=pluginPfx+"_"+d.idx,
                  sb=".mCSB_"+d.idx+"_scrollbar",
                  sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
                  mCSB_container=$("#mCSB_"+d.idx+"_container");
              if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
              if(o.advanced.extraDraggableSelectors){sel.add($(o.advanced.extraDraggableSelectors));}
              if(d.bindEvents){ /* check if events are bound */
                  /* unbind namespaced events from document/selectors */
                  $(document).add($(!_canAccessIFrame() || top.document)).unbind("."+namespace);
                  sel.each(function(){
                      $(this).unbind("."+namespace);
                  });
                  /* clear and delete timeouts/objects */
                  clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
                  clearTimeout(d.sequential.step); _delete(d.sequential,"step");
                  clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
                  d.bindEvents=false;
              }
          },
          /* -------------------- */
          
          
          /* toggles scrollbar visibility */
          _scrollbarVisibility=function(disabled){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
                  content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
                  scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
                  mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
              if(o.axis!=="x"){
                  if(d.overflowed[0] && !disabled){
                      scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
                      content.removeClass(classes[8]+" "+classes[10]);
                  }else{
                      if(o.alwaysShowScrollbar){
                          if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].css("display","none");}
                          content.removeClass(classes[10]);
                      }else{
                          scrollbar[0].css("display","none");
                          content.addClass(classes[10]);
                      }
                      content.addClass(classes[8]);
                  }
              }
              if(o.axis!=="y"){
                  if(d.overflowed[1] && !disabled){
                      scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
                      content.removeClass(classes[9]+" "+classes[11]);
                  }else{
                      if(o.alwaysShowScrollbar){
                          if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].css("display","none");}
                          content.removeClass(classes[11]);
                      }else{
                          scrollbar[1].css("display","none");
                          content.addClass(classes[11]);
                      }
                      content.addClass(classes[9]);
                  }
              }
              if(!d.overflowed[0] && !d.overflowed[1]){
                  $this.addClass(classes[5]);
              }else{
                  $this.removeClass(classes[5]);
              }
          },
          /* -------------------- */
          
          
          /* returns input coordinates of pointer, touch and mouse events (relative to document) */
          _coordinates=function(e){
              var t=e.type,o=e.target.ownerDocument!==document && frameElement!==null ? [$(frameElement).offset().top,$(frameElement).offset().left] : null,
                  io=_canAccessIFrame() && e.target.ownerDocument!==top.document && frameElement!==null ? [$(e.view.frameElement).offset().top,$(e.view.frameElement).offset().left] : [0,0];
              switch(t){
                  case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
                      return o ? [e.originalEvent.pageY-o[0]+io[0],e.originalEvent.pageX-o[1]+io[1],false] : [e.originalEvent.pageY,e.originalEvent.pageX,false];
                      break;
                  case "touchstart": case "touchmove": case "touchend":
                      var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                          touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                      return e.target.ownerDocument!==document ? [touch.screenY,touch.screenX,touches>1] : [touch.pageY,touch.pageX,touches>1];
                      break;
                  default:
                      return o ? [e.pageY-o[0]+io[0],e.pageX-o[1]+io[1],false] : [e.pageY,e.pageX,false];
              }
          },
          /* -------------------- */
          
          
          /* 
          SCROLLBAR DRAG EVENTS
          scrolls content via scrollbar dragging 
          */
          _draggable=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  namespace=pluginPfx+"_"+d.idx,
                  draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
                  draggable,dragY,dragX,
                  rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
                  eds=o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
              mCSB_dragger.bind("contextmenu."+namespace,function(e){
                  e.preventDefault(); //prevent right click
              }).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
                  touchActive=true;
                  if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
                  _iframe.call(mCSB_container,false); /* enable scrollbar dragging over iframes by disabling their events */
                  _stop($this);
                  draggable=$(this);
                  var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
                      h=draggable.height()+offset.top,w=draggable.width()+offset.left;
                  if(y<h && y>0 && x<w && x>0){
                      dragY=y; 
                      dragX=x;
                  }
                  _onDragClasses(draggable,"active",o.autoExpandScrollbar); 
              }).bind("touchmove."+namespace,function(e){
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
                  _drag(dragY,dragX,y,x);
              });
              $(document).add(eds).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
                  if(draggable){
                      var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
                      if(dragY===y && dragX===x){return;} /* has it really moved? */
                      _drag(dragY,dragX,y,x);
                  }
              }).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
                  if(draggable){
                      _onDragClasses(draggable,"active",o.autoExpandScrollbar); 
                      draggable=null;
                  }
                  touchActive=false;
                  if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
                  _iframe.call(mCSB_container,true); /* enable iframes events */
              });
              function _drag(dragY,dragX,y,x){
                  mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
                  if(draggable.attr("id")===draggerId[1]){
                      var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
                  }else{
                      var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
                  }
                  _scrollTo($this,to.toString(),{dir:dir,drag:true});
              }
          },
          /* -------------------- */
          
          
          /* 
          TOUCH SWIPE EVENTS
          scrolls content via touch swipe 
          Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
          */
          _contentDraggable=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  namespace=pluginPfx+"_"+d.idx,
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
                  draggable,dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
                  durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[],touchDrag,docDrag,
                  iframe=mCSB_container.find("iframe"),
                  events=[
                      "touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace, //start
                      "touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace, //move
                      "touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace //end
                  ],
                  touchAction=document.body.style.touchAction!==undefined && document.body.style.touchAction!=="";
              mCSB_container.bind(events[0],function(e){
                  _onTouchstart(e);
              }).bind(events[1],function(e){
                  _onTouchmove(e);
              });
              mCustomScrollBox.bind(events[0],function(e){
                  _onTouchstart2(e);
              }).bind(events[2],function(e){
                  _onTouchend(e);
              });
              if(iframe.length){
                  iframe.each(function(){
                      $(this).bind("load",function(){
                          /* bind events on accessible iframes */
                          if(_canAccessIFrame(this)){
                              $(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
                                  _onTouchstart(e);
                                  _onTouchstart2(e);
                              }).bind(events[1],function(e){
                                  _onTouchmove(e);
                              }).bind(events[2],function(e){
                                  _onTouchend(e);
                              });
                          }
                      });
                  });
              }
              function _onTouchstart(e){
                  if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
                  touchable=1; touchDrag=0; docDrag=0; draggable=1;
                  $this.removeClass("mCS_touch_action");
                  var offset=mCSB_container.offset();
                  dragY=_coordinates(e)[0]-offset.top;
                  dragX=_coordinates(e)[1]-offset.left;
                  touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
              }
              function _onTouchmove(e){
                  if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
                  if(!o.documentTouchScroll){e.preventDefault();} 
                  e.stopImmediatePropagation();
                  if(docDrag && !touchDrag){return;}
                  if(draggable){
                      runningTime=_getTime();
                      var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
                          easing="mcsLinearOut";
                      touchMoveY.push(y);
                      touchMoveX.push(x);
                      touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
                      if(d.overflowed[0]){
                          var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                              prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
                      }
                      if(d.overflowed[1]){
                          var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                              preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
                      }
                      if(prevent || preventX){ /* prevent native document scrolling */
                          if(!touchAction){e.preventDefault();} 
                          touchDrag=1;
                      }else{
                          docDrag=1;
                          $this.addClass("mCS_touch_action");
                      }
                      if(touchAction){e.preventDefault();} 
                      amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
                      mCSB_container[0].idleTimer=250;
                      if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
                      if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
                  }
              }
              function _onTouchstart2(e){
                  if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
                  touchable=1;
                  e.stopImmediatePropagation();
                  _stop($this);
                  startTime=_getTime();
                  var offset=mCustomScrollBox.offset();
                  touchStartY=_coordinates(e)[0]-offset.top;
                  touchStartX=_coordinates(e)[1]-offset.left;
                  touchMoveY=[]; touchMoveX=[];
              }
              function _onTouchend(e){
                  if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
                  draggable=0;
                  e.stopImmediatePropagation();
                  touchDrag=0; docDrag=0;
                  endTime=_getTime();
                  var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
                  if((endTime-runningTime)>30){return;}
                  speed=1000/(endTime-startTime);
                  var easing="mcsEaseOut",slow=speed<2.5,
                      diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
                  distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
                  var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
                  speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
                  var a=[
                      Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
                      Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
                  ];
                  amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
                  durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
                  var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
                  amount[0]=absDistance[0]>md ? amount[0] : 0;
                  amount[1]=absDistance[1]>md ? amount[1] : 0;
                  if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
                  if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
              }
              function _m(ds,s){
                  var r=[s*1.5,s*2,s/1.5,s/2];
                  if(ds>90){
                      return s>4 ? r[0] : r[3];
                  }else if(ds>60){
                      return s>3 ? r[3] : r[2];
                  }else if(ds>30){
                      return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
                  }else{
                      return s>8 ? s : r[3];
                  }
              }
              function _drag(amount,dur,easing,dir,overwrite,drag){
                  if(!amount){return;}
                  _scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
              }
          },
          /* -------------------- */
          
          
          /* 
          SELECT TEXT EVENTS 
          scrolls content when text is selected 
          */
          _selectable=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
                  namespace=pluginPfx+"_"+d.idx,
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  wrapper=mCSB_container.parent(),
                  action;
              mCSB_container.bind("mousedown."+namespace,function(e){
                  if(touchable){return;}
                  if(!action){action=1; touchActive=true;}
              }).add(document).bind("mousemove."+namespace,function(e){
                  if(!touchable && action && _sel()){
                      var offset=mCSB_container.offset(),
                          y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
                      if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
                          if(seq.step){_seq("off",null,"stepped");}
                      }else{
                          if(o.axis!=="x" && d.overflowed[0]){
                              if(y<0){
                                  _seq("on",38);
                              }else if(y>wrapper.height()){
                                  _seq("on",40);
                              }
                          }
                          if(o.axis!=="y" && d.overflowed[1]){
                              if(x<0){
                                  _seq("on",37);
                              }else if(x>wrapper.width()){
                                  _seq("on",39);
                              }
                          }
                      }
                  }
              }).bind("mouseup."+namespace+" dragend."+namespace,function(e){
                  if(touchable){return;}
                  if(action){action=0; _seq("off",null);}
                  touchActive=false;
              });
              function _sel(){
                  return 	window.getSelection ? window.getSelection().toString() : 
                          document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
              }
              function _seq(a,c,s){
                  seq.type=s && action ? "stepped" : "stepless";
                  seq.scrollAmount=10;
                  _sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
              }
          },
          /* -------------------- */
          
          
          /* 
          MOUSE WHEEL EVENT
          scrolls content via mouse-wheel 
          via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
          */
          _mousewheel=function(){
              if(!$(this).data(pluginPfx)){return;} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  namespace=pluginPfx+"_"+d.idx,
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
                  iframe=$("#mCSB_"+d.idx+"_container").find("iframe");
              if(iframe.length){
                  iframe.each(function(){
                      $(this).bind("load",function(){
                          /* bind events on accessible iframes */
                          if(_canAccessIFrame(this)){
                              $(this.contentDocument || this.contentWindow.document).bind("mousewheel."+namespace,function(e,delta){
                                  _onMousewheel(e,delta);
                              });
                          }
                      });
                  });
              }
              mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
                  _onMousewheel(e,delta);
              });
              function _onMousewheel(e,delta){
                  _stop($this);
                  if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
                  var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100,
                      dur=o.scrollInertia;
                  if(o.axis==="x" || o.mouseWheel.axis==="x"){
                      var dir="x",
                          px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
                          amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
                          contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
                          draggerPos=mCSB_dragger[1][0].offsetLeft,
                          limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                          dlt=o.mouseWheel.axis==="y" ? (e.deltaY || delta) : e.deltaX;
                  }else{
                      var dir="y",
                          px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
                          amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
                          contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
                          draggerPos=mCSB_dragger[0][0].offsetTop,
                          limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                          dlt=e.deltaY || delta;
                  }
                  if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
                  if(o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice){dlt=-dlt;}
                  if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
                  if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
                      e.stopImmediatePropagation();
                      e.preventDefault();
                  }
                  if(e.deltaFactor<5 && !o.mouseWheel.normalizeDelta){
                      //very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
                      amount=e.deltaFactor; dur=17;
                  }
                  _scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir,dur:dur});
              }
          },
          /* -------------------- */
          
          
          /* checks if iframe can be accessed */
          _canAccessIFrameCache=new Object(),
          _canAccessIFrame=function(iframe){
              var result=false,cacheKey=false,html=null;
              if(iframe===undefined){
                  cacheKey="#empty";
              }else if($(iframe).attr("id")!==undefined){
                  cacheKey=$(iframe).attr("id");
              }
              if(cacheKey!==false && _canAccessIFrameCache[cacheKey]!==undefined){
                  return _canAccessIFrameCache[cacheKey];
              }
              if(!iframe){
                  try{
                      var doc=top.document;
                      html=doc.body.innerHTML;
                  }catch(err){/* do nothing */}
                  result=(html!==null);
              }else{
                  try{
                      var doc=iframe.contentDocument || iframe.contentWindow.document;
                      html=doc.body.innerHTML;
                  }catch(err){/* do nothing */}
                  result=(html!==null);
              }
              if(cacheKey!==false){_canAccessIFrameCache[cacheKey]=result;}
              return result;
          },
          /* -------------------- */
          
          
          /* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
          _iframe=function(evt){
              var el=this.find("iframe");
              if(!el.length){return;} /* check if content contains iframes */
              var val=!evt ? "none" : "auto";
              el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
          },
          /* -------------------- */
          
          
          /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
          _disableMousewheel=function(el,target){
              var tag=target.nodeName.toLowerCase(),
                  tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
                  /* elements that require focus */
                  focusTags=["select","textarea"];
              return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
          },
          /* -------------------- */
          
          
          /* 
          DRAGGER RAIL CLICK EVENT
          scrolls content via dragger rail 
          */
          _draggerRail=function(){
              var $this=$(this),d=$this.data(pluginPfx),
                  namespace=pluginPfx+"_"+d.idx,
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  wrapper=mCSB_container.parent(),
                  mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]),
                  clickable;
              mCSB_draggerContainer.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
                  touchActive=true;
                  if(!$(e.target).hasClass("mCSB_dragger")){clickable=1;}
              }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
                  touchActive=false;
              }).bind("click."+namespace,function(e){
                  if(!clickable){return;}
                  clickable=0;
                  if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
                      _stop($this);
                      var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
                      if(el.parent(".mCSB_scrollTools_horizontal").length>0){
                          if(!d.overflowed[1]){return;}
                          var dir="x",
                              clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
                              to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
                      }else{
                          if(!d.overflowed[0]){return;}
                          var dir="y",
                              clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
                              to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
                      }
                      _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                  }
              });
          },
          /* -------------------- */
          
          
          /* 
          FOCUS EVENT
          scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
          */
          _focus=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  namespace=pluginPfx+"_"+d.idx,
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  wrapper=mCSB_container.parent();
              mCSB_container.bind("focusin."+namespace,function(e){
                  var el=$(document.activeElement),
                      nested=mCSB_container.find(".mCustomScrollBox").length,
                      dur=0;
                  if(!el.is(o.advanced.autoScrollOnFocus)){return;}
                  _stop($this);
                  clearTimeout($this[0]._focusTimeout);
                  $this[0]._focusTimer=nested ? (dur+17)*nested : 0;
                  $this[0]._focusTimeout=setTimeout(function(){
                      var	to=[_childPos(el)[0],_childPos(el)[1]],
                          contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
                          isVisible=[
                              (contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
                              (contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
                          ],
                          overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
                      if(o.axis!=="x" && !isVisible[0]){
                          _scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
                      }
                      if(o.axis!=="y" && !isVisible[1]){
                          _scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
                      }
                  },$this[0]._focusTimer);
              });
          },
          /* -------------------- */
          
          
          /* sets content wrapper scrollTop/scrollLeft always to 0 */
          _wrapperScroll=function(){
              var $this=$(this),d=$this.data(pluginPfx),
                  namespace=pluginPfx+"_"+d.idx,
                  wrapper=$("#mCSB_"+d.idx+"_container").parent();
              wrapper.bind("scroll."+namespace,function(e){
                  if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
                      $(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
                  }
              });
          },
          /* -------------------- */
          
          
          /* 
          BUTTONS EVENTS
          scrolls content via up, down, left and right buttons 
          */
          _buttons=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
                  namespace=pluginPfx+"_"+d.idx,
                  sel=".mCSB_"+d.idx+"_scrollbar",
                  btn=$(sel+">a");
              btn.bind("contextmenu."+namespace,function(e){
                  e.preventDefault(); //prevent right click
              }).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
                  e.preventDefault();
                  if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
                  var btnClass=$(this).attr("class");
                  seq.type=o.scrollButtons.scrollType;
                  switch(e.type){
                      case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
                          if(seq.type==="stepped"){return;}
                          touchActive=true;
                          d.tweenRunning=false;
                          _seq("on",btnClass);
                          break;
                      case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
                      case "mouseout": case "pointerout": case "MSPointerOut":
                          if(seq.type==="stepped"){return;}
                          touchActive=false;
                          if(seq.dir){_seq("off",btnClass);}
                          break;
                      case "click":
                          if(seq.type!=="stepped" || d.tweenRunning){return;}
                          _seq("on",btnClass);
                          break;
                  }
                  function _seq(a,c){
                      seq.scrollAmount=o.scrollButtons.scrollAmount;
                      _sequentialScroll($this,a,c);
                  }
              });
          },
          /* -------------------- */
          
          
          /* 
          KEYBOARD EVENTS
          scrolls content via keyboard 
          Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
          */
          _keyboard=function(){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
                  namespace=pluginPfx+"_"+d.idx,
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  wrapper=mCSB_container.parent(),
                  editables="input,textarea,select,datalist,keygen,[contenteditable='true']",
                  iframe=mCSB_container.find("iframe"),
                  events=["blur."+namespace+" keydown."+namespace+" keyup."+namespace];
              if(iframe.length){
                  iframe.each(function(){
                      $(this).bind("load",function(){
                          /* bind events on accessible iframes */
                          if(_canAccessIFrame(this)){
                              $(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
                                  _onKeyboard(e);
                              });
                          }
                      });
                  });
              }
              mCustomScrollBox.attr("tabindex","0").bind(events[0],function(e){
                  _onKeyboard(e);
              });
              function _onKeyboard(e){
                  switch(e.type){
                      case "blur":
                          if(d.tweenRunning && seq.dir){_seq("off",null);}
                          break;
                      case "keydown": case "keyup":
                          var code=e.keyCode ? e.keyCode : e.which,action="on";
                          if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
                              /* up (38), down (40), left (37), right (39) arrows */
                              if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
                              if(e.type==="keyup"){action="off";}
                              if(!$(document.activeElement).is(editables)){
                                  e.preventDefault();
                                  e.stopImmediatePropagation();
                                  _seq(action,code);
                              }
                          }else if(code===33 || code===34){
                              /* PgUp (33), PgDn (34) */
                              if(d.overflowed[0] || d.overflowed[1]){
                                  e.preventDefault();
                                  e.stopImmediatePropagation();
                              }
                              if(e.type==="keyup"){
                                  _stop($this);
                                  var keyboardDir=code===34 ? -1 : 1;
                                  if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                                      var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
                                  }else{
                                      var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
                                  }
                                  _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                              }
                          }else if(code===35 || code===36){
                              /* End (35), Home (36) */
                              if(!$(document.activeElement).is(editables)){
                                  if(d.overflowed[0] || d.overflowed[1]){
                                      e.preventDefault();
                                      e.stopImmediatePropagation();
                                  }
                                  if(e.type==="keyup"){
                                      if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                                          var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
                                      }else{
                                          var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
                                      }
                                      _scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                                  }
                              }
                          }
                          break;
                  }
                  function _seq(a,c){
                      seq.type=o.keyboard.scrollType;
                      seq.scrollAmount=o.keyboard.scrollAmount;
                      if(seq.type==="stepped" && d.tweenRunning){return;}
                      _sequentialScroll($this,a,c);
                  }
              }
          },
          /* -------------------- */
          
          
          /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
          _sequentialScroll=function(el,action,trigger,e,s){
              var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  once=seq.type==="stepped" ? true : false,
                  steplessSpeed=o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
                  steppedSpeed=o.scrollInertia < 1 ? 17 : o.scrollInertia;
              switch(action){
                  case "on":
                      seq.dir=[
                          (trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
                          (trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
                      ];
                      _stop(el);
                      if(_isNumeric(trigger) && seq.type==="stepped"){return;}
                      _on(once);
                      break;
                  case "off":
                      _off();
                      if(once || (d.tweenRunning && seq.dir)){
                          _on(true);
                      }
                      break;
              }
              
              /* starts sequence */
              function _on(once){
                  if(o.snapAmount){seq.scrollAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0]==="x" ? o.snapAmount[1] : o.snapAmount[0];} /* scrolling snapping */
                  var c=seq.type!=="stepped", /* continuous scrolling */
                      t=s ? s : !once ? 1000/60 : c ? steplessSpeed/1.5 : steppedSpeed, /* timer */
                      m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
                      contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
                      ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
                      amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
                      px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
                      to=seq.scrollAmount!=="auto" ? px : amount,
                      easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
                      onComplete=!once ? false : true;
                  if(once && t<17){
                      to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
                  }
                  _scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
                  if(once){
                      seq.dir=false;
                      return;
                  }
                  clearTimeout(seq.step);
                  seq.step=setTimeout(function(){
                      _on();
                  },t);
              }
              /* stops sequence */
              function _off(){
                  clearTimeout(seq.step);
                  _delete(seq,"step");
                  _stop(el);
              }
          },
          /* -------------------- */
          
          
          /* returns a yx array from value */
          _arr=function(val){
              var o=$(this).data(pluginPfx).opt,vals=[];
              if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
              /* check if value is object or array, its length and create an array with yx values */
              if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
                  vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
                  vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
              }else{ /* array value (e.g. [100,100]) */
                  vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
              }
              /* check if array values are anonymous functions */
              if(typeof vals[0]==="function"){vals[0]=vals[0]();}
              if(typeof vals[1]==="function"){vals[1]=vals[1]();}
              return vals;
          },
          /* -------------------- */
          
          
          /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
          _to=function(val,dir){
              if(val==null || typeof val=="undefined"){return;}
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  wrapper=mCSB_container.parent(),
                  t=typeof val;
              if(!dir){dir=o.axis==="x" ? "x" : "y";}
              var contentLength=dir==="x" ? mCSB_container.outerWidth(false)-wrapper.width() : mCSB_container.outerHeight(false)-wrapper.height(),
                  contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
                  cssProp=dir==="x" ? "left" : "top";
              switch(t){
                  case "function": /* this currently is not used. Consider removing it */
                      return val();
                      break;
                  case "object": /* js/jquery object */
                      var obj=val.jquery ? val : $(val);
                      if(!obj.length){return;}
                      return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
                      break;
                  case "string": case "number":
                      if(_isNumeric(val)){ /* numeric value */
                          return Math.abs(val);
                      }else if(val.indexOf("%")!==-1){ /* percentage value */
                          return Math.abs(contentLength*parseInt(val)/100);
                      }else if(val.indexOf("-=")!==-1){ /* decrease value */
                          return Math.abs(contentPos-parseInt(val.split("-=")[1]));
                      }else if(val.indexOf("+=")!==-1){ /* inrease value */
                          var p=(contentPos+parseInt(val.split("+=")[1]));
                          return p>=0 ? 0 : Math.abs(p);
                      }else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
                          return Math.abs(val.split("px")[0]);
                      }else{
                          if(val==="top" || val==="left"){ /* special strings */
                              return 0;
                          }else if(val==="bottom"){
                              return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
                          }else if(val==="right"){
                              return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
                          }else if(val==="first" || val==="last"){
                              var obj=mCSB_container.find(":"+val);
                              return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
                          }else{
                              if($(val).length){ /* jquery selector */
                                  return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
                              }else{ /* other values (e.g. "100em") */
                                  mCSB_container.css(cssProp,val);
                                  methods.update.call(null,$this[0]);
                                  return;
                              }
                          }
                      }
                      break;
              }
          },
          /* -------------------- */
          
          
          /* calls the update method automatically */
          _autoUpdate=function(rem){
              var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
                  mCSB_container=$("#mCSB_"+d.idx+"_container");
              if(rem){
                  /* 
                  removes autoUpdate timer 
                  usage: _autoUpdate.call(this,"remove");
                  */
                  clearTimeout(mCSB_container[0].autoUpdate);
                  _delete(mCSB_container[0],"autoUpdate");
                  return;
              }
              upd();
              function upd(){
                  clearTimeout(mCSB_container[0].autoUpdate);
                  if($this.parents("html").length===0){
                      /* check element in dom tree */
                      $this=null;
                      return;
                  }
                  mCSB_container[0].autoUpdate=setTimeout(function(){
                      /* update on specific selector(s) length and size change */
                      if(o.advanced.updateOnSelectorChange){
                          d.poll.change.n=sizesSum();
                          if(d.poll.change.n!==d.poll.change.o){
                              d.poll.change.o=d.poll.change.n;
                              doUpd(3);
                              return;
                          }
                      }
                      /* update on main element and scrollbar size changes */
                      if(o.advanced.updateOnContentResize){
                          d.poll.size.n=$this[0].scrollHeight+$this[0].scrollWidth+mCSB_container[0].offsetHeight+$this[0].offsetHeight+$this[0].offsetWidth;
                          if(d.poll.size.n!==d.poll.size.o){
                              d.poll.size.o=d.poll.size.n;
                              doUpd(1);
                              return;
                          }
                      }
                      /* update on image load */
                      if(o.advanced.updateOnImageLoad){
                          if(!(o.advanced.updateOnImageLoad==="auto" && o.axis==="y")){ //by default, it doesn't run on vertical content
                              d.poll.img.n=mCSB_container.find("img").length;
                              if(d.poll.img.n!==d.poll.img.o){
                                  d.poll.img.o=d.poll.img.n;
                                  mCSB_container.find("img").each(function(){
                                      imgLoader(this);
                                  });
                                  return;
                              }
                          }
                      }
                      if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
                  },o.advanced.autoUpdateTimeout);
              }
              /* a tiny image loader */
              function imgLoader(el){
                  if($(el).hasClass(classes[2])){doUpd(); return;}
                  var img=new Image();
                  function createDelegate(contextObject,delegateMethod){
                      return function(){return delegateMethod.apply(contextObject,arguments);}
                  }
                  function imgOnLoad(){
                      this.onload=null;
                      $(el).addClass(classes[2]);
                      doUpd(2);
                  }
                  img.onload=createDelegate(img,imgOnLoad);
                  img.src=el.src;
              }
              /* returns the total height and width sum of all elements matching the selector */
              function sizesSum(){
                  if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
                  var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
                  if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=this.offsetHeight+this.offsetWidth;});}
                  return total;
              }
              /* calls the update method */
              function doUpd(cb){
                  clearTimeout(mCSB_container[0].autoUpdate);
                  methods.update.call(null,$this[0],cb);
              }
          },
          /* -------------------- */
          
          
          /* snaps scrolling to a multiple of a pixels number */
          _snapAmount=function(to,amount,offset){
              return (Math.round(to/amount)*amount-offset); 
          },
          /* -------------------- */
          
          
          /* stops content and scrollbar animations */
          _stop=function(el){
              var d=el.data(pluginPfx),
                  sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
              sel.each(function(){
                  _stopTween.call(this);
              });
          },
          /* -------------------- */
          
          
          /* 
          ANIMATES CONTENT 
          This is where the actual scrolling happens
          */
          _scrollTo=function(el,to,options){
              var d=el.data(pluginPfx),o=d.opt,
                  defaults={
                      trigger:"internal",
                      dir:"y",
                      scrollEasing:"mcsEaseOut",
                      drag:false,
                      dur:o.scrollInertia,
                      overwrite:"all",
                      callbacks:true,
                      onStart:true,
                      onUpdate:true,
                      onComplete:true
                  },
                  options=$.extend(defaults,options),
                  dur=[options.dur,(options.drag ? 0 : options.dur)],
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  wrapper=mCSB_container.parent(),
                  totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
                  totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
              d.trigger=options.trigger;
              if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
                  $(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
                  wrapper.scrollTop(0).scrollLeft(0);
              }
              if(to==="_resetY" && !d.contentReset.y){
                  /* callbacks: onOverflowYNone */
                  if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
                  d.contentReset.y=1;
              }
              if(to==="_resetX" && !d.contentReset.x){
                  /* callbacks: onOverflowXNone */
                  if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
                  d.contentReset.x=1;
              }
              if(to==="_resetY" || to==="_resetX"){return;}
              if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
                  /* callbacks: onOverflowY */
                  if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
                  d.contentReset.x=null;
              }
              if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
                  /* callbacks: onOverflowX */
                  if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
                  d.contentReset.x=null;
              }
              if(o.snapAmount){ /* scrolling snapping */
                  var snapAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : options.dir==="x" ? o.snapAmount[1] : o.snapAmount[0];
                  to=_snapAmount(to,snapAmount,o.snapOffset);
              }
              switch(options.dir){
                  case "x":
                      var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
                          property="left",
                          contentPos=mCSB_container[0].offsetLeft,
                          limit=[
                              mCustomScrollBox.width()-mCSB_container.outerWidth(false),
                              mCSB_dragger.parent().width()-mCSB_dragger.width()
                          ],
                          scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
                          tso=totalScrollOffsets[1],
                          tsbo=totalScrollBackOffsets[1],
                          totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
                          totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
                      break;
                  case "y":
                      var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
                          property="top",
                          contentPos=mCSB_container[0].offsetTop,
                          limit=[
                              mCustomScrollBox.height()-mCSB_container.outerHeight(false),
                              mCSB_dragger.parent().height()-mCSB_dragger.height()
                          ],
                          scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
                          tso=totalScrollOffsets[0],
                          tsbo=totalScrollBackOffsets[0],
                          totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
                          totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
                      break;
              }
              if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
                  scrollTo=[0,0];
              }else if(scrollTo[1]>=limit[1]){
                  scrollTo=[limit[0],limit[1]];
              }else{
                  scrollTo[0]=-scrollTo[0];
              }
              if(!el[0].mcs){
                  _mcs();  /* init mcs object (once) to make it available before callbacks */
                  if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
              }
              clearTimeout(mCSB_container[0].onCompleteTimeout);
              _tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
              if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
              _tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
                  onStart:function(){
                      if(options.callbacks && options.onStart && !d.tweenRunning){
                          /* callbacks: onScrollStart */
                          if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
                          d.tweenRunning=true;
                          _onDragClasses(mCSB_dragger);
                          d.cbOffsets=_cbOffsets();
                      }
                  },onUpdate:function(){
                      if(options.callbacks && options.onUpdate){
                          /* callbacks: whileScrolling */
                          if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
                      }
                  },onComplete:function(){
                      if(options.callbacks && options.onComplete){
                          if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
                          var t=mCSB_container[0].idleTimer || 0;
                          mCSB_container[0].onCompleteTimeout=setTimeout(function(){
                              /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                              if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
                              if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
                              if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
                              d.tweenRunning=false;
                              mCSB_container[0].idleTimer=0;
                              _onDragClasses(mCSB_dragger,"hide");
                          },t);
                      }
                  }
              });
              /* checks if callback function exists */
              function _cb(cb){
                  return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
              }
              /* checks whether callback offsets always trigger */
              function _cbOffsets(){
                  return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
              }
              /* 
              populates object with useful values for the user 
              values: 
                  content: this.mcs.content
                  content top position: this.mcs.top 
                  content left position: this.mcs.left 
                  dragger top position: this.mcs.draggerTop 
                  dragger left position: this.mcs.draggerLeft 
                  scrolling y percentage: this.mcs.topPct 
                  scrolling x percentage: this.mcs.leftPct 
                  scrolling direction: this.mcs.direction
              */
              function _mcs(){
                  var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
                      dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
                      cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
                      pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
                  el[0].mcs={
                      content:mCSB_container, /* original content wrapper as jquery object */
                      top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
                      topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
                      direction:options.dir
                  };
                  /* 
                  this refers to the original element containing the scrollbar(s)
                  usage: this.mcs.top, this.mcs.leftPct etc. 
                  */
              }
          },
          /* -------------------- */
          
          
          /* 
          CUSTOM JAVASCRIPT ANIMATION TWEEN 
          Lighter and faster than jquery animate() and css transitions 
          Animates top/left properties and includes easings 
          */
          _tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
              if(!el._mTween){el._mTween={top:{},left:{}};}
              var callbacks=callbacks || {},
                  onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
                  startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
              if(prop==="left"){from=el.offsetLeft;}
              var diff=to-from;
              tobj.stop=0;
              if(overwrite!=="none"){_cancelTween();}
              _startTween();
              function _step(){
                  if(tobj.stop){return;}
                  if(!progress){onStart.call();}
                  progress=_getTime()-startTime;
                  _tween();
                  if(progress>=tobj.time){
                      tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
                      if(tobj.time<progress+1){tobj.time=progress+1;}
                  }
                  if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
              }
              function _tween(){
                  if(duration>0){
                      tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
                      elStyle[prop]=Math.round(tobj.currVal)+"px";
                  }else{
                      elStyle[prop]=to+"px";
                  }
                  onUpdate.call();
              }
              function _startTween(){
                  _delay=1000/60;
                  tobj.time=progress+_delay;
                  _request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
                  tobj.id=_request(_step);
              }
              function _cancelTween(){
                  if(tobj.id==null){return;}
                  if(!window.requestAnimationFrame){clearTimeout(tobj.id);
                  }else{window.cancelAnimationFrame(tobj.id);}
                  tobj.id=null;
              }
              function _ease(t,b,c,d,type){
                  switch(type){
                      case "linear": case "mcsLinear":
                          return c*t/d + b;
                          break;
                      case "mcsLinearOut":
                          t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
                          break;
                      case "easeInOutSmooth":
                          t/=d/2;
                          if(t<1) return c/2*t*t + b;
                          t--;
                          return -c/2 * (t*(t-2) - 1) + b;
                          break;
                      case "easeInOutStrong":
                          t/=d/2;
                          if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
                          t--;
                          return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
                          break;
                      case "easeInOut": case "mcsEaseInOut":
                          t/=d/2;
                          if(t<1) return c/2*t*t*t + b;
                          t-=2;
                          return c/2*(t*t*t + 2) + b;
                          break;
                      case "easeOutSmooth":
                          t/=d; t--;
                          return -c * (t*t*t*t - 1) + b;
                          break;
                      case "easeOutStrong":
                          return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
                          break;
                      case "easeOut": case "mcsEaseOut": default:
                          var ts=(t/=d)*t,tc=ts*t;
                          return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
                  }
              }
          },
          /* -------------------- */
          
          
          /* returns current time */
          _getTime=function(){
              if(window.performance && window.performance.now){
                  return window.performance.now();
              }else{
                  if(window.performance && window.performance.webkitNow){
                      return window.performance.webkitNow();
                  }else{
                      if(Date.now){return Date.now();}else{return new Date().getTime();}
                  }
              }
          },
          /* -------------------- */
          
          
          /* stops a tween */
          _stopTween=function(){
              var el=this;
              if(!el._mTween){el._mTween={top:{},left:{}};}
              var props=["top","left"];
              for(var i=0; i<props.length; i++){
                  var prop=props[i];
                  if(el._mTween[prop].id){
                      if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
                      }else{window.cancelAnimationFrame(el._mTween[prop].id);}
                      el._mTween[prop].id=null;
                      el._mTween[prop].stop=1;
                  }
              }
          },
          /* -------------------- */
          
          
          /* deletes a property (avoiding the exception thrown by IE) */
          _delete=function(c,m){
              try{delete c[m];}catch(e){c[m]=null;}
          },
          /* -------------------- */
          
          
          /* detects left mouse button */
          _mouseBtnLeft=function(e){
              return !(e.which && e.which!==1);
          },
          /* -------------------- */
          
          
          /* detects if pointer type event is touch */
          _pointerTouch=function(e){
              var t=e.originalEvent.pointerType;
              return !(t && t!=="touch" && t!==2);
          },
          /* -------------------- */
          
          
          /* checks if value is numeric */
          _isNumeric=function(val){
              return !isNaN(parseFloat(val)) && isFinite(val);
          },
          /* -------------------- */
          
          
          /* returns element position according to content */
          _childPos=function(el){
              var p=el.parents(".mCSB_container");
              return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
          },
          /* -------------------- */
          
          
          /* checks if browser tab is hidden/inactive via Page Visibility API */
          _isTabHidden=function(){
              var prop=_getHiddenProp();
              if(!prop) return false;
              return document[prop];
              function _getHiddenProp(){
                  var pfx=["webkit","moz","ms","o"];
                  if("hidden" in document) return "hidden"; //natively supported
                  for(var i=0; i<pfx.length; i++){ //prefixed
                      if((pfx[i]+"Hidden") in document) 
                          return pfx[i]+"Hidden";
                  }
                  return null; //not supported
              }
          };
          /* -------------------- */
          
      
      
      
      
      /* 
      ----------------------------------------
      PLUGIN SETUP 
      ----------------------------------------
      */
      
      /* plugin constructor functions */
      $.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
          if(methods[method]){
              return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
          }else if(typeof method==="object" || !method){
              return methods.init.apply(this,arguments);
          }else{
              $.error("Method "+method+" does not exist");
          }
      };
      $[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
          if(methods[method]){
              return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
          }else if(typeof method==="object" || !method){
              return methods.init.apply(this,arguments);
          }else{
              $.error("Method "+method+" does not exist");
          }
      };
      
      /* 
      allow setting plugin default options. 
      usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
      to apply any changed default options on default selectors (below), use inside document ready fn 
      e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
      */
      $[pluginNS].defaults=defaults;
      
      /* 
      add window object (window.mCustomScrollbar) 
      usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
      */
      window[pluginNS]=true;
      
      $(window).bind("load",function(){
          
          $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
          
          /* extend jQuery expressions */
          $.extend($.expr[":"],{
              /* checks if element is within scrollable viewport */
              mcsInView:$.expr[":"].mcsInView || function(el){
                  var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
                  if(!content.length){return;}
                  wrapper=content.parent();
                  cPos=[content[0].offsetTop,content[0].offsetLeft];
                  return 	cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) && 
                          cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
              },
              /* checks if element or part of element is in view of scrollable viewport */
              mcsInSight:$.expr[":"].mcsInSight || function(el,i,m){
                  var $el=$(el),elD,content=$el.parents(".mCSB_container"),wrapperView,pos,wrapperViewPct,
                      pctVals=m[3]==="exact" ? [[1,0],[1,0]] : [[0.9,0.1],[0.6,0.4]];
                  if(!content.length){return;}
                  elD=[$el.outerHeight(false),$el.outerWidth(false)];
                  pos=[content[0].offsetTop+_childPos($el)[0],content[0].offsetLeft+_childPos($el)[1]];
                  wrapperView=[content.parent()[0].offsetHeight,content.parent()[0].offsetWidth];
                  wrapperViewPct=[elD[0]<wrapperView[0] ? pctVals[0] : pctVals[1],elD[1]<wrapperView[1] ? pctVals[0] : pctVals[1]];
                  return 	pos[0]-(wrapperView[0]*wrapperViewPct[0][0])<0 && pos[0]+elD[0]-(wrapperView[0]*wrapperViewPct[0][1])>=0 && 
                          pos[1]-(wrapperView[1]*wrapperViewPct[1][0])<0 && pos[1]+elD[1]-(wrapperView[1]*wrapperViewPct[1][1])>=0;
              },
              /* checks if element is overflowed having visible scrollbar(s) */
              mcsOverflow:$.expr[":"].mcsOverflow || function(el){
                  var d=$(el).data(pluginPfx);
                  if(!d){return;}
                  return d.overflowed[0] || d.overflowed[1];
              }
          });
      
      });
  
  }))}));
  /*! nouislider - 9.2.0 - 2017-01-11 10:35:34 */
  
  (function (factory) {
  
      if ( typeof define === 'function' && define.amd ) {
  
          // AMD. Register as an anonymous module.
          define([], factory);
  
      } else if ( typeof exports === 'object' ) {
  
          // Node/CommonJS
          module.exports = factory();
  
      } else {
  
          // Browser globals
          window.noUiSlider = factory();
      }
  
  }(function( ){
  
      'use strict';
  
      var VERSION = '9.2.0';
  
  
      // Creates a node, adds it to target, returns the new node.
      function addNodeTo ( target, className ) {
          var div = document.createElement('div');
          addClass(div, className);
          target.appendChild(div);
          return div;
      }
  
      // Removes duplicates from an array.
      function unique ( array ) {
          return array.filter(function(a){
              return !this[a] ? this[a] = true : false;
          }, {});
      }
  
      // Round a value to the closest 'to'.
      function closest ( value, to ) {
          return Math.round(value / to) * to;
      }
  
      // Current position of an element relative to the document.
      function offset ( elem, orientation ) {
  
      var rect = elem.getBoundingClientRect(),
          doc = elem.ownerDocument,
          docElem = doc.documentElement,
          pageOffset = getPageOffset();
  
          // getBoundingClientRect contains left scroll in Chrome on Android.
          // I haven't found a feature detection that proves this. Worst case
          // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
          if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
              pageOffset.x = 0;
          }
  
          return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
      }
  
      // Checks whether a value is numerical.
      function isNumeric ( a ) {
          return typeof a === 'number' && !isNaN( a ) && isFinite( a );
      }
  
      // Sets a class and removes it after [duration] ms.
      function addClassFor ( element, className, duration ) {
          if (duration > 0) {
          addClass(element, className);
              setTimeout(function(){
                  removeClass(element, className);
              }, duration);
          }
      }
  
      // Limits a value to 0 - 100
      function limit ( a ) {
          return Math.max(Math.min(a, 100), 0);
      }
  
      // Wraps a variable as an array, if it isn't one yet.
      // Note that an input array is returned by reference!
      function asArray ( a ) {
          return Array.isArray(a) ? a : [a];
      }
  
      // Counts decimals
      function countDecimals ( numStr ) {
          numStr = String(numStr);
          var pieces = numStr.split(".");
          return pieces.length > 1 ? pieces[1].length : 0;
      }
  
      // http://youmightnotneedjquery.com/#add_class
      function addClass ( el, className ) {
          if ( el.classList ) {
              el.classList.add(className);
          } else {
              el.className += ' ' + className;
          }
      }
  
      // http://youmightnotneedjquery.com/#remove_class
      function removeClass ( el, className ) {
          if ( el.classList ) {
              el.classList.remove(className);
          } else {
              el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
      }
  
      // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
      function hasClass ( el, className ) {
          return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
      }
  
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
      function getPageOffset ( ) {
  
          var supportPageOffset = window.pageXOffset !== undefined,
              isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
              x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
              y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  
          return {
              x: x,
              y: y
          };
      }
  
      // we provide a function to compute constants instead
      // of accessing window.* as soon as the module needs it
      // so that we do not compute anything if not needed
      function getActions ( ) {
  
          // Determine the events to bind. IE11 implements pointerEvents without
          // a prefix, which breaks compatibility with the IE10 implementation.
          return window.navigator.pointerEnabled ? {
              start: 'pointerdown',
              move: 'pointermove',
              end: 'pointerup'
          } : window.navigator.msPointerEnabled ? {
              start: 'MSPointerDown',
              move: 'MSPointerMove',
              end: 'MSPointerUp'
          } : {
              start: 'mousedown touchstart',
              move: 'mousemove touchmove',
              end: 'mouseup touchend'
          };
      }
  
  
  // Value calculation
  
      // Determine the size of a sub-range in relation to a full range.
      function subRangeRatio ( pa, pb ) {
          return (100 / (pb - pa));
      }
  
      // (percentage) How many percent is this value of this range?
      function fromPercentage ( range, value ) {
          return (value * 100) / ( range[1] - range[0] );
      }
  
      // (percentage) Where is this value on this range?
      function toPercentage ( range, value ) {
          return fromPercentage( range, range[0] < 0 ?
              value + Math.abs(range[0]) :
                  value - range[0] );
      }
  
      // (value) How much is this percentage on this range?
      function isPercentage ( range, value ) {
          return ((value * ( range[1] - range[0] )) / 100) + range[0];
      }
  
  
  // Range conversion
  
      function getJ ( value, arr ) {
  
          var j = 1;
  
          while ( value >= arr[j] ){
              j += 1;
          }
  
          return j;
      }
  
      // (percentage) Input a value, find where, on a scale of 0-100, it applies.
      function toStepping ( xVal, xPct, value ) {
  
          if ( value >= xVal.slice(-1)[0] ){
              return 100;
          }
  
          var j = getJ( value, xVal ), va, vb, pa, pb;
  
          va = xVal[j-1];
          vb = xVal[j];
          pa = xPct[j-1];
          pb = xPct[j];
  
          return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
      }
  
      // (value) Input a percentage, find where it is on the specified range.
      function fromStepping ( xVal, xPct, value ) {
  
          // There is no range group that fits 100
          if ( value >= 100 ){
              return xVal.slice(-1)[0];
          }
  
          var j = getJ( value, xPct ), va, vb, pa, pb;
  
          va = xVal[j-1];
          vb = xVal[j];
          pa = xPct[j-1];
          pb = xPct[j];
  
          return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
      }
  
      // (percentage) Get the step that applies at a certain value.
      function getStep ( xPct, xSteps, snap, value ) {
  
          if ( value === 100 ) {
              return value;
          }
  
          var j = getJ( value, xPct ), a, b;
  
          // If 'snap' is set, steps are used as fixed points on the slider.
          if ( snap ) {
  
              a = xPct[j-1];
              b = xPct[j];
  
              // Find the closest position, a or b.
              if ((value - a) > ((b-a)/2)){
                  return b;
              }
  
              return a;
          }
  
          if ( !xSteps[j-1] ){
              return value;
          }
  
          return xPct[j-1] + closest(
              value - xPct[j-1],
              xSteps[j-1]
          );
      }
  
  
  // Entry parsing
  
      function handleEntryPoint ( index, value, that ) {
  
          var percentage;
  
          // Wrap numerical input in an array.
          if ( typeof value === "number" ) {
              value = [value];
          }
  
          // Reject any invalid input, by testing whether value is an array.
          if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
              throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
          }
  
          // Covert min/max syntax to 0 and 100.
          if ( index === 'min' ) {
              percentage = 0;
          } else if ( index === 'max' ) {
              percentage = 100;
          } else {
              percentage = parseFloat( index );
          }
  
          // Check for correct input.
          if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
              throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
          }
  
          // Store values.
          that.xPct.push( percentage );
          that.xVal.push( value[0] );
  
          // NaN will evaluate to false too, but to keep
          // logging clear, set step explicitly. Make sure
          // not to override the 'step' setting with false.
          if ( !percentage ) {
              if ( !isNaN( value[1] ) ) {
                  that.xSteps[0] = value[1];
              }
          } else {
              that.xSteps.push( isNaN(value[1]) ? false : value[1] );
          }
  
          that.xHighestCompleteStep.push(0);
      }
  
      function handleStepPoint ( i, n, that ) {
  
          // Ignore 'false' stepping.
          if ( !n ) {
              return true;
          }
  
          // Factor to range ratio
          that.xSteps[i] = fromPercentage([
               that.xVal[i]
              ,that.xVal[i+1]
          ], n) / subRangeRatio (
              that.xPct[i],
              that.xPct[i+1] );
  
          var totalSteps = (that.xVal[i+1] - that.xVal[i]) / that.xNumSteps[i];
          var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
          var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);
  
          that.xHighestCompleteStep[i] = step;
      }
  
  
  // Interface
  
      // The interface to Spectrum handles all direction-based
      // conversions, so the above values are unaware.
  
      function Spectrum ( entry, snap, direction, singleStep ) {
  
          this.xPct = [];
          this.xVal = [];
          this.xSteps = [ singleStep || false ];
          this.xNumSteps = [ false ];
          this.xHighestCompleteStep = [];
  
          this.snap = snap;
          this.direction = direction;
  
          var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];
  
          // Map the object keys to an array.
          for ( index in entry ) {
              if ( entry.hasOwnProperty(index) ) {
                  ordered.push([entry[index], index]);
              }
          }
  
          // Sort all entries by value (numeric sort).
          if ( ordered.length && typeof ordered[0][0] === "object" ) {
              ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
          } else {
              ordered.sort(function(a, b) { return a[0] - b[0]; });
          }
  
  
          // Convert all entries to subranges.
          for ( index = 0; index < ordered.length; index++ ) {
              handleEntryPoint(ordered[index][1], ordered[index][0], this);
          }
  
          // Store the actual step values.
          // xSteps is sorted in the same order as xPct and xVal.
          this.xNumSteps = this.xSteps.slice(0);
  
          // Convert all numeric steps to the percentage of the subrange they represent.
          for ( index = 0; index < this.xNumSteps.length; index++ ) {
              handleStepPoint(index, this.xNumSteps[index], this);
          }
      }
  
      Spectrum.prototype.getMargin = function ( value ) {
  
          var step = this.xNumSteps[0];
  
          if ( step && ((value / step) % 1) !== 0 ) {
              throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
          }
  
          return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
      };
  
      Spectrum.prototype.toStepping = function ( value ) {
  
          value = toStepping( this.xVal, this.xPct, value );
  
          return value;
      };
  
      Spectrum.prototype.fromStepping = function ( value ) {
  
          return fromStepping( this.xVal, this.xPct, value );
      };
  
      Spectrum.prototype.getStep = function ( value ) {
  
          value = getStep(this.xPct, this.xSteps, this.snap, value );
  
          return value;
      };
  
      Spectrum.prototype.getNearbySteps = function ( value ) {
  
          var j = getJ(value, this.xPct);
  
          return {
              stepBefore: { startValue: this.xVal[j-2], step: this.xNumSteps[j-2], highestStep: this.xHighestCompleteStep[j-2] },
              thisStep: { startValue: this.xVal[j-1], step: this.xNumSteps[j-1], highestStep: this.xHighestCompleteStep[j-1] },
              stepAfter: { startValue: this.xVal[j-0], step: this.xNumSteps[j-0], highestStep: this.xHighestCompleteStep[j-0] }
          };
      };
  
      Spectrum.prototype.countStepDecimals = function () {
          var stepDecimals = this.xNumSteps.map(countDecimals);
          return Math.max.apply(null, stepDecimals);
       };
  
      // Outside testing
      Spectrum.prototype.convert = function ( value ) {
          return this.getStep(this.toStepping(value));
      };
  
  /*	Every input option is tested and parsed. This'll prevent
      endless validation in internal methods. These tests are
      structured with an item for every option available. An
      option can be marked as required by setting the 'r' flag.
      The testing function is provided with three arguments:
          - The provided value for the option;
          - A reference to the options object;
          - The name for the option;
  
      The testing function returns false when an error is detected,
      or true when everything is OK. It can also modify the option
      object, to make sure all values can be correctly looped elsewhere. */
  
      var defaultFormatter = { 'to': function( value ){
          return value !== undefined && value.toFixed(2);
      }, 'from': Number };
  
      function testStep ( parsed, entry ) {
  
          if ( !isNumeric( entry ) ) {
              throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
          }
  
          // The step option can still be used to set stepping
          // for linear sliders. Overwritten if set in 'range'.
          parsed.singleStep = entry;
      }
  
      function testRange ( parsed, entry ) {
  
          // Filter incorrect input.
          if ( typeof entry !== 'object' || Array.isArray(entry) ) {
              throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
          }
  
          // Catch missing start or end.
          if ( entry.min === undefined || entry.max === undefined ) {
              throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
          }
  
          // Catch equal start or end.
          if ( entry.min === entry.max ) {
              throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
          }
  
          parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
      }
  
      function testStart ( parsed, entry ) {
  
          entry = asArray(entry);
  
          // Validate input. Values aren't tested, as the public .val method
          // will always provide a valid location.
          if ( !Array.isArray( entry ) || !entry.length ) {
              throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
          }
  
          // Store the number of handles.
          parsed.handles = entry.length;
  
          // When the slider is initialized, the .val method will
          // be called with the start options.
          parsed.start = entry;
      }
  
      function testSnap ( parsed, entry ) {
  
          // Enforce 100% stepping within subranges.
          parsed.snap = entry;
  
          if ( typeof entry !== 'boolean' ){
              throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
          }
      }
  
      function testAnimate ( parsed, entry ) {
  
          // Enforce 100% stepping within subranges.
          parsed.animate = entry;
  
          if ( typeof entry !== 'boolean' ){
              throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
          }
      }
  
      function testAnimationDuration ( parsed, entry ) {
  
          parsed.animationDuration = entry;
  
          if ( typeof entry !== 'number' ){
              throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
          }
      }
  
      function testConnect ( parsed, entry ) {
  
          var connect = [false];
          var i;
  
          // Map legacy options
          if ( entry === 'lower' ) {
              entry = [true, false];
          }
  
          else if ( entry === 'upper' ) {
              entry = [false, true];
          }
  
          // Handle boolean options
          if ( entry === true || entry === false ) {
  
              for ( i = 1; i < parsed.handles; i++ ) {
                  connect.push(entry);
              }
  
              connect.push(false);
          }
  
          // Reject invalid input
          else if ( !Array.isArray( entry ) || !entry.length || entry.length !== parsed.handles + 1 ) {
              throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
          }
  
          else {
              connect = entry;
          }
  
          parsed.connect = connect;
      }
  
      function testOrientation ( parsed, entry ) {
  
          // Set orientation to an a numerical value for easy
          // array selection.
          switch ( entry ){
            case 'horizontal':
              parsed.ort = 0;
              break;
            case 'vertical':
              parsed.ort = 1;
              break;
            default:
              throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
          }
      }
  
      function testMargin ( parsed, entry ) {
  
          if ( !isNumeric(entry) ){
              throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
          }
  
          // Issue #582
          if ( entry === 0 ) {
              return;
          }
  
          parsed.margin = parsed.spectrum.getMargin(entry);
  
          if ( !parsed.margin ) {
              throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
          }
      }
  
      function testLimit ( parsed, entry ) {
  
          if ( !isNumeric(entry) ){
              throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
          }
  
          parsed.limit = parsed.spectrum.getMargin(entry);
  
          if ( !parsed.limit || parsed.handles < 2 ) {
              throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
          }
      }
  
      function testPadding ( parsed, entry ) {
  
          if ( !isNumeric(entry) ){
              throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric.");
          }
  
          if ( entry === 0 ) {
              return;
          }
  
          parsed.padding = parsed.spectrum.getMargin(entry);
  
          if ( !parsed.padding ) {
              throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
          }
  
          if ( parsed.padding < 0 ) {
              throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number.");
          }
  
          if ( parsed.padding >= 50 ) {
              throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be less than half the range.");
          }
      }
  
      function testDirection ( parsed, entry ) {
  
          // Set direction as a numerical value for easy parsing.
          // Invert connection for RTL sliders, so that the proper
          // handles get the connect/background classes.
          switch ( entry ) {
            case 'ltr':
              parsed.dir = 0;
              break;
            case 'rtl':
              parsed.dir = 1;
              break;
            default:
              throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
          }
      }
  
      function testBehaviour ( parsed, entry ) {
  
          // Make sure the input is a string.
          if ( typeof entry !== 'string' ) {
              throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
          }
  
          // Check if the string contains any keywords.
          // None are required.
          var tap = entry.indexOf('tap') >= 0;
          var drag = entry.indexOf('drag') >= 0;
          var fixed = entry.indexOf('fixed') >= 0;
          var snap = entry.indexOf('snap') >= 0;
          var hover = entry.indexOf('hover') >= 0;
  
          if ( fixed ) {
  
              if ( parsed.handles !== 2 ) {
                  throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
              }
  
              // Use margin to enforce fixed state
              testMargin(parsed, parsed.start[1] - parsed.start[0]);
          }
  
          parsed.events = {
              tap: tap || snap,
              drag: drag,
              fixed: fixed,
              snap: snap,
              hover: hover
          };
      }
  
      function testTooltips ( parsed, entry ) {
  
          if ( entry === false ) {
              return;
          }
  
          else if ( entry === true ) {
  
              parsed.tooltips = [];
  
              for ( var i = 0; i < parsed.handles; i++ ) {
                  parsed.tooltips.push(true);
              }
          }
  
          else {
  
              parsed.tooltips = asArray(entry);
  
              if ( parsed.tooltips.length !== parsed.handles ) {
                  throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
              }
  
              parsed.tooltips.forEach(function(formatter){
                  if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
                      throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
                  }
              });
          }
      }
  
      function testFormat ( parsed, entry ) {
  
          parsed.format = entry;
  
          // Any object with a to and from method is supported.
          if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
              return true;
          }
  
          throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
      }
  
      function testCssPrefix ( parsed, entry ) {
  
          if ( entry !== undefined && typeof entry !== 'string' && entry !== false ) {
              throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
          }
  
          parsed.cssPrefix = entry;
      }
  
      function testCssClasses ( parsed, entry ) {
  
          if ( entry !== undefined && typeof entry !== 'object' ) {
              throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
          }
  
          if ( typeof parsed.cssPrefix === 'string' ) {
              parsed.cssClasses = {};
  
              for ( var key in entry ) {
                  if ( !entry.hasOwnProperty(key) ) { continue; }
  
                  parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
              }
          } else {
              parsed.cssClasses = entry;
          }
      }
  
      function testUseRaf ( parsed, entry ) {
          if ( entry === true || entry === false ) {
              parsed.useRequestAnimationFrame = entry;
          } else {
              throw new Error("noUiSlider (" + VERSION + "): 'useRequestAnimationFrame' option should be true (default) or false.");
          }
      }
  
      // Test all developer settings and parse to assumption-safe values.
      function testOptions ( options ) {
  
          // To prove a fix for #537, freeze options here.
          // If the object is modified, an error will be thrown.
          // Object.freeze(options);
  
          var parsed = {
              margin: 0,
              limit: 0,
              padding: 0,
              animate: true,
              animationDuration: 300,
              format: defaultFormatter
          };
  
          // Tests are executed in the order they are presented here.
          var tests = {
              'step': { r: false, t: testStep },
              'start': { r: true, t: testStart },
              'connect': { r: true, t: testConnect },
              'direction': { r: true, t: testDirection },
              'snap': { r: false, t: testSnap },
              'animate': { r: false, t: testAnimate },
              'animationDuration': { r: false, t: testAnimationDuration },
              'range': { r: true, t: testRange },
              'orientation': { r: false, t: testOrientation },
              'margin': { r: false, t: testMargin },
              'limit': { r: false, t: testLimit },
              'padding': { r: false, t: testPadding },
              'behaviour': { r: true, t: testBehaviour },
              'format': { r: false, t: testFormat },
              'tooltips': { r: false, t: testTooltips },
              'cssPrefix': { r: false, t: testCssPrefix },
              'cssClasses': { r: false, t: testCssClasses },
              'useRequestAnimationFrame': { r: false, t: testUseRaf }
          };
  
          var defaults = {
              'connect': false,
              'direction': 'ltr',
              'behaviour': 'tap',
              'orientation': 'horizontal',
              'cssPrefix' : 'noUi-',
              'cssClasses': {
                  target: 'target',
                  base: 'base',
                  origin: 'origin',
                  handle: 'handle',
                  handleLower: 'handle-lower',
                  handleUpper: 'handle-upper',
                  horizontal: 'horizontal',
                  vertical: 'vertical',
                  background: 'background',
                  connect: 'connect',
                  ltr: 'ltr',
                  rtl: 'rtl',
                  draggable: 'draggable',
                  drag: 'state-drag',
                  tap: 'state-tap',
                  active: 'active',
                  tooltip: 'tooltip',
                  pips: 'pips',
                  pipsHorizontal: 'pips-horizontal',
                  pipsVertical: 'pips-vertical',
                  marker: 'marker',
                  markerHorizontal: 'marker-horizontal',
                  markerVertical: 'marker-vertical',
                  markerNormal: 'marker-normal',
                  markerLarge: 'marker-large',
                  markerSub: 'marker-sub',
                  value: 'value',
                  valueHorizontal: 'value-horizontal',
                  valueVertical: 'value-vertical',
                  valueNormal: 'value-normal',
                  valueLarge: 'value-large',
                  valueSub: 'value-sub'
              },
              'useRequestAnimationFrame': true
          };
  
          // Run all options through a testing mechanism to ensure correct
          // input. It should be noted that options might get modified to
          // be handled properly. E.g. wrapping integers in arrays.
          Object.keys(tests).forEach(function( name ){
  
              // If the option isn't set, but it is required, throw an error.
              if ( options[name] === undefined && defaults[name] === undefined ) {
  
                  if ( tests[name].r ) {
                      throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
                  }
  
                  return true;
              }
  
              tests[name].t( parsed, options[name] === undefined ? defaults[name] : options[name] );
          });
  
          // Forward pips options
          parsed.pips = options.pips;
  
          var styles = [['left', 'top'], ['right', 'bottom']];
  
          // Pre-define the styles.
          parsed.style = styles[parsed.dir][parsed.ort];
          parsed.styleOposite = styles[parsed.dir?0:1][parsed.ort];
  
          return parsed;
      }
  
  
  function closure ( target, options, originalOptions ){
  
      var actions = getActions( );
  
      // All variables local to 'closure' are prefixed with 'scope_'
      var scope_Target = target;
      var scope_Locations = [];
      var scope_Base;
      var scope_Handles;
      var scope_HandleNumbers = [];
      var scope_ActiveHandle = false;
      var scope_Connects;
      var scope_Spectrum = options.spectrum;
      var scope_Values = [];
      var scope_Events = {};
      var scope_Self;
  
  
      // Append a origin to the base
      function addOrigin ( base, handleNumber ) {
  
          var origin = addNodeTo(base, options.cssClasses.origin);
          var handle = addNodeTo(origin, options.cssClasses.handle);
  
          handle.setAttribute('data-handle', handleNumber);
  
          if ( handleNumber === 0 ) {
              addClass(handle, options.cssClasses.handleLower);
          }
  
          else if ( handleNumber === options.handles - 1 ) {
              addClass(handle, options.cssClasses.handleUpper);
          }
  
          return origin;
      }
  
      // Insert nodes for connect elements
      function addConnect ( base, add ) {
  
          if ( !add ) {
              return false;
          }
  
          return addNodeTo(base, options.cssClasses.connect);
      }
  
      // Add handles to the slider base.
      function addElements ( connectOptions, base ) {
  
          scope_Handles = [];
          scope_Connects = [];
  
          scope_Connects.push(addConnect(base, connectOptions[0]));
  
          // [::::O====O====O====]
          // connectOptions = [0, 1, 1, 1]
  
          for ( var i = 0; i < options.handles; i++ ) {
              // Keep a list of all added handles.
              scope_Handles.push(addOrigin(base, i));
              scope_HandleNumbers[i] = i;
              scope_Connects.push(addConnect(base, connectOptions[i + 1]));
          }
      }
  
      // Initialize a single slider.
      function addSlider ( target ) {
  
          // Apply classes and data to the target.
          addClass(target, options.cssClasses.target);
  
          if ( options.dir === 0 ) {
              addClass(target, options.cssClasses.ltr);
          } else {
              addClass(target, options.cssClasses.rtl);
          }
  
          if ( options.ort === 0 ) {
              addClass(target, options.cssClasses.horizontal);
          } else {
              addClass(target, options.cssClasses.vertical);
          }
  
          scope_Base = addNodeTo(target, options.cssClasses.base);
      }
  
  
      function addTooltip ( handle, handleNumber ) {
  
          if ( !options.tooltips[handleNumber] ) {
              return false;
          }
  
          return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
      }
  
      // The tooltips option is a shorthand for using the 'update' event.
      function tooltips ( ) {
  
          // Tooltips are added with options.tooltips in original order.
          var tips = scope_Handles.map(addTooltip);
  
          bindEvent('update', function(values, handleNumber, unencoded) {
  
              if ( !tips[handleNumber] ) {
                  return;
              }
  
              var formattedValue = values[handleNumber];
  
              if ( options.tooltips[handleNumber] !== true ) {
                  formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
              }
  
              tips[handleNumber].innerHTML = formattedValue;
          });
      }
  
  
      function getGroup ( mode, values, stepped ) {
  
          // Use the range.
          if ( mode === 'range' || mode === 'steps' ) {
              return scope_Spectrum.xVal;
          }
  
          if ( mode === 'count' ) {
  
              if ( !values ) {
                  throw new Error("noUiSlider (" + VERSION + "): 'values' required for mode 'count'.");
              }
  
              // Divide 0 - 100 in 'count' parts.
              var spread = ( 100 / (values - 1) );
              var v;
              var i = 0;
  
              values = [];
  
              // List these parts and have them handled as 'positions'.
              while ( (v = i++ * spread) <= 100 ) {
                  values.push(v);
              }
  
              mode = 'positions';
          }
  
          if ( mode === 'positions' ) {
  
              // Map all percentages to on-range values.
              return values.map(function( value ){
                  return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
              });
          }
  
          if ( mode === 'values' ) {
  
              // If the value must be stepped, it needs to be converted to a percentage first.
              if ( stepped ) {
  
                  return values.map(function( value ){
  
                      // Convert to percentage, apply step, return to value.
                      return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
                  });
  
              }
  
              // Otherwise, we can simply use the values.
              return values;
          }
      }
  
      function generateSpread ( density, mode, group ) {
  
          function safeIncrement(value, increment) {
              // Avoid floating point variance by dropping the smallest decimal places.
              return (value + increment).toFixed(7) / 1;
          }
  
          var indexes = {};
          var firstInRange = scope_Spectrum.xVal[0];
          var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];
          var ignoreFirst = false;
          var ignoreLast = false;
          var prevPct = 0;
  
          // Create a copy of the group, sort it and filter away all duplicates.
          group = unique(group.slice().sort(function(a, b){ return a - b; }));
  
          // Make sure the range starts with the first element.
          if ( group[0] !== firstInRange ) {
              group.unshift(firstInRange);
              ignoreFirst = true;
          }
  
          // Likewise for the last one.
          if ( group[group.length - 1] !== lastInRange ) {
              group.push(lastInRange);
              ignoreLast = true;
          }
  
          group.forEach(function ( current, index ) {
  
              // Get the current step and the lower + upper positions.
              var step;
              var i;
              var q;
              var low = current;
              var high = group[index+1];
              var newPct;
              var pctDifference;
              var pctPos;
              var type;
              var steps;
              var realSteps;
              var stepsize;
  
              // When using 'steps' mode, use the provided steps.
              // Otherwise, we'll step on to the next subrange.
              if ( mode === 'steps' ) {
                  step = scope_Spectrum.xNumSteps[ index ];
              }
  
              // Default to a 'full' step.
              if ( !step ) {
                  step = high-low;
              }
  
              // Low can be 0, so test for false. If high is undefined,
              // we are at the last subrange. Index 0 is already handled.
              if ( low === false || high === undefined ) {
                  return;
              }
  
              // Make sure step isn't 0, which would cause an infinite loop (#654)
              step = Math.max(step, 0.0000001);
  
              // Find all steps in the subrange.
              for ( i = low; i <= high; i = safeIncrement(i, step) ) {
  
                  // Get the percentage value for the current step,
                  // calculate the size for the subrange.
                  newPct = scope_Spectrum.toStepping( i );
                  pctDifference = newPct - prevPct;
  
                  steps = pctDifference / density;
                  realSteps = Math.round(steps);
  
                  // This ratio represents the ammount of percentage-space a point indicates.
                  // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
                  // Round the percentage offset to an even number, then divide by two
                  // to spread the offset on both sides of the range.
                  stepsize = pctDifference/realSteps;
  
                  // Divide all points evenly, adding the correct number to this subrange.
                  // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                  for ( q = 1; q <= realSteps; q += 1 ) {
  
                      // The ratio between the rounded value and the actual size might be ~1% off.
                      // Correct the percentage offset by the number of points
                      // per subrange. density = 1 will result in 100 points on the
                      // full range, 2 for 50, 4 for 25, etc.
                      pctPos = prevPct + ( q * stepsize );
                      indexes[pctPos.toFixed(5)] = ['x', 0];
                  }
  
                  // Determine the point type.
                  type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );
  
                  // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                  if ( !index && ignoreFirst ) {
                      type = 0;
                  }
  
                  if ( !(i === high && ignoreLast)) {
                      // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                      indexes[newPct.toFixed(5)] = [i, type];
                  }
  
                  // Update the percentage count.
                  prevPct = newPct;
              }
          });
  
          return indexes;
      }
  
      function addMarking ( spread, filterFunc, formatter ) {
  
          var element = document.createElement('div');
          var out = '';
          var valueSizeClasses = [
              options.cssClasses.valueNormal,
              options.cssClasses.valueLarge,
              options.cssClasses.valueSub
          ];
          var markerSizeClasses = [
              options.cssClasses.markerNormal,
              options.cssClasses.markerLarge,
              options.cssClasses.markerSub
          ];
          var valueOrientationClasses = [
              options.cssClasses.valueHorizontal,
              options.cssClasses.valueVertical
          ];
          var markerOrientationClasses = [
              options.cssClasses.markerHorizontal,
              options.cssClasses.markerVertical
          ];
  
          addClass(element, options.cssClasses.pips);
          addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
  
          function getClasses( type, source ){
              var a = source === options.cssClasses.value;
              var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
              var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
  
              return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
          }
  
          function getTags( offset, source, values ) {
              return 'class="' + getClasses(values[1], source) + '" style="' + options.style + ': ' + offset + '%"';
          }
  
          function addSpread ( offset, values ){
  
              // Apply the filter function, if it is set.
              values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];
  
              // Add a marker for every point
              out += '<div ' + getTags(offset, options.cssClasses.marker, values) + '></div>';
  
              // Values are only appended for points marked '1' or '2'.
              if ( values[1] ) {
                  out += '<div ' + getTags(offset, options.cssClasses.value, values) + '>' + formatter.to(values[0]) + '</div>';
              }
          }
  
          // Append all points.
          Object.keys(spread).forEach(function(a){
              addSpread(a, spread[a]);
          });
  
          element.innerHTML = out;
  
          return element;
      }
  
      function pips ( grid ) {
  
          var mode = grid.mode;
          var density = grid.density || 1;
          var filter = grid.filter || false;
          var values = grid.values || false;
          var stepped = grid.stepped || false;
          var group = getGroup( mode, values, stepped );
          var spread = generateSpread( density, mode, group );
          var format = grid.format || {
              to: Math.round
          };
  
          return scope_Target.appendChild(addMarking(
              spread,
              filter,
              format
          ));
      }
  
  
      // Shorthand for base dimensions.
      function baseSize ( ) {
          var rect = scope_Base.getBoundingClientRect(), alt = 'offset' + ['Width', 'Height'][options.ort];
          return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
      }
  
      // Handler for attaching events trough a proxy.
      function attachEvent ( events, element, callback, data ) {
  
          // This function can be used to 'filter' events to the slider.
          // element is a node, not a nodeList
  
          var method = function ( e ){
  
              if ( scope_Target.hasAttribute('disabled') ) {
                  return false;
              }
  
              // Stop if an active 'tap' transition is taking place.
              if ( hasClass(scope_Target, options.cssClasses.tap) ) {
                  return false;
              }
  
              e = fixEvent(e, data.pageOffset);
  
              // Handle reject of multitouch
              if ( !e ) {
                  return false;
              }
  
              // Ignore right or middle clicks on start #454
              if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
                  return false;
              }
  
              // Ignore right or middle clicks on start #454
              if ( data.hover && e.buttons ) {
                  return false;
              }
  
              e.calcPoint = e.points[ options.ort ];
  
              // Call the event handler with the event [ and additional data ].
              callback ( e, data );
          };
  
          var methods = [];
  
          // Bind a closure on the target for every event type.
          events.split(' ').forEach(function( eventName ){
              element.addEventListener(eventName, method, false);
              methods.push([eventName, method]);
          });
  
          return methods;
      }
  
      // Provide a clean event with standardized offset values.
      function fixEvent ( e, pageOffset ) {
  
          // Prevent scrolling and panning on touch events, while
          // attempting to slide. The tap event also depends on this.
          e.preventDefault();
  
          // Filter the event to register the type, which can be
          // touch, mouse or pointer. Offset changes need to be
          // made on an event specific basis.
          var touch = e.type.indexOf('touch') === 0;
          var mouse = e.type.indexOf('mouse') === 0;
          var pointer = e.type.indexOf('pointer') === 0;
          var x;
          var y;
  
          // IE10 implemented pointer events with a prefix;
          if ( e.type.indexOf('MSPointer') === 0 ) {
              pointer = true;
          }
  
          if ( touch ) {
  
              // Fix bug when user touches with two or more fingers on mobile devices.
              // It's useful when you have two or more sliders on one page,
              // that can be touched simultaneously.
              // #649, #663, #668
              if ( e.touches.length > 1 ) {
                  return false;
              }
  
              // noUiSlider supports one movement at a time,
              // so we can select the first 'changedTouch'.
              x = e.changedTouches[0].pageX;
              y = e.changedTouches[0].pageY;
          }
  
          pageOffset = pageOffset || getPageOffset();
  
          if ( mouse || pointer ) {
              x = e.clientX + pageOffset.x;
              y = e.clientY + pageOffset.y;
          }
  
          e.pageOffset = pageOffset;
          e.points = [x, y];
          e.cursor = mouse || pointer; // Fix #435
  
          return e;
      }
  
      // Translate a coordinate in the document to a percentage on the slider
      function calcPointToPercentage ( calcPoint ) {
          var location = calcPoint - offset(scope_Base, options.ort);
          var proposal = ( location * 100 ) / baseSize();
          return options.dir ? 100 - proposal : proposal;
      }
  
      // Find handle closest to a certain percentage on the slider
      function getClosestHandle ( proposal ) {
  
          var closest = 100;
          var handleNumber = false;
  
          scope_Handles.forEach(function(handle, index){
  
              // Disabled handles are ignored
              if ( handle.hasAttribute('disabled') ) {
                  return;
              }
  
              var pos = Math.abs(scope_Locations[index] - proposal);
  
              if ( pos < closest ) {
                  handleNumber = index;
                  closest = pos;
              }
          });
  
          return handleNumber;
      }
  
      // Moves handle(s) by a percentage
      // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
      function moveHandles ( upward, proposal, locations, handleNumbers ) {
  
          var proposals = locations.slice();
  
          var b = [!upward, upward];
          var f = [upward, !upward];
  
          // Copy handleNumbers so we don't change the dataset
          handleNumbers = handleNumbers.slice();
  
          // Check to see which handle is 'leading'.
          // If that one can't move the second can't either.
          if ( upward ) {
              handleNumbers.reverse();
          }
  
          // Step 1: get the maximum percentage that any of the handles can move
          if ( handleNumbers.length > 1 ) {
  
              handleNumbers.forEach(function(handleNumber, o) {
  
                  var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o]);
  
                  // Stop if one of the handles can't move.
                  if ( to === false ) {
                      proposal = 0;
                  } else {
                      proposal = to - proposals[handleNumber];
                      proposals[handleNumber] = to;
                  }
              });
          }
  
          // If using one handle, check backward AND forward
          else {
              b = f = [true];
          }
  
          var state = false;
  
          // Step 2: Try to set the handles with the found percentage
          handleNumbers.forEach(function(handleNumber, o) {
              state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
          });
  
          // Step 3: If a handle moved, fire events
          if ( state ) {
              handleNumbers.forEach(function(handleNumber){
                  fireEvent('update', handleNumber);
                  fireEvent('slide', handleNumber);
              });
          }
      }
  
      // External event handling
      function fireEvent ( eventName, handleNumber, tap ) {
  
          Object.keys(scope_Events).forEach(function( targetEvent ) {
  
              var eventType = targetEvent.split('.')[0];
  
              if ( eventName === eventType ) {
                  scope_Events[targetEvent].forEach(function( callback ) {
  
                      callback.call(
                          // Use the slider public API as the scope ('this')
                          scope_Self,
                          // Return values as array, so arg_1[arg_2] is always valid.
                          scope_Values.map(options.format.to),
                          // Handle index, 0 or 1
                          handleNumber,
                          // Unformatted slider values
                          scope_Values.slice(),
                          // Event is fired by tap, true or false
                          tap || false,
                          // Left offset of the handle, in relation to the slider
                          scope_Locations.slice()
                      );
                  });
              }
          });
      }
  
  
      // Fire 'end' when a mouse or pen leaves the document.
      function documentLeave ( event, data ) {
          if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
              eventEnd (event, data);
          }
      }
  
      // Handle movement on document for handle and range drag.
      function eventMove ( event, data ) {
  
          // Fix #498
          // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
          // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
          // IE9 has .buttons and .which zero on mousemove.
          // Firefox breaks the spec MDN defines.
          if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
              return eventEnd(event, data);
          }
  
          // Check if we are moving up or down
          var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
  
          // Convert the movement into a percentage of the slider width/height
          var proposal = (movement * 100) / data.baseSize;
  
          moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
      }
  
      // Unbind move events on document, call callbacks.
      function eventEnd ( event, data ) {
  
          // The handle is no longer active, so remove the class.
          if ( scope_ActiveHandle ) {
              removeClass(scope_ActiveHandle, options.cssClasses.active);
              scope_ActiveHandle = false;
          }
  
          // Remove cursor styles and text-selection events bound to the body.
          if ( event.cursor ) {
              document.body.style.cursor = '';
              document.body.removeEventListener('selectstart', document.body.noUiListener);
          }
  
          // Unbind the move and end events, which are added on 'start'.
          document.documentElement.noUiListeners.forEach(function( c ) {
              document.documentElement.removeEventListener(c[0], c[1]);
          });
  
          // Remove dragging class.
          removeClass(scope_Target, options.cssClasses.drag);
  
          setZindex();
  
          data.handleNumbers.forEach(function(handleNumber){
              fireEvent('set', handleNumber);
              fireEvent('change', handleNumber);
              fireEvent('end', handleNumber);
          });
      }
  
      // Bind move events on document.
      function eventStart ( event, data ) {
  
          if ( data.handleNumbers.length === 1 ) {
  
              var handle = scope_Handles[data.handleNumbers[0]];
  
              // Ignore 'disabled' handles
              if ( handle.hasAttribute('disabled') ) {
                  return false;
              }
  
              // Mark the handle as 'active' so it can be styled.
              scope_ActiveHandle = handle.children[0];
              addClass(scope_ActiveHandle, options.cssClasses.active);
          }
  
          // Fix #551, where a handle gets selected instead of dragged.
          event.preventDefault();
  
          // A drag should never propagate up to the 'tap' event.
          event.stopPropagation();
  
          // Attach the move and end events.
          var moveEvent = attachEvent(actions.move, document.documentElement, eventMove, {
              startCalcPoint: event.calcPoint,
              baseSize: baseSize(),
              pageOffset: event.pageOffset,
              handleNumbers: data.handleNumbers,
              buttonsProperty: event.buttons,
              locations: scope_Locations.slice()
          });
  
          var endEvent = attachEvent(actions.end, document.documentElement, eventEnd, {
              handleNumbers: data.handleNumbers
          });
  
          var outEvent = attachEvent("mouseout", document.documentElement, documentLeave, {
              handleNumbers: data.handleNumbers
          });
  
          document.documentElement.noUiListeners = moveEvent.concat(endEvent, outEvent);
  
          // Text selection isn't an issue on touch devices,
          // so adding cursor styles can be skipped.
          if ( event.cursor ) {
  
              // Prevent the 'I' cursor and extend the range-drag cursor.
              document.body.style.cursor = getComputedStyle(event.target).cursor;
  
              // Mark the target with a dragging state.
              if ( scope_Handles.length > 1 ) {
                  addClass(scope_Target, options.cssClasses.drag);
              }
  
              var f = function(){
                  return false;
              };
  
              document.body.noUiListener = f;
  
              // Prevent text selection when dragging the handles.
              document.body.addEventListener('selectstart', f, false);
          }
  
          data.handleNumbers.forEach(function(handleNumber){
              fireEvent('start', handleNumber);
          });
      }
  
      // Move closest handle to tapped location.
      function eventTap ( event ) {
  
          // The tap event shouldn't propagate up
          event.stopPropagation();
  
          var proposal = calcPointToPercentage(event.calcPoint);
          var handleNumber = getClosestHandle(proposal);
  
          // Tackle the case that all handles are 'disabled'.
          if ( handleNumber === false ) {
              return false;
          }
  
          // Flag the slider as it is now in a transitional state.
          // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
          if ( !options.events.snap ) {
              addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
          }
  
          setHandle(handleNumber, proposal, true, true);
  
          setZindex();
  
          fireEvent('slide', handleNumber, true);
          fireEvent('set', handleNumber, true);
          fireEvent('change', handleNumber, true);
          fireEvent('update', handleNumber, true);
  
          if ( options.events.snap ) {
              eventStart(event, { handleNumbers: [handleNumber] });
          }
      }
  
      // Fires a 'hover' event for a hovered mouse/pen position.
      function eventHover ( event ) {
  
          var proposal = calcPointToPercentage(event.calcPoint);
  
          var to = scope_Spectrum.getStep(proposal);
          var value = scope_Spectrum.fromStepping(to);
  
          Object.keys(scope_Events).forEach(function( targetEvent ) {
              if ( 'hover' === targetEvent.split('.')[0] ) {
                  scope_Events[targetEvent].forEach(function( callback ) {
                      callback.call( scope_Self, value );
                  });
              }
          });
      }
  
      // Attach events to several slider parts.
      function bindSliderEvents ( behaviour ) {
  
          // Attach the standard drag event to the handles.
          if ( !behaviour.fixed ) {
  
              scope_Handles.forEach(function( handle, index ){
  
                  // These events are only bound to the visual handle
                  // element, not the 'real' origin element.
                  attachEvent ( actions.start, handle.children[0], eventStart, {
                      handleNumbers: [index]
                  });
              });
          }
  
          // Attach the tap event to the slider base.
          if ( behaviour.tap ) {
              attachEvent (actions.start, scope_Base, eventTap, {});
          }
  
          // Fire hover events
          if ( behaviour.hover ) {
              attachEvent (actions.move, scope_Base, eventHover, { hover: true });
          }
  
          // Make the range draggable.
          if ( behaviour.drag ){
  
              scope_Connects.forEach(function( connect, index ){
  
                  if ( connect === false || index === 0 || index === scope_Connects.length - 1 ) {
                      return;
                  }
  
                  var handleBefore = scope_Handles[index - 1];
                  var handleAfter = scope_Handles[index];
                  var eventHolders = [connect];
  
                  addClass(connect, options.cssClasses.draggable);
  
                  // When the range is fixed, the entire range can
                  // be dragged by the handles. The handle in the first
                  // origin will propagate the start event upward,
                  // but it needs to be bound manually on the other.
                  if ( behaviour.fixed ) {
                      eventHolders.push(handleBefore.children[0]);
                      eventHolders.push(handleAfter.children[0]);
                  }
  
                  eventHolders.forEach(function( eventHolder ) {
                      attachEvent ( actions.start, eventHolder, eventStart, {
                          handles: [handleBefore, handleAfter],
                          handleNumbers: [index - 1, index]
                      });
                  });
              });
          }
      }
  
  
      // Split out the handle positioning logic so the Move event can use it, too
      function checkHandlePosition ( reference, handleNumber, to, lookBackward, lookForward ) {
  
          // For sliders with multiple handles, limit movement to the other handle.
          // Apply the margin option by adding it to the handle positions.
          if ( scope_Handles.length > 1 ) {
  
              if ( lookBackward && handleNumber > 0 ) {
                  to = Math.max(to, reference[handleNumber - 1] + options.margin);
              }
  
              if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
                  to = Math.min(to, reference[handleNumber + 1] - options.margin);
              }
          }
  
          // The limit option has the opposite effect, limiting handles to a
          // maximum distance from another. Limit must be > 0, as otherwise
          // handles would be unmoveable.
          if ( scope_Handles.length > 1 && options.limit ) {
  
              if ( lookBackward && handleNumber > 0 ) {
                  to = Math.min(to, reference[handleNumber - 1] + options.limit);
              }
  
              if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
                  to = Math.max(to, reference[handleNumber + 1] - options.limit);
              }
          }
  
          // The padding option keeps the handles a certain distance from the
          // edges of the slider. Padding must be > 0.
          if ( options.padding ) {
  
              if ( handleNumber === 0 ) {
                  to = Math.max(to, options.padding);
              }
  
              if ( handleNumber === scope_Handles.length - 1 ) {
                  to = Math.min(to, 100 - options.padding);
              }
          }
  
          to = scope_Spectrum.getStep(to);
  
          // Limit percentage to the 0 - 100 range
          to = limit(to);
  
          // Return false if handle can't move
          if ( to === reference[handleNumber] ) {
              return false;
          }
  
          return to;
      }
  
      function toPct ( pct ) {
          return pct + '%';
      }
  
      // Updates scope_Locations and scope_Values, updates visual state
      function updateHandlePosition ( handleNumber, to ) {
  
          // Update locations.
          scope_Locations[handleNumber] = to;
  
          // Convert the value to the slider stepping/range.
          scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
  
          // Called synchronously or on the next animationFrame
          var stateUpdate = function() {
              scope_Handles[handleNumber].style[options.style] = toPct(to);
              updateConnect(handleNumber);
              updateConnect(handleNumber + 1);
          };
  
          // Set the handle to the new position.
          // Use requestAnimationFrame for efficient painting.
          // No significant effect in Chrome, Edge sees dramatic performace improvements.
          // Option to disable is useful for unit tests, and single-step debugging.
          if ( window.requestAnimationFrame && options.useRequestAnimationFrame ) {
              window.requestAnimationFrame(stateUpdate);
          } else {
              stateUpdate();
          }
      }
  
      function setZindex ( ) {
  
          scope_HandleNumbers.forEach(function(handleNumber){
              // Handles before the slider middle are stacked later = higher,
              // Handles after the middle later is lower
              // [[7] [8] .......... | .......... [5] [4]
              var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
              var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
              scope_Handles[handleNumber].childNodes[0].style.zIndex = zIndex;
          });
      }
  
      // Test suggested values and apply margin, step.
      function setHandle ( handleNumber, to, lookBackward, lookForward ) {
  
          to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward);
  
          if ( to === false ) {
              return false;
          }
  
          updateHandlePosition(handleNumber, to);
  
          return true;
      }
  
      // Updates style attribute for connect nodes
      function updateConnect ( index ) {
  
          // Skip connects set to false
          if ( !scope_Connects[index] ) {
              return;
          }
  
          var l = 0;
          var h = 100;
  
          if ( index !== 0 ) {
              l = scope_Locations[index - 1];
          }
  
          if ( index !== scope_Connects.length - 1 ) {
              h = scope_Locations[index];
          }
  
          scope_Connects[index].style[options.style] = toPct(l);
          scope_Connects[index].style[options.styleOposite] = toPct(100 - h);
      }
  
      // ...
      function setValue ( to, handleNumber ) {
  
          // Setting with null indicates an 'ignore'.
          // Inputting 'false' is invalid.
          if ( to === null || to === false ) {
              return;
          }
  
          // If a formatted number was passed, attemt to decode it.
          if ( typeof to === 'number' ) {
              to = String(to);
          }
  
          to = options.format.from(to);
  
          // Request an update for all links if the value was invalid.
          // Do so too if setting the handle fails.
          if ( to !== false && !isNaN(to) ) {
              setHandle(handleNumber, scope_Spectrum.toStepping(to), false, false);
          }
      }
  
      // Set the slider value.
      function valueSet ( input, fireSetEvent ) {
  
          var values = asArray(input);
          var isInit = scope_Locations[0] === undefined;
  
          // Event fires by default
          fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);
  
          values.forEach(setValue);
  
          // Animation is optional.
          // Make sure the initial values were set before using animated placement.
          if ( options.animate && !isInit ) {
              addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
          }
  
          // Now that all base values are set, apply constraints
          scope_HandleNumbers.forEach(function(handleNumber){
              setHandle(handleNumber, scope_Locations[handleNumber], true, false);
          });
  
          setZindex();
  
          scope_HandleNumbers.forEach(function(handleNumber){
  
              fireEvent('update', handleNumber);
  
              // Fire the event only for handles that received a new value, as per #579
              if ( values[handleNumber] !== null && fireSetEvent ) {
                  fireEvent('set', handleNumber);
              }
          });
      }
  
      // Reset slider to initial values
      function valueReset ( fireSetEvent ) {
          valueSet(options.start, fireSetEvent);
      }
  
      // Get the slider value.
      function valueGet ( ) {
  
          var values = scope_Values.map(options.format.to);
  
          // If only one handle is used, return a single value.
          if ( values.length === 1 ){
              return values[0];
          }
  
          return values;
      }
  
      // Removes classes from the root and empties it.
      function destroy ( ) {
  
          for ( var key in options.cssClasses ) {
              if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
              removeClass(scope_Target, options.cssClasses[key]);
          }
  
          while (scope_Target.firstChild) {
              scope_Target.removeChild(scope_Target.firstChild);
          }
  
          delete scope_Target.noUiSlider;
      }
  
      // Get the current step size for the slider.
      function getCurrentStep ( ) {
  
          // Check all locations, map them to their stepping point.
          // Get the step point, then find it in the input list.
          return scope_Locations.map(function( location, index ){
  
              var nearbySteps = scope_Spectrum.getNearbySteps( location );
              var value = scope_Values[index];
              var increment = nearbySteps.thisStep.step;
              var decrement = null;
  
              // If the next value in this step moves into the next step,
              // the increment is the start of the next step - the current value
              if ( increment !== false ) {
                  if ( value + increment > nearbySteps.stepAfter.startValue ) {
                      increment = nearbySteps.stepAfter.startValue - value;
                  }
              }
  
  
              // If the value is beyond the starting point
              if ( value > nearbySteps.thisStep.startValue ) {
                  decrement = nearbySteps.thisStep.step;
              }
  
              else if ( nearbySteps.stepBefore.step === false ) {
                  decrement = false;
              }
  
              // If a handle is at the start of a step, it always steps back into the previous step first
              else {
                  decrement = value - nearbySteps.stepBefore.highestStep;
              }
  
  
              // Now, if at the slider edges, there is not in/decrement
              if ( location === 100 ) {
                  increment = null;
              }
  
              else if ( location === 0 ) {
                  decrement = null;
              }
  
              // As per #391, the comparison for the decrement step can have some rounding issues.
              var stepDecimals = scope_Spectrum.countStepDecimals();
  
              // Round per #391
              if ( increment !== null && increment !== false ) {
                  increment = Number(increment.toFixed(stepDecimals));
              }
  
              if ( decrement !== null && decrement !== false ) {
                  decrement = Number(decrement.toFixed(stepDecimals));
              }
  
              return [decrement, increment];
          });
      }
  
      // Attach an event to this slider, possibly including a namespace
      function bindEvent ( namespacedEvent, callback ) {
          scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
          scope_Events[namespacedEvent].push(callback);
  
          // If the event bound is 'update,' fire it immediately for all handles.
          if ( namespacedEvent.split('.')[0] === 'update' ) {
              scope_Handles.forEach(function(a, index){
                  fireEvent('update', index);
              });
          }
      }
  
      // Undo attachment of event
      function removeEvent ( namespacedEvent ) {
  
          var event = namespacedEvent && namespacedEvent.split('.')[0];
          var namespace = event && namespacedEvent.substring(event.length);
  
          Object.keys(scope_Events).forEach(function( bind ){
  
              var tEvent = bind.split('.')[0],
                  tNamespace = bind.substring(tEvent.length);
  
              if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
                  delete scope_Events[bind];
              }
          });
      }
  
      // Updateable: margin, limit, padding, step, range, animate, snap
      function updateOptions ( optionsToUpdate, fireSetEvent ) {
  
          // Spectrum is created using the range, snap, direction and step options.
          // 'snap' and 'step' can be updated, 'direction' cannot, due to event binding.
          // If 'snap' and 'step' are not passed, they should remain unchanged.
          var v = valueGet();
  
          var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];
  
          // Only change options that we're actually passed to update.
          updateAble.forEach(function(name){
              if ( optionsToUpdate[name] !== undefined ) {
                  originalOptions[name] = optionsToUpdate[name];
              }
          });
  
          var newOptions = testOptions(originalOptions);
  
          // Load new options into the slider state
          updateAble.forEach(function(name){
              if ( optionsToUpdate[name] !== undefined ) {
                  options[name] = newOptions[name];
              }
          });
  
          // Save current spectrum direction as testOptions in testRange call
          // doesn't rely on current direction
          newOptions.spectrum.direction = scope_Spectrum.direction;
          scope_Spectrum = newOptions.spectrum;
  
          // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
          options.margin = newOptions.margin;
          options.limit = newOptions.limit;
          options.padding = newOptions.padding;
  
          // Invalidate the current positioning so valueSet forces an update.
          scope_Locations = [];
          valueSet(optionsToUpdate.start || v, fireSetEvent);
      }
  
      // Throw an error if the slider was already initialized.
      if ( scope_Target.noUiSlider ) {
          //throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
      }
      else
      {
  
      // Create the base element, initialise HTML and set classes.
      // Add handles and connect elements.
      addSlider(scope_Target);
      addElements(options.connect, scope_Base);
  
      scope_Self = {
          destroy: destroy,
          steps: getCurrentStep,
          on: bindEvent,
          off: removeEvent,
          get: valueGet,
          set: valueSet,
          reset: valueReset,
          // Exposed for unit testing, don't use this in your application.
          __moveHandles: function(a, b, c) { moveHandles(a, b, scope_Locations, c); },
          options: originalOptions, // Issue #600, #678
          updateOptions: updateOptions,
          target: scope_Target, // Issue #597
          pips: pips // Issue #594
      };
  
      // Attach user events.
      bindSliderEvents(options.events);
  
      // Use the public value method to set the start values.
      valueSet(options.start);
  
      if ( options.pips ) {
          pips(options.pips);
      }
  
      if ( options.tooltips ) {
          tooltips();
      }
  
      }
      return scope_Self;
  
  }
  
  
      // Run the standard initializer
      function initialize ( target, originalOptions ) {
  
          if ( !target.nodeName ) {
              throw new Error("noUiSlider (" + VERSION + "): create requires a single element.");
          }
  
          // Test the options and create the slider environment;
          var options = testOptions( originalOptions, target );
          var api = closure( target, options, originalOptions );
  
          target.noUiSlider = api;
  
          return api;
      }
  
      // Use an object instead of a function for future expansibility;
      return {
          version: VERSION,
          create: initialize
      };
  
  }));
  (function (factory) {
  
      if ( typeof define === 'function' && define.amd ) {
  
          // AMD. Register as an anonymous module.
          define([], factory);
  
      } else if ( typeof exports === 'object' ) {
  
          // Node/CommonJS
          module.exports = factory();
  
      } else {
  
          // Browser globals
          window.wNumb = factory();
      }
  
  }(function(){
  
      'use strict';
  
  var FormatOptions = [
      'decimals',
      'thousand',
      'mark',
      'prefix',
      'suffix',
      'encoder',
      'decoder',
      'negativeBefore',
      'negative',
      'edit',
      'undo'
  ];
  
  // General
  
      // Reverse a string
      function strReverse ( a ) {
          return a.split('').reverse().join('');
      }
  
      // Check if a string starts with a specified prefix.
      function strStartsWith ( input, match ) {
          return input.substring(0, match.length) === match;
      }
  
      // Check is a string ends in a specified suffix.
      function strEndsWith ( input, match ) {
          return input.slice(-1 * match.length) === match;
      }
  
      // Throw an error if formatting options are incompatible.
      function throwEqualError( F, a, b ) {
          if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
              throw new Error(a);
          }
      }
  
      // Check if a number is finite and not NaN
      function isValidNumber ( input ) {
          return typeof input === 'number' && isFinite( input );
      }
  
      // Provide rounding-accurate toFixed method.
      // Borrowed: http://stackoverflow.com/a/21323330/775265
      function toFixed ( value, exp ) {
          value = value.toString().split('e');
          value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
          value = value.toString().split('e');
          return (+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp))).toFixed(exp);
      }
  
  
  // Formatting
  
      // Accept a number as input, output formatted string.
      function formatTo ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {
  
          var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';
  
          // Apply user encoder to the input.
          // Expected outcome: number.
          if ( encoder ) {
              input = encoder(input);
          }
  
          // Stop if no valid number was provided, the number is infinite or NaN.
          if ( !isValidNumber(input) ) {
              return false;
          }
  
          // Rounding away decimals might cause a value of -0
          // when using very small ranges. Remove those cases.
          if ( decimals !== false && parseFloat(input.toFixed(decimals)) === 0 ) {
              input = 0;
          }
  
          // Formatting is done on absolute numbers,
          // decorated by an optional negative symbol.
          if ( input < 0 ) {
              inputIsNegative = true;
              input = Math.abs(input);
          }
  
          // Reduce the number of decimals to the specified option.
          if ( decimals !== false ) {
              input = toFixed( input, decimals );
          }
  
          // Transform the number into a string, so it can be split.
          input = input.toString();
  
          // Break the number on the decimal separator.
          if ( input.indexOf('.') !== -1 ) {
              inputPieces = input.split('.');
  
              inputBase = inputPieces[0];
  
              if ( mark ) {
                  inputDecimals = mark + inputPieces[1];
              }
  
          } else {
  
          // If it isn't split, the entire number will do.
              inputBase = input;
          }
  
          // Group numbers in sets of three.
          if ( thousand ) {
              inputBase = strReverse(inputBase).match(/.{1,3}/g);
              inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
          }
  
          // If the number is negative, prefix with negation symbol.
          if ( inputIsNegative && negativeBefore ) {
              output += negativeBefore;
          }
  
          // Prefix the number
          if ( prefix ) {
              output += prefix;
          }
  
          // Normal negative option comes after the prefix. Defaults to '-'.
          if ( inputIsNegative && negative ) {
              output += negative;
          }
  
          // Append the actual number.
          output += inputBase;
          output += inputDecimals;
  
          // Apply the suffix.
          if ( suffix ) {
              output += suffix;
          }
  
          // Run the output through a user-specified post-formatter.
          if ( edit ) {
              output = edit ( output, originalInput );
          }
  
          // All done.
          return output;
      }
  
      // Accept a sting as input, output decoded number.
      function formatFrom ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {
  
          var originalInput = input, inputIsNegative, output = '';
  
          // User defined pre-decoder. Result must be a non empty string.
          if ( undo ) {
              input = undo(input);
          }
  
          // Test the input. Can't be empty.
          if ( !input || typeof input !== 'string' ) {
              return false;
          }
  
          // If the string starts with the negativeBefore value: remove it.
          // Remember is was there, the number is negative.
          if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
              input = input.replace(negativeBefore, '');
              inputIsNegative = true;
          }
  
          // Repeat the same procedure for the prefix.
          if ( prefix && strStartsWith(input, prefix) ) {
              input = input.replace(prefix, '');
          }
  
          // And again for negative.
          if ( negative && strStartsWith(input, negative) ) {
              input = input.replace(negative, '');
              inputIsNegative = true;
          }
  
          // Remove the suffix.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
          if ( suffix && strEndsWith(input, suffix) ) {
              input = input.slice(0, -1 * suffix.length);
          }
  
          // Remove the thousand grouping.
          if ( thousand ) {
              input = input.split(thousand).join('');
          }
  
          // Set the decimal separator back to period.
          if ( mark ) {
              input = input.replace(mark, '.');
          }
  
          // Prepend the negative symbol.
          if ( inputIsNegative ) {
              output += '-';
          }
  
          // Add the number
          output += input;
  
          // Trim all non-numeric characters (allow '.' and '-');
          output = output.replace(/[^0-9\.\-.]/g, '');
  
          // The value contains no parse-able number.
          if ( output === '' ) {
              return false;
          }
  
          // Covert to number.
          output = Number(output);
  
          // Run the user-specified post-decoder.
          if ( decoder ) {
              output = decoder(output);
          }
  
          // Check is the output is valid, otherwise: return false.
          if ( !isValidNumber(output) ) {
              return false;
          }
  
          return output;
      }
  
  
  // Framework
  
      // Validate formatting options
      function validate ( inputOptions ) {
  
          var i, optionName, optionValue,
              filteredOptions = {};
  
          if ( inputOptions['suffix'] === undefined ) {
              inputOptions['suffix'] = inputOptions['postfix'];
          }
  
          for ( i = 0; i < FormatOptions.length; i+=1 ) {
  
              optionName = FormatOptions[i];
              optionValue = inputOptions[optionName];
  
              if ( optionValue === undefined ) {
  
                  // Only default if negativeBefore isn't set.
                  if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
                      filteredOptions[optionName] = '-';
                  // Don't set a default for mark when 'thousand' is set.
                  } else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
                      filteredOptions[optionName] = '.';
                  } else {
                      filteredOptions[optionName] = false;
                  }
  
              // Floating points in JS are stable up to 7 decimals.
              } else if ( optionName === 'decimals' ) {
                  if ( optionValue >= 0 && optionValue < 8 ) {
                      filteredOptions[optionName] = optionValue;
                  } else {
                      throw new Error(optionName);
                  }
  
              // These options, when provided, must be functions.
              } else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
                  if ( typeof optionValue === 'function' ) {
                      filteredOptions[optionName] = optionValue;
                  } else {
                      throw new Error(optionName);
                  }
  
              // Other options are strings.
              } else {
  
                  if ( typeof optionValue === 'string' ) {
                      filteredOptions[optionName] = optionValue;
                  } else {
                      throw new Error(optionName);
                  }
              }
          }
  
          // Some values can't be extracted from a
          // string if certain combinations are present.
          throwEqualError(filteredOptions, 'mark', 'thousand');
          throwEqualError(filteredOptions, 'prefix', 'negative');
          throwEqualError(filteredOptions, 'prefix', 'negativeBefore');
  
          return filteredOptions;
      }
  
      // Pass all options as function arguments
      function passAll ( options, method, input ) {
          var i, args = [];
  
          // Add all options in order of FormatOptions
          for ( i = 0; i < FormatOptions.length; i+=1 ) {
              args.push(options[FormatOptions[i]]);
          }
  
          // Append the input, then call the method, presenting all
          // options as arguments.
          args.push(input);
          return method.apply('', args);
      }
  
      function wNumb ( options ) {
  
          if ( !(this instanceof wNumb) ) {
              return new wNumb ( options );
          }
  
          if ( typeof options !== "object" ) {
              return;
          }
  
          options = validate(options);
  
          // Call 'formatTo' with proper arguments.
          this.to = function ( input ) {
              return passAll(options, formatTo, input);
          };
  
          // Call 'formatFrom' with proper arguments.
          this.from = function ( input ) {
              return passAll(options, formatFrom, input);
          };
      }
  
      return wNumb;
  
  }));
  /*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
   * Licensed under the MIT License (LICENSE.txt).
   *
   * Version: 1.0.19
   *
   * Requires: jQuery >= 1.2.3
   */
  ;( function ( factory ) {
  if ( typeof define === 'function' && define.amd ) {
      // AMD. Register module depending on jQuery using requirejs define.
      define( ['jquery'], factory );
  } else {
      // No AMD.
      factory( jQuery );
  }
  }( function ( $ ){
    $.fn.addBack = $.fn.addBack || $.fn.andSelf;
  
    $.fn.extend({
  
      actual : function ( method, options ){
        // check if the jQuery method exist
        if( !this[ method ]){
          throw '$.actual => The jQuery method "' + method + '" you called does not exist';
        }
  
        var defaults = {
          absolute      : false,
          clone         : false,
          includeMargin : false,
          display       : 'block'
        };
  
        var configs = $.extend( defaults, options );
  
        var $target = this.eq( 0 );
        var fix, restore;
  
        if( configs.clone === true ){
          fix = function (){
            var style = 'position: absolute !important; top: -1000 !important; ';
  
            // this is useful with css3pie
            $target = $target.
              clone().
              attr( 'style', style ).
              appendTo( 'body' );
          };
  
          restore = function (){
            // remove DOM element after getting the width
            $target.remove();
          };
        }else{
          var tmp   = [];
          var style = '';
          var $hidden;
  
          fix = function (){
            // get all hidden parents
            $hidden = $target.parents().addBack().filter( ':hidden' );
            style   += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';
  
            if( configs.absolute === true ) style += 'position: absolute !important; ';
  
            // save the origin style props
            // set the hidden el css to be got the actual value later
            $hidden.each( function (){
              // Save original style. If no style was set, attr() returns undefined
              var $this     = $( this );
              var thisStyle = $this.attr( 'style' );
  
              tmp.push( thisStyle );
              // Retain as much of the original style as possible, if there is one
              $this.attr( 'style', thisStyle ? thisStyle + ';' + style : style );
            });
          };
  
          restore = function (){
            // restore origin style values
            $hidden.each( function ( i ){
              var $this = $( this );
              var _tmp  = tmp[ i ];
  
              if( _tmp === undefined ){
                $this.removeAttr( 'style' );
              }else{
                $this.attr( 'style', _tmp );
              }
            });
          };
        }
  
        fix();
        // get the actual value with user specific methed
        // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
        // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
        var actual = /(outer)/.test( method ) ?
          $target[ method ]( configs.includeMargin ) :
          $target[ method ]();
  
        restore();
        // IMPORTANT, this plugin only return the value of the first element
        return actual;
      }
    });
  }));
  /*! tooltipster v4.2.5 */!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){function b(a){this.$container,this.constraints=null,this.__$tooltip,this.__init(a)}function c(b,c){var d=!0;return a.each(b,function(a,e){return void 0===c[a]||b[a]!==c[a]?(d=!1,!1):void 0}),d}function d(b){var c=b.attr("id"),d=c?h.window.document.getElementById(c):null;return d?d===b[0]:a.contains(h.window.document.body,b[0])}function e(){if(!g)return!1;var a=g.document.body||g.document.documentElement,b=a.style,c="transition",d=["Moz","Webkit","Khtml","O","ms"];if("string"==typeof b[c])return!0;c=c.charAt(0).toUpperCase()+c.substr(1);for(var e=0;e<d.length;e++)if("string"==typeof b[d[e]+c])return!0;return!1}var f={animation:"fade",animationDuration:350,content:null,contentAsHTML:!1,contentCloning:!1,debug:!0,delay:300,delayTouch:[300,500],functionInit:null,functionBefore:null,functionReady:null,functionAfter:null,functionFormat:null,IEmin:6,interactive:!1,multiple:!1,parent:null,plugins:["sideTip"],repositionOnScroll:!1,restoration:"none",selfDestruction:!0,theme:[],timer:0,trackerInterval:500,trackOrigin:!1,trackTooltip:!1,trigger:"hover",triggerClose:{click:!1,mouseleave:!1,originClick:!1,scroll:!1,tap:!1,touchleave:!1},triggerOpen:{click:!1,mouseenter:!1,tap:!1,touchstart:!1},updateAnimation:"rotate",zIndex:9999999},g="undefined"!=typeof window?window:null,h={hasTouchCapability:!(!g||!("ontouchstart"in g||g.DocumentTouch&&g.document instanceof g.DocumentTouch||g.navigator.maxTouchPoints)),hasTransitions:e(),IE:!1,semVer:"4.2.5",window:g},i=function(){this.__$emitterPrivate=a({}),this.__$emitterPublic=a({}),this.__instancesLatestArr=[],this.__plugins={},this._env=h};i.prototype={__bridge:function(b,c,d){if(!c[d]){var e=function(){};e.prototype=b;var g=new e;g.__init&&g.__init(c),a.each(b,function(a,b){0!=a.indexOf("__")&&(c[a]?f.debug&&console.log("The "+a+" method of the "+d+" plugin conflicts with another plugin or native methods"):(c[a]=function(){return g[a].apply(g,Array.prototype.slice.apply(arguments))},c[a].bridged=g))}),c[d]=g}return this},__setWindow:function(a){return h.window=a,this},_getRuler:function(a){return new b(a)},_off:function(){return this.__$emitterPrivate.off.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_on:function(){return this.__$emitterPrivate.on.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_one:function(){return this.__$emitterPrivate.one.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_plugin:function(b){var c=this;if("string"==typeof b){var d=b,e=null;return d.indexOf(".")>0?e=c.__plugins[d]:a.each(c.__plugins,function(a,b){return b.name.substring(b.name.length-d.length-1)=="."+d?(e=b,!1):void 0}),e}if(b.name.indexOf(".")<0)throw new Error("Plugins must be namespaced");return c.__plugins[b.name]=b,b.core&&c.__bridge(b.core,c,b.name),this},_trigger:function(){var a=Array.prototype.slice.apply(arguments);return"string"==typeof a[0]&&(a[0]={type:a[0]}),this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate,a),this.__$emitterPublic.trigger.apply(this.__$emitterPublic,a),this},instances:function(b){var c=[],d=b||".tooltipstered";return a(d).each(function(){var b=a(this),d=b.data("tooltipster-ns");d&&a.each(d,function(a,d){c.push(b.data(d))})}),c},instancesLatest:function(){return this.__instancesLatestArr},off:function(){return this.__$emitterPublic.off.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},on:function(){return this.__$emitterPublic.on.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},one:function(){return this.__$emitterPublic.one.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},origins:function(b){var c=b?b+" ":"";return a(c+".tooltipstered").toArray()},setDefaults:function(b){return a.extend(f,b),this},triggerHandler:function(){return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this}},a.tooltipster=new i,a.Tooltipster=function(b,c){this.__callbacks={close:[],open:[]},this.__closingTime,this.__Content,this.__contentBcr,this.__destroyed=!1,this.__$emitterPrivate=a({}),this.__$emitterPublic=a({}),this.__enabled=!0,this.__garbageCollector,this.__Geometry,this.__lastPosition,this.__namespace="tooltipster-"+Math.round(1e6*Math.random()),this.__options,this.__$originParents,this.__pointerIsOverOrigin=!1,this.__previousThemes=[],this.__state="closed",this.__timeouts={close:[],open:null},this.__touchEvents=[],this.__tracker=null,this._$origin,this._$tooltip,this.__init(b,c)},a.Tooltipster.prototype={__init:function(b,c){var d=this;if(d._$origin=a(b),d.__options=a.extend(!0,{},f,c),d.__optionsFormat(),!h.IE||h.IE>=d.__options.IEmin){var e=null;if(void 0===d._$origin.data("tooltipster-initialTitle")&&(e=d._$origin.attr("title"),void 0===e&&(e=null),d._$origin.data("tooltipster-initialTitle",e)),null!==d.__options.content)d.__contentSet(d.__options.content);else{var g,i=d._$origin.attr("data-tooltip-content");i&&(g=a(i)),g&&g[0]?d.__contentSet(g.first()):d.__contentSet(e)}d._$origin.removeAttr("title").addClass("tooltipstered"),d.__prepareOrigin(),d.__prepareGC(),a.each(d.__options.plugins,function(a,b){d._plug(b)}),h.hasTouchCapability&&a(h.window.document.body).on("touchmove."+d.__namespace+"-triggerOpen",function(a){d._touchRecordEvent(a)}),d._on("created",function(){d.__prepareTooltip()})._on("repositioned",function(a){d.__lastPosition=a.position})}else d.__options.disabled=!0},__contentInsert:function(){var a=this,b=a._$tooltip.find(".tooltipster-content"),c=a.__Content,d=function(a){c=a};return a._trigger({type:"format",content:a.__Content,format:d}),a.__options.functionFormat&&(c=a.__options.functionFormat.call(a,a,{origin:a._$origin[0]},a.__Content)),"string"!=typeof c||a.__options.contentAsHTML?b.empty().append(c):b.text(c),a},__contentSet:function(b){return b instanceof a&&this.__options.contentCloning&&(b=b.clone(!0)),this.__Content=b,this._trigger({type:"updated",content:b}),this},__destroyError:function(){throw new Error("This tooltip has been destroyed and cannot execute your method call.")},__geometry:function(){var b=this,c=b._$origin,d=b._$origin.is("area");if(d){var e=b._$origin.parent().attr("name");c=a('img[usemap="#'+e+'"]')}var f=c[0].getBoundingClientRect(),g=a(h.window.document),i=a(h.window),j=c,k={available:{document:null,window:null},document:{size:{height:g.height(),width:g.width()}},window:{scroll:{left:h.window.scrollX||h.window.document.documentElement.scrollLeft,top:h.window.scrollY||h.window.document.documentElement.scrollTop},size:{height:i.height(),width:i.width()}},origin:{fixedLineage:!1,offset:{},size:{height:f.bottom-f.top,width:f.right-f.left},usemapImage:d?c[0]:null,windowOffset:{bottom:f.bottom,left:f.left,right:f.right,top:f.top}}};if(d){var l=b._$origin.attr("shape"),m=b._$origin.attr("coords");if(m&&(m=m.split(","),a.map(m,function(a,b){m[b]=parseInt(a)})),"default"!=l)switch(l){case"circle":var n=m[0],o=m[1],p=m[2],q=o-p,r=n-p;k.origin.size.height=2*p,k.origin.size.width=k.origin.size.height,k.origin.windowOffset.left+=r,k.origin.windowOffset.top+=q;break;case"rect":var s=m[0],t=m[1],u=m[2],v=m[3];k.origin.size.height=v-t,k.origin.size.width=u-s,k.origin.windowOffset.left+=s,k.origin.windowOffset.top+=t;break;case"poly":for(var w=0,x=0,y=0,z=0,A="even",B=0;B<m.length;B++){var C=m[B];"even"==A?(C>y&&(y=C,0===B&&(w=y)),w>C&&(w=C),A="odd"):(C>z&&(z=C,1==B&&(x=z)),x>C&&(x=C),A="even")}k.origin.size.height=z-x,k.origin.size.width=y-w,k.origin.windowOffset.left+=w,k.origin.windowOffset.top+=x}}var D=function(a){k.origin.size.height=a.height,k.origin.windowOffset.left=a.left,k.origin.windowOffset.top=a.top,k.origin.size.width=a.width};for(b._trigger({type:"geometry",edit:D,geometry:{height:k.origin.size.height,left:k.origin.windowOffset.left,top:k.origin.windowOffset.top,width:k.origin.size.width}}),k.origin.windowOffset.right=k.origin.windowOffset.left+k.origin.size.width,k.origin.windowOffset.bottom=k.origin.windowOffset.top+k.origin.size.height,k.origin.offset.left=k.origin.windowOffset.left+k.window.scroll.left,k.origin.offset.top=k.origin.windowOffset.top+k.window.scroll.top,k.origin.offset.bottom=k.origin.offset.top+k.origin.size.height,k.origin.offset.right=k.origin.offset.left+k.origin.size.width,k.available.document={bottom:{height:k.document.size.height-k.origin.offset.bottom,width:k.document.size.width},left:{height:k.document.size.height,width:k.origin.offset.left},right:{height:k.document.size.height,width:k.document.size.width-k.origin.offset.right},top:{height:k.origin.offset.top,width:k.document.size.width}},k.available.window={bottom:{height:Math.max(k.window.size.height-Math.max(k.origin.windowOffset.bottom,0),0),width:k.window.size.width},left:{height:k.window.size.height,width:Math.max(k.origin.windowOffset.left,0)},right:{height:k.window.size.height,width:Math.max(k.window.size.width-Math.max(k.origin.windowOffset.right,0),0)},top:{height:Math.max(k.origin.windowOffset.top,0),width:k.window.size.width}};"html"!=j[0].tagName.toLowerCase();){if("fixed"==j.css("position")){k.origin.fixedLineage=!0;break}j=j.parent()}return k},__optionsFormat:function(){return"number"==typeof this.__options.animationDuration&&(this.__options.animationDuration=[this.__options.animationDuration,this.__options.animationDuration]),"number"==typeof this.__options.delay&&(this.__options.delay=[this.__options.delay,this.__options.delay]),"number"==typeof this.__options.delayTouch&&(this.__options.delayTouch=[this.__options.delayTouch,this.__options.delayTouch]),"string"==typeof this.__options.theme&&(this.__options.theme=[this.__options.theme]),null===this.__options.parent?this.__options.parent=a(h.window.document.body):"string"==typeof this.__options.parent&&(this.__options.parent=a(this.__options.parent)),"hover"==this.__options.trigger?(this.__options.triggerOpen={mouseenter:!0,touchstart:!0},this.__options.triggerClose={mouseleave:!0,originClick:!0,touchleave:!0}):"click"==this.__options.trigger&&(this.__options.triggerOpen={click:!0,tap:!0},this.__options.triggerClose={click:!0,tap:!0}),this._trigger("options"),this},__prepareGC:function(){var b=this;return b.__options.selfDestruction?b.__garbageCollector=setInterval(function(){var c=(new Date).getTime();b.__touchEvents=a.grep(b.__touchEvents,function(a,b){return c-a.time>6e4}),d(b._$origin)||b.close(function(){b.destroy()})},2e4):clearInterval(b.__garbageCollector),b},__prepareOrigin:function(){var a=this;if(a._$origin.off("."+a.__namespace+"-triggerOpen"),h.hasTouchCapability&&a._$origin.on("touchstart."+a.__namespace+"-triggerOpen touchend."+a.__namespace+"-triggerOpen touchcancel."+a.__namespace+"-triggerOpen",function(b){a._touchRecordEvent(b)}),a.__options.triggerOpen.click||a.__options.triggerOpen.tap&&h.hasTouchCapability){var b="";a.__options.triggerOpen.click&&(b+="click."+a.__namespace+"-triggerOpen "),a.__options.triggerOpen.tap&&h.hasTouchCapability&&(b+="touchend."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){a._touchIsMeaningfulEvent(b)&&a._open(b)})}if(a.__options.triggerOpen.mouseenter||a.__options.triggerOpen.touchstart&&h.hasTouchCapability){var b="";a.__options.triggerOpen.mouseenter&&(b+="mouseenter."+a.__namespace+"-triggerOpen "),a.__options.triggerOpen.touchstart&&h.hasTouchCapability&&(b+="touchstart."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){!a._touchIsTouchEvent(b)&&a._touchIsEmulatedEvent(b)||(a.__pointerIsOverOrigin=!0,a._openShortly(b))})}if(a.__options.triggerClose.mouseleave||a.__options.triggerClose.touchleave&&h.hasTouchCapability){var b="";a.__options.triggerClose.mouseleave&&(b+="mouseleave."+a.__namespace+"-triggerOpen "),a.__options.triggerClose.touchleave&&h.hasTouchCapability&&(b+="touchend."+a.__namespace+"-triggerOpen touchcancel."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){a._touchIsMeaningfulEvent(b)&&(a.__pointerIsOverOrigin=!1)})}return a},__prepareTooltip:function(){var b=this,c=b.__options.interactive?"auto":"";return b._$tooltip.attr("id",b.__namespace).css({"pointer-events":c,zIndex:b.__options.zIndex}),a.each(b.__previousThemes,function(a,c){b._$tooltip.removeClass(c)}),a.each(b.__options.theme,function(a,c){b._$tooltip.addClass(c)}),b.__previousThemes=a.merge([],b.__options.theme),b},__scrollHandler:function(b){var c=this;if(c.__options.triggerClose.scroll)c._close(b);else if(d(c._$origin)&&d(c._$tooltip)){var e=null;if(b.target===h.window.document)c.__Geometry.origin.fixedLineage||c.__options.repositionOnScroll&&c.reposition(b);else{e=c.__geometry();var f=!1;if("fixed"!=c._$origin.css("position")&&c.__$originParents.each(function(b,c){var d=a(c),g=d.css("overflow-x"),h=d.css("overflow-y");if("visible"!=g||"visible"!=h){var i=c.getBoundingClientRect();if("visible"!=g&&(e.origin.windowOffset.left<i.left||e.origin.windowOffset.right>i.right))return f=!0,!1;if("visible"!=h&&(e.origin.windowOffset.top<i.top||e.origin.windowOffset.bottom>i.bottom))return f=!0,!1}return"fixed"==d.css("position")?!1:void 0}),f)c._$tooltip.css("visibility","hidden");else if(c._$tooltip.css("visibility","visible"),c.__options.repositionOnScroll)c.reposition(b);else{var g=e.origin.offset.left-c.__Geometry.origin.offset.left,i=e.origin.offset.top-c.__Geometry.origin.offset.top;c._$tooltip.css({left:c.__lastPosition.coord.left+g,top:c.__lastPosition.coord.top+i})}}c._trigger({type:"scroll",event:b,geo:e})}return c},__stateSet:function(a){return this.__state=a,this._trigger({type:"state",state:a}),this},__timeoutsClear:function(){return clearTimeout(this.__timeouts.open),this.__timeouts.open=null,a.each(this.__timeouts.close,function(a,b){clearTimeout(b)}),this.__timeouts.close=[],this},__trackerStart:function(){var a=this,b=a._$tooltip.find(".tooltipster-content");return a.__options.trackTooltip&&(a.__contentBcr=b[0].getBoundingClientRect()),a.__tracker=setInterval(function(){if(d(a._$origin)&&d(a._$tooltip)){if(a.__options.trackOrigin){var e=a.__geometry(),f=!1;c(e.origin.size,a.__Geometry.origin.size)&&(a.__Geometry.origin.fixedLineage?c(e.origin.windowOffset,a.__Geometry.origin.windowOffset)&&(f=!0):c(e.origin.offset,a.__Geometry.origin.offset)&&(f=!0)),f||(a.__options.triggerClose.mouseleave?a._close():a.reposition())}if(a.__options.trackTooltip){var g=b[0].getBoundingClientRect();g.height===a.__contentBcr.height&&g.width===a.__contentBcr.width||(a.reposition(),a.__contentBcr=g)}}else a._close()},a.__options.trackerInterval),a},_close:function(b,c,d){var e=this,f=!0;if(e._trigger({type:"close",event:b,stop:function(){f=!1}}),f||d){c&&e.__callbacks.close.push(c),e.__callbacks.open=[],e.__timeoutsClear();var g=function(){a.each(e.__callbacks.close,function(a,c){c.call(e,e,{event:b,origin:e._$origin[0]})}),e.__callbacks.close=[]};if("closed"!=e.__state){var i=!0,j=new Date,k=j.getTime(),l=k+e.__options.animationDuration[1];if("disappearing"==e.__state&&l>e.__closingTime&&e.__options.animationDuration[1]>0&&(i=!1),i){e.__closingTime=l,"disappearing"!=e.__state&&e.__stateSet("disappearing");var m=function(){clearInterval(e.__tracker),e._trigger({type:"closing",event:b}),e._$tooltip.off("."+e.__namespace+"-triggerClose").removeClass("tooltipster-dying"),a(h.window).off("."+e.__namespace+"-triggerClose"),e.__$originParents.each(function(b,c){a(c).off("scroll."+e.__namespace+"-triggerClose")}),e.__$originParents=null,a(h.window.document.body).off("."+e.__namespace+"-triggerClose"),e._$origin.off("."+e.__namespace+"-triggerClose"),e._off("dismissable"),e.__stateSet("closed"),e._trigger({type:"after",event:b}),e.__options.functionAfter&&e.__options.functionAfter.call(e,e,{event:b,origin:e._$origin[0]}),g()};h.hasTransitions?(e._$tooltip.css({"-moz-animation-duration":e.__options.animationDuration[1]+"ms","-ms-animation-duration":e.__options.animationDuration[1]+"ms","-o-animation-duration":e.__options.animationDuration[1]+"ms","-webkit-animation-duration":e.__options.animationDuration[1]+"ms","animation-duration":e.__options.animationDuration[1]+"ms","transition-duration":e.__options.animationDuration[1]+"ms"}),e._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"),e.__options.animationDuration[1]>0&&e._$tooltip.delay(e.__options.animationDuration[1]),e._$tooltip.queue(m)):e._$tooltip.stop().fadeOut(e.__options.animationDuration[1],m)}}else g()}return e},_off:function(){return this.__$emitterPrivate.off.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_on:function(){return this.__$emitterPrivate.on.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_one:function(){return this.__$emitterPrivate.one.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_open:function(b,c){var e=this;if(!e.__destroying&&d(e._$origin)&&e.__enabled){var f=!0;if("closed"==e.__state&&(e._trigger({type:"before",event:b,stop:function(){f=!1}}),f&&e.__options.functionBefore&&(f=e.__options.functionBefore.call(e,e,{event:b,origin:e._$origin[0]}))),f!==!1&&null!==e.__Content){c&&e.__callbacks.open.push(c),e.__callbacks.close=[],e.__timeoutsClear();var g,i=function(){"stable"!=e.__state&&e.__stateSet("stable"),a.each(e.__callbacks.open,function(a,b){b.call(e,e,{origin:e._$origin[0],tooltip:e._$tooltip[0]})}),e.__callbacks.open=[]};if("closed"!==e.__state)g=0,"disappearing"===e.__state?(e.__stateSet("appearing"),h.hasTransitions?(e._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"),e.__options.animationDuration[0]>0&&e._$tooltip.delay(e.__options.animationDuration[0]),e._$tooltip.queue(i)):e._$tooltip.stop().fadeIn(i)):"stable"==e.__state&&i();else{if(e.__stateSet("appearing"),g=e.__options.animationDuration[0],e.__contentInsert(),e.reposition(b,!0),h.hasTransitions?(e._$tooltip.addClass("tooltipster-"+e.__options.animation).addClass("tooltipster-initial").css({"-moz-animation-duration":e.__options.animationDuration[0]+"ms","-ms-animation-duration":e.__options.animationDuration[0]+"ms","-o-animation-duration":e.__options.animationDuration[0]+"ms","-webkit-animation-duration":e.__options.animationDuration[0]+"ms","animation-duration":e.__options.animationDuration[0]+"ms","transition-duration":e.__options.animationDuration[0]+"ms"}),setTimeout(function(){"closed"!=e.__state&&(e._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"),e.__options.animationDuration[0]>0&&e._$tooltip.delay(e.__options.animationDuration[0]),e._$tooltip.queue(i))},0)):e._$tooltip.css("display","none").fadeIn(e.__options.animationDuration[0],i),e.__trackerStart(),a(h.window).on("resize."+e.__namespace+"-triggerClose",function(b){var c=a(document.activeElement);(c.is("input")||c.is("textarea"))&&a.contains(e._$tooltip[0],c[0])||e.reposition(b)}).on("scroll."+e.__namespace+"-triggerClose",function(a){e.__scrollHandler(a)}),e.__$originParents=e._$origin.parents(),e.__$originParents.each(function(b,c){a(c).on("scroll."+e.__namespace+"-triggerClose",function(a){e.__scrollHandler(a)})}),e.__options.triggerClose.mouseleave||e.__options.triggerClose.touchleave&&h.hasTouchCapability){e._on("dismissable",function(a){a.dismissable?a.delay?(m=setTimeout(function(){e._close(a.event)},a.delay),e.__timeouts.close.push(m)):e._close(a):clearTimeout(m)});var j=e._$origin,k="",l="",m=null;e.__options.interactive&&(j=j.add(e._$tooltip)),e.__options.triggerClose.mouseleave&&(k+="mouseenter."+e.__namespace+"-triggerClose ",l+="mouseleave."+e.__namespace+"-triggerClose "),e.__options.triggerClose.touchleave&&h.hasTouchCapability&&(k+="touchstart."+e.__namespace+"-triggerClose",l+="touchend."+e.__namespace+"-triggerClose touchcancel."+e.__namespace+"-triggerClose"),j.on(l,function(a){if(e._touchIsTouchEvent(a)||!e._touchIsEmulatedEvent(a)){var b="mouseleave"==a.type?e.__options.delay:e.__options.delayTouch;e._trigger({delay:b[1],dismissable:!0,event:a,type:"dismissable"})}}).on(k,function(a){!e._touchIsTouchEvent(a)&&e._touchIsEmulatedEvent(a)||e._trigger({dismissable:!1,event:a,type:"dismissable"})})}e.__options.triggerClose.originClick&&e._$origin.on("click."+e.__namespace+"-triggerClose",function(a){e._touchIsTouchEvent(a)||e._touchIsEmulatedEvent(a)||e._close(a)}),(e.__options.triggerClose.click||e.__options.triggerClose.tap&&h.hasTouchCapability)&&setTimeout(function(){if("closed"!=e.__state){var b="",c=a(h.window.document.body);e.__options.triggerClose.click&&(b+="click."+e.__namespace+"-triggerClose "),e.__options.triggerClose.tap&&h.hasTouchCapability&&(b+="touchend."+e.__namespace+"-triggerClose"),c.on(b,function(b){e._touchIsMeaningfulEvent(b)&&(e._touchRecordEvent(b),e.__options.interactive&&a.contains(e._$tooltip[0],b.target)||e._close(b))}),e.__options.triggerClose.tap&&h.hasTouchCapability&&c.on("touchstart."+e.__namespace+"-triggerClose",function(a){e._touchRecordEvent(a)})}},0),e._trigger("ready"),e.__options.functionReady&&e.__options.functionReady.call(e,e,{origin:e._$origin[0],tooltip:e._$tooltip[0]})}if(e.__options.timer>0){var m=setTimeout(function(){e._close()},e.__options.timer+g);e.__timeouts.close.push(m)}}}return e},_openShortly:function(a){var b=this,c=!0;if("stable"!=b.__state&&"appearing"!=b.__state&&!b.__timeouts.open&&(b._trigger({type:"start",event:a,stop:function(){c=!1}}),c)){var d=0==a.type.indexOf("touch")?b.__options.delayTouch:b.__options.delay;d[0]?b.__timeouts.open=setTimeout(function(){b.__timeouts.open=null,b.__pointerIsOverOrigin&&b._touchIsMeaningfulEvent(a)?(b._trigger("startend"),b._open(a)):b._trigger("startcancel")},d[0]):(b._trigger("startend"),b._open(a))}return b},_optionsExtract:function(b,c){var d=this,e=a.extend(!0,{},c),f=d.__options[b];return f||(f={},a.each(c,function(a,b){var c=d.__options[a];void 0!==c&&(f[a]=c)})),a.each(e,function(b,c){void 0!==f[b]&&("object"!=typeof c||c instanceof Array||null==c||"object"!=typeof f[b]||f[b]instanceof Array||null==f[b]?e[b]=f[b]:a.extend(e[b],f[b]))}),e},_plug:function(b){var c=a.tooltipster._plugin(b);if(!c)throw new Error('The "'+b+'" plugin is not defined');return c.instance&&a.tooltipster.__bridge(c.instance,this,c.name),this},_touchIsEmulatedEvent:function(a){for(var b=!1,c=(new Date).getTime(),d=this.__touchEvents.length-1;d>=0;d--){var e=this.__touchEvents[d];if(!(c-e.time<500))break;e.target===a.target&&(b=!0)}return b},_touchIsMeaningfulEvent:function(a){return this._touchIsTouchEvent(a)&&!this._touchSwiped(a.target)||!this._touchIsTouchEvent(a)&&!this._touchIsEmulatedEvent(a)},_touchIsTouchEvent:function(a){return 0==a.type.indexOf("touch")},_touchRecordEvent:function(a){return this._touchIsTouchEvent(a)&&(a.time=(new Date).getTime(),this.__touchEvents.push(a)),this},_touchSwiped:function(a){for(var b=!1,c=this.__touchEvents.length-1;c>=0;c--){var d=this.__touchEvents[c];if("touchmove"==d.type){b=!0;break}if("touchstart"==d.type&&a===d.target)break}return b},_trigger:function(){var b=Array.prototype.slice.apply(arguments);return"string"==typeof b[0]&&(b[0]={type:b[0]}),b[0].instance=this,b[0].origin=this._$origin?this._$origin[0]:null,b[0].tooltip=this._$tooltip?this._$tooltip[0]:null,this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate,b),a.tooltipster._trigger.apply(a.tooltipster,b),this.__$emitterPublic.trigger.apply(this.__$emitterPublic,b),this},_unplug:function(b){var c=this;if(c[b]){var d=a.tooltipster._plugin(b);d.instance&&a.each(d.instance,function(a,d){c[a]&&c[a].bridged===c[b]&&delete c[a]}),c[b].__destroy&&c[b].__destroy(),delete c[b]}return c},close:function(a){return this.__destroyed?this.__destroyError():this._close(null,a),this},content:function(a){var b=this;if(void 0===a)return b.__Content;if(b.__destroyed)b.__destroyError();else if(b.__contentSet(a),null!==b.__Content){if("closed"!==b.__state&&(b.__contentInsert(),b.reposition(),b.__options.updateAnimation))if(h.hasTransitions){var c=b.__options.updateAnimation;b._$tooltip.addClass("tooltipster-update-"+c),setTimeout(function(){"closed"!=b.__state&&b._$tooltip.removeClass("tooltipster-update-"+c)},1e3)}else b._$tooltip.fadeTo(200,.5,function(){"closed"!=b.__state&&b._$tooltip.fadeTo(200,1)})}else b._close();return b},destroy:function(){var b=this;if(b.__destroyed)b.__destroyError();else{"closed"!=b.__state?b.option("animationDuration",0)._close(null,null,!0):b.__timeoutsClear(),b._trigger("destroy"),b.__destroyed=!0,b._$origin.removeData(b.__namespace).off("."+b.__namespace+"-triggerOpen"),a(h.window.document.body).off("."+b.__namespace+"-triggerOpen");var c=b._$origin.data("tooltipster-ns");if(c)if(1===c.length){var d=null;"previous"==b.__options.restoration?d=b._$origin.data("tooltipster-initialTitle"):"current"==b.__options.restoration&&(d="string"==typeof b.__Content?b.__Content:a("<div></div>").append(b.__Content).html()),d&&b._$origin.attr("title",d),b._$origin.removeClass("tooltipstered"),b._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else c=a.grep(c,function(a,c){return a!==b.__namespace}),b._$origin.data("tooltipster-ns",c);b._trigger("destroyed"),b._off(),b.off(),b.__Content=null,b.__$emitterPrivate=null,b.__$emitterPublic=null,b.__options.parent=null,b._$origin=null,b._$tooltip=null,a.tooltipster.__instancesLatestArr=a.grep(a.tooltipster.__instancesLatestArr,function(a,c){return b!==a}),clearInterval(b.__garbageCollector)}return b},disable:function(){return this.__destroyed?(this.__destroyError(),this):(this._close(),this.__enabled=!1,this)},elementOrigin:function(){return this.__destroyed?void this.__destroyError():this._$origin[0]},elementTooltip:function(){return this._$tooltip?this._$tooltip[0]:null},enable:function(){return this.__enabled=!0,this},hide:function(a){return this.close(a)},instance:function(){return this},off:function(){return this.__destroyed||this.__$emitterPublic.off.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},on:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.on.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},one:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.one.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},open:function(a){return this.__destroyed?this.__destroyError():this._open(null,a),this},option:function(b,c){return void 0===c?this.__options[b]:(this.__destroyed?this.__destroyError():(this.__options[b]=c,this.__optionsFormat(),a.inArray(b,["trigger","triggerClose","triggerOpen"])>=0&&this.__prepareOrigin(),"selfDestruction"===b&&this.__prepareGC()),this)},reposition:function(a,b){var c=this;return c.__destroyed?c.__destroyError():"closed"!=c.__state&&d(c._$origin)&&(b||d(c._$tooltip))&&(b||c._$tooltip.detach(),c.__Geometry=c.__geometry(),c._trigger({type:"reposition",event:a,helper:{geo:c.__Geometry}})),c},show:function(a){return this.open(a)},status:function(){return{destroyed:this.__destroyed,enabled:this.__enabled,open:"closed"!==this.__state,state:this.__state}},triggerHandler:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this}},a.fn.tooltipster=function(){var b=Array.prototype.slice.apply(arguments),c="You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";if(0===this.length)return this;if("string"==typeof b[0]){var d="#*$~&";return this.each(function(){var e=a(this).data("tooltipster-ns"),f=e?a(this).data(e[0]):null;if(!f)throw new Error("You called Tooltipster's \""+b[0]+'" method on an uninitialized element');if("function"!=typeof f[b[0]])throw new Error('Unknown method "'+b[0]+'"');this.length>1&&"content"==b[0]&&(b[1]instanceof a||"object"==typeof b[1]&&null!=b[1]&&b[1].tagName)&&!f.__options.contentCloning&&f.__options.debug&&console.log(c);var g=f[b[0]](b[1],b[2]);return g!==f||"instance"===b[0]?(d=g,!1):void 0}),"#*$~&"!==d?d:this}a.tooltipster.__instancesLatestArr=[];var e=b[0]&&void 0!==b[0].multiple,g=e&&b[0].multiple||!e&&f.multiple,h=b[0]&&void 0!==b[0].content,i=h&&b[0].content||!h&&f.content,j=b[0]&&void 0!==b[0].contentCloning,k=j&&b[0].contentCloning||!j&&f.contentCloning,l=b[0]&&void 0!==b[0].debug,m=l&&b[0].debug||!l&&f.debug;return this.length>1&&(i instanceof a||"object"==typeof i&&null!=i&&i.tagName)&&!k&&m&&console.log(c),this.each(function(){var c=!1,d=a(this),e=d.data("tooltipster-ns"),f=null;e?g?c=!0:m&&(console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."),console.log(this)):c=!0,c&&(f=new a.Tooltipster(this,b[0]),e||(e=[]),e.push(f.__namespace),d.data("tooltipster-ns",e),d.data(f.__namespace,f),f.__options.functionInit&&f.__options.functionInit.call(f,f,{origin:this}),f._trigger("init")),a.tooltipster.__instancesLatestArr.push(f)}),this},b.prototype={__init:function(b){this.__$tooltip=b,this.__$tooltip.css({left:0,overflow:"hidden",position:"absolute",top:0}).find(".tooltipster-content").css("overflow","auto"),this.$container=a('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(h.window.document.body)},__forceRedraw:function(){var a=this.__$tooltip.parent();this.__$tooltip.detach(),this.__$tooltip.appendTo(a)},constrain:function(a,b){return this.constraints={width:a,height:b},this.__$tooltip.css({display:"block",height:"",overflow:"auto",width:a}),this},destroy:function(){this.__$tooltip.detach().find(".tooltipster-content").css({display:"",overflow:""}),this.$container.remove()},free:function(){return this.constraints=null,this.__$tooltip.css({display:"",height:"",overflow:"visible",width:""}),this},measure:function(){this.__forceRedraw();var a=this.__$tooltip[0].getBoundingClientRect(),b={size:{height:a.height||a.bottom-a.top,width:a.width||a.right-a.left}};if(this.constraints){var c=this.__$tooltip.find(".tooltipster-content"),d=this.__$tooltip.outerHeight(),e=c[0].getBoundingClientRect(),f={height:d<=this.constraints.height,width:a.width<=this.constraints.width&&e.width>=c[0].scrollWidth-1};b.fits=f.height&&f.width}return h.IE&&h.IE<=11&&b.size.width!==h.window.document.documentElement.clientWidth&&(b.size.width=Math.ceil(b.size.width)+1),b}};var j=navigator.userAgent.toLowerCase();-1!=j.indexOf("msie")?h.IE=parseInt(j.split("msie")[1]):-1!==j.toLowerCase().indexOf("trident")&&-1!==j.indexOf(" rv:11")?h.IE=11:-1!=j.toLowerCase().indexOf("edge/")&&(h.IE=parseInt(j.toLowerCase().split("edge/")[1]));var k="tooltipster.sideTip";return a.tooltipster._plugin({name:k,instance:{__defaults:function(){return{arrow:!0,distance:6,functionPosition:null,maxWidth:null,minIntersection:16,minWidth:0,position:null,side:"top",viewportAware:!0}},__init:function(a){var b=this;b.__instance=a,b.__namespace="tooltipster-sideTip-"+Math.round(1e6*Math.random()),b.__previousState="closed",b.__options,b.__optionsFormat(),b.__instance._on("state."+b.__namespace,function(a){"closed"==a.state?b.__close():"appearing"==a.state&&"closed"==b.__previousState&&b.__create(),b.__previousState=a.state}),b.__instance._on("options."+b.__namespace,function(){b.__optionsFormat()}),b.__instance._on("reposition."+b.__namespace,function(a){b.__reposition(a.event,a.helper)})},__close:function(){this.__instance.content()instanceof a&&this.__instance.content().detach(),this.__instance._$tooltip.remove(),this.__instance._$tooltip=null},__create:function(){var b=a('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');this.__options.arrow||b.find(".tooltipster-box").css("margin",0).end().find(".tooltipster-arrow").hide(),this.__options.minWidth&&b.css("min-width",this.__options.minWidth+"px"),this.__options.maxWidth&&b.css("max-width",this.__options.maxWidth+"px"),
  this.__instance._$tooltip=b,this.__instance._trigger("created")},__destroy:function(){this.__instance._off("."+self.__namespace)},__optionsFormat:function(){var b=this;if(b.__options=b.__instance._optionsExtract(k,b.__defaults()),b.__options.position&&(b.__options.side=b.__options.position),"object"!=typeof b.__options.distance&&(b.__options.distance=[b.__options.distance]),b.__options.distance.length<4&&(void 0===b.__options.distance[1]&&(b.__options.distance[1]=b.__options.distance[0]),void 0===b.__options.distance[2]&&(b.__options.distance[2]=b.__options.distance[0]),void 0===b.__options.distance[3]&&(b.__options.distance[3]=b.__options.distance[1]),b.__options.distance={top:b.__options.distance[0],right:b.__options.distance[1],bottom:b.__options.distance[2],left:b.__options.distance[3]}),"string"==typeof b.__options.side){var c={top:"bottom",right:"left",bottom:"top",left:"right"};b.__options.side=[b.__options.side,c[b.__options.side]],"left"==b.__options.side[0]||"right"==b.__options.side[0]?b.__options.side.push("top","bottom"):b.__options.side.push("right","left")}6===a.tooltipster._env.IE&&b.__options.arrow!==!0&&(b.__options.arrow=!1)},__reposition:function(b,c){var d,e=this,f=e.__targetFind(c),g=[];e.__instance._$tooltip.detach();var h=e.__instance._$tooltip.clone(),i=a.tooltipster._getRuler(h),j=!1,k=e.__instance.option("animation");switch(k&&h.removeClass("tooltipster-"+k),a.each(["window","document"],function(d,k){var l=null;if(e.__instance._trigger({container:k,helper:c,satisfied:j,takeTest:function(a){l=a},results:g,type:"positionTest"}),1==l||0!=l&&0==j&&("window"!=k||e.__options.viewportAware))for(var d=0;d<e.__options.side.length;d++){var m={horizontal:0,vertical:0},n=e.__options.side[d];"top"==n||"bottom"==n?m.vertical=e.__options.distance[n]:m.horizontal=e.__options.distance[n],e.__sideChange(h,n),a.each(["natural","constrained"],function(a,d){if(l=null,e.__instance._trigger({container:k,event:b,helper:c,mode:d,results:g,satisfied:j,side:n,takeTest:function(a){l=a},type:"positionTest"}),1==l||0!=l&&0==j){var h={container:k,distance:m,fits:null,mode:d,outerSize:null,side:n,size:null,target:f[n],whole:null},o="natural"==d?i.free():i.constrain(c.geo.available[k][n].width-m.horizontal,c.geo.available[k][n].height-m.vertical),p=o.measure();if(h.size=p.size,h.outerSize={height:p.size.height+m.vertical,width:p.size.width+m.horizontal},"natural"==d?c.geo.available[k][n].width>=h.outerSize.width&&c.geo.available[k][n].height>=h.outerSize.height?h.fits=!0:h.fits=!1:h.fits=p.fits,"window"==k&&(h.fits?"top"==n||"bottom"==n?h.whole=c.geo.origin.windowOffset.right>=e.__options.minIntersection&&c.geo.window.size.width-c.geo.origin.windowOffset.left>=e.__options.minIntersection:h.whole=c.geo.origin.windowOffset.bottom>=e.__options.minIntersection&&c.geo.window.size.height-c.geo.origin.windowOffset.top>=e.__options.minIntersection:h.whole=!1),g.push(h),h.whole)j=!0;else if("natural"==h.mode&&(h.fits||h.size.width<=c.geo.available[k][n].width))return!1}})}}),e.__instance._trigger({edit:function(a){g=a},event:b,helper:c,results:g,type:"positionTested"}),g.sort(function(a,b){if(a.whole&&!b.whole)return-1;if(!a.whole&&b.whole)return 1;if(a.whole&&b.whole){var c=e.__options.side.indexOf(a.side),d=e.__options.side.indexOf(b.side);return d>c?-1:c>d?1:"natural"==a.mode?-1:1}if(a.fits&&!b.fits)return-1;if(!a.fits&&b.fits)return 1;if(a.fits&&b.fits){var c=e.__options.side.indexOf(a.side),d=e.__options.side.indexOf(b.side);return d>c?-1:c>d?1:"natural"==a.mode?-1:1}return"document"==a.container&&"bottom"==a.side&&"natural"==a.mode?-1:1}),d=g[0],d.coord={},d.side){case"left":case"right":d.coord.top=Math.floor(d.target-d.size.height/2);break;case"bottom":case"top":d.coord.left=Math.floor(d.target-d.size.width/2)}switch(d.side){case"left":d.coord.left=c.geo.origin.windowOffset.left-d.outerSize.width;break;case"right":d.coord.left=c.geo.origin.windowOffset.right+d.distance.horizontal;break;case"top":d.coord.top=c.geo.origin.windowOffset.top-d.outerSize.height;break;case"bottom":d.coord.top=c.geo.origin.windowOffset.bottom+d.distance.vertical}"window"==d.container?"top"==d.side||"bottom"==d.side?d.coord.left<0?c.geo.origin.windowOffset.right-this.__options.minIntersection>=0?d.coord.left=0:d.coord.left=c.geo.origin.windowOffset.right-this.__options.minIntersection-1:d.coord.left>c.geo.window.size.width-d.size.width&&(c.geo.origin.windowOffset.left+this.__options.minIntersection<=c.geo.window.size.width?d.coord.left=c.geo.window.size.width-d.size.width:d.coord.left=c.geo.origin.windowOffset.left+this.__options.minIntersection+1-d.size.width):d.coord.top<0?c.geo.origin.windowOffset.bottom-this.__options.minIntersection>=0?d.coord.top=0:d.coord.top=c.geo.origin.windowOffset.bottom-this.__options.minIntersection-1:d.coord.top>c.geo.window.size.height-d.size.height&&(c.geo.origin.windowOffset.top+this.__options.minIntersection<=c.geo.window.size.height?d.coord.top=c.geo.window.size.height-d.size.height:d.coord.top=c.geo.origin.windowOffset.top+this.__options.minIntersection+1-d.size.height):(d.coord.left>c.geo.window.size.width-d.size.width&&(d.coord.left=c.geo.window.size.width-d.size.width),d.coord.left<0&&(d.coord.left=0)),e.__sideChange(h,d.side),c.tooltipClone=h[0],c.tooltipParent=e.__instance.option("parent").parent[0],c.mode=d.mode,c.whole=d.whole,c.origin=e.__instance._$origin[0],c.tooltip=e.__instance._$tooltip[0],delete d.container,delete d.fits,delete d.mode,delete d.outerSize,delete d.whole,d.distance=d.distance.horizontal||d.distance.vertical;var l=a.extend(!0,{},d);if(e.__instance._trigger({edit:function(a){d=a},event:b,helper:c,position:l,type:"position"}),e.__options.functionPosition){var m=e.__options.functionPosition.call(e,e.__instance,c,l);m&&(d=m)}i.destroy();var n,o;"top"==d.side||"bottom"==d.side?(n={prop:"left",val:d.target-d.coord.left},o=d.size.width-this.__options.minIntersection):(n={prop:"top",val:d.target-d.coord.top},o=d.size.height-this.__options.minIntersection),n.val<this.__options.minIntersection?n.val=this.__options.minIntersection:n.val>o&&(n.val=o);var p;p=c.geo.origin.fixedLineage?c.geo.origin.windowOffset:{left:c.geo.origin.windowOffset.left+c.geo.window.scroll.left,top:c.geo.origin.windowOffset.top+c.geo.window.scroll.top},d.coord={left:p.left+(d.coord.left-c.geo.origin.windowOffset.left),top:p.top+(d.coord.top-c.geo.origin.windowOffset.top)},e.__sideChange(e.__instance._$tooltip,d.side),c.geo.origin.fixedLineage?e.__instance._$tooltip.css("position","fixed"):e.__instance._$tooltip.css("position",""),e.__instance._$tooltip.css({left:d.coord.left,top:d.coord.top,height:d.size.height,width:d.size.width}).find(".tooltipster-arrow").css({left:"",top:""}).css(n.prop,n.val),e.__instance._$tooltip.appendTo(e.__instance.option("parent")),e.__instance._trigger({type:"repositioned",event:b,position:d})},__sideChange:function(a,b){a.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-"+b)},__targetFind:function(a){var b={},c=this.__instance._$origin[0].getClientRects();if(c.length>1){var d=this.__instance._$origin.css("opacity");1==d&&(this.__instance._$origin.css("opacity",.99),c=this.__instance._$origin[0].getClientRects(),this.__instance._$origin.css("opacity",1))}if(c.length<2)b.top=Math.floor(a.geo.origin.windowOffset.left+a.geo.origin.size.width/2),b.bottom=b.top,b.left=Math.floor(a.geo.origin.windowOffset.top+a.geo.origin.size.height/2),b.right=b.left;else{var e=c[0];b.top=Math.floor(e.left+(e.right-e.left)/2),e=c.length>2?c[Math.ceil(c.length/2)-1]:c[0],b.right=Math.floor(e.top+(e.bottom-e.top)/2),e=c[c.length-1],b.bottom=Math.floor(e.left+(e.right-e.left)/2),e=c.length>2?c[Math.ceil((c.length+1)/2)-1]:c[c.length-1],b.left=Math.floor(e.top+(e.bottom-e.top)/2)}return b}}}),a});
  /*!
   * jQuery Validation Plugin v1.16.0
   *
   * http://jqueryvalidation.org/
   *
   * Copyright (c) 2016 JÃ¶rn Zaefferer
   * Released under the MIT license
   */
  (function( factory ) {
      if ( typeof define === "function" && define.amd ) {
          define( ["jquery"], factory );
      } else if (typeof module === "object" && module.exports) {
          module.exports = factory( require( "jquery" ) );
      } else {
          factory( jQuery );
      }
  }(function( $ ) {
  
  $.extend( $.fn, {
  
      // http://jqueryvalidation.org/validate/
      validate: function( options ) {
  
          // If nothing is selected, return nothing; can't chain anyway
          if ( !this.length ) {
              if ( options && options.debug && window.console ) {
                  console.warn( "Nothing selected, can't validate, returning nothing." );
              }
              return;
          }
  
          // Check if a validator for this form was already created
          var validator = $.data( this[ 0 ], "validator" );
          if ( validator ) {
              return validator;
          }
  
          // Add novalidate tag if HTML5.
          this.attr( "novalidate", "novalidate" );
  
          validator = new $.validator( options, this[ 0 ] );
          $.data( this[ 0 ], "validator", validator );
  
          if ( validator.settings.onsubmit ) {
  
              this.on( "click.validate", ":submit", function( event ) {
                  if ( validator.settings.submitHandler ) {
                      validator.submitButton = event.target;
                  }
  
                  // Allow suppressing validation by adding a cancel class to the submit button
                  if ( $( this ).hasClass( "cancel" ) ) {
                      validator.cancelSubmit = true;
                  }
  
                  // Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                  if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
                      validator.cancelSubmit = true;
                  }
              } );
  
              // Validate the form on submit
              this.on( "submit.validate", function( event ) {
                  if ( validator.settings.debug ) {
  
                      // Prevent form submit to be able to see console output
                      event.preventDefault();
                  }
                  function handle() {
                      var hidden, result;
                      if ( validator.settings.submitHandler ) {
                          if ( validator.submitButton ) {
  
                              // Insert a hidden input as a replacement for the missing submit button
                              hidden = $( "<input type='hidden'/>" )
                                  .attr( "name", validator.submitButton.name )
                                  .val( $( validator.submitButton ).val() )
                                  .appendTo( validator.currentForm );
                          }
                          result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
                          if ( validator.submitButton ) {
  
                              // And clean up afterwards; thanks to no-block-scope, hidden can be referenced
                              hidden.remove();
                          }
                          if ( result !== undefined ) {
                              return result;
                          }
                          return false;
                      }
                      return true;
                  }
  
                  // Prevent submit for invalid forms or custom submit handlers
                  if ( validator.cancelSubmit ) {
                      validator.cancelSubmit = false;
                      return handle();
                  }
                  if ( validator.form() ) {
                      if ( validator.pendingRequest ) {
                          validator.formSubmitted = true;
                          return false;
                      }
                      return handle();
                  } else {
                      validator.focusInvalid();
                      return false;
                  }
              } );
          }
  
          return validator;
      },
  
      // http://jqueryvalidation.org/valid/
      valid: function() {
          var valid, validator, errorList;
  
          if ( $( this[ 0 ] ).is( "form" ) ) {
              valid = this.validate().form();
          } else {
              errorList = [];
              valid = true;
              validator = $( this[ 0 ].form ).validate();
              this.each( function() {
                  valid = validator.element( this ) && valid;
                  if ( !valid ) {
                      errorList = errorList.concat( validator.errorList );
                  }
              } );
              validator.errorList = errorList;
          }
          return valid;
      },
  
      // http://jqueryvalidation.org/rules/
      rules: function( command, argument ) {
          var element = this[ 0 ],
              settings, staticRules, existingRules, data, param, filtered;
  
          // If nothing is selected, return empty object; can't chain anyway
          if ( element == null || element.form == null ) {
              return;
          }
  
          if ( command ) {
              settings = $.data( element.form, "validator" ).settings;
              staticRules = settings.rules;
              existingRules = $.validator.staticRules( element );
              switch ( command ) {
              case "add":
                  $.extend( existingRules, $.validator.normalizeRule( argument ) );
  
                  // Remove messages from rules, but allow them to be set separately
                  delete existingRules.messages;
                  staticRules[ element.name ] = existingRules;
                  if ( argument.messages ) {
                      settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
                  }
                  break;
              case "remove":
                  if ( !argument ) {
                      delete staticRules[ element.name ];
                      return existingRules;
                  }
                  filtered = {};
                  $.each( argument.split( /\s/ ), function( index, method ) {
                      filtered[ method ] = existingRules[ method ];
                      delete existingRules[ method ];
                      if ( method === "required" ) {
                          $( element ).removeAttr( "aria-required" );
                      }
                  } );
                  return filtered;
              }
          }
  
          data = $.validator.normalizeRules(
          $.extend(
              {},
              $.validator.classRules( element ),
              $.validator.attributeRules( element ),
              $.validator.dataRules( element ),
              $.validator.staticRules( element )
          ), element );
  
          // Make sure required is at front
          if ( data.required ) {
              param = data.required;
              delete data.required;
              data = $.extend( { required: param }, data );
              $( element ).attr( "aria-required", "true" );
          }
  
          // Make sure remote is at back
          if ( data.remote ) {
              param = data.remote;
              delete data.remote;
              data = $.extend( data, { remote: param } );
          }
  
          return data;
      }
  } );
  
  // Custom selectors
  $.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support
  
      // http://jqueryvalidation.org/blank-selector/
      blank: function( a ) {
          return !$.trim( "" + $( a ).val() );
      },
  
      // http://jqueryvalidation.org/filled-selector/
      filled: function( a ) {
          var val = $( a ).val();
          return val !== null && !!$.trim( "" + val );
      },
  
      // http://jqueryvalidation.org/unchecked-selector/
      unchecked: function( a ) {
          return !$( a ).prop( "checked" );
      }
  } );
  
  // Constructor for validator
  $.validator = function( options, form ) {
      this.settings = $.extend( true, {}, $.validator.defaults, options );
      this.currentForm = form;
      this.init();
  };
  
  // http://jqueryvalidation.org/jQuery.validator.format/
  $.validator.format = function( source, params ) {
      if ( arguments.length === 1 ) {
          return function() {
              var args = $.makeArray( arguments );
              args.unshift( source );
              return $.validator.format.apply( this, args );
          };
      }
      if ( params === undefined ) {
          return source;
      }
      if ( arguments.length > 2 && params.constructor !== Array  ) {
          params = $.makeArray( arguments ).slice( 1 );
      }
      if ( params.constructor !== Array ) {
          params = [ params ];
      }
      $.each( params, function( i, n ) {
          source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
              return n;
          } );
      } );
      return source;
  };
  
  $.extend( $.validator, {
  
      defaults: {
          messages: {},
          groups: {},
          rules: {},
          errorClass: "error",
          pendingClass: "pending",
          validClass: "valid",
          errorElement: "label",
          focusCleanup: false,
          focusInvalid: true,
          errorContainer: $( [] ),
          errorLabelContainer: $( [] ),
          onsubmit: true,
          ignore: ":hidden",
          ignoreTitle: false,
          onfocusin: function( element ) {
              this.lastActive = element;
  
              // Hide error label and remove error class on focus if enabled
              if ( this.settings.focusCleanup ) {
                  if ( this.settings.unhighlight ) {
                      this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                  }
                  this.hideThese( this.errorsFor( element ) );
              }
          },
          onfocusout: function( element ) {
              if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
                  this.element( element );
              }
          },
          onkeyup: function( element, event ) {
  
              // Avoid revalidate the field when pressing one of the following keys
              // Shift       => 16
              // Ctrl        => 17
              // Alt         => 18
              // Caps lock   => 20
              // End         => 35
              // Home        => 36
              // Left arrow  => 37
              // Up arrow    => 38
              // Right arrow => 39
              // Down arrow  => 40
              // Insert      => 45
              // Num lock    => 144
              // AltGr key   => 225
              var excludedKeys = [
                  16, 17, 18, 20, 35, 36, 37,
                  38, 39, 40, 45, 144, 225
              ];
  
              if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
                  return;
              } else if ( element.name in this.submitted || element.name in this.invalid ) {
                  this.element( element );
              }
          },
          onclick: function( element ) {
  
              // Click on selects, radiobuttons and checkboxes
              if ( element.name in this.submitted ) {
                  this.element( element );
  
              // Or option elements, check parent select in that case
              } else if ( element.parentNode.name in this.submitted ) {
                  this.element( element.parentNode );
              }
          },
          highlight: function( element, errorClass, validClass ) {
              if ( element.type === "radio" ) {
                  this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
              } else {
                  $( element ).addClass( errorClass ).removeClass( validClass );
              }
          },
          unhighlight: function( element, errorClass, validClass ) {
              if ( element.type === "radio" ) {
                  this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
              } else {
                  $( element ).removeClass( errorClass ).addClass( validClass );
              }
          }
      },
  
      // http://jqueryvalidation.org/jQuery.validator.setDefaults/
      setDefaults: function( settings ) {
          $.extend( $.validator.defaults, settings );
      },
  
      messages: {
          required: "This field is required.",
          remote: "Please fix this field.",
          email: "Please enter a valid email address.",
          url: "Please enter a valid URL.",
          date: "Please enter a valid date.",
          dateISO: "Please enter a valid date (ISO).",
          number: "Please enter a valid number.",
          digits: "Please enter only digits.",
          equalTo: "Please enter the same value again.",
          maxlength: $.validator.format( "Please enter no more than {0} characters." ),
          minlength: $.validator.format( "Please enter at least {0} characters." ),
          rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
          range: $.validator.format( "Please enter a value between {0} and {1}." ),
          max: $.validator.format( "Please enter a value less than or equal to {0}." ),
          min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
          step: $.validator.format( "Please enter a multiple of {0}." )
      },
  
      autoCreateRanges: false,
  
      prototype: {
  
          init: function() {
              this.labelContainer = $( this.settings.errorLabelContainer );
              this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
              this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
              this.submitted = {};
              this.valueCache = {};
              this.pendingRequest = 0;
              this.pending = {};
              this.invalid = {};
              this.reset();
  
              var groups = ( this.groups = {} ),
                  rules;
              $.each( this.settings.groups, function( key, value ) {
                  if ( typeof value === "string" ) {
                      value = value.split( /\s/ );
                  }
                  $.each( value, function( index, name ) {
                      groups[ name ] = key;
                  } );
              } );
              rules = this.settings.rules;
              $.each( rules, function( key, value ) {
                  rules[ key ] = $.validator.normalizeRule( value );
              } );
  
              function delegate( event ) {
  
                  // Set form expando on contenteditable
                  if ( !this.form && this.hasAttribute( "contenteditable" ) ) {
                      this.form = $( this ).closest( "form" )[ 0 ];
                  }
  
                  var validator = $.data( this.form, "validator" ),
                      eventType = "on" + event.type.replace( /^validate/, "" ),
                      settings = validator.settings;
                  if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
                      settings[ eventType ].call( validator, this, event );
                  }
              }
  
              $( this.currentForm )
                  .on( "focusin.validate focusout.validate keyup.validate",
                      ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                      "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                      "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                      "[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )
  
                  // Support: Chrome, oldIE
                  // "select" is provided as event.target when clicking a option
                  .on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );
  
              if ( this.settings.invalidHandler ) {
                  $( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
              }
  
              // Add aria-required to any Static/Data/Class required fields before first validation
              // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
              $( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
          },
  
          // http://jqueryvalidation.org/Validator.form/
          form: function() {
              this.checkForm();
              $.extend( this.submitted, this.errorMap );
              this.invalid = $.extend( {}, this.errorMap );
              if ( !this.valid() ) {
                  $( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
              }
              this.showErrors();
              return this.valid();
          },
  
          checkForm: function() {
              this.prepareForm();
              for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
                  this.check( elements[ i ] );
              }
              return this.valid();
          },
  
          // http://jqueryvalidation.org/Validator.element/
          element: function( element ) {
              var cleanElement = this.clean( element ),
                  checkElement = this.validationTargetFor( cleanElement ),
                  v = this,
                  result = true,
                  rs, group;
  
              if ( checkElement === undefined ) {
                  delete this.invalid[ cleanElement.name ];
              } else {
                  this.prepareElement( checkElement );
                  this.currentElements = $( checkElement );
  
                  // If this element is grouped, then validate all group elements already
                  // containing a value
                  group = this.groups[ checkElement.name ];
                  if ( group ) {
                      $.each( this.groups, function( name, testgroup ) {
                          if ( testgroup === group && name !== checkElement.name ) {
                              cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
                              if ( cleanElement && cleanElement.name in v.invalid ) {
                                  v.currentElements.push( cleanElement );
                                  result = v.check( cleanElement ) && result;
                              }
                          }
                      } );
                  }
  
                  rs = this.check( checkElement ) !== false;
                  result = result && rs;
                  if ( rs ) {
                      this.invalid[ checkElement.name ] = false;
                  } else {
                      this.invalid[ checkElement.name ] = true;
                  }
  
                  if ( !this.numberOfInvalids() ) {
  
                      // Hide error containers on last error
                      this.toHide = this.toHide.add( this.containers );
                  }
                  this.showErrors();
  
                  // Add aria-invalid status for screen readers
                  $( element ).attr( "aria-invalid", !rs );
              }
  
              return result;
          },
  
          // http://jqueryvalidation.org/Validator.showErrors/
          showErrors: function( errors ) {
              if ( errors ) {
                  var validator = this;
  
                  // Add items to error list and map
                  $.extend( this.errorMap, errors );
                  this.errorList = $.map( this.errorMap, function( message, name ) {
                      return {
                          message: message,
                          element: validator.findByName( name )[ 0 ]
                      };
                  } );
  
                  // Remove items from success list
                  this.successList = $.grep( this.successList, function( element ) {
                      return !( element.name in errors );
                  } );
              }
              if ( this.settings.showErrors ) {
                  this.settings.showErrors.call( this, this.errorMap, this.errorList );
              } else {
                  this.defaultShowErrors();
              }
          },
  
          // http://jqueryvalidation.org/Validator.resetForm/
          resetForm: function() {
              if ( $.fn.resetForm ) {
                  $( this.currentForm ).resetForm();
              }
              this.invalid = {};
              this.submitted = {};
              this.prepareForm();
              this.hideErrors();
              var elements = this.elements()
                  .removeData( "previousValue" )
                  .removeAttr( "aria-invalid" );
  
              this.resetElements( elements );
          },
  
          resetElements: function( elements ) {
              var i;
  
              if ( this.settings.unhighlight ) {
                  for ( i = 0; elements[ i ]; i++ ) {
                      this.settings.unhighlight.call( this, elements[ i ],
                          this.settings.errorClass, "" );
                      this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
                  }
              } else {
                  elements
                      .removeClass( this.settings.errorClass )
                      .removeClass( this.settings.validClass );
              }
          },
  
          numberOfInvalids: function() {
              return this.objectLength( this.invalid );
          },
  
          objectLength: function( obj ) {
              /* jshint unused: false */
              var count = 0,
                  i;
              for ( i in obj ) {
                  if ( obj[ i ] ) {
                      count++;
                  }
              }
              return count;
          },
  
          hideErrors: function() {
              this.hideThese( this.toHide );
          },
  
          hideThese: function( errors ) {
              errors.not( this.containers ).text( "" );
              this.addWrapper( errors ).hide();
          },
  
          valid: function() {
              return this.size() === 0;
          },
  
          size: function() {
              return this.errorList.length;
          },
  
          focusInvalid: function() {
              if ( this.settings.focusInvalid ) {
                  try {
                      $( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
                      .filter( ":visible" )
                      .focus()
  
                      // Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                      .trigger( "focusin" );
                  } catch ( e ) {
  
                      // Ignore IE throwing errors when focusing hidden elements
                  }
              }
          },
  
          findLastActive: function() {
              var lastActive = this.lastActive;
              return lastActive && $.grep( this.errorList, function( n ) {
                  return n.element.name === lastActive.name;
              } ).length === 1 && lastActive;
          },
  
          elements: function() {
              var validator = this,
                  rulesCache = {};
  
              // Select all valid inputs inside the form (no submit or reset buttons)
              return $( this.currentForm )
              .find( "input, select, textarea, [contenteditable]" )
              .not( ":submit, :reset, :image, :disabled" )
              .not( this.settings.ignore )
              .filter( function() {
                  var name = this.name || $( this ).attr( "name" ); // For contenteditable
                  if ( !name && validator.settings.debug && window.console ) {
                      console.error( "%o has no name assigned", this );
                  }
  
                  // Set form expando on contenteditable
                  if ( this.hasAttribute( "contenteditable" ) ) {
                      this.form = $( this ).closest( "form" )[ 0 ];
                  }
  
                  // Select only the first element for each name, and only those with rules specified
                  if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
                      return false;
                  }
  
                  rulesCache[ name ] = true;
                  return true;
              } );
          },
  
          clean: function( selector ) {
              return $( selector )[ 0 ];
          },
  
          errors: function() {
              var errorClass = this.settings.errorClass.split( " " ).join( "." );
              return $( this.settings.errorElement + "." + errorClass, this.errorContext );
          },
  
          resetInternals: function() {
              this.successList = [];
              this.errorList = [];
              this.errorMap = {};
              this.toShow = $( [] );
              this.toHide = $( [] );
          },
  
          reset: function() {
              this.resetInternals();
              this.currentElements = $( [] );
          },
  
          prepareForm: function() {
              this.reset();
              this.toHide = this.errors().add( this.containers );
          },
  
          prepareElement: function( element ) {
              this.reset();
              this.toHide = this.errorsFor( element );
          },
  
          elementValue: function( element ) {
              var $element = $( element ),
                  type = element.type,
                  val, idx;
  
              if ( type === "radio" || type === "checkbox" ) {
                  return this.findByName( element.name ).filter( ":checked" ).val();
              } else if ( type === "number" && typeof element.validity !== "undefined" ) {
                  return element.validity.badInput ? "NaN" : $element.val();
              }
  
              if ( element.hasAttribute( "contenteditable" ) ) {
                  val = $element.text();
              } else {
                  val = $element.val();
              }
  
              if ( type === "file" ) {
  
                  // Modern browser (chrome & safari)
                  if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
                      return val.substr( 12 );
                  }
  
                  // Legacy browsers
                  // Unix-based path
                  idx = val.lastIndexOf( "/" );
                  if ( idx >= 0 ) {
                      return val.substr( idx + 1 );
                  }
  
                  // Windows-based path
                  idx = val.lastIndexOf( "\\" );
                  if ( idx >= 0 ) {
                      return val.substr( idx + 1 );
                  }
  
                  // Just the file name
                  return val;
              }
  
              if ( typeof val === "string" ) {
                  return val.replace( /\r/g, "" );
              }
              return val;
          },
  
          check: function( element ) {
              element = this.validationTargetFor( this.clean( element ) );
  
              var rules = $( element ).rules(),
                  rulesCount = $.map( rules, function( n, i ) {
                      return i;
                  } ).length,
                  dependencyMismatch = false,
                  val = this.elementValue( element ),
                  result, method, rule;
  
              // If a normalizer is defined for this element, then
              // call it to retreive the changed value instead
              // of using the real one.
              // Note that `this` in the normalizer is `element`.
              if ( typeof rules.normalizer === "function" ) {
                  val = rules.normalizer.call( element, val );
  
                  if ( typeof val !== "string" ) {
                      throw new TypeError( "The normalizer should return a string value." );
                  }
  
                  // Delete the normalizer from rules to avoid treating
                  // it as a pre-defined method.
                  delete rules.normalizer;
              }
  
              for ( method in rules ) {
                  rule = { method: method, parameters: rules[ method ] };
                  try {
                      result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
  
                      // If a method indicates that the field is optional and therefore valid,
                      // don't mark it as valid when there are no other rules
                      if ( result === "dependency-mismatch" && rulesCount === 1 ) {
                          dependencyMismatch = true;
                          continue;
                      }
                      dependencyMismatch = false;
  
                      if ( result === "pending" ) {
                          this.toHide = this.toHide.not( this.errorsFor( element ) );
                          return;
                      }
  
                      if ( !result ) {
                          this.formatAndAdd( element, rule );
                          return false;
                      }
                  } catch ( e ) {
                      if ( this.settings.debug && window.console ) {
                          console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                      }
                      if ( e instanceof TypeError ) {
                          e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                      }
  
                      throw e;
                  }
              }
              if ( dependencyMismatch ) {
                  return;
              }
              if ( this.objectLength( rules ) ) {
                  this.successList.push( element );
              }
              return true;
          },
  
          // Return the custom message for the given element and validation method
          // specified in the element's HTML5 data attribute
          // return the generic message if present and no method specific message is present
          customDataMessage: function( element, method ) {
              return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
                  method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
          },
  
          // Return the custom message for the given element name and validation method
          customMessage: function( name, method ) {
              var m = this.settings.messages[ name ];
              return m && ( m.constructor === String ? m : m[ method ] );
          },
  
          // Return the first defined argument, allowing empty strings
          findDefined: function() {
              for ( var i = 0; i < arguments.length; i++ ) {
                  if ( arguments[ i ] !== undefined ) {
                      return arguments[ i ];
                  }
              }
              return undefined;
          },
  
          // The second parameter 'rule' used to be a string, and extended to an object literal
          // of the following form:
          // rule = {
          //     method: "method name",
          //     parameters: "the given method parameters"
          // }
          //
          // The old behavior still supported, kept to maintain backward compatibility with
          // old code, and will be removed in the next major release.
          defaultMessage: function( element, rule ) {
              if ( typeof rule === "string" ) {
                  rule = { method: rule };
              }
  
              var message = this.findDefined(
                      this.customMessage( element.name, rule.method ),
                      this.customDataMessage( element, rule.method ),
  
                      // 'title' is never undefined, so handle empty string as undefined
                      !this.settings.ignoreTitle && element.title || undefined,
                      $.validator.messages[ rule.method ],
                      "<strong>Warning: No message defined for " + element.name + "</strong>"
                  ),
                  theregex = /\$?\{(\d+)\}/g;
              if ( typeof message === "function" ) {
                  message = message.call( this, rule.parameters, element );
              } else if ( theregex.test( message ) ) {
                  message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
              }
  
              return message;
          },
  
          formatAndAdd: function( element, rule ) {
              var message = this.defaultMessage( element, rule );
  
              this.errorList.push( {
                  message: message,
                  element: element,
                  method: rule.method
              } );
  
              this.errorMap[ element.name ] = message;
              this.submitted[ element.name ] = message;
          },
  
          addWrapper: function( toToggle ) {
              if ( this.settings.wrapper ) {
                  toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
              }
              return toToggle;
          },
  
          defaultShowErrors: function() {
              var i, elements, error;
              for ( i = 0; this.errorList[ i ]; i++ ) {
                  error = this.errorList[ i ];
                  if ( this.settings.highlight ) {
                      this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                  }
                  this.showLabel( error.element, error.message );
              }
              if ( this.errorList.length ) {
                  this.toShow = this.toShow.add( this.containers );
              }
              if ( this.settings.success ) {
                  for ( i = 0; this.successList[ i ]; i++ ) {
                      this.showLabel( this.successList[ i ] );
                  }
              }
              if ( this.settings.unhighlight ) {
                  for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
                      this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
                  }
              }
              this.toHide = this.toHide.not( this.toShow );
              this.hideErrors();
              this.addWrapper( this.toShow ).show();
          },
  
          validElements: function() {
              return this.currentElements.not( this.invalidElements() );
          },
  
          invalidElements: function() {
              return $( this.errorList ).map( function() {
                  return this.element;
              } );
          },
  
          showLabel: function( element, message ) {
              var place, group, errorID, v,
                  error = this.errorsFor( element ),
                  elementID = this.idOrName( element ),
                  describedBy = $( element ).attr( "aria-describedby" );
  
              if ( error.length ) {
  
                  // Refresh error/success class
                  error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
  
                  // Replace message on existing label
                  error.html( message );
              } else {
  
                  // Create error element
                  error = $( "<" + this.settings.errorElement + ">" )
                      .attr( "id", elementID + "-error" )
                      .addClass( this.settings.errorClass )
                      .html( message || "" );
  
                  // Maintain reference to the element to be placed into the DOM
                  place = error;
                  if ( this.settings.wrapper ) {
  
                      // Make sure the element is visible, even in IE
                      // actually showing the wrapped element is handled elsewhere
                      place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
                  }
                  if ( this.labelContainer.length ) {
                      this.labelContainer.append( place );
                  } else if ( this.settings.errorPlacement ) {
                      this.settings.errorPlacement.call( this, place, $( element ) );
                  } else {
                      place.insertAfter( element );
                  }
  
                  // Link error back to the element
                  if ( error.is( "label" ) ) {
  
                      // If the error is a label, then associate using 'for'
                      error.attr( "for", elementID );
  
                      // If the element is not a child of an associated label, then it's necessary
                      // to explicitly apply aria-describedby
                  } else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
                      errorID = error.attr( "id" );
  
                      // Respect existing non-error aria-describedby
                      if ( !describedBy ) {
                          describedBy = errorID;
                      } else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {
  
                          // Add to end of list if not already present
                          describedBy += " " + errorID;
                      }
                      $( element ).attr( "aria-describedby", describedBy );
  
                      // If this element is grouped, then assign to all elements in the same group
                      group = this.groups[ element.name ];
                      if ( group ) {
                          v = this;
                          $.each( v.groups, function( name, testgroup ) {
                              if ( testgroup === group ) {
                                  $( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
                                      .attr( "aria-describedby", error.attr( "id" ) );
                              }
                          } );
                      }
                  }
              }
              if ( !message && this.settings.success ) {
                  error.text( "" );
                  if ( typeof this.settings.success === "string" ) {
                      error.addClass( this.settings.success );
                  } else {
                      this.settings.success( error, element );
                  }
              }
              this.toShow = this.toShow.add( error );
          },
  
          errorsFor: function( element ) {
              var name = this.escapeCssMeta( this.idOrName( element ) ),
                  describer = $( element ).attr( "aria-describedby" ),
                  selector = "label[for='" + name + "'], label[for='" + name + "'] *";
  
              // 'aria-describedby' should directly reference the error element
              if ( describer ) {
                  selector = selector + ", #" + this.escapeCssMeta( describer )
                      .replace( /\s+/g, ", #" );
              }
  
              return this
                  .errors()
                  .filter( selector );
          },
  
          // See https://api.jquery.com/category/selectors/, for CSS
          // meta-characters that should be escaped in order to be used with JQuery
          // as a literal part of a name/id or any selector.
          escapeCssMeta: function( string ) {
              return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
          },
  
          idOrName: function( element ) {
              return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
          },
  
          validationTargetFor: function( element ) {
  
              // If radio/checkbox, validate first element in group instead
              if ( this.checkable( element ) ) {
                  element = this.findByName( element.name );
              }
  
              // Always apply ignore filter
              return $( element ).not( this.settings.ignore )[ 0 ];
          },
  
          checkable: function( element ) {
              return ( /radio|checkbox/i ).test( element.type );
          },
  
          findByName: function( name ) {
              return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
          },
  
          getLength: function( value, element ) {
              switch ( element.nodeName.toLowerCase() ) {
              case "select":
                  return $( "option:selected", element ).length;
              case "input":
                  if ( this.checkable( element ) ) {
                      return this.findByName( element.name ).filter( ":checked" ).length;
                  }
              }
              return value.length;
          },
  
          depend: function( param, element ) {
              return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
          },
  
          dependTypes: {
              "boolean": function( param ) {
                  return param;
              },
              "string": function( param, element ) {
                  return !!$( param, element.form ).length;
              },
              "function": function( param, element ) {
                  return param( element );
              }
          },
  
          optional: function( element ) {
              var val = this.elementValue( element );
              return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
          },
  
          startRequest: function( element ) {
              if ( !this.pending[ element.name ] ) {
                  this.pendingRequest++;
                  $( element ).addClass( this.settings.pendingClass );
                  this.pending[ element.name ] = true;
              }
          },
  
          stopRequest: function( element, valid ) {
              this.pendingRequest--;
  
              // Sometimes synchronization fails, make sure pendingRequest is never < 0
              if ( this.pendingRequest < 0 ) {
                  this.pendingRequest = 0;
              }
              delete this.pending[ element.name ];
              $( element ).removeClass( this.settings.pendingClass );
              if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
                  $( this.currentForm ).submit();
                  this.formSubmitted = false;
              } else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
                  $( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
                  this.formSubmitted = false;
              }
          },
  
          previousValue: function( element, method ) {
              method = typeof method === "string" && method || "remote";
  
              return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
                  old: null,
                  valid: true,
                  message: this.defaultMessage( element, { method: method } )
              } );
          },
  
          // Cleans up all forms and elements, removes validator-specific events
          destroy: function() {
              this.resetForm();
  
              $( this.currentForm )
                  .off( ".validate" )
                  .removeData( "validator" )
                  .find( ".validate-equalTo-blur" )
                      .off( ".validate-equalTo" )
                      .removeClass( "validate-equalTo-blur" );
          }
  
      },
  
      classRuleSettings: {
          required: { required: true },
          email: { email: true },
          url: { url: true },
          date: { date: true },
          dateISO: { dateISO: true },
          number: { number: true },
          digits: { digits: true },
          creditcard: { creditcard: true }
      },
  
      addClassRules: function( className, rules ) {
          if ( className.constructor === String ) {
              this.classRuleSettings[ className ] = rules;
          } else {
              $.extend( this.classRuleSettings, className );
          }
      },
  
      classRules: function( element ) {
          var rules = {},
              classes = $( element ).attr( "class" );
  
          if ( classes ) {
              $.each( classes.split( " " ), function() {
                  if ( this in $.validator.classRuleSettings ) {
                      $.extend( rules, $.validator.classRuleSettings[ this ] );
                  }
              } );
          }
          return rules;
      },
  
      normalizeAttributeRule: function( rules, type, method, value ) {
  
          // Convert the value to a number for number inputs, and for text for backwards compability
          // allows type="date" and others to be compared as strings
          if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
              value = Number( value );
  
              // Support Opera Mini, which returns NaN for undefined minlength
              if ( isNaN( value ) ) {
                  value = undefined;
              }
          }
  
          if ( value || value === 0 ) {
              rules[ method ] = value;
          } else if ( type === method && type !== "range" ) {
  
              // Exception: the jquery validate 'range' method
              // does not test for the html5 'range' type
              rules[ method ] = true;
          }
      },
  
      attributeRules: function( element ) {
          var rules = {},
              $element = $( element ),
              type = element.getAttribute( "type" ),
              method, value;
  
          for ( method in $.validator.methods ) {
  
              // Support for <input required> in both html5 and older browsers
              if ( method === "required" ) {
                  value = element.getAttribute( method );
  
                  // Some browsers return an empty string for the required attribute
                  // and non-HTML5 browsers might have required="" markup
                  if ( value === "" ) {
                      value = true;
                  }
  
                  // Force non-HTML5 browsers to return bool
                  value = !!value;
              } else {
                  value = $element.attr( method );
              }
  
              this.normalizeAttributeRule( rules, type, method, value );
          }
  
          // 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
          if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
              delete rules.maxlength;
          }
  
          return rules;
      },
  
      dataRules: function( element ) {
          var rules = {},
              $element = $( element ),
              type = element.getAttribute( "type" ),
              method, value;
  
          for ( method in $.validator.methods ) {
              value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
              this.normalizeAttributeRule( rules, type, method, value );
          }
          return rules;
      },
  
      staticRules: function( element ) {
          var rules = {},
              validator = $.data( element.form, "validator" );
  
          if ( validator.settings.rules ) {
              rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
          }
          return rules;
      },
  
      normalizeRules: function( rules, element ) {
  
          // Handle dependency check
          $.each( rules, function( prop, val ) {
  
              // Ignore rule when param is explicitly false, eg. required:false
              if ( val === false ) {
                  delete rules[ prop ];
                  return;
              }
              if ( val.param || val.depends ) {
                  var keepRule = true;
                  switch ( typeof val.depends ) {
                  case "string":
                      keepRule = !!$( val.depends, element.form ).length;
                      break;
                  case "function":
                      keepRule = val.depends.call( element, element );
                      break;
                  }
                  if ( keepRule ) {
                      rules[ prop ] = val.param !== undefined ? val.param : true;
                  } else {
                      $.data( element.form, "validator" ).resetElements( $( element ) );
                      delete rules[ prop ];
                  }
              }
          } );
  
          // Evaluate parameters
          $.each( rules, function( rule, parameter ) {
              rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
          } );
  
          // Clean number parameters
          $.each( [ "minlength", "maxlength" ], function() {
              if ( rules[ this ] ) {
                  rules[ this ] = Number( rules[ this ] );
              }
          } );
          $.each( [ "rangelength", "range" ], function() {
              var parts;
              if ( rules[ this ] ) {
                  if ( $.isArray( rules[ this ] ) ) {
                      rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
                  } else if ( typeof rules[ this ] === "string" ) {
                      parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
                      rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
                  }
              }
          } );
  
          if ( $.validator.autoCreateRanges ) {
  
              // Auto-create ranges
              if ( rules.min != null && rules.max != null ) {
                  rules.range = [ rules.min, rules.max ];
                  delete rules.min;
                  delete rules.max;
              }
              if ( rules.minlength != null && rules.maxlength != null ) {
                  rules.rangelength = [ rules.minlength, rules.maxlength ];
                  delete rules.minlength;
                  delete rules.maxlength;
              }
          }
  
          return rules;
      },
  
      // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
      normalizeRule: function( data ) {
          if ( typeof data === "string" ) {
              var transformed = {};
              $.each( data.split( /\s/ ), function() {
                  transformed[ this ] = true;
              } );
              data = transformed;
          }
          return data;
      },
  
      // http://jqueryvalidation.org/jQuery.validator.addMethod/
      addMethod: function( name, method, message ) {
          $.validator.methods[ name ] = method;
          $.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
          if ( method.length < 3 ) {
              $.validator.addClassRules( name, $.validator.normalizeRule( name ) );
          }
      },
  
      // http://jqueryvalidation.org/jQuery.validator.methods/
      methods: {
  
          // http://jqueryvalidation.org/required-method/
          required: function( value, element, param ) {
  
              // Check if dependency is met
              if ( !this.depend( param, element ) ) {
                  return "dependency-mismatch";
              }
              if ( element.nodeName.toLowerCase() === "select" ) {
  
                  // Could be an array for select-multiple or a string, both are fine this way
                  var val = $( element ).val();
                  return val && val.length > 0;
              }
              if ( this.checkable( element ) ) {
                  return this.getLength( value, element ) > 0;
              }
              return value.length > 0;
          },
  
          // http://jqueryvalidation.org/email-method/
          email: function( value, element ) {
  
              // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
              // Retrieved 2014-01-14
              // If you have a problem with this implementation, report a bug against the above spec
              // Or use custom methods to implement your own email validation
              return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
          },
  
          // http://jqueryvalidation.org/url-method/
          url: function( value, element ) {
  
              // Copyright (c) 2010-2013 Diego Perini, MIT licensed
              // https://gist.github.com/dperini/729294
              // see also https://mathiasbynens.be/demo/url-regex
              // modified to allow protocol-relative URLs
              return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
          },
  
          // http://jqueryvalidation.org/date-method/
          date: function( value, element ) {
              return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
          },
  
          // http://jqueryvalidation.org/dateISO-method/
          dateISO: function( value, element ) {
              return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
          },
  
          // http://jqueryvalidation.org/number-method/
          number: function( value, element ) {
              return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
          },
  
          // http://jqueryvalidation.org/digits-method/
          digits: function( value, element ) {
              return this.optional( element ) || /^\d+$/.test( value );
          },
  
          // http://jqueryvalidation.org/minlength-method/
          minlength: function( value, element, param ) {
              var length = $.isArray( value ) ? value.length : this.getLength( value, element );
              return this.optional( element ) || length >= param;
          },
  
          // http://jqueryvalidation.org/maxlength-method/
          maxlength: function( value, element, param ) {
              var length = $.isArray( value ) ? value.length : this.getLength( value, element );
              return this.optional( element ) || length <= param;
          },
  
          // http://jqueryvalidation.org/rangelength-method/
          rangelength: function( value, element, param ) {
              var length = $.isArray( value ) ? value.length : this.getLength( value, element );
              return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
          },
  
          // http://jqueryvalidation.org/min-method/
          min: function( value, element, param ) {
              return this.optional( element ) || value >= param;
          },
  
          // http://jqueryvalidation.org/max-method/
          max: function( value, element, param ) {
              return this.optional( element ) || value <= param;
          },
  
          // http://jqueryvalidation.org/range-method/
          range: function( value, element, param ) {
              return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
          },
  
          // http://jqueryvalidation.org/step-method/
          step: function( value, element, param ) {
              var type = $( element ).attr( "type" ),
                  errorMessage = "Step attribute on input type " + type + " is not supported.",
                  supportedTypes = [ "text", "number", "range" ],
                  re = new RegExp( "\\b" + type + "\\b" ),
                  notSupported = type && !re.test( supportedTypes.join() ),
                  decimalPlaces = function( num ) {
                      var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
                      if ( !match ) {
                          return 0;
                      }
  
                      // Number of digits right of decimal point.
                      return match[ 1 ] ? match[ 1 ].length : 0;
                  },
                  toInt = function( num ) {
                      return Math.round( num * Math.pow( 10, decimals ) );
                  },
                  valid = true,
                  decimals;
  
              // Works only for text, number and range input types
              // TODO find a way to support input types date, datetime, datetime-local, month, time and week
              if ( notSupported ) {
                  throw new Error( errorMessage );
              }
  
              decimals = decimalPlaces( param );
  
              // Value can't have too many decimals
              if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
                  valid = false;
              }
  
              return this.optional( element ) || valid;
          },
  
          // http://jqueryvalidation.org/equalTo-method/
          equalTo: function( value, element, param ) {
  
              // Bind to the blur event of the target in order to revalidate whenever the target field is updated
              var target = $( param );
              if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
                  target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
                      $( element ).valid();
                  } );
              }
              return value === target.val();
          },
  
          // http://jqueryvalidation.org/remote-method/
          remote: function( value, element, param, method ) {
              if ( this.optional( element ) ) {
                  return "dependency-mismatch";
              }
  
              method = typeof method === "string" && method || "remote";
  
              var previous = this.previousValue( element, method ),
                  validator, data, optionDataString;
  
              if ( !this.settings.messages[ element.name ] ) {
                  this.settings.messages[ element.name ] = {};
              }
              previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
              this.settings.messages[ element.name ][ method ] = previous.message;
  
              param = typeof param === "string" && { url: param } || param;
              optionDataString = $.param( $.extend( { data: value }, param.data ) );
              if ( previous.old === optionDataString ) {
                  return previous.valid;
              }
  
              previous.old = optionDataString;
              validator = this;
              this.startRequest( element );
              data = {};
              data[ element.name ] = value;
              $.ajax( $.extend( true, {
                  mode: "abort",
                  port: "validate" + element.name,
                  dataType: "json",
                  data: data,
                  context: validator.currentForm,
                  success: function( response ) {
                      var valid = response === true || response === "true",
                          errors, message, submitted;
  
                      validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
                      if ( valid ) {
                          submitted = validator.formSubmitted;
                          validator.resetInternals();
                          validator.toHide = validator.errorsFor( element );
                          validator.formSubmitted = submitted;
                          validator.successList.push( element );
                          validator.invalid[ element.name ] = false;
                          validator.showErrors();
                      } else {
                          errors = {};
                          message = response || validator.defaultMessage( element, { method: method, parameters: value } );
                          errors[ element.name ] = previous.message = message;
                          validator.invalid[ element.name ] = true;
                          validator.showErrors( errors );
                      }
                      previous.valid = valid;
                      validator.stopRequest( element, valid );
                  }
              }, param ) );
              return "pending";
          }
      }
  
  } );
  
  // Ajax mode: abort
  // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
  // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
  
  var pendingRequests = {},
      ajax;
  
  // Use a prefilter if available (1.5+)
  if ( $.ajaxPrefilter ) {
      $.ajaxPrefilter( function( settings, _, xhr ) {
          var port = settings.port;
          if ( settings.mode === "abort" ) {
              if ( pendingRequests[ port ] ) {
                  pendingRequests[ port ].abort();
              }
              pendingRequests[ port ] = xhr;
          }
      } );
  } else {
  
      // Proxy ajax
      ajax = $.ajax;
      $.ajax = function( settings ) {
          var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
              port = ( "port" in settings ? settings : $.ajaxSettings ).port;
          if ( mode === "abort" ) {
              if ( pendingRequests[ port ] ) {
                  pendingRequests[ port ].abort();
              }
              pendingRequests[ port ] = ajax.apply( this, arguments );
              return pendingRequests[ port ];
          }
          return ajax.apply( this, arguments );
      };
  }
  return $;
  }));
  (function( factory ) {
      if ( typeof define === "function" && define.amd ) {
          define( ["jquery", "../jquery.validate"], factory );
      } else if (typeof module === "object" && module.exports) {
          module.exports = factory( require( "jquery" ) );
      } else {
          factory( jQuery );
      }
  }(function( $ ) {
  
  /*
   * Translated default messages for the jQuery validation plugin.
   * Locale: RU (Russian; Ñ€ÑƒÑÑÐºÐ¸Ð¹ ÑÐ·Ñ‹Ðº)
   */
  $.extend( $.validator.messages, {
      required: "Ð­Ñ‚Ð¾ Ð¿Ð¾Ð»Ðµ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¾ Ð·Ð°Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÑŒ.",
      remote: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ð¾Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ.",
      email: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½Ñ‹Ð¹ Ð°Ð´Ñ€ÐµÑ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð¹ Ð¿Ð¾Ñ‡Ñ‚Ñ‹.",
      url: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½Ñ‹Ð¹ URL.",
      date: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½ÑƒÑŽ Ð´Ð°Ñ‚Ñƒ.",
      dateISO: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½ÑƒÑŽ Ð´Ð°Ñ‚Ñƒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ ISO.",
      number: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ñ‡Ð¸ÑÐ»Ð¾.",
      digits: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²Ð¾Ð´Ð¸Ñ‚Ðµ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ñ†Ð¸Ñ„Ñ€Ñ‹.",
      creditcard: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ ÐºÑ€ÐµÐ´Ð¸Ñ‚Ð½Ð¾Ð¹ ÐºÐ°Ñ€Ñ‚Ñ‹.",
      equalTo: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ñ‚Ð°ÐºÐ¾Ðµ Ð¶Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ ÐµÑ‰Ñ‘ Ñ€Ð°Ð·.",
      extension: "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ñ„Ð°Ð¹Ð» Ñ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¼ Ñ€Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð¸ÐµÐ¼.",
      maxlength: $.validator.format( "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð½Ðµ Ð±Ð¾Ð»ÑŒÑˆÐµ {0} ÑÐ¸Ð¼Ð²Ð¾Ð»Ð¾Ð²." ),
      minlength: $.validator.format( "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð½Ðµ Ð¼ÐµÐ½ÑŒÑˆÐµ {0} ÑÐ¸Ð¼Ð²Ð¾Ð»Ð¾Ð²." ),
      rangelength: $.validator.format( "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ Ð´Ð»Ð¸Ð½Ð¾Ð¹ Ð¾Ñ‚ {0} Ð´Ð¾ {1} ÑÐ¸Ð¼Ð²Ð¾Ð»Ð¾Ð²." ),
      range: $.validator.format( "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ñ‡Ð¸ÑÐ»Ð¾ Ð¾Ñ‚ {0} Ð´Ð¾ {1}." ),
      max: $.validator.format( "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ñ‡Ð¸ÑÐ»Ð¾, Ð¼ÐµÐ½ÑŒÑˆÐµÐµ Ð¸Ð»Ð¸ Ñ€Ð°Ð²Ð½Ð¾ÐµÂ {0}." ),
      min: $.validator.format( "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, Ð²Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ñ‡Ð¸ÑÐ»Ð¾, Ð±Ð¾Ð»ÑŒÑˆÐµÐµ Ð¸Ð»Ð¸ Ñ€Ð°Ð²Ð½Ð¾Ðµ {0}." )
  } );
  return $;
  }));
  // tooltipster/tooltipster.bundle.min.js
  /*
      jQuery Masked Input Plugin
      Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
      Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
      Version: 1.4.1
  */
  !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
  /*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
  (function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
  width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
  keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
  (I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
  openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
  isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
  c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
  k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
  b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
  setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
  d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
  a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
  b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
  y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
  if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
  (h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
  {},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
  mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
  !0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
  "image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
  this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
  f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
  e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
  outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
  g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
  "no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
  h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
  h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
  "iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
  y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
  !a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
  b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
  a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
  (c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
  f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
  {duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
  b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
  f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
  b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
  p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
  f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
  b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
  e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
  ":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
  d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
  /*!
   * Media helper for fancyBox
   * version: 1.0.6 (Fri, 14 Jun 2013)
   * @requires fancyBox v2.0 or later
   *
   * Usage:
   *     $(".fancybox").fancybox({
   *         helpers : {
   *             media: true
   *         }
   *     });
   *
   * Set custom URL parameters:
   *     $(".fancybox").fancybox({
   *         helpers : {
   *             media: {
   *                 youtube : {
   *                     params : {
   *                         autoplay : 0
   *                     }
   *                 }
   *             }
   *         }
   *     });
   *
   * Or:
   *     $(".fancybox").fancybox({,
   *         helpers : {
   *             media: true
   *         },
   *         youtube : {
   *             autoplay: 0
   *         }
   *     });
   *
   *  Supports:
   *
   *      Youtube
   *          http://www.youtube.com/watch?v=opj24KnzrWo
   *          http://www.youtube.com/embed/opj24KnzrWo
   *          http://youtu.be/opj24KnzrWo
   *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
   *      Vimeo
   *          http://vimeo.com/40648169
   *          http://vimeo.com/channels/staffpicks/38843628
   *          http://vimeo.com/groups/surrealism/videos/36516384
   *          http://player.vimeo.com/video/45074303
   *      Metacafe
   *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
   *          http://www.metacafe.com/watch/7635964/
   *      Dailymotion
   *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
   *      Twitvid
   *          http://twitvid.com/QY7MD
   *      Twitpic
   *          http://twitpic.com/7p93st
   *      Instagram
   *          http://instagr.am/p/IejkuUGxQn/
   *          http://instagram.com/p/IejkuUGxQn/
   *      Google maps
   *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
   *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
   *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
   */
  (function ($) {
      "use strict";
  
      //Shortcut for fancyBox object
      var F = $.fancybox,
          format = function( url, rez, params ) {
              params = params || '';
  
              if ( $.type( params ) === "object" ) {
                  params = $.param(params, true);
              }
  
              $.each(rez, function(key, value) {
                  url = url.replace( '$' + key, value || '' );
              });
  
              if (params.length) {
                  url += ( url.indexOf('?') > 0 ? '&' : '?' ) + params;
              }
  
              return url;
          };
  
      //Add helper object
      F.helpers.media = {
          defaults : {
              youtube : {
                  matcher : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                  params  : {
                      autoplay    : 1,
                      autohide    : 1,
                      fs          : 1,
                      rel         : 0,
                      hd          : 1,
                      wmode       : 'opaque',
                      enablejsapi : 1
                  },
                  type : 'iframe',
                  url  : '//www.youtube.com/embed/$3'
              },
              vimeo : {
                  matcher : /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                  params  : {
                      autoplay      : 1,
                      hd            : 1,
                      show_title    : 1,
                      show_byline   : 1,
                      show_portrait : 0,
                      fullscreen    : 1
                  },
                  type : 'iframe',
                  url  : '//player.vimeo.com/video/$1'
              },
              metacafe : {
                  matcher : /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                  params  : {
                      autoPlay : 'yes'
                  },
                  type : 'swf',
                  url  : function( rez, params, obj ) {
                      obj.swf.flashVars = 'playerVars=' + $.param( params, true );
  
                      return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
                  }
              },
              dailymotion : {
                  matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
                  params  : {
                      additionalInfos : 0,
                      autoStart : 1
                  },
                  type : 'swf',
                  url  : '//www.dailymotion.com/swf/video/$1'
              },
              twitvid : {
                  matcher : /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                  params  : {
                      autoplay : 0
                  },
                  type : 'iframe',
                  url  : '//www.twitvid.com/embed.php?guid=$1'
              },
              twitpic : {
                  matcher : /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                  type : 'image',
                  url  : '//twitpic.com/show/full/$1/'
              },
              instagram : {
                  matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                  type : 'image',
                  url  : '//$1/p/$2/media/?size=l'
              },
              google_maps : {
                  matcher : /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                  type : 'iframe',
                  url  : function( rez ) {
                      return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
                  }
              }
          },
  
          beforeLoad : function(opts, obj) {
              var url   = obj.href || '',
                  type  = false,
                  what,
                  item,
                  rez,
                  params;
  
              for (what in opts) {
                  if (opts.hasOwnProperty(what)) {
                      item = opts[ what ];
                      rez  = url.match( item.matcher );
  
                      if (rez) {
                          type   = item.type;
                          params = $.extend(true, {}, item.params, obj[ what ] || ($.isPlainObject(opts[ what ]) ? opts[ what ].params : null));
  
                          url = $.type( item.url ) === "function" ? item.url.call( this, rez, params, obj ) : format( item.url, rez, params );
  
                          break;
                      }
                  }
              }
  
              if (type) {
                  obj.href = url;
                  obj.type = type;
  
                  obj.autoHeight = false;
              }
          }
      };
  
  }(jQuery));
   /*!
   * Thumbnail helper for fancyBox
   * version: 1.0.7 (Mon, 01 Oct 2012)
   * @requires fancyBox v2.0 or later
   *
   * Usage:
   *     $(".fancybox").fancybox({
   *         helpers : {
   *             thumbs: {
   *                 width  : 50,
   *                 height : 50
   *             }
   *         }
   *     });
   *
   */
  (function ($) {
      //Shortcut for fancyBox object
      var F = $.fancybox;
  
      //Add helper object
      F.helpers.thumbs = {
          defaults : {
              width    : 50,       // thumbnail width
              height   : 50,       // thumbnail height
              position : 'bottom', // 'top' or 'bottom'
              source   : function ( item ) {  // function to obtain the URL of the thumbnail image
                  var href;
  
                  if (item.element) {
                      href = $(item.element).find('img').attr('src');
                  }
  
                  if (!href && item.type === 'image' && item.href) {
                      href = item.href;
                  }
  
                  return href;
              }
          },
  
          wrap  : null,
          list  : null,
          width : 0,
  
          init: function (opts, obj) {
              var that = this,
                  list,
                  thumbWidth  = opts.width,
                  thumbHeight = opts.height,
                  thumbSource = opts.source;
  
              //Build list structure
              list = '';
  
              for (var n = 0; n < obj.group.length; n++) {
                  list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
              }
  
              this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');
              this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);
  
              //Load each thumbnail
              $.each(obj.group, function (i) {
                  var href = thumbSource( obj.group[ i ] );
  
                  if (!href) {
                      return;
                  }
  
                  $("<img />").load(function () {
                      var width  = this.width,
                          height = this.height,
                          widthRatio, heightRatio, parent;
  
                      if (!that.list || !width || !height) {
                          return;
                      }
  
                      //Calculate thumbnail width/height and center it
                      widthRatio  = width / thumbWidth;
                      heightRatio = height / thumbHeight;
  
                      parent = that.list.children().eq(i).find('a');
  
                      if (widthRatio >= 1 && heightRatio >= 1) {
                          if (widthRatio > heightRatio) {
                              width  = Math.floor(width / heightRatio);
                              height = thumbHeight;
  
                          } else {
                              width  = thumbWidth;
                              height = Math.floor(height / widthRatio);
                          }
                      }
  
                      $(this).css({
                          width  : width,
                          height : height,
                          top    : Math.floor(thumbHeight / 2 - height / 2),
                          left   : Math.floor(thumbWidth / 2 - width / 2)
                      });
  
                      parent.width(thumbWidth).height(thumbHeight);
  
                      $(this).hide().appendTo(parent).fadeIn(300);
  
                  }).attr('src', href);
              });
  
              //Set initial width
              this.width = this.list.children().eq(0).outerWidth(true);
  
              this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
          },
  
          beforeLoad: function (opts, obj) {
              //Remove self if gallery do not have at least two items
              if (obj.group.length < 2) {
                  obj.helpers.thumbs = false;
  
                  return;
              }
  
              //Increase bottom margin to give space for thumbs
              obj.margin[ opts.position === 'top' ? 0 : 2 ] += ((opts.height) + 15);
          },
  
          afterShow: function (opts, obj) {
              //Check if exists and create or update list
              if (this.list) {
                  this.onUpdate(opts, obj);
  
              } else {
                  this.init(opts, obj);
              }
  
              //Set active element
              this.list.children().removeClass('active').eq(obj.index).addClass('active');
          },
  
          //Center list
          onUpdate: function (opts, obj) {
              if (this.list) {
                  this.list.stop(true).animate({
                      'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
                  }, 150);
              }
          },
  
          beforeClose: function () {
              if (this.wrap) {
                  this.wrap.remove();
              }
  
              this.wrap  = null;
              this.list  = null;
              this.width = 0;
          }
      }
  
  }(jQuery));
  /*!
   * jQuery Browser Plugin 0.1.0
   * https://github.com/gabceb/jquery-browser-plugin
   *
   * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
   * http://jquery.org/license
   *
   * Modifications Copyright 2015 Gabriel Cebrian
   * https://github.com/gabceb
   *
   * Released under the MIT license
   *
   * Date: 23-11-2015
   */!function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(window.jQuery)}(function(a){"use strict";function b(a){void 0===a&&(a=window.navigator.userAgent),a=a.toLowerCase();var b=/(edge)\/([\w.]+)/.exec(a)||/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(iemobile)[\/]([\w.]+)/.exec(a)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(ipod)/.exec(a)||/(windows phone)/.exec(a)||/(iphone)/.exec(a)||/(kindle)/.exec(a)||/(silk)/.exec(a)||/(android)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/.exec(a)||/(playbook)/.exec(a)||/(bb)/.exec(a)||/(blackberry)/.exec(a)||[],d={},e={browser:b[5]||b[3]||b[1]||"",version:b[2]||b[4]||"0",versionNumber:b[4]||b[2]||"0",platform:c[0]||""};if(e.browser&&(d[e.browser]=!0,d.version=e.version,d.versionNumber=parseInt(e.versionNumber,10)),e.platform&&(d[e.platform]=!0),(d.android||d.bb||d.blackberry||d.ipad||d.iphone||d.ipod||d.kindle||d.playbook||d.silk||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv||d.iemobile){var f="msie";e.browser=f,d[f]=!0}if(d.edge){delete d.edge;var g="msedge";e.browser=g,d[g]=!0}if(d.safari&&d.blackberry){var h="blackberry";e.browser=h,d[h]=!0}if(d.safari&&d.playbook){var i="playbook";e.browser=i,d[i]=!0}if(d.bb){var j="blackberry";e.browser=j,d[j]=!0}if(d.opr){var k="opera";e.browser=k,d[k]=!0}if(d.safari&&d.android){var l="android";e.browser=l,d[l]=!0}if(d.safari&&d.kindle){var m="kindle";e.browser=m,d[m]=!0}if(d.safari&&d.silk){var n="silk";e.browser=n,d[n]=!0}return d.name=e.browser,d.platform=e.platform,d}return window.jQBrowser=b(window.navigator.userAgent),window.jQBrowser.uaMatch=b,a&&(a.browser=window.jQBrowser),window.jQBrowser});
  /**
   * jQuery.query - Query String Modification and Creation for jQuery
   * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
   * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
   * Date: 2009/8/13
   *
   * @author Blair Mitchelmore
   * @version 2.2.3
   *
   **/
  new function(settings) { 
    // Various Settings
    var $separator = settings.separator || '&';
    var $spaces = settings.spaces === false ? false : true;
    var $suffix = settings.suffix === false ? '' : '[]';
    var $prefix = settings.prefix === false ? false : true;
    var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
    var $numbers = settings.numbers === false ? false : true;
  
    jQuery.query = new function() {
      var is = function(o, t) {
        return o != undefined && o !== null && (!!t ? o.constructor == t : true);
      };
      var parse = function(path) {
        var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
        while (m = rx.exec(match[2])) tokens.push(m[1]);
        return [base, tokens];
      };
      var set = function(target, tokens, value) {
        var o, token = tokens.shift();
        if (typeof target != 'object') target = null;
        if (token === "") {
          if (!target) target = [];
          if (is(target, Array)) {
            target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
          } else if (is(target, Object)) {
            var i = 0;
            while (target[i++] != null);
            target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
          } else {
            target = [];
            target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
          }
        } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
          var index = parseInt(token, 10);
          if (!target) target = [];
          target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
        } else if (token) {
          var index = token.replace(/^\s*|\s*$/g, "");
          if (!target) target = {};
          if (is(target, Array)) {
            var temp = {};
            for (var i = 0; i < target.length; ++i) {
              temp[i] = target[i];
            }
            target = temp;
          }
          target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
        } else {
          return value;
        }
        return target;
      };
      
      var queryObject = function(a) {
        var self = this;
        self.keys = {};
        
        if (a.queryObject) {
          jQuery.each(a.get(), function(key, val) {
            self.SET(key, val);
          });
        } else {
          self.parseNew.apply(self, arguments);
        }
        return self;
      };
      
      queryObject.prototype = {
        queryObject: true,
        parseNew: function(){
          var self = this;
          self.keys = {};
          jQuery.each(arguments, function() {
            var q = "" + this;
            q = q.replace(/^[?#]/,''); // remove any leading ? || #
            q = q.replace(/[;&]$/,''); // remove any trailing & || ;
            if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
            
            jQuery.each(q.split(/[&;]/), function(){
              var key = decodeURIComponent(this.split('=')[0] || "");
              var val = decodeURIComponent(this.split('=')[1] || "");
              
              if (!key) return;
              
              if ($numbers) {
                if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                  val = parseFloat(val);
                else if (/^[+-]?[1-9][0-9]*$/.test(val)) // simple int regex
                  val = parseInt(val, 10);
              }
              
              val = (!val && val !== 0) ? true : val;
              
              self.SET(key, val);
            });
          });
          return self;
        },
        has: function(key, type) {
          var value = this.get(key);
          return is(value, type);
        },
        GET: function(key) {
          if (!is(key)) return this.keys;
          var parsed = parse(key), base = parsed[0], tokens = parsed[1];
          var target = this.keys[base];
          while (target != null && tokens.length != 0) {
            target = target[tokens.shift()];
          }
          return typeof target == 'number' ? target : target || "";
        },
        get: function(key) {
          var target = this.GET(key);
          if (is(target, Object))
            return jQuery.extend(true, {}, target);
          else if (is(target, Array))
            return target.slice(0);
          return target;
        },
        SET: function(key, val) {
          var value = !is(val) ? null : val;
          var parsed = parse(key), base = parsed[0], tokens = parsed[1];
          var target = this.keys[base];
          this.keys[base] = set(target, tokens.slice(0), value);
          return this;
        },
        set: function(key, val) {
          return this.copy().SET(key, val);
        },
        REMOVE: function(key, val) {
          if (val) {
            var target = this.GET(key);
            if (is(target, Array)) {
              for (tval in target) {
                  target[tval] = target[tval].toString();
              }
              var index = $.inArray(val, target);
              if (index >= 0) {
                key = target.splice(index, 1);
                key = key[index];
              } else {
                return;
              }
            } else if (val != target) {
                return;
            }
          }
          return this.SET(key, null).COMPACT();
        },
        remove: function(key, val) {
          return this.copy().REMOVE(key, val);
        },
        EMPTY: function() {
          var self = this;
          jQuery.each(self.keys, function(key, value) {
            delete self.keys[key];
          });
          return self;
        },
        load: function(url) {
          var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
          var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
          return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
        },
        empty: function() {
          return this.copy().EMPTY();
        },
        copy: function() {
          return new queryObject(this);
        },
        COMPACT: function() {
          function build(orig) {
            var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
            if (typeof orig == 'object') {
              function add(o, key, value) {
                if (is(o, Array))
                  o.push(value);
                else
                  o[key] = value;
              }
              jQuery.each(orig, function(key, value) {
                if (!is(value)) return true;
                add(obj, key, build(value));
              });
            }
            return obj;
          }
          this.keys = build(this.keys);
          return this;
        },
        compact: function() {
          return this.copy().COMPACT();
        },
        toString: function() {
          var i = 0, queryString = [], chunks = [], self = this;
          var encode = function(str) {
            str = str + "";
            str = encodeURIComponent(str);
            if ($spaces) str = str.replace(/%20/g, "+");
            return str;
          };
          var addFields = function(arr, key, value) {
            if (!is(value) || value === false) return;
            var o = [encode(key)];
            if (value !== true) {
              o.push("=");
              o.push(encode(value));
            }
            arr.push(o.join(""));
          };
          var build = function(obj, base) {
            var newKey = function(key) {
              return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
            };
            jQuery.each(obj, function(key, value) {
              if (typeof value == 'object') 
                build(value, newKey(key));
              else
                addFields(chunks, newKey(key), value);
            });
          };
          
          build(this.keys);
          
          if (chunks.length > 0) queryString.push($hash);
          queryString.push(chunks.join($separator));
          
          return queryString.join("");
        }
      };
      
      return new queryObject(location.search, location.hash);
    };
  }(jQuery.query || {}); // Pass in jQuery.query as settings object