$(document).ready(function(){
  $(".faq__list > .faq__list__item.active").children(".faq__list__item-content").slideDown();

  $(".faq__list > .faq__list__item").click(function(e) {
    e.preventDefault()
    $(".faq__list__item").removeClass("active").children(".faq__list__item-content").slideUp("slow");
    $(this).toggleClass("active").children(".faq__list__item-content").slideToggle("slow")
  })
});
