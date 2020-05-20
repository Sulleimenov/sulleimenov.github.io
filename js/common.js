$(document).ready(function() {
  $(".header__burger").click(function() {
    $(".menu").toggleClass("active");
    $(".header__burger").toggleClass("active");
    $("body").toggleClass("lock");
  });

  $('div.dep-tabs').on('click', 'div:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('.slider-dep__content-sync__item').find('.dep-tabs__block').removeClass('active').eq($(this).index()).addClass('active');
  });

  var navbar =  $('.sidebar');  // navigation block
  var wrapper = $('.template');        // may be: navbar.parent();

  $(window).scroll(function(){
      var nsc = $(document).scrollTop();
      var bp1 = wrapper.offset().top;
      var bp2 = bp1 + wrapper.outerHeight()-$(window).height();

      if (nsc>bp1) {  navbar.css('position','fixed'); }
      else { navbar.css('position','absolute'); }
      if (nsc>bp2) { navbar.css('top', bp2-nsc); }
      else { navbar.css('top', '0'); }
  });

    $(".header-nav__item_search").click(function() {
    $(".modal-search_wrapper").toggleClass("active");
    $(".modal-search").toggleClass("active");
  });

  $(".modal-search_close, .modal-search").click(function() {
    $(".modal-search_wrapper").removeClass("active");
    $(".modal-search").removeClass("active");
  });

  $(".infographic__number").each(function() {
    $(this)
      .prop("counter", 0)
      .animate(
        {
          counter: $(this).text()
        },
        {
          duration: 2000,
          easing: "swing",
          step: function(now) {
            $(this).text(Math.ceil(now));
          }
        }
      );
  });

  var hashLinks = document.querySelectorAll("a[href^='#']");
    [].forEach.call(hashLinks, function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        history.pushState({}, "", link.href);
        history.pushState({}, "", link.href);
        history.back();
      });
    });


  //================================= Слайдер Sync
  var sync1 = $(".slider");
  var sync2 = $(".navigation-thumbs");
  var thumbnailItemClass = '.owl-item';
  var slides = sync1.owlCarousel({
    items: 5,
    loop: false,
    margin: 30,
    center: true,
    nav: false,
    dots: false
  }).on('changed.owl.carousel', syncPosition);
  function syncPosition(el) {
    $owl_slider = $(this).data('owl.carousel');
    var loop = $owl_slider.options.loop;

    if(loop){
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      if(current < 0) {
          current = count;
      }
      if(current > count) {
          current = 0;
      }
    }else{
      var current = el.item.index;
    }
    var owl_thumbnail = sync2.data('owl.carousel');
    var itemClass = "." + owl_thumbnail.options.itemClass;
    var thumbnailCurrentItem = sync2.find(itemClass).removeClass("synced").eq(current);
    thumbnailCurrentItem.addClass('synced');
    if (!thumbnailCurrentItem.hasClass('active')) {
      var duration = 300;
      sync2.trigger('to.owl.carousel',[current, duration, true]);
    }
  }
  var thumbs = sync2.owlCarousel({
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    items: 1,
    loop: false,
    nav: false,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    onInitialized: function (e) {
      var thumbnailCurrentItem =  $(e.target).find(thumbnailItemClass).eq(this._current);
      thumbnailCurrentItem.addClass('synced');
    },
  }).on('click', thumbnailItemClass, function(e) {
    e.preventDefault();
    var duration = 300;
    var itemIndex =  $(e.target).parents(thumbnailItemClass).index();
    sync1.trigger('to.owl.carousel',[itemIndex, duration, true]);
  }).on("changed.owl.carousel", function (el) {
    var number = el.item.index;
    $owl_slider = sync1.data('owl.carousel');
    $owl_slider.to(number, 100, true);
  });








  $(".header-slider__play").click(function() {
    var  $video = $(".header-slider__video");
    $(".header-slider__play").addClass("is-hide");
    $(".header-slider__video").addClass("is-show");
    $(".header-slider__image").addClass("header-slider__image--white");
    $video[0].play();
  });



  $(".sidebar__list>p>a").click(function() {
    $("html, body").animate({
       scrollTop: $($(this).attr("href")).offset().top + "px"
    }, {
       duration: 600,
       easing: "swing"
    });
    return false;
 });

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

  $(function() {
    $("#webTicker").webTicker({
      duplicate: true,
      startEmpty: false
    });
  });

  $(function() {
    var Accordion = function(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;

      // Variables privadas
      var links = this.el.find(".link");
      // Evento
      links.on(
        "click",
        { el: this.el, multiple: this.multiple },
        this.dropdown
      );
    };

    Accordion.prototype.dropdown = function(e) {
      var $el = e.data.el;
      ($this = $(this)), ($next = $this.next());

      $next.slideToggle();
      $this.parent().toggleClass("open");

      if (!e.data.multiple) {
        $el
          .find(".submenu")
          .not($next)
          .slideUp()
          .parent()
          .removeClass("open");
      }
    };

    var accordion = new Accordion($("#accordion"), false);
  });

  $(".header-news__item").owlCarousel({
    animateOut: "fadeOut",
    loop: false,
    margin: 25,
    items: 3,
    nav: false,
    dots: false,
    smartSpeed: 450,
    navText: [
      "<img src='/templates/ksu/img/left.png' alt='left'>",
      "<img src='/templates/ksu/img/right.png' alt='right'>"
    ],
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
        dots: false,
        nav: false
      },
      412: {
        items: 1,
        dots: false,
        nav: false
      },
      // breakpoint from 480 up
      615: {
        items: 2,
        dots: false,
        nav: false
      },
      // breakpoint from 768 up
      768: {
        items: 3,
        dots: false,
        nav: false
      },
      991: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  });

  $(".certificate").owlCarousel({
    animateOut: "fadeOut",
    loop: false,
    margin: 15,
    items: 4,
    nav: true,
    dots: true,
    smartSpeed: 450,
    navText: [
      "<img src='/templates/ksu/img/left.png' alt='left'>",
      "<img src='/templates/ksu/img/right.png' alt='right'>"
    ],
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
        dots: false,
        nav: false
      },
      // breakpoint from 480 up
      615: {
        items: 2
      },
      // breakpoint from 768 up
      768: {
        items: 3
      },
      991: {
        items: 4
      },
      1200: {
        items: 4
      }
    }
  });

	$(".basic-research-slider").owlCarousel({
    animateOut: "fadeOut",
    loop: false,
		margin: 0,
    items: 4,
    nav: true,
		dots: true,
    smartSpeed: 450,
    navText: [
      "<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='left'>",
      "<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='right'>"
    ],
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
        dots: true,
        nav: false
      },
      // breakpoint from 480 up
      615: {
				items: 1,
				nav: true,
      },
      // breakpoint from 768 up
      768: {
				nav: true,
        items: 2
      },
      991: {
				nav: true,
        items: 3
      },
      1200: {
				nav: true,
        items: 4
      }
    }
	});

	$(".target-functions__item").owlCarousel({
    animateOut: "fadeOut",
    loop: false,
    margin: 0,
    items: 1,
    nav: true,
		dots: true,
    smartSpeed: 450,
    navText: [
      "<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='left'>",
      "<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='right'>"
    ],
    responsive: {
      // breakpoint from 0 up
      0: {
        dots: false,
        nav: false
      },
      // breakpoint from 480 up
      615: {
				nav: true,
      },
      // breakpoint from 768 up
      768: {
				nav: true,
      },
      991: {
				nav: true,
      },
      1200: {
				nav: true,
      }
    }
  });
  $(".slider-dep").owlCarousel({
    animateOut: "fadeOut",
    loop: false,
    margin: 30,
    items: 5,
    nav: true,
    dots: true,
    center:true,
    smartSpeed: 450,
    navText: [
      "<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='left'>",
      "<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='right'>"
    ],
    responsive: {
      // breakpoint from 0 up
      0: {
        dots: false,
        nav: false
      },
      // breakpoint from 480 up
      615: {
				nav: true,
      },
      // breakpoint from 768 up
      768: {
				nav: true,
      },
      991: {
				nav: true,
      },
      1200: {
				nav: true,
      }
    }
  });

  $(".header-slider").owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop: false,
    margin: 0,
    items: 1,
    nav: true,
    dots: false,
    smartSpeed: 350,
    navText: [
      "<img src='/img/icons/header/prev.svg' alt='left'>",
      "<img src='/img/icons/header/next.svg' alt='right'>"
    ],
  });

  // $(".header-slider").on('translate.owl.carousel', function (e) {
  //   var index = e.item.index;
  //   $('.header-slider__right').removeClass('animate__animated animate__flipInY--custom animate__deley-2s');
  //   $('.header-slider__right').eq(index).addClass('animate__animated animate__flipInY--custom animate__deley-2s');
  // });


  //Слайдер в шапке
  $(".content__title").owlCarousel({
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    autoplay: true,
    loop: false,
    margin: 0,
    items: 1,
    nav: false,
		dots: true,
    smartSpeed: 700,
  });

  //Актредитация
  $('[data-fancybox="certificate"]').fancybox({
    buttons: ["close"],
    modal: false,
    idleTime: 3,
    animationEffect: "zoom-in-out",
    animationDuration: 500,
    arrows: false,
    transitionDuration: 300
  });

  $('[data-fancybox="history"]').fancybox({
    buttons: ["close"],
    modal: false,
    idleTime: 3,
    animationEffect: "zoom-in-out",
    animationDuration: 500,
    arrows: false,
    transitionDuration: 300
  });
  

});
