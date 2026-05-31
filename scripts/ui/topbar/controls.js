import { el } from "../../helper.js";

export function controls() {
    return el('div', { class: 'controls' }, [
        el('button', { id: 'addColumnBtn', class: 'btn btn-primary', text: '+ Add Column', 'aria-label': 'Add a new column to the board' }),
        el('button', { id: 'themeToggleBtn', class: 'btn btn-secondary', text: 'Toggle Theme', 'aria-label': 'Toggle Light/Dark Theme' }),
    ])
}