<template>
  <div class="file-info" v-if="inforStore.dataFileInfo">
    <div class="file-info-title">{{ $t("fileInfo.title") }}</div>
    <div>
      <span>{{ $t("fileInfo.name") }}</span
      >：{{ inforStore.dataFileInfo?.name }}
    </div>
    <div>
      <span>{{ $t("fileInfo.type") }}</span
      >：{{ inforStore.dataFileInfo?.type }}
    </div>
    <div>
      <span>{{ $t("fileInfo.size") }}</span
      >：{{ inforStore.dataFileInfo?.size }} Bytes
    </div>
    <div>
      <span>{{ $t("fileInfo.path") }}</span
      >：{{ inforStore.dataFileInfo?.path }}
    </div>
    <div>
      <span>{{ $t("fileInfo.lastModified") }}</span
      >：{{ inforStore.dataFileInfo?.lastModified }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfoStore } from "../stores/info";
const inforStore = useInfoStore();
</script>

<style scoped>
.file-info {
  box-shadow: 0 0 10px 2px var(--box-shadow-color);
  padding: 15px;
  height: fit-content;
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
</style>
