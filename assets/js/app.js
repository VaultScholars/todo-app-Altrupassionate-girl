// app.js
// This file controls what the app does.
// Students will fill in the logic for adding, updating, and deleting tasks.

// The array where all tasks will be stored
let tasks = [];

// ID counter for new tasks
let nextTaskId = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  // When starting the app:
  // - Load tasks from localStorage
  // - Update nextTaskId so it doesn't conflict
  // - Show tasks on the page
  // TODO: Load tasks and render them
  tasks = loadTasks();
  if (tasks.length > 0) {
  const maxId = Math.max(...tasks.map(t => t.id || 0));
  nextTaskId = maxId + 1;
}
  renderTasks(tasks, taskList, emptyState);


  // When the user submits the form to add a task:
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // What should happen here:
    // - Read values from the form (title, category, due date)
    // - Validate that the title is not empty
    // - Create a new task object
    // - Add it to the tasks array
    // - Save updated tasks to localStorage
    // - Update the page to show the new task
    // - Clear the form
    // TODO: Add a new task
    const title = document.getElementById("task-title").value.trim();
    if (title === "") return;

    const newTask = {
      id: nextTaskId++,
      title: title,
      category: document.getElementById("task-category").value.trim(),
      dueDate: document.getElementById("task-due-date").value,
      completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks, taskList, emptyState);
    clearTaskForm(form);
  });



  // When clicking inside the task list (“event delegation”):
  taskList.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest(".task-item");
    if (!listItem) return;

    const taskId = Number(listItem.dataset.id);

    // If the checkbox was clicked:
    if (target.classList.contains("task-checkbox")) {
      // What should happen here:
      // - Find the matching task in the array
      // - Toggle its completed state
      // - Save updated tasks
      // - Update the page
      // TODO: Toggle completed state
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks(tasks, taskList, emptyState);
      }
      return;
    }

    // If the delete button was clicked:
    if (target.classList.contains("task-delete-btn")) {
      // What should happen here:
      // - Remove the task from the tasks array
      // - Save updated tasks
      // - Update the page
      // TODO: Delete the task
       tasks = tasks.filter(t => t.id !== taskId);
      saveTasks(tasks);
      renderTasks(tasks, taskList, emptyState);
      return;
    }
  });
});
