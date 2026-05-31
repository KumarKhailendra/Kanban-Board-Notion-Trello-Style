# Kanban Board

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A responsive, Trello-style Kanban board built with vanilla HTML, CSS, and modern JavaScript. The application demonstrates practical frontend engineering patterns including modular architecture, DOM-driven rendering, drag-and-drop interactions, local data persistence, filtering, theming, and JSON backup/restore workflows.

## Demo / Preview

**Live Demo:** [Kanban Board - Notion / Trello Style](https://kumarkhailendra.github.io/Kanban-Board-Notion-Trello-Style/)

To preview locally, run the project in a browser using the setup instructions below.

## Features

- Create, rename, and delete custom board columns
- Default workflow columns: `To Do`, `In Progress`, and `Done`
- Create, edit, and delete tasks
- Add task metadata including description, due date, and priority
- Filter tasks by priority: `Low`, `Medium`, and `High`
- Search tasks by title and description
- Drag and drop tasks between columns
- Reorder tasks inside the same column
- Toggle between light and dark themes
- Persist board state using the Browser LocalStorage API
- Export board data as a JSON backup
- Import validated and sanitized JSON backup files
- Responsive layout for desktop and smaller screens

## Screenshots

| Board View | Task Modal |
| --- | --- |
| ![Kanban board view](https://github.com/user-attachments/assets/499bab24-e0b6-43c9-983f-67e8b775a23b) | ![Task modal view](https://github.com/user-attachments/assets/04697c4d-e988-40ae-bcef-1fca1d344fcb) |

## Tech Stack

- **HTML5** - Semantic application shell
- **CSS3** - Responsive styling, theme support, and layout composition
- **JavaScript ES6+** - Modular application logic and DOM manipulation
- **Browser LocalStorage API** - Client-side persistence
- **Native Drag and Drop API** - Task movement and ordering
- **JSON / Blob APIs** - Backup export and restore functionality

## Architecture / Project Structure

```text
.
├── index.html
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── scripts
│   ├── main.js
│   ├── helper.js
│   ├── data
│   │   └── store.js
│   ├── functions
│   │   ├── columnFunctions.js
│   │   ├── DnDEventListeners.js
│   │   ├── ensureStoreIntegrity.js
│   │   ├── getElements.js
│   │   ├── gloableEventListeners.js
│   │   ├── importExportData.js
│   │   ├── loadStore.js
│   │   ├── modal.js
│   │   └── taskFunctions.js
│   └── ui
│       ├── headMetaData.js
│       ├── renderBoard.js
│       ├── rootLayout.js
│       ├── modal
│       │   └── index.js
│       └── topbar
│           ├── controls.js
│           └── logo.js
└── styles
    ├── boardColumn.css
    ├── boardTask.css
    ├── modal.css
    ├── root.css
    └── topbar.css
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Todo_App
```

### 2. Run the application

This project does not require a build step or package installation.

Because the app uses JavaScript modules, it is best served through a local static server.

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Alternatively, open `index.html` directly in a modern browser if your browser allows local ES module loading.

## Usage Guide

### Manage Columns

- Use the column controls to create new workflow columns.
- Rename columns to match your process.
- Delete columns when they are no longer needed.
- At least one column must remain on the board.

### Manage Tasks

- Create tasks inside any column.
- Add a title, description, due date, and priority.
- Edit task details through the modal interface.
- Delete tasks when they are complete or no longer relevant.

### Organize Work

- Drag tasks between columns to update their status.
- Reorder tasks within a column to adjust priority or sequencing.
- Use search to quickly find tasks by title or description.
- Use priority filters to focus on specific work categories.

### Backup and Restore

Export board data as a JSON file:

```text
kanban-backup-YYYY-MM-DD.json
```

Import a JSON backup file to restore board data. Imported data is validated and sanitized before being applied to the application state.

## Core Functionalities

### State Management

The application uses a centralized store module to manage:

- Columns
- Tasks
- Active filters
- Theme preference

The store is persisted to LocalStorage after state-changing actions.

### DOM Manipulation

The UI is rendered and updated using modular JavaScript functions. This keeps rendering logic, event handling, and state updates separated for better maintainability.

### Drag and Drop

Task movement is powered by the native Browser Drag and Drop API. The app supports:

- Moving tasks across columns
- Reordering tasks within the same column
- Recalculating task order after drag operations
- Persisting the updated order immediately

### Data Persistence

Board state is stored in LocalStorage using the key:

```text
kanban-board-DOM-project-v1.0
```

Persisted data includes:

- Columns
- Tasks
- Task order
- Theme preference
- Search and priority filters

### Import Validation

Imported JSON data is checked before it is applied. The app validates columns, filters invalid tasks, sanitizes task fields, assigns missing IDs, and restores safe defaults where needed.

## Configuration

No environment variables or external configuration files are required.

Runtime configuration is handled directly in the browser through LocalStorage and user interactions.

## Engineering Highlights

- **Modular Architecture** - Application logic is separated into data, UI, and feature-specific function modules.
- **State Management** - A centralized store keeps board data predictable and easier to reason about.
- **Reusable UI Composition** - Layout, topbar, modal, metadata, and board rendering are organized into reusable modules.
- **Clean DOM Event Handling** - Global events, drag-and-drop events, modal actions, and board actions are grouped by responsibility.
- **Data Persistence** - LocalStorage enables a durable offline-first user experience without a backend.
- **Data Integrity** - Store validation protects the app from malformed or incomplete imported data.
- **Responsive Design** - CSS is split by interface area, making the UI easier to maintain and adapt.
- **Performance-Aware Rendering** - Lightweight vanilla JavaScript avoids unnecessary framework overhead for this project scope.
- **Maintainability** - Clear file boundaries make the codebase easier to extend, debug, and present in technical interviews.

## Performance / Design Highlights

- No frontend framework dependency
- No bundler or build process required
- Fast startup with lightweight static assets
- Native browser APIs for storage, drag-and-drop, and file export
- Split CSS files for focused styling ownership
- Theme-aware UI with light and dark mode support
- Client-side backup and restore without server dependency

## Dependencies / Libraries Used

This project intentionally keeps dependencies minimal.

External assets used:

- Google Fonts: `Outfit`
- Icons8 favicon assets

Browser APIs used:

- DOM API
- LocalStorage API
- Drag and Drop API
- File API
- Blob API
- URL API

## Browser Support

The application is designed for current versions of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Chromium-based browsers

## Future Improvements

- Add live hosted demo
- Add screenshots and GIF preview
- Add keyboard accessibility improvements
- Add task labels or tags
- Add task assignees
- Add column-level task limits
- Add archive support for completed tasks
- Add automated tests for store validation and import/export flows
- Add optional backend sync for multi-device persistence

## Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the app in a modern browser.
5. Open a pull request with a clear description.

See `CONTRIBUTING.md` for setup, workflow, and pull request guidelines.

## License

This project is licensed under the MIT License.

See `LICENSE` for details.