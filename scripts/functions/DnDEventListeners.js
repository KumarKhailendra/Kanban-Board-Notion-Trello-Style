import { saveStore } from "../data/store.js";
import { renderBoard } from "../ui/renderBoard.js";
import { getAllElements } from "./getElements.js";
import { getDragAfterElement, moveTask } from "./taskFunctions.js";

export function dndEventListeners() {
    getAllElements(".task-card").forEach((taskEl) => {
        taskEl.addEventListener("dragstart", (e) => {
            taskEl.classList.add("dragging");
            e.dataTransfer.setData("text/plain", JSON.stringify({
                taskId: taskEl.dataset.taskId,
                sourceColumnId: taskEl.dataset.columnId
            }));
            e.dataTransfer.effectAllowed = "move";
        });

        taskEl.addEventListener("dragend", () => {
            taskEl.classList.remove("dragging");
            getAllElements(".column").forEach(col => col.classList.remove("drag-over"));
        });
    });

    getAllElements(".task-list").forEach((listEl) => {
        const columnEl = listEl.closest(".column");

        listEl.addEventListener("dragover", (e) => {
            e.preventDefault();
            columnEl.classList.add("drag-over");

            const emptyEl = listEl.querySelector(".empty");
            if (emptyEl) {
                emptyEl.classList.add("hidden");
            }
        });

        listEl.addEventListener("dragleave", (e) => {
            if (!listEl.contains(e.relatedTarget)) {
                columnEl.classList.remove("drag-over");
            }
        });

        listEl.addEventListener("drop", (e) => {
            e.preventDefault();
            columnEl.classList.remove("drag-over");

            let payload;
            try {
                payload = JSON.parse(e.dataTransfer.getData("text/plain"));
            } catch (err) {
                console.error("Invalid drag data", err);
                return;
            }

            const targetColumnId = listEl.dataset.columnId;
            const afterElement = getDragAfterElement(listEl, e.clientY);
            const beforeTaskId = afterElement ? afterElement.dataset.taskId : null;

            moveTask(payload.taskId, targetColumnId, beforeTaskId);
            saveStore();
            renderBoard();
        });
    });
}