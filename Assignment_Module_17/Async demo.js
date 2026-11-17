// =====================================================
// Task 1: Asynchronous JavaScript Practice
// Concepts: Execution Context, Event Loop, setTimeout,
// setInterval, Callbacks, Promises, Async/Await
// =====================================================

const demoOutput = document.getElementById("demo-output");

// Logs to both the console and the page
function log(message) {
  console.log(message);
  if (demoOutput) {
    const item = document.createElement("li");
    item.textContent = message;
    demoOutput.appendChild(item);
  }
}

// Helper: wait for a number of milliseconds (returns a Promise)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// -----------------------------------------------------
// 1 + 2. Execution Context & Event Loop
// Every function call creates a new execution context that is pushed
// onto the call stack. Async callbacks wait in a queue and only run
// when the stack is empty. Microtasks (Promises) run before
// macrotasks (setTimeout).
// -----------------------------------------------------
async function demoExecutionOrder() {
  log("--- Execution order demo ---");
  log("1. Synchronous: start");

  setTimeout(() => log("4. Macrotask: setTimeout(0) callback"), 0);

  Promise.resolve().then(() => log("3. Microtask: Promise.then callback"));

  log("2. Synchronous: end");

  // Let the queued tasks finish before the next demo starts
  await wait(50);
}

// -----------------------------------------------------
// 3. setTimeout: show a message after 3 seconds
// -----------------------------------------------------
function demoSetTimeout() {
  return new Promise((resolve) => {
    log("--- setTimeout demo ---");
    log("Waiting 3 seconds...");
    setTimeout(() => {
      log("Hello! This message appeared after 3 seconds.");
      resolve();
    }, 3000);
  });
}

// -----------------------------------------------------
// 4. setInterval: simple countdown timer
// -----------------------------------------------------
function demoSetInterval(start = 5) {
  return new Promise((resolve) => {
    log("--- setInterval countdown demo ---");
    let count = start;
    const intervalId = setInterval(() => {
      log(`Countdown: ${count}`);
      count--;
      if (count < 0) {
        clearInterval(intervalId); // always stop an interval
        log("Countdown finished!");
        resolve();
      }
    }, 1000);
  });
}

// -----------------------------------------------------
// 5. Callback function
// A function passed to another function to run later.
// -----------------------------------------------------
function fetchUserWithCallback(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: "Sample User" };
    callback(user);
  }, 1000);
}

function demoCallback() {
  return new Promise((resolve) => {
    log("--- Callback demo ---");
    fetchUserWithCallback(1, (user) => {
      log(`Callback received user: ${user.name} (id ${user.id})`);
      resolve();
    });
  });
}

// -----------------------------------------------------
// 6. Promise with resolve and reject
// -----------------------------------------------------
function checkNumber(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (number > 0) {
        resolve(`${number} is a positive number (resolved)`);
      } else {
        reject(new Error(`${number} is not positive (rejected)`));
      }
    }, 500);
  });
}

async function demoPromise() {
  log("--- Promise demo (.then / .catch) ---");

  // Resolve case
  await checkNumber(10)
    .then((message) => log(`Success: ${message}`))
    .catch((error) => log(`Error: ${error.message}`));

  // Reject case
  await checkNumber(-5)
    .then((message) => log(`Success: ${message}`))
    .catch((error) => log(`Error: ${error.message}`));
}

// -----------------------------------------------------
// 7. The same Promise example rewritten with async/await
// -----------------------------------------------------
async function demoAsyncAwait() {
  log("--- Async/Await demo ---");

  for (const number of [10, -5]) {
    try {
      const message = await checkNumber(number);
      log(`Success: ${message}`);
    } catch (error) {
      log(`Error: ${error.message}`);
    }
  }
}

// -----------------------------------------------------
// Run everything in order when the button is clicked
// -----------------------------------------------------
async function runAllDemos() {
  const button = document.getElementById("run-demos-btn");
  button.disabled = true;
  if (demoOutput) demoOutput.replaceChildren();

  await demoExecutionOrder();
  await demoSetTimeout();
  await demoSetInterval(5);
  await demoCallback();
  await demoPromise();
  await demoAsyncAwait();

  log("All demos finished.");
  button.disabled = false;
}

document.getElementById("run-demos-btn").addEventListener("click", runAllDemos);
