// =====================================================
// Task 3 + Task 4: API Integration and Dynamic Rendering
// API: https://jsonplaceholder.typicode.com/todos
// =====================================================

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// ---------- State ----------
const apiState = {
  todos: [],
  filter: "all", // "all" | "completed" | "pending"
  search: "",
};

// ---------- DOM references ----------
const apiList = document.getElementById("api-list");
const apiStatus = document.getElementById("api-status");
const apiCount = document.getElementById("api-count");
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".btn.filter");

// ---------- Status helpers ----------
function setStatus(message, isError = false) {
  apiStatus.textContent = message;
  apiStatus.classList.toggle("error", isError);
}

// ---------- Fetching (async/await + try/catch) ----------
async function fetchTodos() {
  setStatus("Loading todos...");
  apiList.replaceChildren();
  apiCount.textContent = "";
  refreshBtn.disabled = true;

  try {
    const response = await fetch(API_URL);

    // fetch() only rejects on network failure, so check HTTP status manually
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    apiState.todos = await response.json(); // convert response to JSON
    setStatus("");
    renderApiTodos();
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    apiState.todos = [];
    setStatus(
      `Sorry, we could not load the todos. ${error.message}. Please check your connection and press Refresh.`,
      true
    );
  } finally {
    refreshBtn.disabled = false;
  }
}

// ---------- Filtering ----------
function getVisibleTodos() {
  const query = apiState.search.trim().toLowerCase();

  return apiState.todos.filter((todo) => {
    const matchesFilter =
      apiState.filter === "all" ||
      (apiState.filter === "completed" && todo.completed) ||
      (apiState.filter === "pending" && !todo.completed);

    const matchesSearch = todo.title.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
}

// ---------- Rendering ----------
function createApiTodoItem(todo) {
  const li = document.createElement("li");
  li.className = todo.completed ? "completed" : "";

  const id = document.createElement("span");
  id.className = "id-badge";
  id.textContent = `#${todo.id}`;

  const title = document.createElement("span");
  title.className = "title";
  title.textContent = todo.title;

  const badge = document.createElement("span");
  badge.className = `badge ${todo.completed ? "done" : "pending"}`;
  badge.textContent = todo.completed ? "Completed" : "Pending";

  li.append(id, title, badge);
  return li;
}

function renderApiTodos() {
  const visible = getVisibleTodos();
  const fragment = document.createDocumentFragment();

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No todos match your selection.";
    fragment.appendChild(empty);
  } else {
    visible.forEach((todo) => fragment.appendChild(createApiTodoItem(todo)));
  }

  apiList.replaceChildren(fragment);
  apiCount.textContent = `Showing ${visible.length} of ${apiState.todos.length} todos`;

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === apiState.filter);
  });
}

// ---------- Event handlers ----------
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    apiState.filter = button.dataset.filter;
    renderApiTodos();
  });
});

searchInput.addEventListener("input", () => {
  apiState.search = searchInput.value;
  renderApiTodos();
});

refreshBtn.addEventListener("click", fetchTodos);

// ---------- Start ----------
fetchTodos();
