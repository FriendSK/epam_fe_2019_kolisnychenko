const doc = document;
const main = doc.querySelector('main');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'mock-data.json', false);
xhr.send();
const response = xhr.responseText;
const mockData = JSON.parse(response);

const headerTitle = doc.querySelector('.header__title h2');
headerTitle.innerHTML = `${mockData.postHeader.title}`;

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
  const postSection = doc.createElement('section');
  postSection.className = 'posts';
  main.appendChild(postSection);

  const container = doc.createElement('div');
  container.className = 'container';
  postSection.appendChild(container);

  const row = doc.createElement('div');
  row.className = 'row';
  container.appendChild(row);

  const postsWrapper = doc.createElement('div');
  postsWrapper.className = 'posts__wrapper';
  row.appendChild(postsWrapper);
  postsWrapper.innerHTML = renderPost(mockData.postContent);

  function renderPost(postContent) {
    const stars = calcRaitStars(postContent.rating);

    return ` <article>
                    <div class='posts__user-info'>
                        <img src='${postContent.userImg}' alt='user' />
                        <div class='user-info__block'>
                            <h4>${postContent.name}</h4>
                            <span>${postContent.date} <span class='dot'></span>${postContent.read} min read<span class='dot'></span>
                                <img src='img/a-icon-comment.svg' alt='comment' />&nbsp;${postContent.comments}</span>
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
                    <div class='posts__image'>
                        <img src='${postContent.postImg}' alt='table' />
                    </div>
                    <audio controls src='#'></audio>
                    <p>
                    ${postContent.part1}
                    </p>
                    <p>
                    ${postContent.part2}
                    </p>
                    <p>
                    ${postContent.part3}
                    </p>
               </article>`;
  }

  const rightSide = doc.createElement('div');
  rightSide.className = 'right-side';
  row.appendChild(rightSide);

  const rightSidePosts = doc.createElement('div');
  rightSidePosts.className = 'right-side__latest-posts';
  rightSide.appendChild(rightSidePosts);

  rightSidePosts.innerHTML = '<h2>Latest posts</h2>';
  rightSidePosts.innerHTML += renderLatestPosts(mockData.latestPosts);

  function renderLatestPosts(latestPosts) {
    let resHTML = '';
    latestPosts.forEach((el) => {
      resHTML += `<div class='latest-posts__wrapper'>
                    <img src='${el.postImg}' alt='post' />
                    <p>
                        <a href='#'> ${el.title}</a>
                    </p>
                    <div class='latest-posts__post-info'><span>${el.date} <span class='dot'></span>
                    ${el.read} min read<span class='dot'></span>
                    <img src='img/a-icon-comment.svg' alt='comment' /> ${el.comments}</span>
                    </div>
                 </div>
                 <div class='clearfix'></div>`;
    });
    return resHTML;
  }

  const lastPost = doc.querySelectorAll('.latest-posts__wrapper');
  lastPost[lastPost.length - 1].classList.add('no-border');
  const lastPostBtn = doc.createElement('button');
  lastPostBtn.innerText = 'More posts';
  lastPost[lastPost.length - 1].appendChild(lastPostBtn);

  const aside = doc.createElement('aside');
  rightSide.appendChild(aside);

  const categories = doc.createElement('div');
  categories.className = 'right-side__categories';
  aside.appendChild(categories);
  const categoriesTitle = doc.createElement('h2');
  categoriesTitle.innerHTML = 'Categories';
  categories.appendChild(categoriesTitle);
  const categoriesWrapper = doc.createElement('div');
  categoriesWrapper.className = 'categories__wrapper';
  categories.appendChild(categoriesWrapper);

  categoriesWrapper.innerHTML = renderCategories(mockData.categories);

  function renderCategories(categories) {
    let resHTML = '';
    categories.forEach((el) => {
      resHTML += `<div class='categories__section'>
                        <input type='checkbox' name='categories' id='${el.id}' hidden='hidden'>
                        <label for='${el.id}'>
                            <span>${el.title} (${el.list.length})</span> <img src='img/a-icon-arrow.svg' alt='arrow' />
                        </label>
                        <div class='clearfix'></div>`;

      if (el.list) {
        el.list.forEach((item) => resHTML += `<p><a href='#'>${item}</a></p>`);
      }
      resHTML += '</div>';
    });
    return resHTML;
  }
})();

