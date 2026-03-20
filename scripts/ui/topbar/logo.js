import { el } from "../../helper.js";

export function logo() {
    return el('div', { class: 'logo', 'aria-label': 'App Logo' }, [
        el('h1', { class: 'logo-text', text: 'Kanban Board', 'aria-label': 'App Title' }),
        el('p', { class: 'subtitle', text: 'Notion / Trello Style DOM Project', 'aria-label': 'App Subtitle' }),
    ])
}