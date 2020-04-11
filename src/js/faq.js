$(document).ready(function () {
  $(".faq__list__item").click(function (e) {
    e.preventDefault()
    $(this).siblings().removeClass("active")
    $(this).toggleClass("active")
  })
});
