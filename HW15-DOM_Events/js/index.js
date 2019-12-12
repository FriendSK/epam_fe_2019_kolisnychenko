const doc = document;
const main = doc.querySelector('main');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'mock-data.json', false);
xhr.send();
const response = xhr.responseText;
const mockData = JSON.parse(response);

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

(function () {
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
                                <span class='portfolio__slider-arrows--right'></span>`;

  const row3 = doc.createElement('div');
  row3.className = 'row';
  container.appendChild(row3);
  row3.innerHTML = `<div class='portfolio__button'>
                        <button type='button'>See all works</button>
                     </div>`;

  const leftArrow = doc.querySelector('.portfolio__slider-arrows--left');
  const rightArrow = doc.querySelector('.portfolio__slider-arrows--right');
  const slidesContainer = doc.querySelector('.portfolio__container');
  const slidesBox = doc.querySelector('.portfolio__slider');
  const slides = doc.querySelectorAll('.portfolio__image');
  let index;

  leftArrow.addEventListener('click', moveSlidesToLeft);
  rightArrow.addEventListener('click', moveSlidesToRight);
  slidesBox.addEventListener('transitionend', changeSlides);

  function changeSlides() {
    if (index === -1) {
      slidesBox.appendChild(slidesBox.firstElementChild);
    } else if (index === 1) {
      slidesBox.prepend(slidesBox.lastElementChild);
    }

    slidesBox.style.transition = 'none';
    slidesBox.style.transform = 'translateX(0)';
    setTimeout(() => {
      slidesBox.style.transition = 'all .5s';
    });
  }

  const size = slidesBox.clientWidth;

  function moveSlidesToLeft() {
    index = 1;
    slidesBox.style.transform = `translateX(${size / slides.length}px)`;
  }

  function moveSlidesToRight() {
    index = -1;
    slidesBox.style.transform = `translateX(${-size / slides.length}px)`;
  }

  let timerId;
  timerId = setInterval(() => {
    moveSlidesToRight();
  }, 2500);

  row.onmouseleave = () => {
    timerId = setInterval(() => {
      moveSlidesToRight();
    }, 2500);
  };

  row.onmouseenter = () => {
    clearInterval(timerId);
  };

  const swipe = function (el) {
    let direction = 'none';
    let swipeType = 'none';
    let startX = 0;
    let distX = 0;
    let dist = 0;
    const minDist = 100;

    const checkStart = function (e) {
      startX = e.pageX;
      e.preventDefault;
    };

    const checkMove = function (e) {
      distX = e.pageX - startX;
      direction = distX < 0 ? 'right' : 'left';
      e.preventDefault;
    };

    const checkEnd = function (e) {
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
        el.dispatchEvent(swipeEvent);
      }
      e.preventDefault();
    };

    el.addEventListener('mousedown', checkStart);
    el.addEventListener('mousemove', checkMove);
    el.addEventListener('mouseup', checkEnd);
  };

  swipe(slidesContainer);

  slidesContainer.addEventListener('swipe', (e) => {
    if (e.detail.dir === 'left') {
      moveSlidesToLeft();
    } else if (e.detail.dir === 'right') {
      moveSlidesToRight();
    } else { return; }
  });
})();

(function () {
  const testimonialsSection = doc.createElement('section');
  testimonialsSection.className = 'testimonials';
  testimonialsSection.setAttribute('id', 'pages');
  main.appendChild(testimonialsSection);

  const container = doc.createElement('div');
  container.className = 'container';
  container.innerHTML = renderTitleAndDescr(mockData.testimonials);
  testimonialsSection.appendChild(container);

  const row = doc.createElement('div');
  row.className = 'row';
  container.appendChild(row);

  const testimonialsWrapper = doc.createElement('div');
  testimonialsWrapper.className = 'testimonials__wrapper';
  row.appendChild(testimonialsWrapper);
  const testimonialsBlock = doc.createElement('div');
  testimonialsBlock.className = 'testimonials__block';
  testimonialsWrapper.appendChild(testimonialsBlock);
  testimonialsBlock.innerHTML = renderSliderContent(mockData.testimonials);

  function renderSliderContent(testimonials) {
    let resHTML = '';
    testimonials.slider.forEach((el) => {
      resHTML += `<a href='#' class='testimonials__block--arrow-left'></a>
                    <div class='testimonials__block--left'>
                    <p class='quote'> <span>“</span> ${el.descr}</p>
                    <p class='name'>${el.name} </p>
                    <p class='prof'>${el.prof}</p>
                    </div>
                    <div class='testimonials__block--right'>
                    <img src='${el.img}' alt='user' /> </div>
                 <a href='#' class='testimonials__block--arrow-right'></a>`;
    });
    return resHTML;
  }
})();

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
