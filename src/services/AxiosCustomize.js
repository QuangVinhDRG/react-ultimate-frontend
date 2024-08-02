import axios from "axios";
import nProgress from "nprogress";

nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add request interceptor
instance.interceptors.request.use(function (config) {
    nProgress.start()
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token')
    }
    return config;
}, function (error) {
    nProgress.done()
    return Promise.reject(error);
})

// Add response interceptor
instance.interceptors.response.use(function (response) {
    nProgress.done()
    if (response?.data?.data) {
        return response.data;
    }
    return response;
}, function (error) {
    nProgress.done()
    if (error?.response?.data)
        return error.response.data
    return Promise.reject(error);
})
export default instance;