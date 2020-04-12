$(document).ready(function() {
  $(document).scroll(function() {
    var scrollHeight = $(document).scrollTop();
    if(scrollHeight > 20) {
      $(".header").addClass("is-shrunk");
      $(".header__cta-btn").addClass("off")
      $("nav").addClass("off")
    } else {
      
      $(".header").removeClass("is-shrunk");
     
      setTimeout(function() {
        $(".header__cta-btn").removeClass("off")
        $("nav").removeClass("off")
      }, 350);
    }
  })

  $(".header__responsive__icon").click(function() {
    $(".header__menu").addClass("is-opened")
    $("body").addClass("overflow-hidden")
  })

  $(".header__menu__close-btn").click(function() {
    $(".header__menu").removeClass("is-opened")
    $("body").removeClass("overflow-hidden")
  })
})