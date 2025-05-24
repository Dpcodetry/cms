<script setup>
    import { reactive, onMounted } from 'vue'
    import AxiosDR from '@/utils/AxiosDR'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { useRouter } from 'vue-router'

    // 初始化路由器
    const router = useRouter()

    const data = reactive({
        list: []
    })
    // 组件挂载到 DOM 并且完成渲染之后才调用
    onMounted(() => {
        AxiosDR.get('/api/adm/list').then(result => {
            // console.log(result)

            if(!result.status){
                ElMessage.error(result.msg)
                return
            }
            data.list = result.data.list
        }).catch(err => {
            console.log("err:", err)
        })
    })
    // 删除管理员
    const del = async (row) => {
        // console.log(row.id)

        try {
            await ElMessageBox.confirm('确认删除?', '标题', {
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            })

            let delResult = await AxiosDR.post('/api/adm/del', {id: String(row.id)})
            if (!delResult.status) {
                ElMessage.error(delResult.msg)
                return
            }

            // 删除之后重新获取列表
            let getListResult = await AxiosDR.get('/api/adm/list')
            if (!getListResult.status) {
                ElMessage.error(getListResult.msg)
                return
            }
            data.list = getListResult.data.list
        } catch (err) {
            console.log("err:", err)
        }
    }

    // 编辑管理员
    // 这里的 row 是表格传入的当前行数据
    const edit = (row) => {
        // 页面跳转
        router.push({path: '/admin/administrator/edit', query: {id: row.id}})
    }
</script>

<template>
    <el-table :data="data.list" border>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="remark" label="备注" />

        <el-table-column label="操作" width="150">
            <template #default="scope">
                <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
                <el-button size="small" @click="del(scope.row)"> 删除</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<style scoped>

</style>