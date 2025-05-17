import { reactive } from 'vue'
import { defineStore } from 'pinia'

const useAdminStore = defineStore('admin', () => {
    const data = reactive({
        name: "",
        token: "",
        expireDate: ""
    })

    const save = (name, token, expireDate) => {
        data.name = name
        data.token = token
        data.expireDate = expireDate
    }

    return {
        data,
        save
    }
},
{
    persist: true
})

export { useAdminStore }
