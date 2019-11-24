let age = 12;
if (age > 5) {
  age = 5;
  console.log('More than 5');
} else if (age < 10) {
  console.log('Less than 5');
}

// The second console is not called  the second condition is not executed

let message;
const login = 'Maks';

if (login === 'Maks') {
  message = 'Hi, Maks';
} else if (login === 'Serg') {
  message = 'Hi, Serg';
} else if (login === '') {
  message = 'Hi undefined';
} else {
  message = '';
}

switch (login) {
  case 'Maks':
    message = 'Hi, Maks';
    break;
  case 'Serg':
    message = 'Hi, Serg';
    break;
  case '':
    message = 'Hi undefined';
    break;
  default:
    message = '';
    break;
}
