import { getStore, saveStore } from "../data/store.js";
import { applyTheme } from "../helper.js";
const store = getStore();

export function globalEventListeners() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    themeToggleBtn.addEventListener('click', () => {
        store.theme = store.theme === 'dark' ? 'light' : 'dark';
        applyTheme();
        saveStore();
    });
}