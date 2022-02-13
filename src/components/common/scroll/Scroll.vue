<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //默认情况下，scroll不可以实时监听滚动位置
    //probe：侦测
    //0,1：不侦测实时位置
    //2：手指滚动中侦测，惯性滚动不侦测
    //3：所有滚动，都侦测
    //在 div 中使用 ref，可以通过 this.$refs 绑定元素（唯一）
    this.scroll = new BScroll(this.$refs.wrapper, {
      //侦测滚动位置
      probeType: this.probeType,
      //上拉加载更多
      pullUpLoad: this.pullUpLoad,
      //开启better-scroll侦听点击事件
      click: true,

      //设置observeDOM，防止没请求到数据导致的卡死，设置这个，界面改变 bs 会响应，该项目遇到了
      observeDOM: true,
      observeImage: true
    })

    //监听 scroll 滚动的位置，方便设计 backTop 的出现和隐藏
    if (this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
    }

    //监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    //当不传 time 的值时，默认是 600ms
    scrollTo(x,y,time = 600){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      //上拉加载
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
