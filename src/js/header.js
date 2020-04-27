import $ from 'jquery';
import throttle from './throttle'

$(document).ready(function() {
  let timer;

  function setShrinkHeader() {
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
  }

  function openMenu() {
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
  }

  $(document).scroll(throttle(setShrinkHeader, 300))

  $(".header__responsive__icon").click(openMenu)
})