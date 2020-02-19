import '../scss/main4.scss';

const mediator = (function () {
  let subscribers = {};

  return {
    subscribe: (event, callback) => {
      subscribers[event] = subscribers[event] || [];
      subscribers[event].push(callback);
    },

    unsubscribe: (event, callback) => {
      let subscriberIndex;

      if (!event) {
        subscribers = {};
      } else if (event && !callback) {
        subscribers[event] = [];
      } else {
        subscriberIndex = subscribers[event].indexOf(callback);
        if (subscriberIndex > -1) {
          subscribers[event].splice(subscriberIndex, 1);
        }
      }
    },

    publish: (event, data, e) => {
      if (subscribers[event]) {
        subscribers[event].forEach((callback) => {
          callback(data, e);
        });
      }
    },
  };
})();
class Menu {
  constructor(articles, side) {
    this.side = side;
    this.articles = articles;
  }

  render() {
    const ul = document.createElement('ul');
    ul.className = 'menu__authors';
    this.articles.map((article) => {
      const menuItem = document.createElement('li');
      menuItem.className = 'menu__author';
      menuItem.dataset.name = (`${article.author}`);
      menuItem.innerHTML = `${article.author}`;
      ul.appendChild(menuItem);
    });
    document.querySelector(this.side).appendChild(ul);
  }
}

class TopMenu extends Menu {
  showTopPosts(articles, e) {
    if (e.target.tagName === 'LI') {
      const posts = document.querySelectorAll('.menu__posts');
      const index = articles.findIndex((article) => article.author === e.target.dataset.name || e.target.parentElement.dataset.name);
      const menuItem = document.createElement('span');
      menuItem.className = 'menu__posts';
      menuItem.innerHTML = `${articles[index].title}`;
      document.querySelectorAll('.top-menu .menu__author')[index].appendChild(menuItem);
      posts.forEach((elem) => {
        elem.remove();
      });
    }
  }
}

class AsideMenu extends Menu {
  showAsidePosts(articles, e) {
    if (e.target.tagName === 'LI') {
      const index = articles.findIndex((article) => article.author === e.target.dataset.name);
      const menuItem = document.createElement('span');
      menuItem.className = 'menu__posts';
      menuItem.innerHTML = `${articles[index].title}`;
      document.querySelectorAll('.aside-menu .menu__author')[index].appendChild(menuItem);
      const posts = document.querySelectorAll('.menu__posts');
      posts.forEach((item) => item.addEventListener('click', () => mediator.publish('clickOnArticle', articles[index])));
    }
  }

  swowPostDescr(article) {
    const container = document.querySelector('.post__content');
    container.innerHTML = '';
    container.innerHTML = ` <h2>${article.descr}</h2>`;
  }

  showActiveMenu(e) {
    const menuItems = document.querySelectorAll('.menu__author');
    const menuPosts = document.querySelectorAll('.menu__posts');
    const name = e.target.dataset.name;
    const items = [...menuItems];
    const posts = [...menuPosts];

    items.forEach((item) => {
      if (item.classList.contains('menu-active')) {
        item.classList.remove('menu-active');
      }
      if (item.dataset.name === name) {
        item.classList.add('menu-active');
      }
    });

    posts.forEach((item) => {
      item.classList.remove('menu-active');
      if (e.target.tagName === 'SPAN') {
        if (item.classList.contains('menu-active')) {
          item.classList.remove('menu-active');
        }
        item.classList.add('menu-active');
      }
    });
  }
}

const initMenu = () => {
  const fetchArticles = () => {
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
        createMenu(parsedResponse);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  fetchArticles();

  const createMenu = (articles) => {
    const topMenu = new TopMenu(articles, '.top-menu');
    topMenu.render();
    const asideMenu = new AsideMenu(articles, '.aside-menu');
    asideMenu.render();
    const menuItems = document.querySelectorAll('.menu__author');
    menuItems.forEach((item) => item.addEventListener('click', (e) => mediator.publish('clickOnAuthor', articles, e)));
    menuItems.forEach((item) => item.addEventListener('click', (e) => mediator.publish('activeClick', e)));
    mediator.subscribe('clickOnAuthor', topMenu.showTopPosts);
    mediator.subscribe('clickOnAuthor', asideMenu.showAsidePosts);
    mediator.subscribe('clickOnArticle', asideMenu.swowPostDescr);
    mediator.subscribe('activeClick', asideMenu.showActiveMenu);
  };
};

initMenu();
