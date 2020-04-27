import throttle from './throttle';
import smoothscroll from 'smoothscroll-polyfill';

// Support safari scroll behavior
smoothscroll.polyfill();

function scrollToOffset(e, offset) {
  e.preventDefault();

  if ('top' === offset) {
    offset = 0;
  } else if (!offset) {
    const url = location.hash.substr(1);
    if (!url) return

    offset = document.querySelector(`.${url}`).offsetTop - 120;
  }

  window.scrollTo({
    top: offset,
    left: 0,
    behavior: 'smooth'
  });
}

const btnScroll = document.querySelector(".scroll-top-btn");

// Add scroll throttle
window.addEventListener('scroll', throttle(function() {
  if (window.pageYOffset > 900) {
    btnScroll.classList.remove("content-invisible") 
  } else {
    btnScroll.classList.add("content-invisible")
  }
}, 500))

// Add event listener
window.addEventListener('DOMContentLoaded', scrollToOffset);
window.addEventListener('hashchange', scrollToOffset);
btnScroll.addEventListener('click', function(e) { scrollToOffset(e, 'top') })