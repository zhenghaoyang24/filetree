import { createI18n } from 'vue-i18n'
import ch from './locales/ch'
import en from './locales/en'

const i18n = createI18n({
    legacy: false,
    locale: 'ch', // 默认显示语言
    messages: {
        'ch': ch,
        'en': en
    }
})
export default i18n
