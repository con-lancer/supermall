import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //防抖函数，防止频繁调动同一函数
    let newRefresh = debounce(this.$refs.scroll.refresh,1000)
    //  侦听 GoodsListItem 里的事件总线
    //  该事件手动添加在原型链中，使其等于 Vue 实例
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)

  }
}
