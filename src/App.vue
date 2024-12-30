<script setup lang="ts">
import {onBeforeMount, provide, ref} from "vue"
import NavBar from "@/components/NavBar.vue";
import TreeNode from './components/TreeNode.vue';
import {useInfoStore} from "@/stores/info.ts";

const store = useInfoStore();
onBeforeMount(() => {
  store.storeGetTheme()
})

interface FileItem {
  name: string;
  path: string;
  children?: FileItem[];
  collapsed?: boolean;
}
// 文件信息
const fileInfo = ref<{
  name: string;
  type: string;
  path: string;
  size: number;
  lastModified: string;
} | null>(null);
// 提供更新文件信息的方法
const updateFileInfo = (info: {
  name: string;
  type: string;
  path: string;
  size: number;
  lastModified: string;
}) => {
  fileInfo.value = info;
};
provide('updateFileInfo', updateFileInfo);

const fileMap = ref<Record<string, File>>({}); // 存储文件路径和 File 对象的映射
const fileTree = ref<FileItem[]>([]);
// 处理文件夹选择
const handleFolderSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files !== null && input.files.length > 0) {
    fileInfo.value = null
    fileTree.value = buildFileTree(input.files);
    buildFileMap(input.files);
  }
};
// 构建文件树
const buildFileTree = (files: FileList): FileItem[] => {
  const root: FileItem = {name: 'Root', path: '', children: []};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pathParts = file.webkitRelativePath.split('/');
    let currentLevel = root.children!;
    for (let j = 0; j < pathParts.length; j++) {
      const part = pathParts[j];
      const existingPath = currentLevel.find((item) => item.name === part);
      if (existingPath) {
        currentLevel = existingPath.children || [];
      } else {
        const newItem: FileItem = {name: part, path: file.webkitRelativePath};
        if (j < pathParts.length - 1) {
          newItem.children = [];
        }
        currentLevel.push(newItem);
        currentLevel = newItem.children || [];
      }
    }
  }
  return root.children || [];
};
// 构建文件路径和 File 对象的映射
const buildFileMap = (files: FileList) => {
  fileMap.value = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    fileMap.value[file.webkitRelativePath] = file;
  }
};
</script>

<template>
  <NavBar></NavBar>
  <main class="main-box">
    <div class="file-tree">
      <label class="custom-file-label">
        <input type="file" style="display: none" id="directoryInput" webkitdirectory @change="handleFolderSelect"/>
        选择文件
      </label>
      <TreeNode v-if="fileTree.length > 0" :files="fileTree" :fileMap="fileMap"/>
    </div>
    <div class="file-info" v-if="fileInfo">
      <div class="file-info-title">文件属性</div>
      <div>文件名：{{fileInfo?.name}}</div>
      <div>文件大小：{{fileInfo?.size}} k</div>
      <div>相对路径：{{fileInfo?.path}}</div>
      <div>文件类型：{{fileInfo?.type}}</div>
      <div>修改时间：{{fileInfo?.lastModified}}</div>
    </div>
  </main>
</template>

<style scoped lang="less">


.main-box {
  display: flex;
  justify-content: space-between;
  padding: calc(@nav-height + 10px) 10px 10px 10px;
  .file-tree {
    .custom-file-label {
      background-color: #6aa0b6; /* 背景颜色 */
      color: var(--p-text-color); /* 字体颜色 */
      font-weight: bold;
      padding: 6px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      display: inline-block;
      box-shadow: 0 0 10px 2px var(--box-shadow-color);
      transition: background-color 150ms;
      &:hover {
        background-color: #8cccd5; /* 悬停时的背景颜色 */
      }
    }

  }
  .file-info{
    box-shadow: 0 0 10px 2px var(--box-shadow-color);
    padding: 10px;
    right: 10px; /* 距离右侧 0 */
    position: fixed;
    max-width: 400px;
    border-radius: 9px;
    background-color: var(--nav-bg-color);
    color: var(--p-text-color);
    .file-info-title{
      font-size: 16px;
      font-weight: bolder;
      padding-bottom: 6px;
    }
    >div{
      padding: 3px;
      font-size: 15px;
    }
  }
}

input {
  margin-bottom: 20px;
}
</style>
