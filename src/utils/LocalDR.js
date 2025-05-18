// 获取 localStorage 中的数据
const get = (key) => {
    return localStorage.getItem(key)
}

// 设置 localStorage 中的数据
const set = (key, value) => {
    return localStorage.setItem(key, value)
}

// 删除 localStorage 中的数据
const remove = (key) => {
    localStorage.removeItem(key)
}

export default { get, set, remove }