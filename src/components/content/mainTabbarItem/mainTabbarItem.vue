<template>
    <TabBar>
        <TarBarItem path="/home" activeColor="blue">
            <!-- 这里的 @ 代表 src目录，这么写是为了打包后的引用路径不报错 -->
          <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
          <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
          <template v-slot:item-text><div>首页</div></template>
          <!-- <img src="./assets/img/tabbar/1.jpg" alt="" v-slot:item-icon>
          <div v-slot:item-text>首页</div> -->
        </TarBarItem>
        <TarBarItem path="/category" activeColor="green">
          <template v-slot:item-icon><img src="~assets/img/tabbar/category.svg" alt=""></template>
          <template v-slot:item-icon-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
          <template v-slot:item-text><div>分类</div></template>
          <!-- <img src="./assets/img/tabbar/1.jpg" alt="" v-slot:item-icon>
          <div v-slot:item-text>首页</div> -->
        </TarBarItem>
        <TarBarItem path="/cart">
          <template v-slot:item-icon><img src="~assets/img/tabbar/shopcart.svg" alt=""></template>
          <template v-slot:item-icon-active><img src="~assets/img/tabbar/shopcart_active.svg" alt=""></template>
          <template v-slot:item-text><div>购物车</div></template>
          <!-- <img src="./assets/img/tabbar/1.jpg" alt="" v-slot:item-icon>
          <div v-slot:item-text>首页</div> -->
        </TarBarItem>
        <TarBarItem path="/profile">
          <template v-slot:item-icon><img src="~assets/img/tabbar/profile.svg" alt=""></template>
          <template v-slot:item-icon-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
          <template v-slot:item-text><div>我的</div></template>
          <!-- <img src="./assets/img/tabbar/1.jpg" alt="" v-slot:item-icon>
          <div v-slot:item-text>首页</div> -->
        </TarBarItem>
      </TabBar>
</template>

<script>

    // 这里的 @ 代表 src目录，这么写是为了打包后的引用路径不报错
    import TabBar from '@/components/common/tabbar/TabBar.vue'
    import TarBarItem from '@/components/common/tabbar/TarBarItem.vue'

export default {
    name: 'VueMaintabtaritem',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
    components:{
        TabBar,
        TarBarItem
    }
};
</script>

<style>

</style>
