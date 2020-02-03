import '../scss/main4.scss';
import articles from './articles';

const mediator = (function () {
  const subscribers = {};

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

    publish: function (event, data, e) {
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
    articles.map((article) => {
      const menuItem = document.createElement('li');
      menuItem.className = 'menu__author';
      menuItem.dataset.name = (`${article.author}`)
      menuItem.innerHTML = `${article.author}`;
      ul.appendChild(menuItem);
    });
    document.querySelector(this.side).appendChild(ul);
  };
}

class TopMenu extends Menu {
  showTopPosts(articles, e) {
    const posts = document.querySelectorAll('.menu__posts');
    const index = articles.findIndex((article) => article.author === e.target.dataset.name);
    const menuItem = document.createElement('span');
    menuItem.className = 'menu__posts';
    menuItem.innerHTML = `${articles[index].title}`;
    document.querySelectorAll('.top-menu .menu__author')[index].appendChild(menuItem);
    posts.forEach((elem) => {
      elem.remove();
    });
  }
}

class AsideMenu extends Menu {
  showAsidePosts(articles, e) {
    const index = articles.findIndex((article) => article.author === e.target.dataset.name);
    const menuItem = document.createElement('span');
    menuItem.className = 'menu__posts';
    menuItem.innerHTML = `${articles[index].title}`;
    document.querySelectorAll('.aside-menu .menu__author')[index].appendChild(menuItem);
  }
}

const createMenu = (articles) => {
  const topMenu = new TopMenu(articles, '.top-menu');
  topMenu.render();
  const asideMenu = new AsideMenu(articles, '.aside-menu');
  asideMenu.render();
  const menuItems = document.querySelectorAll('.menu__author');
  menuItems.forEach((item) => item.addEventListener('click', (e) => mediator.publish('clickOnAuthor', articles, e)));
  mediator.subscribe('clickOnAuthor', topMenu.showTopPosts);
  mediator.subscribe('clickOnAuthor', asideMenu.showAsidePosts);
}

createMenu(articles);
