import {validateTitle} from './validation';

const sendFormData = (data) => {
  const URL = 'http://127.0.0.1:3000/api/article';

  fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (response.ok) {
        const parsedResponse = await response.json();
        localStorage.setItem('id', parsedResponse._id);
        window.location.href = './post.html';
        return;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export function onSubmit(e) {
  e.preventDefault();

  const titleField = document.querySelector('.post-form__title input');
  const title = e.target.title.value;

  if (e.target.title.disabled) {
    const id = localStorage.getItem('id');
    updateArticle(id, e.target.description.value);
  } else {
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

    const typeOfPost = document.querySelector('input[name="typeOfPost"]:checked').id;
    const userImg = e.target.img.value;
    const author = e.target.author.value;
    const descr = e.target.description.value;
    const quote = e.target.quote.value;
    const date = dateUTC.toLocaleString('en-US', options);
    sendFormData({
      typeOfPost,
      userImg,
      title,
      author,
      descr,
      quote,
      date,
    });
  }
}

const updateArticle = async (id, data) => {
  const URL = `http://127.0.0.1:3000/api/article/${id}`;

  await fetch(URL, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({descr: data}),
  })
    .then(() => {
      window.location.href = './blog.html';
    })
    .catch((error) => {
      throw new Error(error);
    });
};
