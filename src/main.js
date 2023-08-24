import { createApp } from 'vue'
import 'element-plus/dist/index.css' // Import Element Plus styles
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
