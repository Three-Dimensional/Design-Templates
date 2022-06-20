import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './routers/index'
import store from './store/index'
import './assets/scss/global.scss'

import registerComponent from './components'

const app = createApp(App)
// 注册全局组件
registerComponent(app)

app.use(Antd)
app.use(router)
app.use(store)
app.mount('#app')
