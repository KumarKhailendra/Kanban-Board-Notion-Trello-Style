import { getStore, saveStore } from "../data/store.js";
import { applyTheme, uid } from "../helper.js";
import { renderBoard } from "../ui/renderBoard.js";
import { ensureStoreIntegrity } from "./ensureStoreIntegrity.js";

export function exportBoardData(board) {
    const store = getStore(); 
    const exportPayload = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        data: {
            columns: store.columns,
            tasks: store.tasks,
            theme: store.theme
        }
     };

     const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `kanban-backup-${new Date().toISOString().slice(0,10)}.json`;
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
     URL.revokeObjectURL(url);
}

export async function importBoardData(file) {
    const store = getStore(); 
    try{
        const text = await file.text();
        const parsed = JSON.parse(text);
        const imported = parsed?.data || parsed; // Support both { data: { columns, tasks } } and { columns, tasks } formats

        if (!Array.isArray(imported.columns) || !imported.columns.length || !Array.isArray(imported.tasks)) {
            window.alert("Invalid file format. Please choose a valid JSON backup file.");
            return;
        }
        
        // Update the store with the imported data
        store.columns = imported.columns.map((col) => ({
            id: typeof col.id === 'string' && col.id ? col.id : uid("col"),
            title: typeof col.title === 'string' && col.title.trim() ? col.title.trim() : 'Untitled Column',
        }));
        
        const validColumnIds = new Set(store.columns.map(col => col.id));
        store.tasks = imported.tasks
        .filter((task) => validColumnIds.has(task.columnId))
        .map((task) => ({
            id: typeof task.id === 'string' && task.id ? task.id : uid("task"),
            columnId: task.columnId,
            title: typeof task.title === 'string' && task.title ? task.title.trim() : 'Untitled Task',
            description: typeof task.description === 'string' && task.description ? task.description.trim() : '',
            dueDate: typeof task.dueDate === 'string' && task.dueDate ? task.dueDate : '',
            priority: typeof task.priority === 'string' && task.priority ? task.priority : 'medium',
            order: Number.isFinite(task.order) ? task.order : 0,
            createdAt: task.createdAt || new Date().toISOString(),
        }));
        store.theme = imported.theme || 'light';
        store.filters = { search: '', priority: 'all' };

        ensureStoreIntegrity();
        saveStore();
        applyTheme()
        renderBoard();

        window.alert("Board data imported successfully!");
    } catch (error) {
        window.alert("Unable to import file. Please choose a valid JSON backup file.");
    }
}