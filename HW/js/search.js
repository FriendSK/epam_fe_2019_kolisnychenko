import {renderContent, fetchSearchArticles, renderFilterPost} from './blog';

let postsQuantity;

export class Search {
  constructor() {
    this.searchForm = document.getElementById('searchForm');
    this.searchForm.addEventListener('keyup', this.searchPosts);
    this.searchOutput = document.querySelector('.header__search-result');
    this.resetBtn = document.querySelector('.header__search-reset');
    this.resetBtn.addEventListener('click', this.resetFilter.bind(this));
  }

  searchPosts() {
    fetchSearchArticles();
  }

  showSearchResult(articles) {
    const inputValue = this.searchForm.value.toLowerCase();
    this.searchOutput.style.display = 'none';
    this.searchOutput.innerHTML = '';

    for (let i = 0; i < articles.length; i++) {
      if (articles[i].author.toLowerCase().search(inputValue.toLowerCase()) > -1) {
        this.searchOutput.style.display = 'block';
        this.searchOutput.innerHTML += `<div class="header__search-info" data-id=${articles[i].id}> <img src='${articles[i].userImg}' alt='user'/>
                     <h4>${articles[i].author}</h4> </div>`;
      } else if (articles[i].title.toLowerCase().search(inputValue.toLowerCase()) > -1) {
        this.searchOutput.style.display = 'block';
        this.searchOutput.innerHTML += `<div class="header__search-info" data-id=${articles[i].id}>
                        <h4>${articles[i].title}</h4> </div>`;
      }
    }
    if (this.searchOutput.innerHTML === '') {
      this.searchOutput.style.display = 'block';
      this.searchOutput.innerHTML = '<p>No search results</p>';
    } else if (inputValue === '') {
      this.searchOutput.style.display = 'none';
    }

    const searchInfo = document.querySelector('.header__search-result');
    searchInfo.addEventListener('click', this.showPost.bind(this));
  }

  showPost(e) {
    const id = e.target.dataset.id || e.target.parentNode.dataset.id;
    this.resetBtn.style.display = 'block';
    if (id) {
      localStorage.setItem('filter-id', id);
    }

    fetchSingleArticle(id);
    this.searchOutput.style.display = 'none';
    this.searchForm.value = '';
  }

  showPreSelectedFilter() {
    const id = localStorage.getItem('filter-id');
    if (id) {
      this.resetBtn.style.display = 'block';
      fetchPostsQuantity();
      fetchSingleArticle();
    } else {
      fetchArticles();
    }
  }

  resetFilter() {
    localStorage.removeItem('filter-id');
    fetchArticles();
    this.resetBtn.style.display = 'none';
  }
}

export const fetchArticles = () => {
  const URL = 'http://127.0.0.1:3000/api/articles';

  fetch(URL, {
    method: 'get',
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
      throw new Error(error);
    });
};

const fetchSingleArticle = async (dataId) => {
  const id = localStorage.getItem('filter-id');

  const URL = `http://127.0.0.1:3000/api/articles/${id}`;

  await fetch(URL, {
    method: 'get',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((article) => renderFilterPost(article, dataId))
    .catch((error) => {
      throw new Error(error);
    });
};

export const fetchPostsQuantity = () => {
  const URL = 'http://127.0.0.1:3000/api/articles';

  fetch(URL, {
    method: 'get',
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
    })
    .catch((error) => {
      throw new Error(error);
    });
};