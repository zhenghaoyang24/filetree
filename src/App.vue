<script setup lang="ts">
import {onBeforeMount, ref} from "vue"
import NavBar from "@/components/NavBar.vue";
import {useInfoStore} from "@/stores/info.ts";
const store = useInfoStore();
onBeforeMount(() => {
  store.storeGetTheme()
})
</script>

<template>
  <NavBar></NavBar>
</template>

<style scoped>

</style>
