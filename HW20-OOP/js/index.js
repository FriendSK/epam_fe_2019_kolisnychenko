const doc = document;
const main = doc.querySelector('main');
let postsQuantity;

function hasNumbersAndRequiredLength(value) {
  if (
    value.charCodeAt(0) === value.charAt(0).toUpperCase().charCodeAt(0) &&
    value.length > 2 &&
    value.length < 20
  ) {
    return true;
  }
  return false;
}

function validateTitle(value) {
  for (let i = 0; i < value.length; i++) {
    if (isFinite(value.charAt(i))) {
      return false;
    }
  }

  if (hasNumbersAndRequiredLength(value)) {
    return true;
  }

  return false;
}

function renderTitleAndDescr(section) {
  return `<div class='${section.name}__title'>
            <h2>${section.title}</h2>
            </div>
            <div class='bottom-line'> </div>
            <div class='${section.name}__description'>
            <p>${section.descr}</p>
          </div>`;
}

(function () {
  const addBtn = doc.querySelector('.header__add-button button');
  const formWrapper = doc.querySelector('.header__form-wrapper');
  const closeForm = doc.querySelector('.header__post-form-close');

  closeForm.onclick = function () {
    formWrapper.style.display = 'none';
  };

  addBtn.onclick = function () {
    formWrapper.style.display = 'block';
  };

  const form = doc.querySelector('.header__post-form form');
  form.addEventListener('submit', onSubmit);

  const headerTitle = doc.querySelector('.header__title h1');
  headerTitle.innerHTML = `${mockData.mainHeader.title}`;
  const headerDescr = doc.querySelector('.header__description p');
  headerDescr.innerHTML = `${mockData.mainHeader.descr}`;

  const aboutSection = doc.createElement('section');
  aboutSection.className = 'about';
  aboutSection.setAttribute('id', 'about');
  main.appendChild(aboutSection);

  const container = doc.createElement('div');
  container.className = 'container';
  container.innerHTML = renderTitleAndDescr(mockData.aboutUs);
  aboutSection.appendChild(container);

  const aboutInfo = doc.createElement('div');
  aboutInfo.className = 'about__info';
  container.appendChild(aboutInfo);

  const row = doc.createElement('div');
  row.className = 'row';
  aboutInfo.appendChild(row);

  const aboutInfoWrapper = doc.createElement('div');
  aboutInfoWrapper.className = 'about__info-wrapper';
  aboutInfoWrapper.innerHTML = renderAboutInfo(mockData.aboutUs);
  row.appendChild(aboutInfoWrapper);

  function renderAboutInfo(aboutUs) {
    let resHTML = '';
    aboutUs.aboutInfo.forEach((el) => {
      resHTML += `<div class='about__info-${el.blockName}'>
                    <div class='up-block'></div>
                    <div class='clearfix'></div>
                    <div class='bottom-block'>
                    <div class='bottom-block__image'></div>
                    <span>${el.name}</span>
                    </div>
                 </div>`;
    });
    return resHTML;
  }

  function setBgImage(aboutUs) {
    aboutUs.aboutInfo.forEach((el, i) => {
      const imgBlock = doc.querySelectorAll('.bottom-block__image');
      imgBlock[i].style.backgroundImage = `${el.bgImage}`;
    });
  }

  setBgImage(mockData.aboutUs);

  const aboutVideo = doc.createElement('div');
  aboutVideo.className = 'about__video';
  const playButton = doc.createElement('div');
  playButton.className = 'about__video-play';
  row.appendChild(aboutVideo);
  aboutVideo.appendChild(playButton);
  const video = doc.createElement('video');
  video.setAttribute('poster', `${mockData.videoPlayer.bgImage}`);
  aboutVideo.appendChild(video);
})();

