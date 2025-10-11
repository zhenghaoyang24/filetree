<script setup lang="ts">
import { onBeforeMount, provide, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import FileTree from "./components/FileTree.vue";
import FileInfo from "./components/FileInfo.vue";
import { useInfoStore } from "@/stores/info.ts";


const store = useInfoStore();
onBeforeMount(() => {
  store.storeGetTheme();
});

</script>
<template>
  <NavBar></NavBar>
  <main class="main-box">
    <FileTree />

    <FileInfo />
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

.file-preview {
  flex: 1;
  max-width: 600px;
  box-shadow: 0 0 10px 2px var(--box-shadow-color);
  border-radius: 9px;
  background-color: var(--nav-bg-color);
  color: var(--p-text-color);
  padding: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .preview-title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .code-preview {
    flex: 1;
    white-space: pre;
    font-family: "Consolas", "Courier New", monospace;
    background: #f8f8f8;
    padding: 12px;
    border-radius: 6px;
    overflow: auto;
    max-height: 500px;
    line-height: 1.4;
  }

  .pdf-preview {
    flex: 1;
    min-height: 500px;
    width: 100%;
    border: 1px solid #ddd;
  }
}
</style>
