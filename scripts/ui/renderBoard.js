import { getStore } from "../data/store.js";
import { visibleTasksInColumn } from "../functions/taskFunctions.js";
import { el, escapeHTML, formatDate } from "../helper.js";

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

        const headerRight = el('div', { class: 'column-actions' }, [
            el('button', { class: 'icon-btn rename-column-btn', "data-column-id": column.id, 'aria-label': `Rename column ${column.title}`, text: 'Edit' }, []),
            el('button', { class: 'icon-btn delete-column-btn', "data-column-id": column.id, 'aria-label': `Delete column ${column.title}`, text: 'Delete' }, []),
            el('button', { class: 'btn btn-secondary add-task-btn', "data-column-id": column.id, 'aria-label': `Add task to column ${column.title}`, text: '+ Task' }, [])
        ]);

        const columnHeader = el('div', { class: 'column-header' }, [headerLeft, headerRight]);

        const taskList = el('div', { class: 'task-list', 'data-column-id': column.id, "aria-label": `Tasks in ${column.title}` }, [
            !tasks.length ? el('p', { class: 'empty', text: 'No tasks' }, []) : null,
            ...tasks.map(task => 
                el('div', 
                    { 
                        class: 'task-card', 
                        'data-task-id': task.id, 
                        'draggable': 'true', 
                        'aria-label': `Task: ${task.title}`,
                        'data-column-id': column.id
                    }, 
                    [
                        el('div', { class: 'task-head' }, [
                            el('h4', { class: 'task-title', text: escapeHTML(task.title) }, []),
                            el('button', { class: 'icon-btn edit-task-btn', "data-task-id": task.id, 'aria-label': `Edit task ${task.title}`, text: 'Edit' }, []),
                        ]),
                        task.description ? el('p', { class: 'task-desc', text: escapeHTML(task.description) }, []) : null,
                        el('div', { class: 'task-meta' }, [
                            el('span', { class: `badge ${task.priority}`, text: escapeHTML(task.priority) }, []),
                            el('span', { class: 'due-date', text: formatDate(task.dueDate) }, [])
                        ])

                    ]
                )
            )
        ]);

        const boardArticle = el('article', { class: 'column', 'data-column-id': column.id }, [columnHeader, taskList]);
        board.appendChild(boardArticle);
    });
}
