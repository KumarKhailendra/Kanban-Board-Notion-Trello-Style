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

export function moveTask(taskId, targetColumnId, beforeTaskId = null) {
  const store = getStore();
  const task = store.tasks.find(t => t.id === taskId);
  if (!task) return;

  const sourceColumnId = task.columnId;
  task.columnId = targetColumnId;

  const targetTasks = allTasksInColumn(targetColumnId).filter(t => t.id !== taskId);
  let insertIndex = targetTasks.length; // default to end of list

  if (beforeTaskId) {
    const beforeTaskIndex = targetTasks.findIndex(t => t.id === beforeTaskId);
    if (beforeTaskIndex !== -1) {
      insertIndex = beforeTaskIndex;
    }
  }

  targetTasks.splice(insertIndex, 0, task);

  // Reassign order values
  targetTasks.forEach((t, index) => {
    t.order = (index + 1) * 1000;
  });

  // If moving within the same column, we need to normalize the source column as well
  if (sourceColumnId !== targetColumnId) {
    normalizeColumnOrder(sourceColumnId);
  }
}

export function getDragAfterElement(listEl, y) {
  const cards = [...listEl.querySelectorAll('.task-card:not(.dragging)')];

  return cards.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;

}