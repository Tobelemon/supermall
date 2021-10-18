<template>
<!-- ref绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
      probeType: {   //有1 2 3 3是在任何时候都发生滚动
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {     // ? ? ? 
      return {
        scroll: null,
        observeDOM: true,
      }
    },
    mounted() {
      // 1.创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper, {  //获取div元素
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad   // ? ? ?
     })
     //2.监听滚动的位置
     this.scroll.on('scroll', position => {  //on('scroll')  是正在滚动事件
       this.$emit('scroll', position)
      })
    //3.监听scroll滚动到底部
    //加if判断严谨
     if (this.pullUpLoad) {
       this.scroll.on('pullingUp', () => {  //pullingup:当底部下拉距离超过阀值
         this.$emit('pullingUp')
       })
     } 
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
}
</script>

<style scoped>

</style>