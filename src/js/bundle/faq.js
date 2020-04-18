import $ from 'jquery';

$(document).ready(function () {
  $(".faq__list__item-link").click(function (e) {
    e.preventDefault()
    $(this).closest(".faq__list__item").toggleClass("active").siblings().removeClass("active")
  })
});
