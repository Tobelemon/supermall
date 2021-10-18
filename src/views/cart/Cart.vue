<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车 ({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />
    
    <!-- 底部的汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList'])   //这个方法直接把getters中的方法拿过来  跟上面的名字一一对应  不对应的话写一个对象自定义名称 length:'cartLength'  {{length}}
      // cartLength() {
      //   return this.$store.getters.cartLength  //购物车的商品数量取决于index。js中的cartList（用于定义商品数量）
      // }
    }
}
</script>

<style scoped>
    .cart {
      height: 100vh;
    }
    .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
    }
</style>