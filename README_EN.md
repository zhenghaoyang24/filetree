# FileTree

## Project Introduction

FileTree is a tool based on `Vue3` that allows you to select a local folder and generate a clear file tree based on its structure. The generated file tree can intuitively display complex folder structures and basic file information, and supports exporting to a format compatible with `Markdown` enhancements, making it easy to use in `Markdown` files.

## Features

- **Folder Selection**: You can select a local folder, and the system will automatically parse its structure.
- **File Tree Generation**: Generate a clear file tree based on the folder structure, with support for expand/collapse operations.
- **Export Functionality**: Export the file tree to a `Markdown`-compatible format, making it easy to use in editors that support `Markdown` enhancements, such as the blog theme [theme-plume](https://theme-plume.vuejs.press/).
- **Intuitive Display**: Intuitively display complex folder hierarchies and basic file information through a tree structure.

## Examples

### File Tree Example
![{7003FB0B-A4FD-4DA6-912F-55AA6A9B4721}](https://github.com/user-attachments/assets/5d083206-63e7-4372-8898-cf2390491ddf)

### Exported Markdown Format
```markdown
- example
  - App.vue
  - index.ts
  - folder-02
    - JavaScript.js
  - folder-01
    - text.txt
```

## Installation and Running

1. **Clone the Project**:
   ```bash
   git clone git@github.com:zhenghaoyang24/filetree.git
   cd filetree
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Project**:
   ```bash
   npm run dev
   ```

4. **Build the Project**:
   ```bash
   npm run build
   ```

## Contribution Guidelines

Welcome to submit Issues and Pull Requests to improve the project.

## License

This project is licensed under the **MIT** License. For details, please refer to the [LICENSE](https://github.com/zhenghaoyang24/filetree/blob/master/LICENSE) file.

---

Thank you for using FileTree! We hope it helps you manage and display complex folder structures more efficiently.
