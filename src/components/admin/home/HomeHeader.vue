<script setup>
    import { useAdminStore } from '@/stores/admin/admin.js'
    import LocalDR from '@/utils/LocalDR.js'
    import { useRouter } from 'vue-router'

    const adminStore = useAdminStore()
    const router = useRouter()

    const logout = () => {
        LocalDR.remove("admin")
        router.push("/login")
    }
</script>

<template>
    <div class="header">
        <div class="title">
            <div class="logo">
                <el-icon><MostlyCloudy /></el-icon>
            </div>
            <div class="text">
                <a href="/admin">dpcodetry</a>
            </div>
        </div>

        <div class="info">
            <div class="admin">
                <div class="name">
                    <span>{{ adminStore.data.name }}</span> <el-icon><Bell /></el-icon>
                </div>

                <div class="logout" @click="logout">
                    退出
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>