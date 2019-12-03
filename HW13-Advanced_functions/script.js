// first task

const complexFunction = function (arg1, arg2) {
  return arg1 + arg2;
};

function wasInvoked(cache, arg1, arg2) {
  return (cache[arg1 + arg2] && cache[arg2] === arg2) || arg2 === cache[arg1];
}

function wasInvokedWithfirstArg(cache, arg1, arg2) {
  return (arg1 !== cache[arg2] && cache[arg2] !== arg2);
}

function cache(complexFunction) {
  const cacheObj = {};

  return function (arg1, arg2) {
    if (wasInvoked(cacheObj, arg1, arg2)) {
      return `Функция вызывалась ранее с результатом ${cacheObj[arg1 + arg2]}`;
    } else if (wasInvokedWithfirstArg(cacheObj, arg1, arg2)) {
      const result = complexFunction(arg1, arg2);

      cacheObj[arg1 + arg2] = result;
      cacheObj[arg1] = arg1;
      cacheObj[arg2] = arg2;

      return result;
    }

    const result = complexFunction(arg1, arg2);
    cacheObj[arg1 + arg2] = result;
    cacheObj[arg1] = arg1;
    cacheObj[arg2] = arg2;

    return result;
  };
}

const cashedFunction = cache(complexFunction);

cashedFunction(1, 2);
cashedFunction(1, 2);
cashedFunction(1, 3);
cashedFunction(2, 1);

// second task

const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },

  down() {
    this.step--;
    return this;
  },

  showStep() {
    // alert(this.step);
    return this;
  },
};

ladder.up().up().down().up().showStep();

// third task

function sum() {
  return [].slice.call(arguments).reduce((sum, curr) => {
    return sum + curr;
  });
}

function mul() {
  return [].slice.call(arguments).reduce((mul, curr) => {
    return mul * curr;
  });
}

function applyAllES6(func, ...args) {
  return func.apply(null, args);
}

function applyAll(func) {
  return func.apply(null, [].slice.call(arguments, 1));
}

applyAllES6(sum, 1, 2, 3);
applyAll(mul, 1, 2, 3);

// task 5

// function zero() {return function () {
//   return 0;
// }}
// function one() { return function () {
//   return 1;
// }}
// function two() { return function () {
//   return 2;
// }}
// function three() { return function () {
//   return 3;
// }}
// function four() { return function () {
//   return 4;
// }}
// function five() {
//   return 5;
// }
// function six() { return function () {
//   return 6;
// }}
// function seven() {
//   return 7;
// }
// function eight() { return function () {
//   return 8;
// }}
// function nine() { return function () {
//   return 9;
// }}

// function plus() { return function () {
//   return a + b;
// }}
// function minus() { return function (a, b) {
//   return a - b;
// }}
// function multiply() { return function ( ) {
//   return a * b;
// }}
// function divide() { return function (a, b) {
//   return a / b;
// }}

// console.log(seven(multiply(five()))); // 35
// console.log(four(plus(nine()))); // 13
// console.log(eight(minus(three()))); // 5
// console.log(six(divide(two()))); // 3
