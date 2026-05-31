import { getStore, saveStore } from "../data/store.js";
import { applyTheme } from "../helper.js";
import { renderBoard } from "../ui/renderBoard.js";
import { getElement, getModalElements } from "./getElements.js";
import { closeModal, openModal } from "./modal.js";
import { addTask, deleteTask, updateTask } from "./taskFunctions.js";
const store = getStore();

export function globalEventListeners() {
    const boardEl = getElement("board");
    const closeModalBtn = getElement("closeModalBtn");
    const {
        taskModal,
        taskForm,
        deleteTaskBtn,
        taskIdInput,
        taskColumnIdInput,
        taskTitleInput,
        taskDescriptionInput,
        taskDueDateInput,
        taskPriorityInput,
    } = getModalElements();

    const themeToggleBtn = document.getElementById('themeToggleBtn');

    themeToggleBtn.addEventListener('click', () => {
        store.theme = store.theme === 'dark' ? 'light' : 'dark';
        applyTheme();
        saveStore();
    });

    closeModalBtn.addEventListener("click", closeModal);

    taskModal.addEventListener("click", (e) => {
        if (e.target === taskModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !taskModal.classList.contains("hidden")) {
            closeModal();
        }
    });

    boardEl.addEventListener("click", (e) => {
        const addTaskBtn = e.target.closest(".add-task-btn");

        if (addTaskBtn) {
            openModal({ mode: "create", columnId: addTaskBtn.dataset.columnId });
            return;
        }

        // const renameColumnBtn = e.target.closest(".rename-column-btn");
        // if (renameColumnBtn) {

        // }

        const editTaskBtn = e.target.closest(".edit-task-btn");
        if (editTaskBtn) {
            const task = store.tasks.find(t => t.id === editTaskBtn.dataset.taskId);
            if (!task) return;
            openModal({ mode: "edit", task });
            return;
        }
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const payload = {
            id: taskIdInput.value,
            columnId: taskColumnIdInput.value,
            title: taskTitleInput.value.trim(),
            description: taskDescriptionInput.value.trim(),
            dueDate: taskDueDateInput.value,
            priority: taskPriorityInput.value,
        };

        if (!payload.title) return;
        
        if (payload.id){
            updateTask(payload);
        } else {
            
            addTask(payload);
        }

        saveStore();
        renderBoard();
        closeModal();
    });

    deleteTaskBtn.addEventListener("click", () => {
        if (!taskIdInput.value) return;

        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;

        deleteTask(taskIdInput.value);
        saveStore();
        renderBoard();
        closeModal();
    });
}