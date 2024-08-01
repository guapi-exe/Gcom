import { createRouter, createWebHistory } from 'vue-router'
import Main from '../src/static/views/SerialPortTools.vue'
import AboutSite from '../src/static/views/aboutSite.vue'
import Logs from '../src/static/views/logsView.vue'
const routes = [
    {
        path: '/',
        name: 'index',
        redirect:"",
        component: Main
    },
    {
        path: '/about',
        name: 'about',
        redirect:"",
        component: AboutSite
    },
    {
        path: '/logs',
        name: 'logs',
        redirect:"",
        component: Logs
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router