import { getStore, saveStore } from "../data/store.js";
import { uid } from "../helper.js";
import { renderBoard } from "../ui/renderBoard.js";

let store = getStore();

export function addColumn() {
    const title = window.prompt('Enter column name:', `Column ${store.columns.length + 1}`);

    if (!title) return;

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    store.columns.push({ id: uid("col"), title: cleanTitle });
    saveStore();
    renderBoard();
}

export function renameColumn(columnId) {
    const column = store.columns.find(col => col.id === columnId);
    if (!column) return;

    const newTitle = window.prompt('Enter new column name:', column.title);
    if (!newTitle) return;

    const cleanNewTitle = newTitle.trim();
    if (!cleanNewTitle) return;

    column.title = cleanNewTitle;
    saveStore();
    renderBoard();
}

export function deleteColumn(columnId) {
    if(store.columns.length === 1) {
        window.alert('At least one column must remain. Please add another column before deleting this one.');
        return;
    }

    const column = store.columns.find(col => col.id === columnId);
    if (!column) return;

    if (!confirm('Are you sure you want to delete this column? This will also delete all tasks within it.')) return;

    store.columns = store.columns.filter(col => col.id !== columnId);
    store.tasks = store.tasks.filter(task => task.columnId !== columnId);
    saveStore();
    renderBoard();
}