// =====================================================
// Task 2: Todo / Task Manager App
// Pattern: state array -> action functions -> render()
// =====================================================

// ---------- State ----------
let todos = [];
let nextId = 1;

// ---------- DOM references (looked up once) ----------
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const statTotal = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");
const statPending = document.getElementById("stat-pending");

// ---------- Actions (they change data only, never the DOM) ----------
function addTodo(title) {
  const trimmed = title.trim();
  if (trimmed === "") return false; // bonus: block empty tasks

  todos.push({ id: nextId++, title: trimmed, completed: false });
  return true;
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
}

// ---------- Rendering (the only place that touches the DOM list) ----------
function renderStats() {
  const completed = todos.filter((todo) => todo.completed).length;
  statTotal.textContent = todos.length;
  statCompleted.textContent = completed;
  statPending.textContent = todos.length - completed;
}

function createTodoItem(todo) {
  const li = document.createElement("li");
  li.className = todo.completed ? "completed" : "";
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.dataset.action = "toggle";
  checkbox.setAttribute("aria-label", `Mark "${todo.title}" as completed`);

  const title = document.createElement("span");
  title.className = "title";
  title.textContent = todo.title; // textContent avoids HTML injection

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.action = "delete";

  li.append(checkbox, title, deleteBtn);
  return li;
}

function renderTodos() {
  const fragment = document.createDocumentFragment();

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks yet. Add one above!";
    fragment.appendChild(empty);
  } else {
    todos.forEach((todo) => fragment.appendChild(createTodoItem(todo)));
  }

  todoList.replaceChildren(fragment); // one DOM update
  renderStats();
}

// ---------- Event handlers ----------
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const added = addTodo(todoInput.value);
  if (!added) {
    formError.textContent = "Please enter a task before adding.";
    todoInput.focus();
    return;
  }

  formError.textContent = "";
  todoInput.value = "";
  renderTodos();
});

// Event delegation: one listener handles every item in the list
todoList.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  const item = event.target.closest("li");
  if (!action || !item) return;

  const id = Number(item.dataset.id);
  if (action === "toggle") toggleTodo(id);
  if (action === "delete") deleteTodo(id);
  renderTodos();
});

// Initial render
renderTodos();
