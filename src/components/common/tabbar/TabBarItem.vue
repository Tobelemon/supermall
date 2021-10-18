<template>
  <div class="tab-bar-item" @click="itemClick">
      <!-- 最好在外层包装一层div  这样就不会改变 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else> <slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"> <slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        // 默认为红色
        default:'red'
      }
    },
    data(){
      return {
        // isActive:true,
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        //如果当前活跃的路径包含这个路径 则为true  其他的为false
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor} :{}
      }
    }

}
</script>

<style>
    .tab-bar-item{
      flex:1;
      text-align: center;
      /* 一般高度都是49px */
      height: 49px;  
    }
    .tab-bar-item img {
      width: 24px;
      height: 24px;
    }
    /* .active{
      color:red;
    } */
</style>