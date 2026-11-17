# Task Manager with API Integration

A vanilla JavaScript project (HTML5, CSS3, ES6+) with no frameworks or libraries.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `style.css` | Styling |
| `async-demo.js` | Task 1: execution order, event loop, setTimeout, setInterval, callback, Promise, async/await |
| `local-todos.js` | Task 2: local task manager (state array, add/toggle/delete functions, render function) |
| `api-todos.js` | Tasks 3 and 4: fetch from JSONPlaceholder, loading and error states, All / Completed / Pending filters |

## Run

Open `index.html` in a browser. No build step or install is needed.

## Features

- Add, complete and delete tasks, with live total / completed / pending counts
- Fetch todos from `https://jsonplaceholder.typicode.com/todos` with `fetch()` and `async/await`
- Loading message, `try/catch` error handling and a readable error message
- Filter buttons: All, Completed, Pending
- Async demo section with a "Run demos" button (output on the page and in the console)

## Bonus challenges done

- Search API todos by title
- Refresh button to re-fetch API data
- Empty tasks are blocked with an error message
- API todos and local todos are displayed in separate sections
