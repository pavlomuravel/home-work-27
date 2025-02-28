"use strict";

const imgList = [
  'img_1.jpg',
  'img_2.jpg',
  'img_3.jpg',
  'img_4.jpg'
];

let imgSlaid = 0;
const slaidCount = imgList.length;
let imageWidth;
let isSlaiding = false;
let slidingIntervalId;
const slideTime = 1;

generateImg();
generateDots();


const leftBack = document.querySelector('#leftBack');
const rightNext = document.querySelector('#rightNext');
const imgConteiner = document.querySelector('#imgContainer');
const firstImg = document.querySelector('#imgContainer img');
const currentbutton = document.querySelector('#current__button');


imageWidth = firstImg.offsetWidth;

leftBack.addEventListener('click', onLeftClick);
rightNext.addEventListener('click', onRightClick);
currentbutton.addEventListener('click', onDotClick);

function generateImg() {
  let resultHtml = '';
  imgList.forEach(imgList => {
    resultHtml += `<img src="assets/images/${imgList}" alt="#">`;

  })
  document.querySelector('#carousel .carousel__container #imgContainer').innerHTML = resultHtml;
  return resultHtml;
};

function generateDots() {
  let resultHtml = '';
  imgList.forEach((imgList, index) => {
    const activeDot = index === 0 ? 'active' : '';
    resultHtml += `<div class="current__button-item ${activeDot}" data-img="${index}"></div>`;
  })

  document.querySelector('#carousel #current__button').innerHTML = resultHtml;

};

function onDotClick() {
  let resultHtml = '';
  imgList.forEach((imgList, index) => {
    const classActive = index === 0 ? 'active' : '';
    resultHtml += `<div class="current__button-item ${classActive}" data-img="${index}"></div>`;
  })
  document.querySelector('#carousel #current__button').innerHTML = resultHtml;
};

function onLeftClick() {
  imgSlaid--;

  if(imgSlaid < 0) {
    imgSlaid = slaidCount - 1;
  }

  imgConteiner.style.transform = `translate(-${imgSlaid * firstImg.offsetWidth}px)`;
  refreshActiveDot();
};
function onRightClick() {
  imgSlaid++;

  if(imgSlaid === slaidCount) {
    imgSlaid = 0;
  }

  imgConteiner.style.transform = `translate(-${imgSlaid * firstImg.offsetWidth}px)`;
  refreshActiveDot();
};

function refreshActiveDot() {
  const activeDot = document.querySelector('#current__button .active');

  if(activeDot) {
    activeDot.classList.remove('active');
  }
}