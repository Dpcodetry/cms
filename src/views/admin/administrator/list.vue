<script setup>
    import { reactive } from 'vue'
    import AxiosDR from '@/utils/AxiosDR'
    import { ElMessage } from 'element-plus'

    const data = reactive({
        list: []
    })

    AxiosDR.get('/api/adm/list').then(result => {
        console.log(result)

        if(!result.status){
            ElMessage.error(result.msg)
            return
        }
        data.list = result.data.list
    }).catch(err => {
        console.log("err:", err)
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