import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPuls from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'
import '@/styles/index.css'

const app = createApp(App)
app.use(VueClipboard)

app.use(ElementPuls)

app.use(router)
app.mount('#app')
