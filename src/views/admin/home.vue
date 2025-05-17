<script setup>
    import '@/assets/admin/css/home.css'
    import HomeSide from '@/components/admin/home/HomeSide.vue'
    import HomeHeader from '@/components/admin/home/HomeHeader.vue'
</script>

<template>
    <div class="dr-home">
        <HomeHeader />

        <div class="main">
            <HomeSide />

            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>