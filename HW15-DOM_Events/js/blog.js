const doc = document;
const main = doc.querySelector('main');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'mock-data.json', false);
xhr.send();
const response = xhr.responseText;
const mockData = JSON.parse(response);

function validateRange(value) {
  if (value < 0) {
    return false;
  }
  return true;
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

(function () {
  const headerTitle = doc.querySelector('.header__title h2');
  headerTitle.innerHTML = `${mockData.blogHeader.title}`;
  const blogSection = doc.createElement('section');
  blogSection.className = 'blog';
  main.appendChild(blogSection);

  const docFrag = doc.createDocumentFragment();

  const container = doc.createElement('div');
  container.className = 'container';
  docFrag.appendChild(container);
  container.innerHTML = renderPosts(mockData.blogPosts);

  function renderPosts(blogPosts) {
    let resHTML = '';
    blogPosts.forEach((el) => {
      if (el.videoPoster) {
        const stars = calcRaitStars(el.rating);
        resHTML += `<div class='row'>
                          <div class='blog__wrapper'>
                              <div class='blog__wrapper-left'>
                               <video src='#' poster='${el.videoPoster}'></video>
                               <img class='play-btn' src='img/a-icon-play.svg' alt='play' />
                              </div>
                              <div class='blog__wrapper-right'>
                                  <div class='wrapper-right__user-info'>
                                      <img src='${el.userImg}' alt='user'>
                                      <div class='user-info__block'>
                                          <h4>${el.name}</h4>
                                          <span>${el.date} <span class='dot'></span>${el.read} min read<span class='dot'></span>
                                              <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments}</span>
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
                                  <div class='blog__wrapper-right--square'><img src='${el.img}' alt='play' />
                                  </div>
                                  <h3><a href='#'>${el.title}</a></h3>
                                  <p>${el.descr}</p>
                                  <button type='button'>Read more</button>
                              </div>
                          </div>
                        </div>`;
        return resHTML;
      } else if (el.audio) {
        const stars = calcRaitStars(el.rating);
        resHTML += `<div class='row'>
                            <div class='blog__wrapper'>
                                <div class='blog__wrapper-left'>
                                <img class='blog__wrapper-left-img' src='${el.postImg}' alt='picture' />
                                </div>
                                <div class='blog__wrapper-right'>
                                    <div class='wrapper-right__user-info'>
                                        <img src='${el.userImg}' alt='user'>
                                        <div class='user-info__block'>
                                            <h4>${el.name}</h4>
                                            <span>${el.date} <span class='dot'></span>${el.read} min read<span class='dot'></span>
                                                <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments}</span>
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
                                    <div class='blog__wrapper-right--square'><img src='${el.img}' alt='play' />
                                    </div>
                                    <h3><a href='#'>${el.title}</a></h3>
                                    <audio controls src='#'></audio>
                                    <p>${el.descr}</p>
                                    <button type='button'>Read more</button>
                                </div>
                            </div>
                        </div>`;
        return resHTML;
      } else {
        const stars = calcRaitStars(el.rating);
        resHTML += `<div class='row'>
                            <div class='blog__wrapper'>
                                <div class='blog__wrapper-left'>
                                <img class='blog__wrapper-left-img' src='${el.postImg}' alt='picture' />
                                </div>
                                <div class='blog__wrapper-right'>
                                    <div class='wrapper-right__user-info'>
                                        <img src='${el.userImg}' alt='user'>
                                        <div class='user-info__block'>
                                            <h4>${el.name}</h4>
                                            <span>${el.date} <span class='dot'></span>${el.read} min read<span class='dot'></span>
                                                <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments}</span>
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
                                    <div class='blog__wrapper-right--square'><img src='${el.img}' alt='play' />
                                    </div>
                                    <h3><a href='#'>${el.title}</a></h3>
                                    <p>${el.descr}</p>
                                    <button type='button'>Read more</button>
                                </div>
                            </div>
                        </div>`;
        return resHTML;
      }
    });
    return resHTML;
  }

  const container2 = doc.createElement('div');
  container2.className = 'container';
  docFrag.appendChild(container2);
  container2.innerHTML = renderTextPost(mockData.textPosts);
  blogSection.appendChild(docFrag);

  function renderTextPost(textPosts) {
    let resHTML = '';
    textPosts.forEach((el) => {
      const stars = calcRaitStars(el.rating);
      resHTML += `<div class='row'>
                                <div class='blog__wrapper'>
                                    <div class='blog__wrapper-right lower-block'>
                                        <div class='wrapper-right__user-info'>
                                            <img src='${el.userImg}' alt='user'>
                                            <div class='user-info__block'>
                                                <h4>${el.name}</h4>
                                                <span>${el.date} <span class='dot'></span>${el.read} min read<span class='dot'></span>
                                                    <img src='img/a-icon-comment.svg' alt='comment' />&nbsp;${el.comments}</span>
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
                                        <div class='blog__wrapper-right--square'><img src='img/a-icon-text.svg' alt='text' /></div>
                                        <h3><a href='#'>${el.title}</a></h3>
                                        <p>${el.descr}</p>
                                        <button type='button'>Read more</button>
                                    </div>
                                </div>
                            </div>`;
    });
    return resHTML;
  }

  const divBtn = doc.createElement('div');
  const bottomBtn = doc.createElement('button');
  divBtn.className = 'bottom__button';
  bottomBtn.innerText = 'Read more';
  divBtn.appendChild(bottomBtn);
  container2.appendChild(divBtn);
})();
