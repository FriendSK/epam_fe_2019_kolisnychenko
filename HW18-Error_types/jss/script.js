// Task 1
// A recursive function is slower because it invokes an exensive tree of nested calls.
// During recursive calls Lexical Environment objects are created and stored in the Call Stack.
// Unneeded objects deleting process takes some time.

function fibByCycle(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
}

function fibByRecursion(n) {
  return n <= 1 ? n : fibByRecursion(n - 1) + fibByRecursion(n - 2);
}

function benchmarkFunctions(number) {
  const functions = [fibByCycle, fibByRecursion];

  for (const fn of functions) {
    const passedTime = benchmarkFunction(fn, number);

    console.log(`Benchmark: ${fn.name} took ${passedTime} ms`);
  }
}

function benchmarkFunction(fn, number, iterationsQty = 10000) {
  const start = performance.now();

  for (let i = 1; i <= iterationsQty; i++) {
    fn(number);
  }

  return (performance.now() - start).toFixed(4);
}

benchmarkFunctions(16);

// Task 2

function parseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

parseJSON('{"name": "Student", "company": "EPAM"}');

// Task 3

function parseJSON2(json) {
  const result = JSON.parse(json);

  if (
    typeof result.name === 'undefined' || typeof result.company === 'undefined') {
    throw new Error('Error. Function has received incorrect JSON string!');
  }
}

window.onerror = (message) => {
  console.log(message);
};

parseJSON2('{"name": "Student", "company": "EPAM"}');