(function () {
  const trendsSection = doc.createElement('section');
  trendsSection.className = 'trends';
  main.appendChild(trendsSection);

  const container = doc.createElement('div');
  container.className = 'container';
  trendsSection.appendChild(container);

  const row = doc.createElement('div');
  row.className = 'row';
  container.appendChild(row);

  const trendsWrapper = doc.createElement('div');
  trendsWrapper.className = 'trends__wrapper';
  row.appendChild(trendsWrapper);
  trendsWrapper.innerHTML = renderTrends(mockData.trends);

  function renderTrends(trendsContent) {
    return `<article>
                    <h2>${trendsContent.title}</h2>
                    <p>
                    ${trendsContent.descr1}
                    </p>
                    <p>${trendsContent.descr2}</p>
                    <div class='trends__artice'>
                        <p> ${trendsContent.descr3}</p>
                    </div>
                </article>
                <article>
                <h2>
                 ${trendsContent.title2}
                </h2>
                <p>
                ${trendsContent.descr4}
                </p>
            </article>
            <div class='trends__icons'>
            <span> <svg class='soc-icon--like'>
                    <use href='img/sprite.svg#like'></use>
                </svg>
                <svg class='soc-icon--like-hover'>
                    <use href='img/sprite.svg#like-hover'></use>
                </svg> <span class='likes'>${trendsContent.likes} likes</span></span>

            <div class='trends__soc-icons'>
                <svg class='soc-icon'>
                    <use href='img/sprite.svg#facebook'></use>
                </svg>
                <svg class='soc-icon'>
                    <use href='img/sprite.svg#dribble'></use>
                </svg>
                <svg class='soc-icon'>
                    <use href='img/sprite.svg#instagram'></use>
                </svg>
            </div>
        </div>`;
  }

  const aside = doc.createElement('aside');
  trendsWrapper.appendChild(aside);
  const tags = doc.createElement('div');
  tags.className = 'tags';
  aside.appendChild(tags);
  row.appendChild(aside);
  const tagsWrapper = doc.createElement('div');
  tagsWrapper.className = 'tags__wrapper';
  tags.appendChild(tagsWrapper);
  const tagsHeader = doc.createElement('h2');
  tagsHeader.innerText = 'Tags';
  tagsWrapper.appendChild(tagsHeader);
  const tagsContainer = doc.createElement('div');
  tagsContainer.className = 'tags__container';
  tagsWrapper.appendChild(tagsContainer);
  tagsContainer.innerHTML = renderTags(mockData.tags);

  function renderTags(tags) {
    let resHTML = '';
    tags.forEach((el) => {
      resHTML += `<button type='button'>${el}</button>`;
    });
    return resHTML;
  }
})();

(function () {
  const reviewsSection = doc.createElement('section');
  reviewsSection.className = 'reviews';
  main.appendChild(reviewsSection);

  const container = doc.createElement('div');
  container.className = 'container';
  reviewsSection.appendChild(container);

  const row = doc.createElement('div');
  row.className = 'row';
  container.appendChild(row);
  const reviewsWrapper = doc.createElement('div');
  reviewsWrapper.className = 'reviews__wrapper';
  row.appendChild(reviewsWrapper);
  const reviewsHeader = doc.createElement('h2');
  reviewsHeader.innerText = 'Reviews';
  reviewsWrapper.appendChild(reviewsHeader);
  const reviewsContainer = doc.createElement('div');
  reviewsContainer.className = 'reviews__container';
  reviewsWrapper.appendChild(reviewsContainer);
  reviewsContainer.innerHTML = renderReviews(mockData.reviews);

  function renderReviews(reviews) {
    let resHTML = '';
    reviews.forEach((el) => {
      const stars = calcRaitStars(el.rating);
      resHTML += `<div class='container__user-info'>
                        <img src='${el.userImg}' alt='user' />
                        <div class='user-info__block'>
                            <div>
                                <h4>${el.name}</h4>
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
                            <span>
                                <svg class='timer'>
                                    <use href='img/sprite.svg#timer'></use>
                                </svg>
                                <span class='time'>${el.time}</span>
                            </span>
                        </div>
                        <p>
                        ${el.descr}
                        </p>
                        <a href='#'>${el.link}</a>
                        <div class='clearfix'></div>
                  </div>`;
    });
    return resHTML;
  }

  const bottomBtn = doc.createElement('button');
  bottomBtn.innerText = 'More comments';
  reviewsWrapper.appendChild(bottomBtn);
})();
