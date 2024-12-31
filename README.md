![{7003FB0B-A4FD-4DA6-912F-55AA6A9B4721}](https://github.com/user-attachments/assets/9e5ca231-27ed-46c9-8934-1915045ab6df)# FileTree

## 项目简介

FileTree 是一个基于 `Vue3` 的工具，你可以选择一个本地文件夹，并根据其结构生成清晰的文件树。
生成的文件树可以直观地展示复杂的文件夹结构与文件基本信息，并支持导出为适用于 `Markdown` 增强的格式，方便在 `Markdown` 文件中使用。

## 功能特性

- **文件夹选择**：你可以选择本地文件夹，系统会自动解析其结构。
- **文件树生成**：根据文件夹结构生成清晰的文件树，支持展开/折叠操作。
- **导出功能**：将文件树导出为 `Markdown` 兼容的格式，方便在支持 `Markdown` 增强的编辑器中使用，例如博客主题 [theme-plume](https://theme-plume.vuejs.press/)。
- **直观展示**：通过树形结构直观展示复杂的文件夹层次关系与文件基本信息。


## 示例

### 文件树示例
![{7003FB0B-A4FD-4DA6-912F-55AA6A9B4721}](https://github.com/user-attachments/assets/5d083206-63e7-4372-8898-cf2390491ddf)


### 导出的 Markdown 格式
```markdown
- example
  - App.vue
  - index.ts
  - folder-02
    - JavaScript.js
  - folder-01
    - text.txt
```

## 安装与运行

1. **克隆项目**：
   ```bash
   git clone git@github.com:zhenghaoyang24/filetree.git
   cd filetree
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **运行项目**：
   ```bash
   npm run dev
   ```

4. **构建项目**：
   ```bash
   npm run build
   ```


## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

## 许可证

本项目采用 **MIT** 许可证。详情请参阅 [LICENSE](https://github.com/zhenghaoyang24/filetree/blob/master/LICENSE) 文件。

---

感谢使用 FileTree！希望它能帮助你更高效地管理和展示复杂的文件夹结构。