(function () {
  const postsSection = doc.createElement('section');
  postsSection.className = 'posts';
  postsSection.setAttribute('id', 'blog');
  main.appendChild(postsSection);

  const container = doc.createElement('div');
  container.className = 'container';
  container.innerHTML = renderTitleAndDescr(mockData.posts);
  postsSection.appendChild(container);

  const row = doc.createElement('div');
  row.className = 'row';
  container.appendChild(row);
  row.innerHTML = renderPostsInfo(mockData.posts);

  function renderPostsInfo(posts) {
    let resHTML = '';
    posts.singlePost.forEach((el) => {
      resHTML += `<div class='posts__single-post'>
                    <img src=${el.img} />
                    <h3><a href='#'>${el.title}</a></h3>
                    <p>${el.descr}</p>
                    <span>${el.date} <span class='dot'></span>${el.read} min read<span class='dot'></span>
                    <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments}</span>
                 </div>`;
    });
    return resHTML;
  }
})();

const portfolioSection = doc.createElement('section');
portfolioSection.className = 'portfolio';
portfolioSection.setAttribute('id', 'portfolio');
main.appendChild(portfolioSection);

const container = doc.createElement('div');
container.className = 'container';
container.innerHTML = renderTitleAndDescr(mockData.portfolio);
portfolioSection.appendChild(container);

const row = doc.createElement('div');
row.className = 'row';
container.appendChild(row);
const sliderContainer = doc.createElement('div');
sliderContainer.className = 'portfolio__container';
const sliderWrapper = doc.createElement('div');
sliderWrapper.className = 'portfolio__wrapper';
const slider = doc.createElement('div');
slider.className = 'portfolio__slider';
row.appendChild(sliderContainer);
sliderContainer.appendChild(sliderWrapper);
sliderWrapper.appendChild(slider);
slider.innerHTML = renderPortfolio(mockData.portfolio);

function renderPortfolio(portfolio) {
  let resHTML = '';
  portfolio.slider.forEach((el) => {
    resHTML += ` <div class='portfolio__image'>
                            <a> <img src='${el.img}' />
                            <span class='image-title'>${el.title}</span>
                            <span class='image-descr'>${el.descr}</span>
                            <span class='controls-block'>
                            <svg class='controls-icon'>
                            <use href='img/sprite.svg#attach'></use>
                            </svg>
                            <svg class='controls-icon'>
                            <use href='img/sprite.svg#magnifying-glass'></use>
                            </svg></span></a>
                        </div>`;
  });
  return resHTML;
}

const row2 = doc.createElement('div');
row2.className = 'row';
row.appendChild(row2);
const arrowsWrapper = doc.createElement('div');
arrowsWrapper.className = 'portfolio__slider-arrows';
row2.appendChild(arrowsWrapper);
arrowsWrapper.innerHTML = `<span  class='portfolio__slider-arrows--left'></span>
                           <span  class='portfolio__slider-arrows--center'></span>
                           <span class='portfolio__slider-arrows--right'></span>`;

const row3 = doc.createElement('div');
row3.className = 'row';
container.appendChild(row3);
row3.innerHTML = `<div class='portfolio__button'>
                        <button type='button'>See all works</button>
                     </div>`;

