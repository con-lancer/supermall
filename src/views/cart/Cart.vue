<template>
    <div class="cart">
      <!-- 导航 -->
      <nav-bar class="nav-bar">
        <template v-slot:center>购物车({{length}})</template>
      </nav-bar>
      <!-- 商品列表 -->
      <cart-list></cart-list>
      <!-- 底部汇总 -->
      <cart-buttom-bar ></cart-buttom-bar>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { mapGetters } from 'vuex'
import CartList from "@/views/cart/childComps/CartList";
import CartButtomBar from "@/views/cart/childComps/CartButtomBar";
export default {
    name: 'VueCart',
  components: {CartList, NavBar, CartButtomBar},
  data() {
        return {

        };
    },
    mounted() {

    },
  computed: {
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      //起别名
      length: 'cartLength',
      list: 'cartList'
    })
  },
    methods: {

    },
};
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
