import '../scss/main4.scss';
import articles from './articles';

const leftMenu = document.querySelector('.left-menu__authors ul');
const rightMenu = document.querySelector('.right-menu__authors ul');

const mediator = ( function () {
const subscribers = {};

return {
    subscribe: function (event, callback) {
        subscribers[event] = subscribers[event] || [];
        subscribers[event].push(callback);
    },

    unsubscribe: function (event, callback) {
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

    publish: function (event, data) {
      if (subscribers[event]) {
        subscribers[event].forEach(function (callback) {
          callback(data);
        });
      }
    },
  };
})();