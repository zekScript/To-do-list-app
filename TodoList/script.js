// Elements
const taskTable = document.getElementById("taskTable");

// Buttons
const addTask = document.getElementById("addTask");
const updateTask = document.getElementById("updateTask");

// Inputs
const inputTask = document.getElementById("inputTask");
const naujasPav = document.getElementById("naujasPav");
const getId = document.getElementById("getId");
const updateTaskById = document.getElementById("updateTaskById");

// Function to render tasks
function renderTasks() {
    taskTable.innerHTML = ""; 

    for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        const taskData = JSON.parse(localStorage.getItem(id));

        if (!taskData) continue;

        const { newTask, isChecked } = taskData;

        const row = document.createElement("tr");

        const taskCell = document.createElement("td");
        taskCell.textContent = newTask;

        taskCell.style.color = isChecked ? "red" : "black";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isChecked;

        checkbox.addEventListener("change", () => {
            taskData.isChecked = checkbox.checked;
            localStorage.setItem(id, JSON.stringify(taskData));
            taskCell.style.color = checkbox.checked ? "red" : "black";
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete task";
        delBtn.addEventListener("click", () => {
            localStorage.removeItem(id);
            renderTasks(); 
        });

        row.append(taskCell, checkbox, delBtn);
        taskTable.appendChild(row);
    }
}

addTask.addEventListener("click", () => {
    const newTask = inputTask.value.trim();
    const id = getId.value.trim();

    if (!newTask || !id) {
        alert("Jokiu tuščių vietų negali būti");
        return;
    }

    if (localStorage.getItem(id)) {
        alert("Tas ID jau paimtas");
        return;
    }

    localStorage.setItem(id, JSON.stringify({ newTask, isChecked: false }));
    renderTasks();
});

updateTask.addEventListener("click", () => {
    const taskId = updateTaskById.value.trim();
    const updatedTaskText = naujasPav.value.trim();

    if (!localStorage.getItem(taskId)) {
        alert("Toks ID neegzistuoja");
        return;
    }

    if (!updatedTaskText) {
        alert("Naujas pavadinimas negali būti tuščias");
        return;
    }

    const existingTask = JSON.parse(localStorage.getItem(taskId));
    existingTask.newTask = updatedTaskText; 
    localStorage.setItem(taskId, JSON.stringify(existingTask)); 

    renderTasks();
});

renderTasks();

console.log("Reading Script complete");
