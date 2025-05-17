## 创建项目

`npm create vite@latest`

### 目录结构

src
- api 存放 api 接口相关的代码
- assets 存放静态资源
    - admin 后台相关的目录
        - css
        - js
- components 存放全局组件
    - admin
- router 存放路由的定义和配置
- stores 存放状态管理相关的代码
    - admin
- utils 常用工具类
- views 存放页面级别的组件
    - admin

### 环境变量

新建 `.env` 文件

`VITE_API_URL = http://127.0.0.1:8008`

main.js
```javascript
import { createApp } from 'vue'
import App from './App.vue'

console.log(import.meta.env.VITE_API_URL)
const app = createApp(App)
app.mount('#app')

```

### 安装和配置路由

安装
`npm install vue-router@4`

配置
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/login",
        component: () => import("../views/admin/login.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

### 配置路径别名
vite.config.js
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
```
jsconfig.js
```javascript
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```

### 安装配置 ElementPlus
安装
`npm install element-plus --save`

配置
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 整体导入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

console.log(import.meta.env.VITE_API_URL)
const app = createApp(App)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')

```

### 安装 Pinia
安装 Pinia
`npm install pinia`
安装 持久化存储插件
`npm i pinia-plugin-persistedstate`
配置
```javascript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```
