<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
              class="check-button" 
              :is-checked="isSelectAll"
              @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calClick">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    methods: {
      //点击全选按钮
      checkClick() {
        //1.商品全部选中 全选按钮变成不选中
        // if (this.isSelectAll) {
        //   this.$store.state.cartList.forEach(item => item.checked = false)
        // } else {  //2.有部分或全部不选中
        //   this.$store.state.cartList.forEach(item => item.checked = true)
        // }

        this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      calClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 2000)
          
        }
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false  //全选无商品默认不选中
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    }
}
</script>

<style>
    .bottom-bar {
      display: flex;
      position: relative;
      height: 40px;
      background-color: #eee;
      line-height: 40px;
    }   
    .check-button {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 5px;
    }
    .check-content {
      display: flex;
      align-items: center;
      margin-left: 10px;
      width: 60px;
    }
    .price {
      margin-left: 30px;
      flex: 1
    }
    .calculate {
      width: 90px;
      color: #fff;
      background-color: red;
      text-align: center;
    }
</style>