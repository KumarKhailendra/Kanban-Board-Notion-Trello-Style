import { defaultData, getStore } from "../data/store.js";
import { normalizeColumnOrder } from "./taskFunctions.js";

export function ensureStoreIntegrity() {
  const store = getStore();

  if (!Array.isArray(store.columns) || !store.columns.length) {
    store.columns = defaultData().columns;
  }

  if (!Array.isArray(store.tasks)) {
    store.tasks = [];
  }

  const validColumnIds = new Set(store.columns.map((col) => col.id));
  store.tasks = store.tasks
    .filter((task) => validColumnIds.has(task.columnId))
    .map((task) => ({
      ...task,
      id: task.id || uid("task"),
      title: typeof task.title === "string" ? task.title : "Untitled Task",
      description: typeof task.description === "string" ? task.description : "",
      dueDate: typeof task.dueDate === "string" ? task.dueDate : "",
      priority: ["low", "medium", "high"].includes(task.priority)
        ? task.priority
        : "medium",
      order: Number.isFinite(task.order) ? task.order : 0,
      createdAt: task.createdAt || new Date().toISOString(),
    }));

  store.columns.forEach((column) => normalizeColumnOrder(column.id));

  if (!["all", "low", "medium", "high"].includes(store.filters.priority)) {
    store.filters.priority = "all";
  }

  if (typeof store.filters.search !== "string") {
    store.filters.search = "";
  }

  if (store.theme !== "dark") {
    store.theme = "light";
  }
}
