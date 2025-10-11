<script setup lang="ts">
import { onBeforeMount, provide, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import FileTree from "./components/FileTree.vue";
import FileInfo from "./components/FileInfo.vue";
import { useInfoStore } from "@/stores/info.ts";
import PreviewFile from "./components/PreviewFile.vue";


const store = useInfoStore();
onBeforeMount(() => {
  store.storeGetTheme();
});

</script>
<template>
  <NavBar></NavBar>
  <main class="main-box">
    <FileTree />
    <PreviewFile />
    <FileInfo />
  </main>
</template>

<style scoped lang="less">
.main-box {
  height: calc(100vh - @nav-height - 20px );
  overflow: hidden;
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: calc(@nav-height + 10px) 10px 10px 10px;
}
</style>
