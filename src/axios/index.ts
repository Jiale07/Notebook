import axios from 'axios'


const service = axios.create({
    // baseURL: 'http://121.37.236.195:8080/',
    baseURL: '/notebookApi',
    timeout: 5000,
})

service.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers.authorization = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


service.interceptors.response.use(response => {
    const token = response.data.data?.authorization
    if (token) {
        sessionStorage.setItem('token', token)
    }
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default service.request
