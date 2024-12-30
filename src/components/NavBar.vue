<script setup lang="ts">
import ThemeChangeBtn from "@/components/ThemeChangeBtn.vue";
</script>

<template>
  <nav class="navbar">
    <div class="nav-logo">filetree</div>
    <div class="nav-ctrl-">
      <ThemeChangeBtn></ThemeChangeBtn>
    </div>
  </nav>
</template>

<style scoped lang="less">
.navbar {
  box-shadow: 0 0 10px 2px var(--box-shadow-color);
  z-index: 10;
  position: fixed;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  user-select: none;
  width: 100%;
  box-sizing: border-box;
  height: @nav-height;
  background-color: var(--nav-bg-color);


  .nav-ctrl-{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo{
    color: var(--p-text-color);
  }
}

</style>
