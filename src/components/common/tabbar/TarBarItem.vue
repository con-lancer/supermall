<template>
    <div class="tar-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'VueTarbaritem',

    data() {
        return {
            // isActive:true
        };
    },

    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },

    mounted() {
        
    },

    methods: {
        itemClick(){
            this.$router.replace(this.path)
        }
    },

    computed:{
        isActive(){
            // console.log(this.$route.path)
            // console.log(this.$route)
            return this.$route.path.indexOf(this.path) !== -1
        },
        // 动态修改颜色
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
    }
};
</script>

<style scoped>
  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }

  .tar-bar-item img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
  }

  .active{
      color: red;
  }
</style>