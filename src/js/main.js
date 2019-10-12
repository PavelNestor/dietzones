"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(function() {
  var menuOpen = $('#menu-open');
  var menuClose = $('#menu-close');
  var menuContent = $('#menu-mobile');

  const onToogleMenu = () => {
    menuContent.classList.toggle('menu-mobile_active');
  };

  menuOpen.addEventListener("click", onToogleMenu);
  menuClose.addEventListener("click", onToogleMenu);
})();

const handleSliderChange = () => {
  const carousel = $("[data-target='carousel']");
  const leftButton = $("[data-action='slideLeft']");
  const rightButton = $("[data-action='slideRight']");
  const card = carousel.querySelector("[data-target='card']");
  const dots = $$('.paginatecircle');
  const cardOffsetWidth = card.offsetWidth;

  const carouselWidth = carousel.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='card']").length;

  let offset = 0;
  carousel.style.transform = `translateX(${offset}px)`;
  const maxX = (cardCount - Math.floor(carouselWidth / cardOffsetWidth)) * cardOffsetWidth * -1;


  dots.forEach(dot => {
    let slideIndex = dot.dataset.index;
    
    dot.addEventListener('click', () => {
      offset = (cardOffsetWidth + cardMarginRight) * slideIndex * -1;
      carousel.style.transform = `translateX(${offset}px)`;
      dots.forEach(dot => dot.classList.remove('paginatecircle_active'));
      dot.classList.add('paginatecircle_active');
    });
  });

  const prevSlide = () => {
    if (offset < 0) {
      offset += cardOffsetWidth + cardMarginRight;
      carousel.style.transform = `translateX(${offset}px)`;
    }
  };

  const nextSlide = () => {
    if (offset >= maxX) {
      offset -= cardOffsetWidth + cardMarginRight;
      carousel.style.transform = `translateX(${offset}px)`;
    }
  };

  leftButton.addEventListener("click", prevSlide);
  rightButton.addEventListener("click", nextSlide);
};

//Navbar scrollBehavior
let prevScrollpos = 0;

const handleScrollBehavior = () => {
  const navbar = $("#navbar");
  let currentScrollPos = window.pageYOffset;

  if (currentScrollPos > 200 && prevScrollpos > currentScrollPos) {
    navbar.classList.add('navbar_active');
  } else {
    navbar.classList.remove('navbar_active');
  }

  prevScrollpos = currentScrollPos;
};

const ready = () => {
  handleSliderChange();
};

document.addEventListener('DOMContentLoaded', ready);
window.addEventListener('scroll', handleScrollBehavior);
window.addEventListener('resize', handleSliderChange);
