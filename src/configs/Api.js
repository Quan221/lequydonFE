import axios from "axios"

export let endpoints = {

    "register": "/users/",

    "current-user": "/users/current-user/",
    "login": "/o/token/",
    "thongbao": "/thongbao/",
    'tintuc': '/tintuc/2/',
    "my-message": '/myInbox/',
    "quan": "/quan/",
    "phuong": (quanId) => `/quan/${quanId}/phuong/`,
    "dontuyensinh": "/dontuyensinh/",
    "trinhdo": "/trinhdo/",
    "truong": (quanId) => `/quan/${quanId}/truong/`,
    "chonlop": '/dangkyhoc/',




}
export const authApi = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
}
export default axios.create({
    baseURL: "http://127.0.0.1:8000/"

})