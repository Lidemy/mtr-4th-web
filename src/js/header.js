import throttle from './throttle'

let timer;
let header = document.querySelector('.header')
let headerContent = document.querySelectorAll(
  '.header__cta-btn, .header__nav'
)

function setShrinkHeader() {
  clearTimeout(timer)

  if (window.pageYOffset > 120) {
    header.classList.add('is-shrunk')
    headerContent.forEach((content) => {
      content.classList.add('content-invisible')
    })
  } else {
    header.classList.remove('is-shrunk')
    timer = setTimeout(function () {
      headerContent.forEach((content) => {
        content.classList.remove('content-invisible')
      })
    }, 50)
  }
}

function openMenu() {
  // mobile menu open
  header.classList.toggle('menu-opened')

  // desktop nav shrink
  header.classList.toggle('is-shrunk')
  const isheaderShrunk = header.classList.contains('is-shrunk')

  if (isheaderShrunk) {
    headerContent.forEach((content) => {
      content.classList.add('content-invisible')
    })
  } else {
    setTimeout(function () {
      headerContent.forEach((content) => {
        content.classList.remove('content-invisible')
      })
    }, 50)
  }
}

document.addEventListener('scroll', throttle(setShrinkHeader, 200))
document.querySelector(".header__responsive__icon").addEventListener('click', openMenu)
