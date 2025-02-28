const imgsLinks = [
  'dragon_fly_jaws_69221_1920x1080.jpg',
  'light_beam_1326875_1920x1080.jpg',
  'treble_clef_musical_notes_multicolored_121263_1920x1080.jpg',
  'girl_hat_bw_132197_1920x1080.jpg'
];

let currentSlide = 0;
const slideCount = imgsLinks.length;
let imageWidth;
let isSliding = false;
let slidingIntervalId;
const slideTime = 1; // sec

generateImgs();
generateDots();
const leftElem = document.querySelector('#slider .left');
const rightElem = document.querySelector('#slider .right');
const imgContainerElem = document.querySelector('#slider .image-container');
const slideButtonsElem = document.querySelector('#slider .slide-buttons');
const firstImageElem = document.querySelector('#slider img');
const startStopElem = document.querySelector('#slider .start-sliding-button');

// count image width
imageWidth = firstImageElem.offsetWidth;

// subscribing for events
leftElem.addEventListener('click', onLeftClick);
rightElem.addEventListener('click', onRightClick);
slideButtonsElem.addEventListener('click', onDotClick);
startStopElem.addEventListener('click', startStopSliding);


function generateImgs() {
  let resultHtml = '';
  imgsLinks.forEach(imgLink => {
    resultHtml += `<img src="img/${imgLink}" alt="">`;
  })
  document.querySelector('#slider .image-container').innerHTML = resultHtml;
}

function generateDots() {
  let resultHtml = '';
  imgsLinks.forEach((imgLink, index) => {
    const activeClass = index === 0 ? 'active' : '';
    resultHtml += `<div class="slide-button ${activeClass}" data-img="${index}"></div>`;
  })
  document.querySelector('#slider .slide-buttons').innerHTML = resultHtml;
}


// listeners
function onLeftClick() {
  currentSlide--;

  if(currentSlide < 0) {
    currentSlide = slideCount - 1;
  }

  imgContainerElem.style.transform = `translate(-${currentSlide * firstImageElem.offsetWidth}px)`;
  refreshActiveDot();
}

function onRightClick() {
  currentSlide++;

  if(currentSlide === slideCount) {
    currentSlide = 0;
  }

  imgContainerElem.style.transform = `translate(-${currentSlide * firstImageElem.offsetWidth}px)`;
  refreshActiveDot();
}

function onDotClick(event) {
  if (!event.target.classList.contains('slide-button')) {
    return;
  }

  currentSlide = event.target.dataset.img;
  imgContainerElem.style.transform = `translate(-${currentSlide * firstImageElem.offsetWidth}px)`;

  refreshActiveDot();
}

function refreshActiveDot() {
  const activeDotElem = document.querySelector('#slider .active');
  if (activeDotElem) {
    activeDotElem.classList.remove('active');
  }

  document.querySelector(`#slider div[data-img="${currentSlide}"]`)
    .classList.add('active');
}

function startStopSliding(event) {
  isSliding = !isSliding;
  event.target.classList.toggle('stopped');

  if (isSliding) {
    slidingIntervalId = setInterval(onRightClick, slideTime * 1000);
  } else {
    clearInterval(slidingIntervalId);
    slidingIntervalId = null;
  }
}