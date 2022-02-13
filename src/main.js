import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from "@/components/common/toast";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false

//手动添加事件总线，Vue 实例可以作为事件总线
Vue.prototype.$bus = new Vue()
//安装 toast 插件
Vue.use(Toast)
//解决移动端 300ms延迟
FastClick.attach(document.body)
//实现图片懒加载
Vue.use(VueLazyload, {
//  图片未加载时，可以设置占位图片
//   loading: require('@/assets/img/.....')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
