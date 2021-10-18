    import {
        ADD_COUNTER,
        ADD_TO_CART
    } from './mutation-types'

    export default {
        addCart(context, payload) {
            return new Promise((resolve, reject) => {
                //payload添加新产品
                //查找之前数组中是否有该商品
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

                //判断oldProduct
                if (oldProduct) {
                    // oldProduct.count += 1 //有的话商品数量加1
                    context.commit(ADD_COUNTER, oldProduct)
                    resolve('当前的商品数量+1')
                } else {
                    payload.count = 1 //商品赋值为1
                        // context.state.cartList.push(payload) //添加新的产品
                    context.commit(ADD_TO_CART, payload)
                    resolve('添加了新的商品')
                }
            })
        }

    }