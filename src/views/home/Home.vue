<template>
  <div id="home">
    <!-- 1.头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick" 
                      ref="tabControl1"
                      class="tab-control"
                      v-show="isTabFixed"                     
                      />
    <!-- 可滚动的内容 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
         <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
         <recommend-view :recommends="recommends" />
         <feature-view />
         <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick" 
                      ref="tabControl2"                     
                      />
         <goods-list :goods="showGoods" />
    </scroll>
    <!-- 绑定native 可以在父组件中绑定事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

//公共部分
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'

import {getHomeMultidata, getHomeGoods} from '@/network/home'
import {itemListenerMixin, backTopMixin} from '@/common/mixin'

export default {
    name:"Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        //这里定义一个变量 用来接收res值 （因为函数执行完数据会销毁，用一个变量接收保存起来）
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop', //默认类型是pop
        isShowBackTop: false,
        tabOffsetTop: 0 ,
        isTabFixed: false,
        saveY: 0,  //解决从首页离开到别的页面在返回 浏览商品位置的问题
        itemImgListener: null
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      } 
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', )
    },
    //组件创建完发送网络请求 创建一个生命周期函数
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
        
    },
    methods:{
      //1.事件监听的方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //2.决定tabcontrol是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)  //为某一个类型加载更多
      },
      swiperImageLoad() {
      //2.获取tabControl的offsettop
      //所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      //2.网络请求的方法
      //调用函数，使用promise的then
      getHomeMultidata() {
        getHomeMultidata().then(res =>{  //res中取出banner和recommend
        // this.result = res;
          this.banners=res.data.banner.list,
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
     
    },   
}
</script>

<style scoped>
/* scoped是一个作用域 加了它里面的属性只在这个作用域中有效果 */
    #home {
      position: relative;
      height: 100vh;
    }
    .home-nav{
      background-color: var(--color-tint);
      color: #fff;
      /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
      /* position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9; */
    }
    .content {
      /* height: 300px; */
      overflow: hidden; 
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
    .tab-control {
      position: relative;
      z-index: 9;
    }
</style>