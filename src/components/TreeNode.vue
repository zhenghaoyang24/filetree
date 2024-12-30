<template>
  <ul>
    <li v-for="item in files" :key="item.path">
      <div class="file-box"
           @click="handleItemClick(item)"
           :style="{ cursor: item.children ? 'pointer' : 'default' }"
      >
        <span v-if="item.children">
          <Icon icon="ic:baseline-play-arrow" :style="{ transform: item.collapsed ? 'none' : 'rotate(90deg)' }"></Icon>
          <Icon icon="fluent-color:document-folder-24" style="padding-left: 5px"></Icon>

          {{ item.children.length }}
          </span>
          {{ item.name }}
      </div>
      <TreeNode
          v-if="item.children && !item.collapsed"
          :files="item.children"
          :fileMap="fileMap"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {Icon} from "@iconify/vue";

interface FileItem {
  name: string;
  path: string;
  children?: FileItem[];
  collapsed?: boolean;
}

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

// 处理点击事件
const handleItemClick = (item: FileItem) => {
  if (item.children) {
    toggleCollapse(item); // 如果是文件夹，切换折叠状态
  } else {
    const file = props.fileMap[item.path];
    if (file) {
      console.log('文件名称:', item.name);
      console.log('文件路径:', item.path);
      console.log('文件类型:', file.type ? file.type : '未知');
      console.log('文件大小:', file.size + ' bytes');
      console.log('创建时间:', file.lastModified ? new Date(file.lastModified).toLocaleString() : '未知');
      console.log('修改时间:', file.lastModified ? new Date(file.lastModified).toLocaleString() : '未知');
    }
  }
};
</script>

<style>
.file-box {
  display: flex;
  align-items: center;
}

ul {
  color: var(--p-text-color);
  list-style-type: none;
  padding-left: 23px;
  position: relative;
}

li {
  box-sizing: border-box;
  padding: 5px 0 5px 20px;
  position: relative;
}

li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: var(--line-color); /* 连接线颜色 */
}

li::after {
  content: '';
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
</style>
