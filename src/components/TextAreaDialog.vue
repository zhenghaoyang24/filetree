<script setup lang="ts">
import {inject} from "vue";
import {Icon} from "@iconify/vue";

const changeDialogState = inject('changeDialogState', () => {
  console.warn("no function changeDialogState")
})
const props = defineProps({
  structure:{
    type:String,
    required:true
  }
})

</script>

<template>
  <dialog class="dialog-box" @click.self="changeDialogState">
    <div class="dialog-content">
      <div><span>{{ $t('dialog.title') }}</span> <span class="close-btn" @click="changeDialogState" style="width: 27px;height: 27px"> <Icon icon="icon-park-outline:close"/> </span> </div>
      <textarea readonly>{{structure}}</textarea>
    </div>
  </dialog>

</template>

<style scoped lang="less">
.dialog-box{
  padding: 0;
  margin: 0;
  z-index: 9999;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--backdrop-bgColor);
  .dialog-content{
    box-shadow: 0 0 10px 2px var(--box-shadow-color);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--p-bg-color);
    width: 500px; /* 父容器的宽度 */
    height: 70%; /* 父容器的高度 */
    >div{
      box-shadow: 0 0 10px 2px var(--box-shadow-color);
      padding: 6px;
      background-color: var(--nav-bg-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--p-text-color);
      height: 30px;
      >span{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .close-btn:hover{
        background-color: rgba(117, 117, 117, 0.44);
      }
    }
    >textarea{
      display: block;
      flex: 1;
      //margin: 10px;
      padding: 10px; /* 可选：添加内边距 */
      border: none; /* 可选：去掉边框 */
      resize: none; /* 可选：禁止用户调整大小 */
      outline: none;
      color: var(--p-text-color);
      background: none;
      font-size: 1.3em;
      scrollbar-width: thin; /* 设置滚动条宽度 */

    }
  }
}
</style>
