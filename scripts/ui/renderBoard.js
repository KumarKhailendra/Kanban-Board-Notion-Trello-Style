import { getStore } from "../data/store.js";
import { globalEventListeners } from "../functions/gloableEventListeners.js";
import { visibleTasksInColumn } from "../functions/taskFunctions.js";
import { el, escapeHTML } from "../helper.js";

export function renderBoard() {
    const store = getStore();
    const board = document.getElementById('board');
    console.log(board);
    
    board.innerHTML = '';

    store.columns.forEach(column => {
        const tasks = visibleTasksInColumn(column.id);

        const headerLeft = el('div', {}, [
            el('h3', { class: 'column-title', text: escapeHTML(column.title), 'aria-label': `Column: ${column.title}` }),
            el('span', { class: 'column-count', text: `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`, 'aria-label': `Number of tasks in ${column.title}: ${tasks.length}` })
        ]);

        const headerRight = el('div', { class: 'column-header' }, [
            el('button', { class: 'icon-btn rename-column-btn', "data-column-id": column.id, 'aria-label': `Rename column ${column.title}`, text: 'Edit' }, []),
            el('button', { class: 'icon-btn delete-column-btn', "data-column-id": column.id, 'aria-label': `Delete column ${column.title}`, text: 'Delete' }, []),
            el('button', { class: 'btn btn-secondary add-task-btn', "data-column-id": column.id, 'aria-label': `Add task to column ${column.title}`, text: '+ Task' }, [])
        ]);

        const columnHeader = el('div', { class: 'column-header' }, [headerLeft, headerRight]);

        const boardArticle = el('article', { class: 'column', 'data-column-id': column.id }, [columnHeader]);
        board.appendChild(boardArticle);
    });
    globalEventListeners();
}