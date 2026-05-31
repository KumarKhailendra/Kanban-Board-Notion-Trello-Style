import { getStore } from "../data/store.js";
import { uid } from "../helper.js";

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

export function getNextOrder(columnId) {
  const tasks = allTasksInColumn(columnId);
  if (!tasks.length) return 1000;
  return tasks[tasks.length - 1].order + 1000;
}

const normalizeColumnOrder = (columnId) => {
    const tasks = allTasksInColumn(columnId);
    tasks.forEach((task, index) => {
        task.order = (index + 1) * 1000;
    });
}

export function addTask(taskData) {
  const store = getStore();
  console.log({
    id: uid("task"),
    columnId: taskData.columnId,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    order: getNextOrder(taskData.columnId),
    createdAt: new Date().toISOString(),
  });
  
  store.tasks.push({
    id: uid("task"),
    columnId: taskData.columnId,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    order: getNextOrder(taskData.columnId),
    createdAt: new Date().toISOString(),
  });
}

export function updateTask(updatedTask) {
  const store = getStore();
  const index = store.tasks.findIndex((t) => t.id === updatedTask.id);
  if (index === -1) return;
  store.tasks[index] = { ...store.tasks[index], ...updatedTask };
}

export function deleteTask(taskId) {
  const store = getStore();
  const index = store.tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return;
  store.tasks.splice(index, 1);
  normalizeColumnOrder(store.tasks[index].columnId);
}