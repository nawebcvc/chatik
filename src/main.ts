
import "@/assets/style/main.scss"
import "@/assets/style/icofont.min.css"
import { require } from './utils';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$require = require

app.use(createPinia())

app.mount('#app')
