//混入：mixin

import BackTop from '@/components/content/backTop/BackTop'
import { debounce } from '@/common/utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh)

        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
            // console.log(11);
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scroll.scrollTo(0, 0) //访问子组件的scroll属性
        },
    }
}