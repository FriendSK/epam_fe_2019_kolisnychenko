import { fetchSearchArticles } from './fetchData';
import { fetchSingleArticle } from './fetchData';
import { fetchPostsQuantity } from './fetchData';
import { fetchArticles } from './fetchData';
export default class Search {
  constructor() {
    this.searchForm = document.getElementById('searchForm');
    this.searchForm.addEventListener('keyup', this.search);
    this.searchOutput = document.querySelector('.header__search-result');
    this.resetBtn = document.querySelector('.header__search-reset');
    this.resetBtn.addEventListener('click', this.resetFilter.bind(this));
  }

  search() {
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
