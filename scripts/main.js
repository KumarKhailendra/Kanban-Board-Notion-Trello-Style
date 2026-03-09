import { setMetaData } from "./ui/headMetaData.js";
import { rootLayout } from "./ui/rootLayout.js";

const metaData = {
    title: "Kanban Board - DOM Project",
    description: "A responsive Kanban board built with vanilla HTML, CSS, and JavaScript. This project demonstrates practical DOM manipulation patterns including drag-and-drop, modal editing flows, local persistence, filtering, and JSON backup/restore.",
    keywords: ["Notion Clone", "Trello Style Clone", "Open Sorce Project", "Todu Application", "Kanban Board", "Drag and Drop", "Modal Editing", "Local Persistence", "Filtering", "JSON Backup/Restore"],
    icon32: "https://img.icons8.com/external-flat-design-circle/64/external-Todo-List-business-flat-design-circle.png",
    icon16: "https://img.icons8.com/external-flat-design-circle/64/external-Todo-List-business-flat-design-circle.png",
    stylessheets: [
        "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap",
        "../styles/root.css",
    ],
    preconnect: [
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
    ],
    scripts: [],
    bodyScripts: []
}

window.addEventListener('DOMContentLoaded', () => {
    setMetaData(metaData);
});

// -------------------------------------------- Start Root Layout --------------------------------------------
const rootElement = document.getElementById('root');
rootElement.appendChild(rootLayout());
// -------------------------------------------- End Root Layout ----------------------------------------------
