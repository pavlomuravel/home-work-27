"use strict";

const imgList = [
  'img_1.jpg',
  'img_2.jpg',
  'img_3.jpg',
  'img_4.jpg',
];

let position = 0;
const leftNextElement = document.querySelector("#leftNext");
const rightNextElement = document.querySelector("#rightNext");
const imgContainer = document.querySelector("#imgContainer img");

function leftNextClick() {
  position += 100;
  imgContainer.style.transform = `translateX(${position}%)`;
};
function rightNextClick() {
  position -= 100;
  imgContainer.style.transform = `translateX(${position}%)`;

};
leftNextElement.addEventListener("click", leftNextClick);
rightNextElement.addEventListener("click", rightNextClick);

