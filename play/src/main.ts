import { createApp } from 'vue'
import  './assets/css/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register';
import 'animate.css';
import DialogHeader from '@/components/DialogHeader.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import App from './App.vue'

const app = createApp(App)
app.component('DialogHeader',DialogHeader)
app.component('SvgIcon',SvgIcon)
app.use(ElementPlus)
app.mount('#app')
