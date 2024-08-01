import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'
// @ts-ignore
import router from "../router/index.js";
import VueClipboard from "vue-clipboard2";


const app = createApp(App).use(router)
axios.defaults.withCredentials = true
app.use(VueClipboard)
app.use(ElementPlus)
app.mount('#app')
