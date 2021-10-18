<template>
   <!-- 2.轮播图 -->
    <swiper>
      <swiper-item  v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
// import Swiper from '@/components/common/swiper/Swiper'
import {Swiper, SwiperItem} from '@/components/common/swiper'
export default {
    name:'HomeSwiper',
    props:{
      banners:{
        type:Array,
        default(){ //默认值
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad() {   //监听事件有没有加载完 来获得offsettop值  用来显示首页类别点击按钮
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
}
</script>

<style>

</style>