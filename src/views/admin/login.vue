<script setup>
    import '@/assets/admin/css/login.css'
    import axios from 'axios'
    import { User, Lock } from '@element-plus/icons-vue'
    import { reactive,ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { useAdminStore } from '@/stores/admin/admin.js'
    import { useRouter } from 'vue-router'

    const adminStore = useAdminStore()
    const router = useRouter()

    const data = reactive({
        name: '',
        password: ''
    })

    const rules = {
        name: [
            { required: true, message: '请填写用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '用户名长度2～10个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请填写密码', trigger: 'blur' }
        ]
    }

    const elFormRef = ref()

    const login = () => {
        console.log(data)
        elFormRef.value.validate((valid, fields) => {
            // console.log("valid:",valid, "fields:", fields)
            if (!valid) {
                return
            }

            axios.post('http://127.0.0.1:8008/api/adm/login', data).then(response => {
                // console.log("data", response.data)

                if(!response.data.status){
                    ElMessage.error(response.data.msg)
                    return
                }

                // token 解码
                let token = response.data.data.token
                let [headerBase64, payloadBase64, signBase64] = token.split('.')
                // 解码
                let payload = atob(payloadBase64)
                // 将 json 转换为 对象
                let payloadObj = JSON.parse(payload)
                // console.log("payloadObj:", payloadObj)
                // 将用户名 token 和过期时间持久化存储到 localStorage 中
                adminStore.save(payloadObj.name, token, payloadObj.expireDate)
                console.log(adminStore.data)
                // 跳转
                router.push("/admin")
            }).catch(err => {
                console.log("err:", err)
            })
        })
    }

</script>

<template>
    <div class="dr-login">
        <el-form :model="data" :rules="rules" ref="elFormRef">
            <div class="title">
                CMS
            </div>

            <el-form-item prop="name">
                <el-input :prefix-icon="User" v-model="data.name"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" show-password v-model="data.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>

</style>