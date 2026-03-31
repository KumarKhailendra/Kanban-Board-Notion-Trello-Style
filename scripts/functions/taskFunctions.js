import { getStore } from "../data/store.js";

export function visibleTasksInColumn(columnId) {
  const store = getStore();
  const search = store.filters.search.trim().toLowerCase();
  return allTasksInColumn(columnId).filter((task) => {
    if (store.filters.priority !== 'all' && task.priority !== store.filters.priority) {
      return false;
    }

    if (!search) return true;
    const hay = `${task.title} ${task.description || ''}`.toLowerCase();
    return hay.includes(search);
  });
}

export function allTasksInColumn(columnId) {
  const store = getStore();
  return store.tasks
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.order - b.order);
}
