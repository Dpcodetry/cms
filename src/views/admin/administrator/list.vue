<script setup>
    import { reactive } from 'vue'

    const data = reactive({
        list: [
            { id: '1', name: 'question', email: '', remark: 'dpcodetry.com', create_time: '2025-05-18'},
            { id: '2', name: 'answer', email: '', remark: 'www.dpcodetry.com', create_time: '2025-05-18'}
        ]
    })
</script>

<template>
    <el-table :data="data.list" border>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="remark" label="备注" />

        <el-table-column label="操作" width="150">
            <template #default="scope">
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small">删除</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<style scoped>

</style>