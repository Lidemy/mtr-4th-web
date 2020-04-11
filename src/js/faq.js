$(document).ready(function () {
  $(".faq__list__item").click(function (e) {
    e.preventDefault()
    $(this).toggleClass("active").siblings().removeClass("active")
  })
});
