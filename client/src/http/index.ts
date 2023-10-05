import axios from 'axios'
export const API_URL = 'http://localhosr:5000'

const $api = axios.create({
//     всеки път прикачаме бисквитката
    withCredentials: true,
    baseURL: API_URL
})