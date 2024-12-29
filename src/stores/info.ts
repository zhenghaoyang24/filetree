import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useInfoStore = defineStore('info', () => {
    // 主题
    const dataTheme = ref('light')
    const storeChangeTheme = (theme: string) => {
        // console.log(theme)
        if (theme === 'light') {
            dataTheme.value = 'light'
            window.document.documentElement.setAttribute('theme', 'light')
            // console.log(dataTheme.value)
            // console.log(1)
        } else {
            window.document.documentElement.setAttribute('theme', 'dark')
            dataTheme.value = 'dark'
            // console.log(dataTheme.value)
        }
    }
    const storeGetTheme = () => {
        if (dataTheme.value === 'dark') {
            window.document.documentElement.setAttribute('theme', 'dark')
        } else {
            window.document.documentElement.setAttribute('theme', 'light')
        }
    }
    return {dataTheme, storeChangeTheme, storeGetTheme}
}, {
    persist: {
        pick: ['dataTheme']
    }
})
