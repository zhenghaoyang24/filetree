<script setup lang="ts">
import ThemeChangeBtn from "@/components/ThemeChangeBtn.vue";
import LanguageBtn from "@/components/LanguageBtn.vue";
import IconBtn from "@/components/IconBtn.vue";
const toGithub = () => {
  window.open(`https://github.com/zhenghaoyang24/filetree`, "_blank");
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-logo">filetree</div>
    <div class="nav-ctrl">
      <LanguageBtn/>
      <ThemeChangeBtn/>
      <IconBtn icon_="uil:github" :function_="toGithub"></IconBtn>
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


  .nav-ctrl{
    display: flex;
    justify-content: space-between;
    align-items: center;
    >span{
      margin: 0 4px;
    }
    .language-btn{
      color: var(--p-text-color);
    }
  }

  .nav-logo{
    color: var(--p-text-color);
  }
}

</style>
