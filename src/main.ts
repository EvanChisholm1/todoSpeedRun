import "./style.css";

interface Todo {
    complete: boolean;
    todo: string;
}

const todosElement: HTMLUListElement = document.querySelector(".todos")!;
const todoForm: HTMLFormElement = document.querySelector(".add")!;
const newTodo: HTMLInputElement = document.querySelector("#new-todo")!;

let todos: Todo[] = [];

function generateNewTodoNodes() {
    function generateNode(t: Todo, i: number) {
        const listItem = document.createElement("li");
        listItem.classList.add("todo");

        const checkbox: HTMLInputElement = document.createElement("input");
        checkbox.classList.add("toggle");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerText = "delete";

        const todoText = document.createElement("span");
        todoText.innerText = t.todo;

        if (t.complete) {
            todoText.classList.add("complete");
            checkbox.checked = true;
        } else {
            todoText.classList.remove("complete");
            checkbox.checked = false;
        }

        listItem.addEventListener("click", (e) => {
            todos[i].complete = !todos[i].complete;

            if (t.complete) {
                todoText.classList.add("complete");
                checkbox.checked = true;
            } else {
                todoText.classList.remove("complete");
                checkbox.checked = false;
            }
        });

        deleteButton.addEventListener("click", () => {
            todos = todos.filter((_, x) => x !== i);
            render();
        });

        checkbox.type = "checkbox";

        listItem.appendChild(checkbox);
        listItem.appendChild(todoText);
        listItem.appendChild(deleteButton);

        return listItem;
    }
    return todos.map(generateNode);
}

function render() {
    const newTodoNodes = generateNewTodoNodes();

    todosElement.innerHTML = "";
    todosElement.append(...newTodoNodes);
}

function addTodo(todo: string) {
    todos.push({
        complete: false,
        todo,
    });

    render();
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(newTodo.value);

    newTodo.value = "";
});
