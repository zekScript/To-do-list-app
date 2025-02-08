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
    taskTable.innerHTML = ""; // Clear table before rendering

    for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        const taskData = JSON.parse(localStorage.getItem(id));

        if (!taskData) continue; // Skip invalid entries

        const { newTask, isChecked } = taskData;

        const row = document.createElement("tr");

        // Task text cell
        const taskCell = document.createElement("td");
        taskCell.textContent = newTask;

        // ✅ Apply red color if checked
        taskCell.style.color = isChecked ? "red" : "black";

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isChecked;

        // ✅ Change color when checkbox toggles
        checkbox.addEventListener("change", () => {
            taskData.isChecked = checkbox.checked;
            localStorage.setItem(id, JSON.stringify(taskData)); // Update state in storage
            taskCell.style.color = checkbox.checked ? "red" : "black";
        });

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete task";
        delBtn.addEventListener("click", () => {
            localStorage.removeItem(id);
            renderTasks(); // Re-render instead of reloading
        });

        row.append(taskCell, checkbox, delBtn);
        taskTable.appendChild(row);
    }
}

// Add task
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

// ✅ Fixed Update Task (Preserves Checkbox State)
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
    existingTask.newTask = updatedTaskText; // Update only task name, keep checkbox state
    localStorage.setItem(taskId, JSON.stringify(existingTask)); // Save updated object

    renderTasks();
});

// Initial render
renderTasks();

console.log("Reading Script complete");
