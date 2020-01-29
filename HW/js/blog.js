import Posts from './postsFabric';
import {Search} from './search';
import {onSubmit, fetchArticles} from './fetchData';
import {createModalWindow} from './plugin';
import '../scss/main2.scss';

const doc = document;
let postsQuantity;
const main = doc.querySelector('main');

const addBtn = doc.querySelector('.header__add-button button');
const formWrapper = doc.querySelector('.header__form-wrapper');
const closeForm = doc.querySelector('.header__post-form-close');

closeForm.addEventListener('click', hideForm);

function hideForm() {
  formWrapper.style.display = 'none';
  $('#text').attr('disabled', false);
  $('#img').attr('disabled', false);
  $('#title').attr('disabled', false);
  $('#author').attr('disabled', false);
  $('#quote').attr('disabled', false);
}

addBtn.addEventListener('click', showForm);

function showForm() {
  formWrapper.style.display = 'block';
  $('#description').text('');
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

export const renderContent = (posts) => {
  renderPosts(posts);
  const buttons = doc.querySelectorAll('.user-info__btn');
  const buttons2 = doc.querySelectorAll('.user-info__edit-btn');
  posts.forEach((el, i) => {
    buttons[i].dataset.id = `${el._id}`;
    buttons2[i].dataset.id = `${el._id}`;
  });
};

container.addEventListener('click', goToPostPage);

function goToPostPage(e) {
  if (e.target.dataset.id && e.target.className === 'user-info__btn') {
    localStorage.setItem('id', e.target.dataset.id);
    window.location.href = './post.html';
  }
}

export function renderPosts(blogPosts) {
  blogPosts.forEach((el) => {
    const posts = new Posts();
    const post = posts.create(el.typeOfPost, container);
    post.render(el);
  });
}

export function renderFilterPost(blogPost, id) {
  const posts = new Posts();
  const post = posts.create(blogPost.typeOfPost, container);
  post.deletePosts();
  post.render(blogPost);
  const button = doc.querySelector('.user-info__btn');
  const button2 = doc.querySelector('.user-info__edit-btn');
  button.dataset._id = `${id}`;
  button2.dataset._id = `${id}`;
}

const search = new Search();
search.showPreSelectedFilter();

export const fetchSearchArticles = async () => {
  const URL = 'http://127.0.0.1:3000/api/articles';

  await fetch(URL, {
    method: 'get',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((articles) => search.showSearchResult(articles))

    .catch((error) => {
      throw new Error(error);
    });
};

function deletePostModal() {
  createModalWindow();
  jQuery().modal();
  jQuery('.ok-btn').on('click', deletePost);
  jQuery('.cancel-btn').on('click', closeModal);
  const id = this.previousElementSibling.dataset.id;

  function closeModal() {
    jQuery('.modal-window').remove();
    jQuery('.modal-wrapper').remove();
    jQuery('.ok-btn').off('click', deletePost);
    jQuery('.cancel-btn').off('click', closeModal);
  }

  function deletePost() {
    container.innerHTML = '';
    deleteArticle(id);
    jQuery('.modal-window').remove();
    jQuery('.modal-wrapper').remove();
    fetchArticles();
  }
}

const deleteArticle = (id) => {
  const URL = `http://127.0.0.1:3000/api/list/${id}`;

  fetch(URL, {
    method: 'delete',
  })
    .then(async (response) => {
      const parsedResponse = await response.json();

      if (response.ok) {
        return parsedResponse;
      }

      throw new Error(parsedResponse.message);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

function editPost(e) {
  const fetchSingleArticle = async (dataId) => {
    const URL = `http://127.0.0.1:3000/api/articles/${dataId}`;

    await fetch(URL, {
      method: 'get',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((article) => {
        localStorage.setItem('id', article.id);
        descrField.text(article.descr);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  fetchSingleArticle(e.target.dataset.id);
  showForm();
  $('#text').attr('disabled', true);
  $('#img').attr('disabled', true);
  $('#title').attr('disabled', true);
  $('#author').attr('disabled', true);
  const descrField = $('#description').text('');
  $('#quote').attr('disabled', true);
}

jQuery('body').on('click', '.user-info__del-btn', deletePostModal);
jQuery('body').on('click', '.user-info__edit-btn', editPost);
window.addEventListener('beforeunload', removeEventListeners);

function removeEventListeners() {
  form.removeEventListener('submit', onSubmit);
  search.searchForm.removeEventListener('keyup', search.search);
  container.removeEventListener('click', goToPostPage);
  search.resetBtn.removeEventListener('click', search.resetFilter);
  closeForm.removeEventListener('click', hideForm);
  addBtn.removeEventListener('click', showForm);
}

jQuery(window).on('unload', () => {
  jQuery('body').off('click', '**');
  jQuery('main').off('click', '.modal-wrapper', jQuery().closeModal);
  jQuery('main').off('click', '.modal-close', jQuery().closeModal);
  jQuery('main').off('keydown', 'main', jQuery().closeModal);
//   jQuery('.cancel-btn').off('click', jQuery().closeModal());
});
