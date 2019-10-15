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

// main slider
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

// block slider
const handleBlockSliderChange = () => {
  const carouselTwo = $("[data-target='block-carousel']");
  const leftButtonTwo = $("[data-action='block-carousel-prev']");
  const rightButtonTwo = $("[data-action='block-carousel-next']");
  const cardTwo = carouselTwo.querySelector("[data-target='card']");
  const cardTwoOffsetWidth = cardTwo.offsetWidth;

  const carouselTwoWidth = carouselTwo.offsetWidth;
  const cardStyleTwo = cardTwo.currentStyle || window.getComputedStyle(cardTwo)
  const cardTwoMarginRight = Number(cardStyleTwo.marginRight.match(/\d+/g)[0]);
  const cardTwoCount = carouselTwo.querySelectorAll("[data-target='card']").length;

  let offsetTwo = 0;
  carouselTwo.style.transform = `translateX(${offsetTwo}px)`;
  const maxXTwo = (cardTwoCount - Math.floor(carouselTwoWidth / cardTwoOffsetWidth)) * cardTwoOffsetWidth * -1;

  const prevSlideTwo = () => {
    if (offsetTwo < 0) {
      offsetTwo += cardTwoOffsetWidth + cardTwoMarginRight;
      carouselTwo.style.transform = `translateX(${offsetTwo}px)`;
    }
  };

  const nextSlideTwo = () => {
    if (offsetTwo >= maxXTwo) {
      offsetTwo -= cardTwoOffsetWidth + cardTwoMarginRight;
      carouselTwo.style.transform = `translateX(${offsetTwo}px)`;
    }
  };

  leftButtonTwo.addEventListener("click", prevSlideTwo);
  rightButtonTwo.addEventListener("click", nextSlideTwo);
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

// card animation:
(function() {
  // Init
  const cardWrap = $("[data-target='block-carousel']");
  const container = cardWrap.querySelectorAll("[data-target='card']"),
    inner = $$("[data-target='inner']");

  // Mouse
  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(index, event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
    console.log('e', e);

      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    }
  };

  // Track the mouse position relative to the center of the container.
  container.forEach(cont => mouse.setOrigin(cont));

  //--------------------------------------------------

  var counter = 0;
  var updateRate = 1;
  var isTimeToUpdate = function() {
    return counter++ % updateRate === 0;
  };

  //--------------------------------------------------

  var onMouseEnterHandler = function(index, event) {
    console.log('event', event);
    console.log('index', index);
    
    update(index, event);
  };

  var onMouseLeaveHandler = function(index) {
    inner[index].style = "";
  };

  var onMouseMoveHandler = function(index, event) {
    if (isTimeToUpdate()) {
      update(index, event);
    };
  };

  //--------------------------------------------------

  var updateTransformStyle = function(index, x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner[index].style.transform = style;
    inner[index].style.webkitTransform = style;
    inner[index].style.mozTransform = style;
    inner[index].style.msTransform = style;
    inner[index].style.oTransform = style;
  };

  var update = function(index, event) {
    mouse.updatePosition(index, event);
    updateTransformStyle(index,
      (mouse.y / inner[index].offsetHeight/2).toFixed(2),
      (mouse.x / inner[index].offsetWidth/2).toFixed(2)
    );
  };

  //--------------------------------------------------

  container.forEach((cont, index) => {
    cont.onmouseenter = event => onMouseEnterHandler(index, event);
    cont.onmouseleave = event => onMouseLeaveHandler(index);
    cont.onmousemove = event => onMouseMoveHandler(index, event);
  });
})();

const ready = () => {
  handleSliderChange();
  handleBlockSliderChange();
};

document.addEventListener('DOMContentLoaded', ready);
window.addEventListener('scroll', handleScrollBehavior);
window.addEventListener('resize', handleSliderChange);
window.addEventListener('resize', handleBlockSliderChange);
