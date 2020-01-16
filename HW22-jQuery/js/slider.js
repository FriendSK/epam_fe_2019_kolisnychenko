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
