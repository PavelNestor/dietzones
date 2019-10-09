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

{
  const carousel = $("[data-target='carousel']");
  const leftButton = $("[data-action='slideLeft']");
  const rightButton = $("[data-action='slideRight']");
  const card = carousel.querySelector("[data-target='card']");

  const carouselWidth = carousel.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

  console.log('carouselWidth', carouselWidth);
  console.log('cardMarginRight', cardMarginRight);
  console.log('cardStyle', card.offsetWidth);
  

  const cardCount = carousel.querySelectorAll("[data-target='card']").length;
  console.log('cardCount', cardCount);

  let offset = 0;
  const maxX = -((cardCount / 3) * carouselWidth + 
                (cardMarginRight * (cardCount / 3)) - 
                carouselWidth - cardMarginRight);

  console.log('maxX', maxX);

  const prevSlide = () => {
  console.log('offset', offset);

    if (offset < 0) {
      offset += card.offsetWidth + cardMarginRight;
      carousel.style.transform = `translateX(${card.offsetWidth}px)`;
      }
  };

  const nextSlide = () => {
  console.log('offset', offset);

    if (offset >= maxX) {
      offset -= card.offsetWidth + cardMarginRight;
      carousel.style.transform = `translateX(${-card.offsetWidth}px)`;
    }
  };

  leftButton.addEventListener("click", prevSlide);
  rightButton.addEventListener("click", nextSlide);
}
