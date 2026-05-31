export const getElement = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id "${id}" not found`);
  }
  return el;
};

export const getAllElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    console.warn(`Elements with selector "${selector}" not found`);
  }
  return elements;
};

export const getModalElements = () => ({
    taskModal: getElement("taskModal"),
    taskForm: getElement("taskForm"),
    taskModalTitle: getElement("taskModalTitle"),
    deleteTaskBtn: getElement("deleteTaskBtn"),
    taskIdInput: getElement("taskId"),
    taskColumnIdInput: getElement("taskColumnId"),
    taskTitleInput: getElement("taskTitle"),
    taskDescriptionInput: getElement("taskDescription"),
    taskDueDateInput: getElement("taskDueDate"),
    taskPriorityInput: getElement("taskPriority"),
});