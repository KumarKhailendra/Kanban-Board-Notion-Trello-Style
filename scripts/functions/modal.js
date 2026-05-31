import { getModalElements } from "./getElements.js";

export function openModal({ mode, columnId = "", task = null }) {
    const {
        taskModal,
        taskModalTitle,
        deleteTaskBtn,
        taskIdInput,
        taskColumnIdInput,
        taskTitleInput,
        taskDescriptionInput,
        taskDueDateInput,
        taskPriorityInput,
    } = getModalElements();

    if (!taskModal ||
        !taskModalTitle ||
        !deleteTaskBtn ||
        !taskIdInput ||
        !taskColumnIdInput ||
        !taskTitleInput ||
        !taskDescriptionInput ||
        !taskDueDateInput ||
        !taskPriorityInput) {
        console.error("Modal elements are missing from the DOM.");
        return;
    }

    if (mode === "edit" && task) {
        taskModalTitle.textContent = "Edit Task";
        taskIdInput.value = task.id;
        taskColumnIdInput.value = task.columnId;
        taskTitleInput.value = task.title;
        taskDescriptionInput.value = task.description || "";
        taskDueDateInput.value = task.dueDate || "";
        taskPriorityInput.value = task.priority || "medium";
        deleteTaskBtn.classList.remove("hidden");
    } else {
        taskModalTitle.textContent = "Add Task";
        taskIdInput.value = "";
        taskColumnIdInput.value = columnId;
        taskTitleInput.value = "";
        taskDescriptionInput.value = "";
        taskDueDateInput.value = "";
        taskPriorityInput.value = "medium";
        deleteTaskBtn.classList.add("hidden");
    }

    taskModal.classList.remove("hidden");
    taskTitleInput.focus();
}

export function closeModal() {
    const { taskModal, taskForm, taskIdInput, taskColumnIdInput } = getModalElements();
    if (!taskModal || !taskForm || !taskIdInput || !taskColumnIdInput) {
        console.error("Modal elements are missing from the DOM.");
        return;
    }
    taskModal.classList.add("hidden");
    taskForm.reset();
    taskIdInput.value = "";
    taskColumnIdInput.value = "";
}