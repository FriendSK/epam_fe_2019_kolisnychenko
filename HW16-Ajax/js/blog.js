const doc = document;
const main = doc.querySelector('main');
let postsQuantity;

function validateRange(value) {
  if (value < 0) {
    return false;
  }
  return true;
}

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

function calcRaitStars(value) {
  const raiting = +value;
  const raitIndex = Math.floor(raiting);
  let raitingArray = [2, 2, 2, 2, 2];

  if (raiting > 5) {
    return (raitingArray = [1, 1, 1, 1, 1]);
  }

  if (validateRange(raiting)) {
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

const addBtn = doc.querySelector('.header__add-button button');
const formWrapper = doc.querySelector('.header__form-wrapper');
const closeForm = doc.querySelector('.header__post-form-close');

closeForm.onclick = function () {
  formWrapper.style.display = 'none';
};

addBtn.onclick = function () {
  formWrapper.style.display = 'block';
};

const sendFormData = (data) => {
  const URL = 'http://127.0.0.1:3000/api/create-article';

  fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        localStorage.setItem('id', data.id);
        window.location.href = './post.html';
        return;
      }
    })
    .catch((error) => {
      alert(`error while fetching ${error}`);
    });
};

function onSubmit(e) {
  e.preventDefault();

  const titleField = doc.querySelector('.post-form__title input');
  const title = e.target.title.value;

  if (!validateTitle(title)) {
    titleField.className = 'error';
    return;
  }

  const options = {
    year: 'numeric',
    day: 'numeric',
    weekday: 'short',
    timezone: 'UTC',
  };

  const dateUTC = new Date();

  const typeOfPost = doc.querySelector('input[name="typeOfPost"]:checked').id;
  const userImg = e.target.img.value;
  const author = e.target.author.value;
  const descr = e.target.description.value;
  const quote = e.target.quote.value;
  const date = dateUTC.toLocaleString('en-US', options);
  const id = postsQuantity++;

  sendFormData({typeOfPost, userImg, title, author, descr, quote, date, id});
}

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

function renderPosts(blogPosts) {
  blogPosts.forEach((el) => {
    if (el.typeOfPost === 'video') {
      let resHTML = '';
      const stars = calcRaitStars(el.rating);
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
      container.insertAdjacentHTML('beforeend', resHTML);
    } else if (el.typeOfPost === 'audio') {
      let resHTML = '';
      const stars = calcRaitStars(el.rating);
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
      container.insertAdjacentHTML('beforeend', resHTML);
    } else if (el.typeOfPost === 'text') {
      let resHTML = '';
      const stars = calcRaitStars(el.rating);
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
      container.insertAdjacentHTML('beforeend', resHTML);
    } else {
      let resHTML = '';
      const stars = calcRaitStars(el.rating);
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
      container.insertAdjacentHTML('beforeend', resHTML);
    }
  });
}

const fetchArticles = () => {
  const URL = 'http://127.0.0.1:3000/api/list';

  fetch(URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      const parsedResponse = await response.json();

      if (response.ok) {
        return parsedResponse;
      }

      throw new Error(parsedResponse.message);
    })

    .then((parsedResponse) => {
      postsQuantity = parsedResponse.length;
      renderContent(parsedResponse);
    })
    .catch((error) => {
      alert(error);
      window.location.href = './index.html';
    });
};

fetchArticles();