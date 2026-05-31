import { el } from "../../helper.js";

export function controls() {
    return el('div', { class: 'controls' }, [
        el('input', { id: 'searchInput', type: 'search', placeholder: 'Search tasks...', 'aria-label': 'Search tasks by title or description' }),
        el('select', { id: 'priorityFilter', 'aria-label': 'Filter tasks by priority' }, [
            el('option', { value: 'all', text: 'All Priorities' }, []),
            el('option', { value: 'low', text: 'Low Priority' }, []),
            el('option', { value: 'medium', text: 'Medium Priority' }, []),
            el('option', { value: 'high', text: 'High Priority' }, []),
        ]),
        el('button', { id: 'addColumnBtn', class: 'btn btn-primary', text: '+ Add Column', 'aria-label': 'Add a new column to the board' }),
        el('button', { id: 'themeToggleBtn', class: 'btn btn-secondary', text: 'Toggle Theme', 'aria-label': 'Toggle Light/Dark Theme' }),
    ])
}