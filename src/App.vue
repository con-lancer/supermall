<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <mainTabbarItem></mainTabbarItem>
  </div>
</template>

<script>

import mainTabbarItem from '@/components/content/mainTabbarItem/mainTabbarItem';

export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    mainTabbarItem,
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
