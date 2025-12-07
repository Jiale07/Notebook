import {createApp} from 'vue'
import app from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/icons/index.js'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(app)
    .use(setupStore)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
