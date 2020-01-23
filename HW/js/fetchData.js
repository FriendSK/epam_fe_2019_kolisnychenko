import {validateTitle} from './validation';

export const sendFormData = (data) => {
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

export function onSubmit(e) {
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
