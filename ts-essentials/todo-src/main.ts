import "./styles.css"; 

// Get the <form> element by its id and tell TypeScript it’s an HTMLFormElement.
const form = document.querySelector<HTMLFormElement>("#new-todo-form")!;
const todoInput = document.querySelector<HTMLInputElement>("#todo-input")!;
const list = document.querySelector<HTMLLabelElement>("#list")!;

let todos :Todo[] = loadTodos(); //Call the function that reads localStorage and returns saved todos
todos.forEach(renderNewTodo);// For each saved todo, draw (render) it again on the screen

//Define the Shape of a Todo, Every todo must have an id, a name, and a complete flag
type Todo = { id: string, name: string, complete: boolean };

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;// Get the text the user typed
  if (todoName === "") return;// If input empty, do nothing

  // Create a new todo object
  const newTodo = {
    id: crypto.randomUUID(),
    name: todoName,
    complete: false,
  }

  todos.push(newTodo); // Add this new todo to the main todos array
  renderNewTodo(newTodo); // Show it on screen (in the list)
  saveTodos(); // Save the updated todos array to localStorage
  todoInput.value = "";
})

//function to render a new todo on the screen
function renderNewTodo(todo : Todo) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");

  const label = document.createElement("label");
  label.classList.add("list-item-label");
  
  // Create the checkbox and set its checked state
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.complete;
  checkbox.classList.add("label-input");
  // When checkbox changes, update todo.complete and save to localStorage
  checkbox.addEventListener("change" ,() => {
    todo.complete = checkbox.checked;
    saveTodos();
  })

  // Create the text part of the todo
  const textElement = document.createElement("span");
  textElement.classList.add("label-text");
  textElement.innerText = todo.name;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerText = "Delete";
  // When user clicks delete, remove item from UI + todos array + save
  deleteButton.addEventListener("click", () => {
    listItem.remove();// remove from DOM
    todos = todos.filter((t) => {
      return t.id != todo.id; // remove from array
    })
    saveTodos();
  })

  label.append(checkbox, textElement); // Combine checkbox + text inside the label
  listItem.append(label, deleteButton); // Combine label + delete button inside the list item
  list.append(listItem); // Add list item to the full list in the HTML

}

function saveTodos() {
  // Convert array to JSON string and save
  localStorage.setItem("todos", JSON.stringify(todos))
}

function loadTodos() {
  // Get the stored string localStorage.getItem("variable")
  const value = localStorage.getItem("todos");
  if (value == null) return [];
  // Convert back from JSON to a real array of Todo objects
  return JSON.parse(value) as Todo[];
}
