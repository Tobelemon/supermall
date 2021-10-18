import { request } from "./request"; //导入网络请求

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: { //添加到url字符串中的  用于get请求； 若使用data 用于post请求
            type,
            page
        }
    })
}