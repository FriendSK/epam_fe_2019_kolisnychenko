const doc = document;
const main = doc.querySelector('main');
let postsQuantity;

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

const headerTitle = doc.querySelector('.header__title h2');
headerTitle.innerHTML = 'Blog';
const blogSection = doc.createElement('section');
blogSection.className = 'blog';
main.appendChild(blogSection);

const docFrag = doc.createDocumentFragment();

const container = doc.createElement('div');
container.className = 'container';
const container2 = doc.createElement('div');
container2.className = 'container';
docFrag.appendChild(container);
docFrag.appendChild(container2);
blogSection.appendChild(docFrag);
const divBtn = doc.createElement('div');
const bottomBtn = doc.createElement('button');
divBtn.className = 'bottom__button';
bottomBtn.innerText = 'Read more';
divBtn.appendChild(bottomBtn);
container2.appendChild(divBtn);

const renderContent = (posts) => {
  renderPosts(posts);
  const buttons = doc.querySelectorAll('.user-info__btn');
  buttons.forEach((el, i) => {
    el.dataset.id = `${i}`;
  });
};

container.addEventListener('click', goToPostPage);

function goToPostPage(e) {
  if (e.target.dataset.id) {
    localStorage.setItem('id', e.target.dataset.id);
    window.location.href = './post.html';
  }
}

class Posts {
  create(type, container) {
    let post;
    if (type === 'video') {
      post = new VideoPost(container);
    } else if (type === 'audio') {
      post = new AudioPost(container);
    } else if (type === 'text') {
      post = new TextPost(container);
    } else {
      post = new EtcPost(container);
    }
    return post;
  }
}

class Post {
  constructor(container) {
    this.container = container;
  }

  validateRange(value) {
    if (value < 0) {
      return false;
    }
    return true;
  }

  hasNumbersAndRequiredLength(value) {
    if (
      value.charCodeAt(0) === value.charAt(0).toUpperCase().charCodeAt(0) &&
      value.length > 2 &&
      value.length < 20
    ) {
      return true;
    }

    return false;
  }

  validateTitle(value) {
    for (let i = 0; i < value.length; i++) {
      if (isFinite(value.charAt(i))) {
        return false;
      }
    }

    if (this.hasNumbersAndRequiredLength(value)) {
      return true;
    }

    return false;
  }

  calcRaitStars(value) {
    const raiting = +value;
    const raitIndex = Math.floor(raiting);
    let raitingArray = [2, 2, 2, 2, 2];

    if (raiting > 5) {
      return (raitingArray = [1, 1, 1, 1, 1]);
    }

    if (this.validateRange(raiting)) {
      for (let i = 0; i < raiting; i++) {
        raitingArray[i] = 1;

        if (raiting < 1) {
          raitingArray[0] = 1.5;
        } else if (raitIndex !== raiting) {
          raitingArray[raitIndex] = 1.5;
        }
      }
    }
    return raitingArray;
  }

  renderPost(post) {
    this.container.insertAdjacentHTML('beforeend', post);
  }
}

function renderPosts(blogPosts) {
  blogPosts.forEach((el) => {
    const posts = new Posts();
    const post = posts.create(el.typeOfPost, container);
    post.render(el);
  });
}

class VideoPost extends Post {
  super() {}

  render(el) {
    let resHTML = '';
    const stars = this.calcRaitStars(el.rating);
    resHTML = `<div class='row'>
                        <div class='blog__wrapper'>
                            <div class='blog__wrapper-left'>
                             <video src='#' poster='${el.videoPoster ? el.videoPoster : 'img/Imgage_post1.png'}'></video>
                             <img class='play-btn' src='img/a-icon-play.svg' alt='play' />
                            </div>
                            <div class='blog__wrapper-right'>
                                <div class='wrapper-right__user-info'>
                                    <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user'>
                                    <div class='user-info__block'>
                                        <h4>${el.author}</h4>
                                        <span>${el.date} <span class='dot'></span>${el.read ? el.read : 0} min read<span class='dot'></span>
                                            <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments ? el.comments : 0}</span>
                                        <svg class='star'>
                                            <use href='img/sprite.svg#star${stars[0]}'></use>
                                        </svg>
                                        <svg class='star'>
                                            <use href='img/sprite.svg#star${stars[1]}'></use>
                                        </svg>
                                        <svg class='star'>
                                            <use href='img/sprite.svg#star${stars[2]}'></use>
                                        </svg>
                                        <svg class='star'>
                                            <use href='img/sprite.svg#star${stars[3]}'></use>
                                        </svg>
                                        <svg class='star'>
                                            <use href='img/sprite.svg#star${stars[4]}'></use>
                                        </svg>
                                    </div>
                                </div>
                                <div class='blog__wrapper-right--square'><img src='${el.img ? el.img : 'img/a-icon-playmini.svg'}' alt='play' />
                                </div>
                                <h3><a href='#'>${el.title}</a></h3>
                                <p>${el.descr}</p>
                                <button type='button' class='user-info__btn'>Read more</button>
                            </div>
                        </div>
                      </div>`;
    this.renderPost(resHTML);
  }
}

class AudioPost extends Post {
  super() {}