function Slider(row, slidesContainer, slidesBox, slides, leftArrow, rightArrow) {
  this.row = row;
  this.slidesContainer = slidesContainer;
  this.slidesBox = slidesBox;
  this.slides = slides;
  this.leftArrow = leftArrow;
  this.rightArrow = rightArrow;
  this.timerId;
  this.toRight = true;
  let index;

  const changeSlides = function () {
    if (index === -1) {
      this.slidesBox.appendChild(this.slidesBox.firstElementChild);
    } else if (index === 1) {
      this.slidesBox.prepend(this.slidesBox.lastElementChild);
    }

    this.slidesBox.style.transition = 'none';
    this.slidesBox.style.transform = 'translateX(0)';
    setTimeout(() => {
      this.slidesBox.style.transition = 'all .5s';
    });
  }.bind(this);

  const size = this.slidesBox.clientWidth;

  this._moveSlidesToLeft = function () {
    index = 1;
    this.slidesBox.style.transform = `translateX(${size / this.slides.length}px)`;
  }.bind(this);

  this._moveSlidesToRight = function () {
    index = -1;
    this.slidesBox.style.transform = `translateX(${-size / this.slides.length}px)`;
  }.bind(this);

  this.leftArrow.addEventListener('click', this._moveSlidesToLeft);
  this.rightArrow.addEventListener('click', this._moveSlidesToRight);
  this.slidesBox.addEventListener('transitionend', changeSlides);

  const infinifiSwipe = () => {
    const func = this.toRight ? this._moveSlidesToRight : this._moveSlidesToLeft;
    this.timerId = setInterval(() => {
      func();
    }, 2500);

    const mouseLeave = () => {
      const func = this.toRight ? this._moveSlidesToRight : this._moveSlidesToLeft;
      this.timerId = setInterval(() => {
        func();
      }, 2500);
    };

    this.row.addEventListener('mouseleave', mouseLeave);

    const mouseEnter = () => {
      clearInterval(this.timerId);
    };

    this.row.addEventListener('mouseenter', mouseEnter);
  };

  this.startInfinitiSwiping = () => {
    infinifiSwipe();
  };

  this.removeEventListeners = () => {
    this.leftArrow.removeEventListener('click', this._moveSlidesToLeft);
    this.rightArrow.removeEventListener('click', this._moveSlidesToRight);
    this.slidesBox.removeEventListener('transitionend', changeSlides);
  };
}

const slidesContainer = doc.querySelector('.portfolio__container');
const slidesBox = doc.querySelector('.portfolio__slider');
const slides = doc.querySelectorAll('.portfolio__image');
const leftArrow = doc.querySelector('.portfolio__slider-arrows--left');
const rightArrow = doc.querySelector('.portfolio__slider-arrows--right');

function Slider1() {
  Slider.apply(this, arguments);

  const swipe = (container) => {
    let direction = 'none';
    let swipeType = 'none';
    let startX = 0;
    let distX = 0;
    let dist = 0;
    const minDist = 100;

    const checkStart = (e) => {
      startX = e.pageX;

      const checkMove = (e) => {
        distX = e.pageX - startX;
        direction = distX < 0 ? 'right' : 'left';
        e.preventDefault();
      };
      container.addEventListener('mousemove', checkMove);
      checkMove(e);
    };

    const checkEnd = (e) => {
      if (Math.abs(distX) >= minDist) {
        swipeType = direction;
      }
      dist = Math.abs(distX);

      if (swipeType !== 'none' && dist >= minDist) {
        const swipeEvent = new CustomEvent('swipe', {
          bubbles: true,
          cancelable: true,
          detail: {
            full: e,
            dir: swipeType,
            dist,
          },
        });
        container.dispatchEvent(swipeEvent);
      }
      e.preventDefault();
    };
    container.addEventListener('mousedown', checkStart);
    container.addEventListener('mouseup', checkEnd);
  };

  this.initSwiper = () => {
    swipe(this.row);
  };

  const swipeSlide = (e) => {
    if (e.detail.dir === 'left') {
      this._moveSlidesToLeft();
    } else if (e.detail.dir === 'right') {
      this._moveSlidesToRight();
    } else {
      return;
    }
  };

  this.row.addEventListener('swipe', swipeSlide);

  this.changeSwipeDirection = () => {
    this.toRight = !this.toRight;
  };

  const changeSlideDirectionBtn = doc.querySelector('.portfolio__slider-arrows--center');
  changeSlideDirectionBtn.addEventListener('click', this.changeSwipeDirection);

  const removeEventListeners = this.removeEventListeners;
  this.removeEventListeners = () => {
    removeEventListeners.call(this);
    changeSlideDirectionBtn.removeEventListener('click', this.changeSwipeDirection);
    this.row.removeEventListener('swipe', swipeSlide);
  };
}

