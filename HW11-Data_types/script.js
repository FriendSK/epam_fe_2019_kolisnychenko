// first task

function hasNumbersAndRequiredLength(value) {
  if (
    value.charCodeAt(0) !== value.charAt(0).toUpperCase().charCodeAt(0) &&
    value.length > 2 &&
    value.length < 20
  ) {
    return true;
  }

  return false;
}

function validateTitle(value) {
  if (typeof value !== 'string') {
    return 'incorrect input data';
  }

  for (let i = 0; i < value.length; i++) {
    if (isFinite(value.charAt(i))) {
      return 'invalid';
    }
  }

  if (hasNumbersAndRequiredLength(value)) {
    return 'valid';
  }

  return 'invalid';
}

validateTitle('/Title');

// second task

function isNumberAndIsDivisible(value) {
  return (
    typeof value === 'number' &&
    value % 15 === 0
  );
}

function sum() {
  if (isNumberAndIsDivisible(arguments[0])) {
    return arguments[0] * -1 + +arguments[1];
  }

  if (isNumberAndIsDivisible(arguments[1])) {
    return arguments[1] * -1 + +arguments[0];
  }
  return +arguments[0] + +arguments[1];
}

sum('5', 3);
