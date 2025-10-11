<template>
    <!-- 👇 新增预览区域 -->
    <div class="file-preview" v-if="previewContent || previewPdfUrl">
      <div class="preview-title">{{ $t("preview.title") }}</div>
      <!-- 文本预览 -->
      <pre v-if="previewContent" class="code-preview">{{ previewContent }}</pre>
      <!-- PDF 预览 -->
      <iframe
        v-else-if="previewPdfUrl"
        :src="previewPdfUrl"
        class="pdf-preview"
        frameborder="0"
      ></iframe>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';

// 预览文件内容

// ====== 新增：预览相关逻辑 ======
const previewContent = ref<string | null>(null);
const previewPdfUrl = ref<string | null>(null);

// const previewFile = async (filePath: string) => {
//   const file = fileMap.value[filePath];
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
// };

// 提供给子组件
// provide("previewFile", previewFile);
</script>

<style scoped>

</style>