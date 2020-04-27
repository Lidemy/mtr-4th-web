import throttle from './throttle';

function scrollToHash(e) {
  e.preventDefault();

  const url = location.hash.substr(1);
  if (!url) return

  const target = document.querySelector(`.${url}`).offsetTop - 60;
  window.scrollTo({
    top: target,
    left: 0,
    behavior: 'smooth' // => 滑動效果
  });
}

['hashchange', 'DOMContentLoaded'].forEach(function (item) {
  window.addEventListener(item, scrollToHash);
});

document.querySelector(".scroll-top-btn").addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // => 滑動效果
  });
})

window.addEventListener('scroll', throttle(function() {
  let scrollBarPosition = window.pageYOffset
  if(scrollBarPosition > 900) {
    document.querySelector(".scroll-top-btn").classList.remove("content-invisible") 
  } else {
    document.querySelector(".scroll-top-btn").classList.add("content-invisible")
  }
}, 200))