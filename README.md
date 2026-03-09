# Kanban Board (Notion / Trello Style)

A responsive Kanban board built with vanilla HTML, CSS, and JavaScript.

This project demonstrates practical DOM manipulation patterns including drag-and-drop, modal editing flows, local persistence, filtering, and JSON backup/restore.

## Live Features

- Create custom columns (default includes `Todo`, `In Progress`, `Done`)
- Rename and delete columns
- Create, edit, and delete tasks
- Add due dates and priority (`Low`, `Medium`, `High`)
- Filter tasks by priority
- Search tasks by title and description
- Drag and drop tasks between columns
- Reorder tasks within the same column
- Dark/Light theme toggle
- Persist all board data to `localStorage`
- Export board data to JSON
- Import board data from JSON backup

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+, DOM APIs)
- Browser LocalStorage API

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. Start managing tasks on the board.

No dependencies or build tools are required.

## Project Structure

- `index.html`: App entry HTML
- `scripts/main.js`: App bootstrap and initialization
- `scripts/data/store.js`: Default board and Central app state/store
- `scripts/functions/`: Core board logic (rendering, task/column actions, DnD, persistence, import/export)
- `scripts/ui/`: UI composition modules (layout, metadata, topbar, modal)
- `styles/`: Split CSS files for root, topbar, board, and modal

## Data Persistence

The app stores board state in browser LocalStorage under:

- `kanban_board_dom_project_v1`

Saved state includes:

- Columns
- Tasks
- Task order per column
- Theme
- Active search/filter values

## Backup and Restore

### Export

Use **Export JSON** to download a full board backup file:

- `kanban-backup-YYYY-MM-DD.json`

### Import

Use **Import JSON** to restore board state from a backup file.
Imported data is validated and sanitized before being applied.

## Browser Support

Works on current versions of Chromium-based browsers, Firefox, and Edge.

## Contributing

Contributions are welcome. See `CONTRIBUTING.md` for setup, workflow, and PR guidelines.

## License

This project is licensed under the MIT License. See `LICENSE`.
