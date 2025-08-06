import axios from "axios"

const api=axios.create({
    baseURL:'http://88.200.63.148:8886',
    timeout:2000,
    withCredentials:true
})

export default api;