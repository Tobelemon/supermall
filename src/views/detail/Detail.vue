<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3"
            >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :show="show"/>  -->

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'
// import Toast from '@/components/common/toast/Toast'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'
import {itemListenerMixin, backTopMixin} from '@/common/mixin'

export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    methods: {
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取y值
        const positionY = -position.positionY

        //2.positionY和主题中的值进行对比
        let length = this.themeTopYs.length

        for (let i = 0; i< length-1; i++) {
          // if (this.currentIndex !==i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 &&  positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      
      },

      //3.是否显示回到顶部
      contentScroll(position) {
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },

      //点击加入到购物车
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc  //商品描述
        product.price = this.goods.realPrice
        product.iid = this.iid  //获取id（必传）

        //2.将商品添加到购物车里
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res => {
          // this.show = true
          // this.message = res
          // setTimeout(() => {
          // this.show = false
          // this.message = ''
          // },1500)

          this.$toast.show(res, 2000)
        })
      }
      
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid  //iid与index。js中一样
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // console.log(res);

        //2.获取商品链接
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 详情页根据控制按钮到相应页面
        this.$nextTick(() => {
          //根据最新的数据，对应的dom是已经被渲染出来了  但是图片没有加载完
          this.themeTopYs = []

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)

          // console.log(this.themeTopYs);
        })
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast,
    }
}
</script>

<style scoped>
    #detail {
      height: 100vh;
      position: relative;
      z-index: 12;
      background-color: #fff;
    }
    .content {
      height: calc(100% - 44px - 49px);
    }
    .detail-nav {
      position: relative;
      z-index: 9;
      background-color: #fff;
    }
</style>