import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '@/stores/admin/admin.js'

const routes = [
    {
        path: "/",
        redirect: "/admin"
    },
    {
        path: "/login",
        component: () => import("@/views/admin/login.vue")
    },
    {
        path: "/admin",
        component: () => import("@/views/admin/home.vue"),
        // 身份验证
        meta: { requiresAuth: true },
        children: [
            // 管理员
            {
                path: "administrator/add",
                component: () => import("@/views/admin/administrator/add.vue")
            },
            {
                path: "administrator/list",
                component: () => import("@/views/admin/administrator/list.vue")
            },
            // 类别管理
            {
                path: "category/list",
                component: () => import("@/views/admin/category/list.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log(to.meta.requiresAuth)
    if(to.meta.requiresAuth){
        console.log("需要身份验证")

        // 初始化数据仓库
        const adminStore = useAdminStore()
        // 如果数据仓库中的 token 为空
        if(adminStore.data.token === ""){
            console.log("未登录")
            // 跳转到登录页
            router.push("/login")
        }

        next()
    }else{
        console.log("不需要身份验证")

        // 放行
        next()
    }

})

export default router