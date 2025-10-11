import { ref } from "vue";
import { defineStore } from "pinia";
import type { FileInfo } from "@/types/file";

export const useInfoStore = defineStore(
  "info",
  () => {
    // 主题
    const dataTheme = ref("light");
    const storeChangeTheme = (theme: string) => {
      // console.log(theme)
      if (theme === "light") {
        dataTheme.value = "light";
        window.document.documentElement.setAttribute("theme", "light");
        // console.log(dataTheme.value)
        // console.log(1)
      } else {
        window.document.documentElement.setAttribute("theme", "dark");
        dataTheme.value = "dark";
        // console.log(dataTheme.value)
      }
    };
    const storeGetTheme = () => {
      if (dataTheme.value === "dark") {
        window.document.documentElement.setAttribute("theme", "dark");
      } else {
        window.document.documentElement.setAttribute("theme", "light");
      }
    };

    // 文件信息
    const dataFileInfo = ref<FileInfo | null>();
    const changeFileInfo = (fileInfo: null | FileInfo) => {

        if(fileInfo){
            dataFileInfo.value = fileInfo;
        }else{
            dataFileInfo.value = null;
        }
        console.log(fileInfo)
    };

    return { dataTheme, storeChangeTheme, storeGetTheme, dataFileInfo, changeFileInfo};
  },

  {
    persist: {
      pick: ["dataTheme"],
    },
  }
);
