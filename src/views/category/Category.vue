<template>
  <div class="wrapper">
    <ul class="content">
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    <li>sisaner</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name:"Category",
    data() {
      return {
        scroll: null
      }
    },
    //组件创建后调用
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3 , //监听滚动 会打印出滚动距离
        pullUpLoad: true 
      })

      this.scroll.on('scroll', (position) => {
        console.log(position);
      })

      this.scroll.on('pullingUp' , () => {
        console.log('la');
      })
    }
}
</script>

<style>
    .wrapper {
      height: 100px;
      background-color: aqua
    }
</style>