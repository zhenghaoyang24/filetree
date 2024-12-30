<script setup lang="ts">
import {onBeforeMount, ref} from "vue"
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
const fileMap = ref<Record<string, File>>({}); // 存储文件路径和 File 对象的映射
const fileTree = ref<FileItem[]>([]);
// 处理文件夹选择
const handleFolderSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    fileTree.value = buildFileTree(input.files);
    buildFileMap(input.files);
  }
};
// 构建文件树
const buildFileTree = (files: FileList): FileItem[] => {
  const root: FileItem = { name: 'Root', path: '', children: [] };
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
        const newItem: FileItem = { name: part, path: file.webkitRelativePath };
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
    <input type="file" id="directoryInput" webkitdirectory @change="handleFolderSelect" />
    <TreeNode v-if="fileTree.length > 0" :files="fileTree" :fileMap="fileMap" />
  </main>
</template>

<style scoped lang="less">
.main-box{
  padding: calc(@nav-height + 10px) 10px 10px 10px;
}
input {
  margin-bottom: 20px;
}
</style>
