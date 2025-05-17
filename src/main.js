import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 整体导入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

console.log(import.meta.env.VITE_API_URL)
const app = createApp(App)
app.use(router)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')