const slider1 = new Slider1(row, slidesContainer, slidesBox, slides, leftArrow, rightArrow);

slider1.startInfinitiSwiping();
slider1.initSwiper();

const testimonialsSection = doc.createElement('section');
testimonialsSection.className = 'testimonials';
testimonialsSection.setAttribute('id', 'pages');
main.appendChild(testimonialsSection);

const container2 = doc.createElement('div');
container2.className = 'container';
container2.innerHTML = renderTitleAndDescr(mockData.testimonials);
testimonialsSection.appendChild(container2);

const row4 = doc.createElement('div');
row4.className = 'row';
container2.appendChild(row4);

const testimonialsWrapper = doc.createElement('div');
testimonialsWrapper.className = 'testimonials__wrapper';
row4.appendChild(testimonialsWrapper);
const testimonialsBlock = doc.createElement('div');
testimonialsBlock.className = 'testimonials__block';
const testimonialsContainer = doc.createElement('div');
testimonialsContainer.className = 'testimonials__container';
const arrows = `<a class='testimonials__arrow-left'></a>
                    <a class='testimonials__arrow-right'></a>`;
testimonialsContainer.insertAdjacentHTML('beforeend', arrows);
testimonialsWrapper.appendChild(testimonialsContainer);
const testimonialsSlider = doc.createElement('div');
testimonialsSlider.className = 'testimonials__slider';
testimonialsContainer.appendChild(testimonialsBlock);
testimonialsBlock.appendChild(testimonialsSlider);
testimonialsSlider.innerHTML = renderSliderContent(mockData.testimonials);

function renderSliderContent(testimonials) {
  let resHTML = '';
  testimonials.slider.forEach((el) => {
    resHTML += `
                    <div class='testimonials__slide'>
                    <div class='testimonials__block--left'>
                    <p class='quote'> <span>“</span> ${el.descr}</p>
                    <p class='name'>${el.name} </p>
                    <p class='prof'>${el.prof}</p>
                    </div>
                    <div class='testimonials__block--right'>
                    <img src='${el.img}' alt='user' /> </div>
                    </div>
                 `;
  });
  return resHTML;
}

const slidesContainer2 = doc.querySelector('.testimonials__wrapper');
const slidesBox2 = doc.querySelector('.testimonials__slider');
const slides2 = doc.querySelectorAll('.testimonials__slide');
const leftArrow2 = doc.querySelector('.testimonials__arrow-left');
const rightArrow2 = doc.querySelector('.testimonials__arrow-right');

function Slider2() {
  Slider.apply(this, arguments);

  this.changeSlidesByKeyboard = () => {
    doc.addEventListener('keydown', changeSlides);
  };

  const changeSlides = (e) => {
    clearInterval(this.timerId);
    if (e.key === 'ArrowLeft') {
      this._moveSlidesToLeft();
    } else if (e.key === 'ArrowRight') {
      this._moveSlidesToRight();
    } else {
      return;
    }
    this.startInfinitiSwiping();
  };

  const removeEventListeners = this.removeEventListeners;
  this.removeEventListeners = () => {
    removeEventListeners.call(this);
    doc.removeEventListener('keydown', changeSlides);
  };
}

const slider2 = new Slider2(row4, slidesContainer2, slidesBox2, slides2, leftArrow2, rightArrow2);
slider2.startInfinitiSwiping();
slider2.changeSlidesByKeyboard();

