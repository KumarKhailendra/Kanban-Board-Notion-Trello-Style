export const getElement = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id "${id}" not found`);
  }
  return el;
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