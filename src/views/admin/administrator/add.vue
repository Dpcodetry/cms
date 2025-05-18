<script setup>
    import { reactive } from 'vue'

    const data = reactive({
        name: '',
        password: '',
        email: '',
        gender: '0',
        remark: 'dpcodetry.com',
    })

    const add = () => {
        console.log(data)
    }

    const reset = () => {
        data.name = ''
        data.password = ''
        data.email = ''
        data.gender = '0'
        data.remark = 'dpcodetry.com'
    }
</script>

<template>
    <el-form label-width="80" style="width: 400px;">
        <el-form-item label="名称">
            <el-input v-model="data.name" placeholder="请填写名称" />
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="data.password" placeholder="请填写密码" />
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input v-model="data.email" />
        </el-form-item>

        <el-form-item label="备注">
            <el-input type="textarea" v-model="data.remark" :rows="4" />
        </el-form-item>

        <el-form-item label="性别">
            <el-radio-group v-model="data.gender">
                <el-radio value="0">未知</el-radio>
                <el-radio value="1">男</el-radio>
                <el-radio value="2">女</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>

</style>