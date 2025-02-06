// Scripting side

// Element

const taskTable = document.getElementById("taskTable")

// Button

const addTask = document.getElementById("addTask");

const updateTask = document.getElementById("updateTask");
const deleteTask = document.getElementById("deleteTask")
// Input
const inputTask = document.getElementById("inputTask");
const naujasPav = document.getElementById("naujasPav");
// Get user's id
const getId = document.getElementById("getId");

const updateTaskById = document.getElementById("updateTaskById");
// const deleteTaskById = document.getElementById("deleteTaskById")

// Bool

const isChecked = false






addTask.addEventListener("click", () => {
    const newTask = inputTask.value.trim()
    
    const id = getId.value.trim()


    if(!newTask || !id){
        alert("Jokiu tuščių vietu negali būti")
        return
    }

    if(localStorage.getItem(id)){
        alert("tas id jau paiimtas")
        return;
    }
    
    localStorage.setItem(id, JSON.stringify({ newTask, isChecked}));

    // const p = document.createElement("p");


    // const delBtn = document.createElement("button")
    // delBtn.id = "deleteTask"
    // console.log(delBtn)

    window.location.reload()

})

function renderTasks(){
    // READ
    for(let i = 0; i < localStorage.length; i++){
        const id = localStorage.key(i)
        // const {newTask, isChecked} = JSON.parse(localStorage.getItem(id))
        const JSONItems = JSON.parse(localStorage.getItem(id))
        const row = document.createElement("tr");
        const taskCell = document.createElement("td")
        taskCell.textContent = JSONItems.newTask
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = JSONItems.isChecked
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete task"
        delBtn.addEventListener("click", () => {
            localStorage.removeItem(id)
            window.location.reload()
        
        })   
        
        checkbox.addEventListener("click", () => {
            if(checkbox.checked){
                 checkbox.checked = true;
            }
            else{
                 checkbox.checked = false;
            }

            
        })

        

        row.append(taskCell, checkbox, delBtn)
        taskTable.appendChild(row)
    }
    

}

renderTasks();

updateTask.addEventListener("click", () => {
    const newTaskUpdateById = updateTaskById.value.trim()
    const UpdateNewTask = naujasPav.value.trim()
    
    if(!localStorage.getItem(newTaskUpdateById)){
        alert("Toks id neegzistuoja")
        return
    }

    if(!updateTaskById){
        alert("Empty")
        return
    }

    

    localStorage.setItem(newTaskUpdateById, UpdateNewTask)

    window.location.reload()


})








console.log("Reading Script complete")