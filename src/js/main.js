"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// (function() {
//   var menuImg = document.getElementById("menu-image");
//   var menuClose = document.getElementById("menu-close");
//   var menuContent = document.getElementById("menu-content");

//   const onToogleMenu = () => {
//     menuContent.classList.toggle("menu-show");
//   };

//   menuImg.addEventListener("click", onToogleMenu);
//   menuImg.addEventListener("touch", onToogleMenu);
//   menuClose.addEventListener("click", onToogleMenu);
// })();

const handleSliderChange = () => {
  const carousel = $("[data-target='carousel']");
  const leftButton = $("[data-action='slideLeft']");
  const rightButton = $("[data-action='slideRight']");
  const card = carousel.querySelector("[data-target='card']");
  const cardOffsetWidth = card.offsetWidth;

  const carouselWidth = carousel.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='card']").length;

  let offset = 0;
  carousel.style.transform = `translateX(${offset}px)`;
  const maxX = (cardCount - carouselWidth / cardOffsetWidth) * cardOffsetWidth * -1;

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

const ready = () => {
  handleSliderChange();
};

document.addEventListener('DOMContentLoaded', ready);
window.addEventListener('resize', handleSliderChange);
