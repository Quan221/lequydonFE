import axios from "axios"

export let endpoints = {

    "register": "/users/",

    "current-user": "/users/current-user/",
    "login": "/o/token/",
    "thongbao": "/thongbao/",




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