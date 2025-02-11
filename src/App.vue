<script setup lang="ts">
import {onBeforeMount, provide, ref} from "vue"
import NavBar from "@/components/NavBar.vue";
import TreeNode from './components/TreeNode.vue';
import {useInfoStore} from "@/stores/info.ts";
import TextAreaDialog from "@/components/TextAreaDialog.vue";

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
const selFolderName = ref<string>('');
// 处理文件夹选择
const handleFolderSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files !== null && input.files.length > 0) {
    fileInfo.value = null
    // 提取选中的文件夹名称
    selFolderName.value = input.files[0].webkitRelativePath.split('/')[0];
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


/*导出文件结构*/
// 定义文件夹结构的类型
interface FolderStructure {
  [key: string]: FolderStructure | string[]; // 键是文件夹或文件的名称，值可以是子文件夹（FolderStructure）或文件列表（string[]）
}

// 生成文件夹结构
const structureString = ref<string>('');  //文件结构string
const structureDialogState = ref<boolean>(false);  // dialog 状态
const changeDialogState = () => {
  if (structureDialogState.value) {
    structureDialogState.value = false
    document.body.style.overflow = 'auto'; // 恢复滚动
    document.body.style.overscrollBehavior = '';

  } else {
    structureDialogState.value = true
    document.body.style.overflow = 'hidden'; // 禁止滚动
    document.body.style.overscrollBehavior = 'contain'; // 防止滚动穿透
  }
}
provide('changeDialogState', changeDialogState);
const generateFolderStructureTxt = () => {
  // 获取所有文件路径
  const filePaths = Object.keys(fileMap.value);

  // 构建文件夹结构
  const structure: FolderStructure = {}; // 初始化文件夹结构对象
  for (const path of filePaths) {
    const parts = path.split('/'); // 将文件路径按 '/' 分割成数组
    let currentLevel: FolderStructure = structure; // 当前层级，初始化为根结构
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]; // 当前文件夹或文件的名称
      if (i === parts.length - 1) {
        // 如果是路径的最后一部分，表示是文件
        if (!currentLevel[part]) {
          currentLevel[part] = []; // 将文件添加到当前层级
        }
      } else {
        // 如果是路径的中间部分，表示是文件夹
        if (!currentLevel[part]) {
          currentLevel[part] = {}; // 创建子文件夹
        }
        currentLevel = currentLevel[part] as FolderStructure; // 进入子文件夹层级
      }
    }
  }

  // 将文件夹结构转换为字符串
  const convertStructureToString = (obj: FolderStructure, indent: number = 0): string => {
    let result = ''; // 初始化结果字符串
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        // 如果是文件（值为数组）
        result += '  '.repeat(indent) + `- ${key}\n`; // 添加文件名称，带缩进
      } else {
        // 如果是文件夹（值为对象）
        result += '  '.repeat(indent) + `- ${key}\n`; // 添加文件夹名称，带缩进
        result += convertStructureToString(obj[key] as FolderStructure, indent + 1); // 递归处理子文件夹
      }
    }
    return result; // 返回格式化后的字符串
  };
  structureString.value = convertStructureToString(structure); // 将文件夹结构转换为字符串
  changeDialogState()
};
</script>
<template>
  <TextAreaDialog v-if="structureDialogState" :structure="structureString"/>
  <NavBar></NavBar>
  <main class="main-box">
    <div class="file-tree">
      <label class="custom-file-label">
        <input type="file" style="display: none" id="directoryInput" webkitdirectory @change="handleFolderSelect"/>
        {{ $t('selectFileBtn.value') }}
      </label>
      <span v-if="Object.keys(fileMap).length > 0" class="custom-file-label" style="margin-left: 15px"
            @click="generateFolderStructureTxt">{{ $t('importBtn.value') }}</span>
      <TreeNode v-if="fileTree.length > 0" :files="fileTree" :fileMap="fileMap"/>
    </div>
    <div class="file-info" v-if="fileInfo">
      <div class="file-info-title">{{ $t('fileInfo.title') }}</div>
      <div><span>{{ $t('fileInfo.name') }}</span>：{{ fileInfo?.name }}</div>
      <div><span>{{ $t('fileInfo.type') }}</span>：{{ fileInfo?.type }}</div>
      <div><span>{{ $t('fileInfo.size') }}</span>：{{ fileInfo?.size }} Bytes</div>
      <div><span>{{ $t('fileInfo.path') }}</span>：{{ fileInfo?.path }}</div>
      <div><span>{{ $t('fileInfo.lastModified') }}</span>：{{ fileInfo?.lastModified }}</div>
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
      color: @p-text-color-dark; /* 字体颜色 */
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

  .file-info {
    box-shadow: 0 0 10px 2px var(--box-shadow-color);
    padding: 15px;
    right: 10px; /* 距离右侧 0 */
    position: fixed;
    max-width: 400px;
    border-radius: 9px;
    background-color: var(--nav-bg-color);
    color: var(--p-text-color);

    .file-info-title {
      font-size: 16px;
      font-weight: bolder;
      padding-bottom: 6px;
    }

    > div {
      padding: 3px;
      font-size: 15px;

      > span {
        font-weight: bold;
      }
    }
  }
}

input {
  margin-bottom: 20px;
}
</style>
