<template>
  <div class="file-preview" v-if="inforStore.dataFilePreview">
    <div class="preview-title">{{ $t("preview.title") }}</div>
    <!-- 消息 -->
    <pre v-if="previewMessage" class="code-preview">{{ previewMessage }}</pre>
    <!-- 文本预览 -->
    <pre
    v-else-if="previewTextContent"
      class="code-preview"
      >{{ previewTextContent }}</pre
    >
    <!-- PDF 预览 -->
    <iframe
      v-else-if="previewPdfUrl"
      :src="previewPdfUrl"
      class="pdf-preview"
      frameborder="0"
    ></iframe>
    <!-- 图片预览 -->
    <img
      v-else-if="previewImageUrl"
      :src="previewImageUrl"
      class="image-preview"
      alt="Preview"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useInfoStore } from "../stores/info";
const inforStore = useInfoStore();
import { textExtensions, imageExtensions } from "@/data/fileExtensions.ts";

// 预览文件内容
const previewTextContent = ref<string | null>(null);
const previewPdfUrl = ref<string | null>(null);
const previewImageUrl = ref<string | null>(null);
// 消息
const previewMessage = ref<string | null>(null);

const previewFileType = ref<"text" | "pdf" | "image">();

watch(
  () => inforStore.dataFilePreview,
  async (newVal) => {
    if (newVal) {
      const filePath = newVal.filePath;
      const fileMap = newVal.fileMap;
      const file = fileMap[filePath];
      if (!file) return;

      // 获取文件扩展名
      const ext = filePath.split(".").pop()?.toLowerCase();

      // 获取文件内容
      getPreviewContent(ext, file);
    } else {
      // 清理预览内容
      clearnPreviewData();
    }
  },
  {
    deep: true,
  }
);

// 获取内容
const getPreviewContent = async (ext: string | undefined, file: File) => {
  clearnPreviewData();

  if (file.size > 10 * 1024 * 1024) {
    previewMessage.value = "⚠️ 文件过大（>10MB），不支持预览";
    return;
  }

  if (ext === undefined) {
    previewMessage.value = "⚠️ 无法识别文件类型，无法预览";
    return;
  }

  // 文本类型
  if (ext && textExtensions.includes(ext)) {
    try {
      const content = await file.text();
      previewTextContent.value = content;
    } catch (err) {
      previewMessage.value = "❌ 无法读取文件内容";
    }
    return;
  }

  // PDF
  if (ext === "pdf") {
    previewPdfUrl.value = URL.createObjectURL(file);
    return;
  }

  // 图片
  if (ext && imageExtensions.includes(ext)) {
    previewImageUrl.value = URL.createObjectURL(file);
    return;
  }

  previewMessage.value = "⚠️ 不支持预览此类型文件";
};

// 请空预览内容
const clearnPreviewData = () => {
  previewTextContent.value = null;
  if (previewPdfUrl.value) {
    URL.revokeObjectURL(previewPdfUrl.value);
    previewPdfUrl.value = null;
  }
  previewImageUrl.value = null;
  previewMessage.value = null;
};
</script>

<style scoped lang="less">
.file-preview {
  max-height: calc(100vh - @nav-height - 50px);
  box-shadow: 0 0 10px 2px var(--box-shadow-color);
  border-radius: 9px;
  background-color: var(--nav-bg-color);
  color: var(--p-text-color);
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .preview-title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .code-preview {
    box-sizing: border-box;
    padding: 14px;
    margin: 0;
    width: 100%;
    overflow: auto;
    white-space: pre;
    font-family: "Consolas", "Courier New", monospace;
    background: var(--preview-bg-color);
    border-radius: 6px;
    line-height: 1.4;
  }

  .pdf-preview {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid #ddd;
  }
}
</style>
