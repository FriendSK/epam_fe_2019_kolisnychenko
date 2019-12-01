// first task

function tickets(person) {
  for (let i = 0; i < person.length; i++) {
    if (
      person[i + 1] === person[i] ||
      person[i + 1] + person[i + 2] === person[i + 3]
    ) {
      return 'Yes';
    }
  }
  return 'No';
}

tickets(['25', '25', '50', '100']);

// second task

function calcSum(num1, num2, strDiff) {
  let restOfAdd = 0;
  const result = [];

  for (let i = 0; i <= num1.length - 1 - strDiff; i++) {
    const sum = +num1[i] + +num2[i] + restOfAdd;
    if (sum >= 10) {
      result.push(sum);
      restOfAdd = 1;
    } else {
      result.push(sum);
      restOfAdd = 0;
    }
  }
  return result;
}

function arrayDiffBuffer(str, strDiff) {
  return str.split('').splice(str.length - strDiff);
}

function getSum(num1, num2) {
  const strDiff = Math.abs(num1.length - num2.length);

  if (num1.length > num2.length) {
    return calcSum(num1, num2, strDiff).concat(arrayDiffBuffer(num1, strDiff)).join('');
  } else {
    return calcSum(num2, num1, strDiff).concat(arrayDiffBuffer(num2, strDiff)).join('');
  }
}

getSum('9999', '22');

// third task

const listOfPosts2 = [
  {
    id: 1,
    post: 'some post1',
    title: 'title 1',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
    ],
  },
  {
    id: 2,
    post: 'some post2',
    title: 'title 2',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
      {
        id: 1.3,
        comment: 'some comment3',
        title: 'title 3',
        author: 'Rimus',
      },
    ],
  },
  {
    id: 3,
    post: 'some post3',
    title: 'title 3',
    author: 'Rimus',
  },
  {
    id: 4,
    post: 'some post4',
    title: 'title 4',
    author: 'Uncle',
  },
];

function getQuntityPostsByAuthor(listOfPosts, name) {
  let post = 0;
  let comments = 0;
  listOfPosts.forEach((el) => {
    if (el.author === name) {
      return post++;
    } else if (el.comments) {
      el.comments.forEach((el) => {
        if (el.author === name) {
          comments++;
        }
      });
    }
  });

  return `post: ${post}, comments: ${comments}`;
}

getQuntityPostsByAuthor(listOfPosts2, 'Rimus');
