"use strict";

const imgList = [
  'img_1.jpg',
  'img_2.jpg',
  'img_3.jpg',
  'img_4.jpg'
];

let imgSlide = 0;
const slideCount = imgList.length;
const slideTime = 3;
let imageWidth;
let isSliding = true;
let slideInterval;

document.addEventListener("DOMContentLoaded", function () {
  generateImg();
  generateDots();

  const leftBack = document.querySelector('#leftBack');
  const rightNext = document.querySelector('#rightNext');
  const currentButtonContainer = document.querySelector('#current__button');
  const startStopButton = document.querySelector('#start-stop .stop');

  leftBack.addEventListener('click', onLeftClick);
  rightNext.addEventListener('click', onRightClick);
  currentButtonContainer.addEventListener('click', onDotClick);
  startStopButton.addEventListener('click', startStop)

  setTimeout(() => {
    imageWidth = document.querySelector('#imgContainer img').offsetWidth;
  }, 100);
});

function generateImg() {
  const imgContainer = document.querySelector('#imgContainer');
  let resultHtml = '';

  imgList.forEach(img => {
    resultHtml += `<img src="assets/images/${img}" alt="#">`;
  });

  imgContainer.innerHTML = resultHtml;
}

function generateDots() {
  const currentButtonContainer = document.querySelector('#current__button');
  let resultHtml = '';

  imgList.forEach((_, index) => {
    const classActive = index === 0 ? 'active' : '';
    resultHtml += `<div class="current__button-item ${classActive}" data-img="${index}"></div>`;
  });

  currentButtonContainer.innerHTML = resultHtml;
}

function onLeftClick() {
  imgSlide--;

  if (imgSlide < 0) {
    imgSlide = slideCount - 1;
  }

  updateSlide();
}

function onRightClick() {
  imgSlide++;

  if (imgSlide === slideCount) {
    imgSlide = 0;
  }

  updateSlide();
}

function onDotClick(event) {
  if (!event.target.classList.contains('current__button-item')) return;

  imgSlide = parseInt(event.target.dataset.img);
  updateSlide();
}

function updateSlide() {
  const imgContainer = document.querySelector('#imgContainer');

  imgContainer.style.transform = `translateX(-${imgSlide * imageWidth}px)`;
  imgContainer.style.transition = `transform ${slideTime}s ease-in-out`;

  refreshActiveDot();
}

function refreshActiveDot() {
  document.querySelectorAll('.current__button-item').forEach((dot, index) => {
    dot.classList.toggle('active', index === imgSlide);
  });
}
startAutoSlide();
function startAutoSlide() {
  slideInterval = setInterval(onRightClick, slideTime * 2000);
}

function startStop(event) {
  isSliding = !isSliding;
  event.target.classList.toggle("stooped");

  if (isSliding) {
    slideInterval = setInterval(onRightClick, slideTime * 2000);
  } else {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}