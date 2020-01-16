const xhr = new XMLHttpRequest();
xhr.open('GET', 'mock-data.json', false);
xhr.send();
const response = xhr.responseText;
const mockData = JSON.parse(response);

const sendFormData = (data) => {
  const URL = 'http://127.0.0.1:3000/api/create-article';

  fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        localStorage.setItem('id', data.id);
        window.location.href = './post.html';
        return;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

function onSubmit(e) {
  e.preventDefault();

  const titleField = doc.querySelector('.post-form__title input');
  const title = e.target.title.value;

  if (!validateTitle(title)) {
    titleField.className = 'error';
    return;
  }

  const options = {
    year: 'numeric',
    day: 'numeric',
    weekday: 'short',
    timezone: 'UTC',
  };

  const dateUTC = new Date();

  const typeOfPost = doc.querySelector('input[name="typeOfPost"]:checked').id;
  const userImg = e.target.img.value;
  const author = e.target.author.value;
  const descr = e.target.description.value;
  const quote = e.target.quote.value;
  const date = dateUTC.toLocaleString('en-US', options);
  const id = postsQuantity++;

  sendFormData({
    typeOfPost,
    userImg,
    title,
    author,
    descr,
    quote,
    date,
    id,
  });
}

const fetchArticles = () => {
  const URL = 'http://127.0.0.1:3000/api/list';

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

const fetchPostsQuantity = () => {
  const URL = 'http://127.0.0.1:3000/api/list';

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

const fetchArticle = () => {
  let id = localStorage.getItem('id');
  if (!id)
  {id = 0;}

  const URL = `http://127.0.0.1:3000/api/list/${id}`;

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
      renderTitle(parsedResponse);
      renderContent(parsedResponse);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const fetchSingleArticle = async (dataId) => {
  const id = localStorage.getItem('filter-id');

  const URL = `http://127.0.0.1:3000/api/list/${id}`;

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

const fetchSearchArticles = async () => {
  const URL = 'http://127.0.0.1:3000/api/list';

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