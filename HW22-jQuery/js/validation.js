function validateTitle(title) {
  return /^[A-Z]{1}[a-z0-9/s/./,/!/:/?]{5,59}$/.test(title);
}

function validateRange(value) {
  if (value < 0) {
    return false;
  }
  return true;
}