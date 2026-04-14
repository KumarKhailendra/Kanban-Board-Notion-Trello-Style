import { el } from "../../helper.js";

export function modal() {
    return el('div', { class: 'modal hidden', id: "taskModal", role: "dialog", 'aria-modal': "true", 'aria-labelledby': "modalTitle" }, [
        el('div', { class: 'modal-card' }, [
            el('div', { class: 'modal-header' }, [
                el('h2', { class: 'modal-title', id: "taskModalTitle", text: 'Add Task' }),
                el('button', { class: 'icon-btn', id: "closeModalBtn", 'aria-label': "Close modal", text: '×' })
            ]),
            el('form', { id: "taskForm", class: 'modal-form' }, [
                el('input', { type: 'hidden', id: "taskId" }),
                el('input', { type: 'hidden', id: "taskColumnId" }),
                el('label', { class: 'field' }, [
                    el('span', { text: 'Title' }),
                    el('input', { type: 'text', id: "taskTitle", required: true, placeholder: 'Task title', maxlength: 100, 'aria-required': "true", 'aria-describedby': "titleHelp", "aria-label": "Task title" }),
                ]),
                el('label', { class: 'field' }, [
                    el('span', { text: 'Description', "aria-label": "Task description" }),
                    el('textarea', { id: "taskDescription", rows: 4, placeholder: 'Task description', maxlength: 200, 'aria-describedby': "descriptionHelp", "aria-label": "Task description" })
                ]),
                el('div', { class: 'row' }, [
                    el('label', { class: 'field' }, [
                        el('span', { text: 'Due Date', "aria-label": "Task due date" }),
                        el('input', { type: 'date', id: "taskDueDate", required: true, "aria-label": "Task due date" })
                    ]),
                    el('label', { class: 'field' }, [
                        el('span', { text: 'Priority', "aria-label": "Task priority" }),
                        el('select', { id: "taskPriority", required: true, "aria-label": "Task priority" }, [
                            el('option', { value: 'low', text: 'Low' }),
                            el('option', { value: 'medium', text: 'Medium' }),
                            el('option', { value: 'high', text: 'High' })
                        ])
                    ])
                ]),
                el('div', { class: 'modal-actions' }, [
                    el('button', { id: "deleteTaskBtn", class: 'btn btn-danger hidden', type: 'button', text: 'Delete', "aria-label": "Delete task" }),
                    el('button', { type: 'submit', class: 'btn btn-primary', text: 'Save', "aria-label": "Save task", "aria-label": "Save task" })
                ])
            ])
        ])
    ])
}