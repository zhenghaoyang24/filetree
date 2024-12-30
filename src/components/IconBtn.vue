<script setup lang="ts">
import type {PropType} from "vue";
import {Icon} from "@iconify/vue";

const props = defineProps({
  icon_: {
    type: String,
    default: 'cbi:button'
  },
  function_: {
    type: Function,
    default: () => console.log("no function")
  }

})

const functionProps = ()=>{
  props.function_()
}

</script>

<template>

  <span @click="functionProps"> <Icon :icon="icon_"></Icon> </span>

</template>

<style scoped lang="less">
span{
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--p-text-color);
  >svg{
    width: 24px;
    height: 24px;
  }
}

</style>
