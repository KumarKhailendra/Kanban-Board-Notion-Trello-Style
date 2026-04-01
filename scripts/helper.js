import { getStore } from "./data/store.js";

const el = (tag, attrs = {}, children = []) => {
    const element = tag !== '' ? document.createElement(tag) : document.createDocumentFragment();

    Object.entries(attrs).forEach(([k, v]) => {
        if (k === "class" || k === "className") element.className = v;
        else if (k === "text") element.textContent = v;
        else element.setAttribute(k, v);
    });

    children.forEach(child => {
        if (child == null || child === false) return;
        if (typeof child === "string") element.appendChild(document.createTextNode(child));
        else element.appendChild(child);
    });

    return element;
};

const applyTheme = () => {
    const store = getStore();
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    document.body.classList.toggle('dark', store.theme === 'dark');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = store.theme === 'dark' ? 'Light Theme' : 'Dark Theme';
    }
}

const uid = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

const escapeHTML = (value) => {
    return String(value ?? '')
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;');
}

const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    const date = new Date(`${dateStr}T00:00:00`); // Ensure it's treated as local date
    if (isNaN(date)) return 'Invalid date';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export { el, applyTheme, uid, escapeHTML, formatDate };
