import { el } from "../../helper.js";

export function controls() {
    return el('div', { class: 'controls' }, [
        el('button', { id: 'themeToggleBtn', class: 'btn btn-secondary', text: 'Toggle Theme', 'aria-label': 'Toggle Light/Dark Theme' }),
    ])
}