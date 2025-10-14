<script setup lang="ts">
import { defineProps, inject, ref } from "vue";
import { Icon } from "@iconify/vue";
import { type FileInfo, type FileItem } from "@/types/file";
import { useInfoStore } from "../stores/info";
const inforStore = useInfoStore();

const props = defineProps<{
  files: FileItem[];
  fileMap: Record<string, File>; // 用于存储文件路径和 File 对象的映射
}>();

// 切换折叠状态
const toggleCollapse = (item: FileItem) => {
  if (item.children) {
    item.collapsed = !item.collapsed;
  }
};

const updateFileInfo = (info: FileInfo) => {
  inforStore.changeFileInfo(info);
};

// 处理点击事件
const handleItemClick = (item: FileItem) => {
  if (item.children) {
    toggleCollapse(item); // 如果是文件夹，切换折叠状态
  } else {
    const file = props.fileMap[item.path];
    if (file) {
      const info = {
        name: item.name,
        type: file.type ? file.type : "未知",
        path: file.webkitRelativePath,
        size: file.size,
        lastModified: file.lastModified
          ? new Date(file.lastModified).toLocaleString()
          : "未知",
      };
      updateFileInfo(info);
    }
    inforStore.changeFilePreview(item.path, props.fileMap);
  }
};

// 返回图标name
import icons from "@/data/icon.json";

interface IconConfig {
  type: string; // 文件后缀
  icon: string; // 图标
}

const getFileIcon = (filename: string): string | undefined => {
  // 获取文件后缀
  const fileExtension = filename.split(".").pop()?.toLowerCase();
  // 在 icon.json 中查找对应的图标
  const iconConfig = icons.find(
    (icon: IconConfig) => icon.type === fileExtension
  );
  // 返回图标，如果未找到则返回 undefined
  return iconConfig ? iconConfig.icon : "flat-color-icons:document";
};
</script>

<template>
  <ul>
    <li v-for="item in files" :key="item.path">
      <div class="file-item" @click="handleItemClick(item)">
        <span v-if="item.children" class="file-item-label">
          <Icon
            icon="ic:baseline-play-arrow"
            :style="{ transform: item.collapsed ? 'none' : 'rotate(90deg)' }"
          ></Icon>
          <Icon icon="emojione-v1:open-folder" style="padding: 0 5px" />
        </span>
        <span v-else class="file-item-label">
          <Icon
            :icon="getFileIcon(item.name) || 'flat-color-icons:document'"
            style="padding: 0 5px"
          />
        </span>
        <span class="file-item-name">{{ item.name }}</span>
        <span v-if="item.children" class="file-item-label">
          <span class="file-item-length">{{ item.children.length }}</span>
        </span>
      </div>
      <TreeNode
        v-if="item.children && !item.collapsed"
        :files="item.children"
        :fileMap="fileMap"
      />
    </li>
  </ul>
</template>

<style>
.file-item {
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 5px 10px;

  .file-item-label {
    display: flex;
    align-items: center;
  }

  .file-item-length {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--label-bg-color);
    font-size: 12px;
    width: 19px;
    height: 19px;
    border-radius: 10%;
    margin-left: 10px;
    font-weight: bold;
  }
}

ul {
  color: var(--p-text-color);
  list-style-type: none;
  padding-left: 18px;
  position: relative;
}

li {
  box-sizing: border-box;
  padding: 0 0 0 20px;
  position: relative;
}

li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: var(--line-color); /* 连接线颜色 */
}

li::after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 13px; /* 水平连接线长度 */
  height: 1px;
  background-color: var(--line-color); /* 连接线颜色 */
}

li:last-child::before {
  height: 50%; /* 最后一个节点的连接线只到中间 */
}

span {
  font-family: Arial, sans-serif;
}

.file-item-name {
  white-space: nowrap;
}
</style>
