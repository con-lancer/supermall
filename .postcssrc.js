module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //视窗的宽度，对应的是我们设计稿的宽度
      viewportWidth: 375,
      //视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      viewportHeight: 667,
      //指定‘px’转换为视窗单位值的小数位数（很多时候无法整除）
      unitPrecision: 5,
      //指定需要转换成的视窗单位，建议使用‘vw’
      viewportUnit: 'vw',
      //指定不需要转换的类
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
      //小于或等于‘1px’不转换为视窗单位
      minPixelValue: 1,
      //允许在媒体查询中转换‘px’
      mediaQuery: false


      // "rootValue": 32,
      // "propList": ["*"],
      // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
      // "selectorBlackList": ["weui-"]
    }
  }
}
