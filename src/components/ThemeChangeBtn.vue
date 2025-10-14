<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import ThemeMoonIcon from "@/components/icons/ThemeMoonIcon.vue";
import ThemeSunIcon from "@/components/icons/ThemeSunIcon.vue";
import { useInfoStore } from "@/stores/info.ts";

const store = useInfoStore();
const currentTheme = ref<String>("dark");
onBeforeMount(() => {
  currentTheme.value = store.dataTheme;
});

const changeThemeFn = () => {
  if (store.dataTheme === "dark") {
    store.storeChangeTheme("light");
    currentTheme.value = "light";
  } else {
    store.storeChangeTheme("dark");
    currentTheme.value = "dark";
  }
};
</script>

<template>
  <span class="theme-button" @click="changeThemeFn">
    <span v-show="currentTheme === 'light'">
      <ThemeMoonIcon></ThemeMoonIcon>
    </span>
    <span v-show="currentTheme === 'dark'">
      <ThemeSunIcon></ThemeSunIcon>
    </span>
  </span>
</template>

<style scoped lang="less">
.theme-button {
  display: flex;
  align-items: center;

  > span {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: var(--p-text-color);
    transition: all 0.2s;
  }
}
</style>
