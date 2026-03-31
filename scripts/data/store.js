import { uid } from "../helper.js";

export const STORAGE_KEY = 'kanban-board-DOM-project-v1.0';
export const defaultData = () => {
    return {
        columns: [
            {
                id: uid("col"),
                title: "To Do",
            },
            {
                id: uid("col"),
                title: "In Progress",
            },
            {
                id: uid("col"),
                title: "Done",
            },
        ],
        tasks: [],
        filters: {
            search: '',
            priority: 'all',
        },
        theme: 'light',
    };
}

const store = {
    columns: [],
    tasks: [],
    filters: {
        search: '',
        priority: 'all',
    },
    theme: 'light',
};

export function getStore() {
    return store;
}

export function saveStore() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}