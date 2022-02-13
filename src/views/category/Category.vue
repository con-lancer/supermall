<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <button @click="btnClick">分类按钮</button>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
    </ul>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: 'VueCategory',

  data() {
    return {
      scroll: null
    };
  },

  mounted() {
    //默认情况下，scroll不可以实时监听滚动位置
    //probe：侦测
    //0,1：不侦测实时位置
    //2：手指滚动中侦测，惯性滚动不侦测
    //3：所有滚动，都侦测
    this.scroll = new BScroll(this.$refs.wrapper, {
      //侦测滚动位置
      probeType: 3,
      //开启better-scroll侦听点击事件
      click: true,
      //上拉加载更多
      pullUpLoad: true,
      //设置observeDOM，防止没请求到数据导致的卡死，设置这个，界面改变 bs 会响应，该项目遇到了
      observeDOM: true
    })
    this.scroll.on('scroll',(position) => {

    })
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多')
    //  发送网络请求，获取数据

    //  等数据请求完毕，并且新的数据展示出来后

      setTimeout(() => {
        //表示上拉加载完毕，可以重新上拉加载
        this.scroll.finishPullUp()
      },2000)
    })
  },

  methods: {
    btnClick() {
      console.log('按钮点击了')
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 200px;

  background-color: #ff5777;
}
</style>
