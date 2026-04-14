import { defaultData, getStore } from "../data/store.js";

export function ensureStoreIntegrity() {
    const store = getStore();
    
    if(!Array.isArray(store.columns) || !store.columns.length) {
        store.columns = defaultData().columns;
    }

    if(!Array.isArray(store.tasks)) {
        store.tasks = [];
    }

    if(store.theme !== 'dark') {
        store.theme = 'light';
    }
}