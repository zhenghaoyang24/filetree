<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const changeLanBtn = ()=>{
  if (locale.value === 'ch')
    locale.value = 'en'
  else
    locale.value = 'ch'
}

</script>

<template>
<span class="language-btn" @click="changeLanBtn">
  {{locale === 'ch'? 'English':'简体中文'}}
</span>
</template>

<style scoped lang="less">
.language-btn{
  cursor: pointer;
  color: var(--p-text-color);
}
</style>
