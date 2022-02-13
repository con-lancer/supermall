module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:['html','css','js','vue'],
      alias: {
        assets: '@/assets',
        common: '@/assets',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
