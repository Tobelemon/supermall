import axios from 'axios'

//导出
export function request(config) {

    //1. 创建axios的实列
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    //2.axios的拦截器
    //请求成功和失败
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        // console.log(err);
    });
    //响应成功和失败
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })

    //发送真正的网络请求(本身返回的就是一个promise)
    return instance(config)
}