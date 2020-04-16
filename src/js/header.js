$(document).ready(function() {
  $(document).scroll(function() {
    var scrollHeight = $(document).scrollTop();
    if(scrollHeight > 120) {
      $(".header").addClass("is-shrunk");
      $(".header__cta-btn, .header__nav").addClass("off")
    } else {
      $(".header").removeClass("is-shrunk");
     
      setTimeout(function() {
        $(".header__cta-btn.off, .header__nav.off").removeClass("off")
      }, 500);
    }
  })

  $(".header__responsive__icon").click(function() {
    $("body").addClass("is-menu-opened")
  })

  $(".header__menu__close-btn").click(function() {
    $("body").removeClass("is-menu-opened")
  })
})