  render(el) {
    let resHTML = '';
    const stars = this.calcRaitStars(el.rating);
    resHTML = `<div class='row'>
                            <div class='blog__wrapper'>
                                <div class='blog__wrapper-left'>
                                <img class='blog__wrapper-left-img' src='${el.postImg ? el.postImg : 'img/Imgage_post2.png'}' alt='picture' />
                                </div>
                                <div class='blog__wrapper-right'>
                                    <div class='wrapper-right__user-info'>
                                        <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user'>
                                        <div class='user-info__block'>
                                            <h4>${el.author}</h4>
                                            <span>${el.date} <span class='dot'></span>${el.read ? el.read : 0} min read<span class='dot'></span>
                                                <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments ? el.comments : 0}</span>
                                            <svg class='star'>
                                                <use href='img/sprite.svg#star${stars[0]}'></use>
                                            </svg>
                                            <svg class='star'>
                                                <use href='img/sprite.svg#star${stars[1]}'></use>
                                            </svg>
                                            <svg class='star'>
                                                <use href='img/sprite.svg#star${stars[2]}'></use>
                                            </svg>
                                            <svg class='star'>
                                                <use href='img/sprite.svg#star${stars[3]}'></use>
                                            </svg>
                                            <svg class='star'>
                                                <use href='img/sprite.svg#star${stars[4]}'></use>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class='blog__wrapper-right--square'><img src='${el.img ? el.img : 'img/a-icon-melody.svg'}' alt='play' />
                                    </div>
                                    <h3><a href='#'>${el.title}</a></h3>
                                    <audio controls src='#'></audio>
                                    <p>${el.descr}</p>
                                    <button type='button' class='user-info__btn'>Read more</button>
                                </div>
                            </div>
                        </div>`;
    this.renderPost(resHTML);
  }
}

class TextPost extends Post {
  super() {}

  render(el) {
    let resHTML = '';
    const stars = this.calcRaitStars(el.rating);
    resHTML = `<div class='row'>
                              <div class='blog__wrapper'>
                                  <div class='blog__wrapper-left'>
                                  <img class='blog__wrapper-left-img' src='${el.postImg ? el.postImg : 'img/Imgage_post3.png'}' alt='picture' />
                                  </div>
                                  <div class='blog__wrapper-right'>
                                      <div class='wrapper-right__user-info'>
                                          <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user'>
                                          <div class='user-info__block'>
                                              <h4>${el.author}</h4>
                                              <span>${el.date} <span class='dot'></span>${el.read ? el.read : 0} min read<span class='dot'></span>
                                                  <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments ? el.comments : 0}</span>
                                              <svg class='star'>
                                                  <use href='img/sprite.svg#star${stars[0]}'></use>
                                              </svg>
                                              <svg class='star'>
                                                  <use href='img/sprite.svg#star${stars[1]}'></use>
                                              </svg>
                                              <svg class='star'>
                                                  <use href='img/sprite.svg#star${stars[2]}'></use>
                                              </svg>
                                              <svg class='star'>
                                                  <use href='img/sprite.svg#star${stars[3]}'></use>
                                              </svg>
                                              <svg class='star'>
                                                  <use href='img/sprite.svg#star${stars[4]}'></use>
                                              </svg>
                                          </div>
                                      </div>
                                      <div class='blog__wrapper-right--square'><img src='${el.img ? el.img : 'img/a-icon-picture.svg'}' alt='play' />
                                      </div>
                                      <h3><a href='#'>${el.title}</a></h3>
                                      <p>${el.descr}</p>
                                      <button type='button' class='user-info__btn'>Read more</button>
                                  </div>
                              </div>
                          </div>`;
    this.renderPost(resHTML);
  }
}

class EtcPost extends Post {
  super() {}

  render(el) {
    let resHTML = '';
    const stars = this.calcRaitStars(el.rating);
    resHTML = `<div class='row'>
                                <div class='blog__wrapper'>
                                    <div class='blog__wrapper-right lower-block'>
                                        <div class='wrapper-right__user-info'>
                                            <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user'>
                                            <div class='user-info__block'>
                                                <h4>${el.author}</h4>
                                                <span>${el.date} <span class='dot'></span>${el.read ? el.read : 0} min read<span class='dot'></span>
                                                    <img src='img/a-icon-comment.svg' alt='comment' />&nbsp;${el.comments ? el.comments : 0}</span>
                                                    <svg class='star'>
                                                    <use href='img/sprite.svg#star${stars[0]}'></use>
                                                </svg>
                                                <svg class='star'>
                                                    <use href='img/sprite.svg#star${stars[1]}'></use>
                                                </svg>
                                                <svg class='star'>
                                                    <use href='img/sprite.svg#star${stars[2]}'></use>
                                                </svg>
                                                <svg class='star'>
                                                    <use href='img/sprite.svg#star${stars[3]}'></use>
                                                </svg>
                                                <svg class='star'>
                                                    <use href='img/sprite.svg#star${stars[4]}'></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class='blog__wrapper-right--square'><img src='${el.img ? el.img : 'img/a-icon-text.svg'}' alt='text' /></div>
                                        <h3><a href='#'>${el.title}</a></h3>
                                        <p>${el.descr}</p>
                                        <button type='button' class='user-info__btn'>Read more</button>
                                    </div>
                                </div>
                            </div>`;
    this.renderPost(resHTML);
  }
}

fetchArticles();
