<script setup>
    import { reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    import AxiosDR from '@/utils/AxiosDR.js'
    import TimeDR from '@/utils/TimeDR.js'
    import { useRoute, useRouter } from 'vue-router'

    // 初始化路由
    const route = useRoute()
    // 初始化路由器
    const router = useRouter()

    // 获取路由参数
    let id = route.query.id
    console.log(id)

    AxiosDR.get(`/api/adm/getById?id=${id}`).then(result => {
        console.log(result)

        if(!result.status) {
            ElMessage.error(result.msg)
            return
        }
        // 将获取到的数据赋值给 data
        data.name = result.data.name
        data.email = result.data.email
        data.gender = String(result.data.gender)
        data.remark = result.data.remark
    }).catch(err => {
        console.log("err:", err)
    })

    const data = reactive({
        name: '',
        password: '',
        email: '',
        gender: '0',
        remark: 'dpcodetry.com',
    })

    const edit = () => {
        console.log(data)

        if (data.name === '') {
            ElMessage.error('名称不能为空')
            return
        }

        data.id = id

        if(data.password === '') {
            // 如果密码为空，则删除密码字段
            // 这样就不会修改密码
            // 直接删除对象的属性
            delete data.password
        }

        data.create_time = TimeDR.now()

        AxiosDR.post('/api/adm/edit', data).then(result => {
            console.log(result)
            if (!result.status) {
                ElMessage.error(result.msg)
                return
            }

            ElMessage.success("编辑成功")
        }).catch(err => {
            console.log("err:", err)
        })
    }

    // 返回
    const back = () => {
        // 返回上一页
        router.go(-1)
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
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button @click="back">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>

</style>