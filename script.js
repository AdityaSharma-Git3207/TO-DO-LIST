document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("d1");
    const dateInput = document.getElementById("d2");
    const timeInput = document.getElementById("time"); // Correct time input
    const prioritySelect = document.querySelector(".d3");
    const saveButton = document.querySelectorAll(".d4")[0];
    const resetButton = document.querySelectorAll(".d4")[1];
    const taskDisplay = document.querySelector("p");

    let tasks = [];
    let editIndex = -1;
document.querySelector
    function updateTaskDisplay() {
        taskDisplay.innerHTML = "";

        if (tasks.length === 0) {
            taskDisplay.textContent = "No Saved Tasks....";
            return;
        }

        tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.style.marginBottom = "10px";

            taskItem.innerHTML = `
                <strong>Task:</strong> ${task.name}<br>
                <strong>Date:</strong> ${task.date}<br>
                <strong>Time:</strong> ${task.time}<br>
                <strong>Priority:</strong> ${task.priority}<br>
                <button onclick="editTask(${index})" title="Edit">Edit✏️</button>
                <button onclick="deleteTask(${index})" title="Delete">Delete🗑️</button>
                <hr>
            `;

            taskDisplay.appendChild(taskItem);
        });
    }

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        updateTaskDisplay();
    };

    window.editTask = function (index) {
        const task = tasks[index];
        taskInput.value = task.name;
        dateInput.value = task.date;
        timeInput.value = task.time;
        prioritySelect.value = task.priority;
        editIndex = index;
    };

    saveButton.addEventListener("click", function (event) {
        event.preventDefault();

        const taskName = taskInput.value.trim();
        const taskDate = dateInput.value;
        const taskTime = timeInput.value;
        const taskPriority = prioritySelect.value;

        // Proper validation
        if (!taskName || !taskDate || !taskTime || taskPriority === "Select Option") {
            alert("Please fill out all fields correctly.");
            return;
        }

        const newTask = {
            name: taskName,
            date: taskDate,
            time: taskTime,
            priority: taskPriority
        };

        if (editIndex === -1) {
            tasks.push(newTask);
        } else {
            tasks[editIndex] = newTask;
            editIndex = -1;
        }

        // Reset form
        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        prioritySelect.value = "Select Option";

        updateTaskDisplay();
    });

    resetButton.addEventListener("click", function (event) {
        event.preventDefault();
        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        prioritySelect.value = "Select Option";
        editIndex = -1;
    });

    updateTaskDisplay();
});