(function () {
  const contactsSection = doc.createElement('section');
  contactsSection.className = 'contacts';
  contactsSection.setAttribute('id', 'contact');
  main.appendChild(contactsSection);

  const container = doc.createElement('div');
  container.className = 'container';
  container.innerHTML = renderTitleAndDescr(mockData.contacts);
  contactsSection.appendChild(container);

  const row = doc.createElement('div');
  row.className = 'row';
  container.appendChild(row);

  const socIcons = doc.createElement('div');
  socIcons.className = 'contacts__soc-icons';
  row.appendChild(socIcons);
  socIcons.innerHTML = renderSocIcons(mockData.contacts);

  function renderSocIcons(contacts) {
    let resHTML = '';
    contacts.socIcons.forEach((el) => {
      resHTML += `<svg class='soc-icon'>
                    <use href='${el.path}'></use></svg>`;
    });
    return resHTML;
  }

  const contactsBlock = doc.createElement('div');
  contactsBlock.className = 'contacts__block';
  contactsSection.appendChild(contactsBlock);

  const container2 = doc.createElement('div');
  container2.className = 'container';
  contactsBlock.appendChild(container2);

  const row2 = doc.createElement('div');
  row2.className = 'row';
  container2.appendChild(row2);

  const blockLeft = doc.createElement('div');
  blockLeft.className = 'contacts__block-left';
  row2.appendChild(blockLeft);

  const h2 = doc.createElement('h2');
  h2.innerHTML = `${mockData.contacts.leftBlockTitle}`;

  const clearfix = doc.createElement('div');
  clearfix.className = 'clearfix';

  const blockLeftWrapper = doc.createElement('div');
  blockLeftWrapper.className = 'block-left__wrapper';

  const docFrag = doc.createDocumentFragment();
  docFrag.appendChild(h2);
  docFrag.appendChild(clearfix);
  docFrag.appendChild(blockLeftWrapper);
  blockLeft.appendChild(docFrag);

  blockLeftWrapper.innerHTML = renderQuestions(mockData.contacts);

  function renderQuestions(contacts) {
    let resHTML = '';
    contacts.questions.forEach((el, i) => {
      resHTML += `<div class='block-left__description'>
                    <span class='circle'><span class='dot'></span></span>
                    <h5>${i + 1}. <span> ${el.title}</span></h5>
                    <p> ${el.descr}</p> </div>`;
    });
    return resHTML;
  }

  const lastQuestion = doc.querySelectorAll('.block-left__description');
  lastQuestion[lastQuestion.length - 1].classList.add('no-border');

  const blockRight = doc.createElement('div');
  blockRight.className = 'contacts__block-right';
  row2.appendChild(blockRight);
  blockRight.innerHTML = renderForm(mockData.contacts);

  function renderForm(contacts) {
    let resHTML = '';
    resHTML = `<div class='clearfix'></div>
                            <div class='block-right__form'>
                                <div class='block-right__form-title'><img src='img/a-icon-mail.svg' alt='mail' />
                                    <p> Write us a few words about your project and we will prepare proposal for
                                        you within 24 hours</p>
                                </div>
                                <div class='block-right__wrapper'>
                                    <div class='row'>
                                        <form action='#' method='GET'>
                                            <label for='name'>
                                                <span class='input-name'>Your name</span>
                                                <input type='text' name='name' id='name'>
                                            </label>
                                            <label for='email'>
                                                <span class='input-name'>Email</span>
                                                <input type='email' name='email' id='email'>
                                            </label>
                                            <div class='password__wrapper'><label for='password'>
                                                    <span class='input-name'>Password</span></label>
                                                <span>
                                                    <img src='img/a-icon-showpass.svg' alt='eye' />
                                                    <span class='show-eye'> show</span></span>
                                            </div>
                                            <input type='password' name='password' id='password'>

                                            <button type='submit'>Send message</button>

                                            <p>If you need to have a DNA first, just contact us at <a
                                                    href='mailto:${contacts.email}'>
                                                    <span> email@gmail.com </span></a> </p>
                                        </form>
                                        <div class='block-right__map'><img src='${contacts.map}' alt='map' /></div>
                                    </div>
                                </div>
                            </div>`;
    return resHTML;
  }
})();

window.addEventListener('beforeunload', slider1.removeEventListeners);
window.addEventListener('beforeunload', slider2.removeEventListeners);
