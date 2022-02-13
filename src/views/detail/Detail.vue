<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="nav"></detail-nav-bar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comments="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-buttom-bar @addShopCart="addToCart"></detail-buttom-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailButtomBar from "@/views/detail/childComps/DetailButtomBar";
import BackTop from "@/components/content/backTop/BackTop";

import GoodsList from "@/components/content/goods/GoodsList";
import {debounce} from "@/common/utils";
import {itemListenerMixin} from "@/common/mixin";

import {getDetail, getRecommend, Goods, Shop, GoodParam} from "@/network/detail";
import DetailComment from "@/views/detail/childComps/DetailCommentInfo";
export default {
  name: "Detail",
  components: {
    DetailButtomBar,
    DetailComment,
    DetailParamInfo,
    DetailGoodsInfo,
    Scroll,
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar,
    DetailCommentInfo,
    GoodsList,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      //该变量使用 mixins 混入
      // itemImgListener: null
      themeTopYs: [0,1000,3000,5000],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  created() {
    //1、保存传入的 iid
    this.iid = this.$route.params.iid

  //  2、根据 iid 请求详情数据，详情页的数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //1、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
    //  2、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services)
    //  3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
    //  4、保存商品的详细数据
      this.detailInfo = data.detailInfo
    //  5、获取参数信息
      this.paramInfo = new GoodParam(data.itemParams.info, data.itemParams.rule)
    //  6、取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

  //  3、请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

  //  4、给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

    },100)
    // this.getThemeTopY()
  },
  updated() {
    this.getThemeTopY()
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()

      // this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      // console.log(this.themeTopYs)
    },
    //实现滚动到一定位置，导航栏也随之改变
    contentScroll(position) {
      const positionY = -position.y
      // console.log(positionY)

      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
          ( i === length -1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex

          //判断 BackTop 是否显示
          this.isShowBackTop = positionY > 1000
        }
      }
    },
    //设置返回顶部
    backClick() {
      //拿到子组件 scroll
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    addToCart() {
    //  1、获取购物车需要的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.iid = this.iid

    //  2、将商品添加到购物车
    //   this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>
