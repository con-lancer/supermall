<template>
  <div id="home">
    <!-- 首页头部导航栏 -->
    <NavBar class="home-nav">
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </NavBar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"></tab-control>

    <!-- 设置 better-scroll 滚动，更丝滑 -->
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </Scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import FeatureView from "@/views/home/childComps/FeatureView";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";
import {itemListenerMixin} from "@/common/mixin";

export default {
  name: 'VueHome',

  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      //该变量使用 mixins 混入
      // itemImgListener: null
    };
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,100)
    //刷新，防止不能滚动
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata()
      this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  //使用 mixins，将多个组件共用的部分抽离到 mixin 中，再混入相应组件的对应部分及位置
  mixins: [itemListenerMixin],
  mounted() {
    //防抖函数，防止频繁调动同一函数
    let newRefresh = debounce(this.$refs.scroll.refresh,1000)
    //  侦听 GoodsListItem 里的事件总线
    //  该事件手动添加在原型链中，使其等于 Vue 实例
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)

  },
  methods: {
    //首页上方轮播图的图片加载完毕，可以对导航栏的置顶高度进行设置
    swiperImageLoad() {
      //  获取 tabControl 的 offsetTop
      //  offsetTop 是元素的属性，组件本身不具有
      //  所有组件都有一个属性 $el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //Scroll组件，上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)

      // 重新计算最新的可滚动高度
      // this.$refs.scroll.refresh()
    },

    //拿到子组件 Scroll 传来的 position，通过 position 设置 backTop 的隐藏
    contentScroll(position) {
      //1、判断 BackTop 是否显示
      this.isShowBackTop = (-position.y) > 1000
    //  2、决定 tabControl 是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //设置返回顶部
    backClick() {
      //拿到子组件 scroll
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //网络请求方法
    getHomeMultidata() {
      getHomeMultidata()
        .then(res => {
          // console.log(res)
          // console.log(res.data.banner.list)
          // console.log(res.data.recommend.list)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page)
        .then(res => {
          // console.log(res) 接口信息
          //加载商品数据，获取到的新数据加在原本的数据后面
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //结束本次上拉加载
          this.$refs.scroll.finishPullUp()
        })
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  width: 100%;

  /*使用浏览器原生滚动时，让导航不跟随一起滚动*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.tab-control {*/
/*  !**/
/*    设置首页标签栏的滞留*/
/*    当距离顶部超过 44px 时，position是sticky，当距离顶部 44px 时，position是 static，产生滞留*/
/*  *!*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/


.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
</style>
