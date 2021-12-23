import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPuls from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.css'

const app = createApp(App)

app.use(ElementPuls)

app.use(router)
app.mount('#app')
