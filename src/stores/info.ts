import { ref } from "vue";
import { defineStore } from "pinia";
import type { FileInfo } from "@/types/file";

export const useInfoStore = defineStore(
  "info",
  () => {
    // 主题
    const dataTheme = ref("light");
    const storeChangeTheme = (theme: string) => {
      if (theme === "light") {
        dataTheme.value = "light";
        window.document.documentElement.setAttribute("theme", "light");
      } else {
        window.document.documentElement.setAttribute("theme", "dark");
        dataTheme.value = "dark";
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
    };

    // 预览相关
    const dataFilePreview = ref<{
      filePath: string,fileMap:Record<string, File>
    } | null>(null);
    const changeFilePreview = (filePath: string,fileMap:Record<string, File>) =>{
      if(dataFilePreview.value === null) dataFilePreview.value = {filePath,fileMap}
      dataFilePreview.value.filePath = filePath
    }
    const clearFilePreview = () =>{
      dataFilePreview.value = null
    }

    return { dataTheme, storeChangeTheme, storeGetTheme, dataFileInfo, changeFileInfo,dataFilePreview,changeFilePreview,clearFilePreview};
  },

  {
    persist: {
      pick: ["dataTheme"],
    },
  }
);
