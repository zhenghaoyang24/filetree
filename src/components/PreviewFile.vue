<template>
    <!-- 👇 新增预览区域 -->
    <div class="file-preview">
      <div class="preview-title">{{ $t("preview.title") }}</div>
      <!-- 文本预览 -->
      <pre v-if="previewContent" class="code-preview">{{ previewContent }}</pre>
      <!-- PDF 预览 -->
      <iframe
        v-if="previewPdfUrl"
        :src="previewPdfUrl"
        class="pdf-preview"
        frameborder="0"
      ></iframe>
    </div>
</template>

<script setup lang="ts">
import { provide, ref, watch, watchEffect } from 'vue';
import {useInfoStore} from "../stores/info";
const inforStore = useInfoStore();
// 预览文件内容

// ====== 新增：预览相关逻辑 ======
const previewContent = ref<string | null>(null);
const previewPdfUrl = ref<string | null>(null);


watch(() => inforStore.dataFilePreview, async (newVal) => {
  console.log("previewContent", newVal);
  if (newVal) {
    const filePath = newVal.filePath;
    const fileMap = newVal.fileMap;
    const file = fileMap[filePath];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    previewContent.value = "⚠️ 文件过大，不支持预览";
    return;
  }

  // 清理上一个 PDF URL（防止内存泄漏）
  if (previewPdfUrl.value) {
    URL.revokeObjectURL(previewPdfUrl.value);
    previewPdfUrl.value = null;
  }
  previewContent.value = null;

  const ext = filePath.split(".").pop()?.toLowerCase();

  // PDF 预览
  if (ext === "pdf") {
    previewPdfUrl.value = URL.createObjectURL(file);
    return;
  }

  // 支持的文本类型
  const textExtensions = [
    "txt",
    "vue",
    "jsx",
    "js",
    "ts",
    "tsx",
    "xml",
    "json",
    "html",
    "htm",
    "css",
    "scss",
    "md",
    "yaml",
    "yml",
    "ini",
    "log",
  ];

  if (ext && textExtensions.includes(ext)) {
    try {
      const content = await file.text();
      previewContent.value = content;
    } catch (err) {
      previewContent.value = "❌ 无法读取文件内容";
    }
    return;
  }

  // 不支持的类型
  previewContent.value = "⚠️ 不支持预览此类型文件";
  } else {
    // 清理预览内容
    previewContent.value = null;
    if (previewPdfUrl.value) {
      URL.revokeObjectURL(previewPdfUrl.value);
      previewPdfUrl.value = null;
    }
  }
},{
  deep: true
});

// watchEffect(async () => { 
//   const filePath = inforStore.dataFilePreview!.filePath;
//   const fileMap = inforStore.dataFilePreview!.fileMap;
//   const file = fileMap[filePath];
//   if (!file) return;

//   if (file.size > 2 * 1024 * 1024) {
//     previewContent.value = "⚠️ 文件过大，不支持预览";
//     return;
//   }

//   // 清理上一个 PDF URL（防止内存泄漏）
//   if (previewPdfUrl.value) {
//     URL.revokeObjectURL(previewPdfUrl.value);
//     previewPdfUrl.value = null;
//   }
//   previewContent.value = null;

//   const ext = filePath.split(".").pop()?.toLowerCase();

//   // PDF 预览
//   if (ext === "pdf") {
//     previewPdfUrl.value = URL.createObjectURL(file);
//     return;
//   }

//   // 支持的文本类型
//   const textExtensions = [
//     "txt",
//     "vue",
//     "jsx",
//     "js",
//     "ts",
//     "tsx",
//     "xml",
//     "json",
//     "html",
//     "htm",
//     "css",
//     "scss",
//     "md",
//     "yaml",
//     "yml",
//     "ini",
//     "log",
//   ];

//   if (ext && textExtensions.includes(ext)) {
//     try {
//       const content = await file.text();
//       previewContent.value = content;
//     } catch (err) {
//       previewContent.value = "❌ 无法读取文件内容";
//     }
//     return;
//   }

//   // 不支持的类型
//   previewContent.value = "⚠️ 不支持预览此类型文件";
// });

const previewFile = async (filePath: string,fileMap:Record<string, File>) => {
  const file = fileMap[filePath];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    previewContent.value = "⚠️ 文件过大，不支持预览";
    return;
  }

  // 清理上一个 PDF URL（防止内存泄漏）
  if (previewPdfUrl.value) {
    URL.revokeObjectURL(previewPdfUrl.value);
    previewPdfUrl.value = null;
  }
  previewContent.value = null;

  const ext = filePath.split(".").pop()?.toLowerCase();

  // PDF 预览
  if (ext === "pdf") {
    previewPdfUrl.value = URL.createObjectURL(file);
    return;
  }

  // 支持的文本类型
  const textExtensions = [
    "txt",
    "vue",
    "jsx",
    "js",
    "ts",
    "tsx",
    "xml",
    "json",
    "html",
    "htm",
    "css",
    "scss",
    "md",
    "yaml",
    "yml",
    "ini",
    "log",
  ];

  if (ext && textExtensions.includes(ext)) {
    try {
      const content = await file.text();
      previewContent.value = content;
    } catch (err) {
      previewContent.value = "❌ 无法读取文件内容";
    }
    return;
  }

  // 不支持的类型
  previewContent.value = "⚠️ 不支持预览此类型文件";
};

provide("previewFile", previewFile);
</script>

<style scoped lang="less">
.file-preview {
  z-index: 1;
  box-shadow: 0 0 10px 2px var(--box-shadow-color);
  border-radius: 9px;
  background-color: var(--nav-bg-color);
  color: var(--p-text-color);
  padding: 15px;
  display: flex;
  flex-direction: column;
  .preview-title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .code-preview {
    padding: 0 14px;
    width: 600px;
    overflow: auto;
    white-space: pre;
    font-family: "Consolas", "Courier New", monospace;
    background: #f8f8f8;
    border-radius: 6px;
    line-height: 1.4;
  }

  .pdf-preview {
    width: 100%;
    max-height: calc(100vh - @nav-height - 10px );
    overflow: auto;
    border: 1px solid #ddd;
  }
}
</style>