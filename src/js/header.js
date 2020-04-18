import $ from 'jquery';

$(document).ready(function() {
  let timer;
  $(document).scroll(function() {
    var scrollHeight = $(document).scrollTop();
    clearTimeout(timer)
    if(scrollHeight > 120) {
      $(".header").addClass("is-shrunk");
      $(".header__cta-btn, .header__nav").addClass("content-invisible")
    } else {
      $(".header").removeClass("is-shrunk");
      
      timer = setTimeout(function() {
        $(".header__cta-btn.content-invisible, .header__nav.content-invisible").removeClass("content-invisible")
      }, 50);
    }
  })

  $(".header__responsive__icon").click(function() {
    // rwd menu
    $(".header").toggleClass("menu-opened")

    // desktop nav shrink 
    $(".header").toggleClass("is-shrunk")

    if($('.header').hasClass('is-shrunk')) {
      $(".header__cta-btn, .header__nav").addClass("content-invisible")
    } else {
      setTimeout(function() {
        $(".header__cta-btn.content-invisible, .header__nav.content-invisible").removeClass("content-invisible")
      }, 50);
    }
  })
})