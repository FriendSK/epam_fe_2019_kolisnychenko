const doc = document;
const main = doc.querySelector('main');
let postsQuantity;

const addBtn = doc.querySelector('.header__add-button button');
const formWrapper = doc.querySelector('.header__form-wrapper');
const closeForm = doc.querySelector('.header__post-form-close');

closeForm.addEventListener('click', hideForm);

function hideForm() {
  formWrapper.style.display = 'none';
}

addBtn.addEventListener('click', showForm);

function showForm() {
  formWrapper.style.display = 'block';
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
    const posts = new Posts();
    const post = posts.create(el.typeOfPost, container);
    post.render(el);
  });
}

function renderFilterPost(blogPost, id) {
  const posts = new Posts();
  const post = posts.create(blogPost.typeOfPost, container);
  post.deletePosts();
  post.render(blogPost);
  const button = doc.querySelector('.user-info__btn');
  button.dataset.id = `${id}`;
}

const search = new Search();
search.showPreSelectedFilter();

window.addEventListener('beforeunload', removeEventListeners);

function removeEventListeners() {
  form.removeEventListener('submit', onSubmit);
  search.searchForm.removeEventListener('keyup', search.search);
  container.removeEventListener('click', goToPostPage);
  search.resetBtn.removeEventListener('click', search.resetFilter);
  closeForm.removeEventListener('click', hideForm);
  addBtn.removeEventListener('click', showForm);
}
