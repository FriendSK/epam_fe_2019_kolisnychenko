import {validateRange} from './validation';
export default class Posts {
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

  calcRaitStars(value) {
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

  renderPost(post) {
    this.container.insertAdjacentHTML('beforeend', post);
  }

  deletePosts() {
    this.container.innerHTML = '';
  }
}
class VideoPost extends Post {
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
                                      <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user' />
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
                                  <button type='button' class='user-info__del-btn'>Delete post</button>
                                  <button type='button' class='user-info__edit-btn'>Edit post</button>
                              </div>
                          </div>
                        </div>`;
    this.deletePosts();
    this.renderPost(resHTML);
  }
}
class AudioPost extends Post {
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
                                          <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user' />
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
                                      <button type='button' class='user-info__del-btn'>Delete post</button>
                                      <button type='button' class='user-info__edit-btn'>Edit post</button>
                                  </div>
                              </div>
                          </div>`;
    this.renderPost(resHTML);
  }
}
class TextPost extends Post {
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
                                            <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user' />
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
                                        <button type='button' class='user-info__del-btn'>Delete post</button>
                                        <button type='button' class='user-info__edit-btn'>Edit post</button>
                                    </div>
                                </div>
                            </div>`;
    this.renderPost(resHTML);
  }
}
class EtcPost extends Post {
  render(el) {
    let resHTML = '';
    const stars = this.calcRaitStars(el.rating);
    resHTML = `<div class='row'>
                                  <div class='blog__wrapper'>
                                      <div class='blog__wrapper-right lower-block'>
                                          <div class='wrapper-right__user-info'>
                                              <img src='${el.userImg ? el.userImg : 'img/Grace.png'}' alt='user' />
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
                                          <button type='button' class='user-info__del-btn'>Delete post</button>
                                          <button type='button' class='user-info__edit-btn'>Edit post</button>
                                      </div>
                                  </div>
                              </div>`;
    this.renderPost(resHTML);
  }
}
