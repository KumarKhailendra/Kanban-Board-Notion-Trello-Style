import { defaultData, getStore, STORAGE_KEY } from "../data/store.js";
import { ensureStoreIntegrity } from "./ensureStoreIntegrity.js";

export function loadStore() {
    const store = getStore();

    const row = window.localStorage.getItem(STORAGE_KEY);
    if (!row) {
        Object.assign(store, defaultData());
        return;
    }

    try {
        const data = JSON.parse(row);
        Object.assign(store, {
            columns: Array.isArray(data.columns) ? data.columns : defaultData().columns,
            tasks: Array.isArray(data.tasks) ? data.tasks : defaultData().tasks,
            filters: {
                priority: data.filters?.priority || 'all',
                search: data.filters?.search || '',
            },
            theme: data.theme === 'dark' ? 'dark' : 'light',
        });
        ensureStoreIntegrity();
    } catch {
        Object.assign(store, defaultData());
    }
}