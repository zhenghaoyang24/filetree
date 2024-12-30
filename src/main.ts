import './assets/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import i18n from './language/index'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(i18n)

app.mount('#app')
