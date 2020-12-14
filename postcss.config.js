
// postcss文件是基于Node.js运行的一个处理css的工具
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明的前缀，用来兼容不同浏览器
    'autoprefixer': {
      //用来配置要兼容到的系统（浏览器）
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    // 把px转换为rem单位
    'postcss-pxtorem': {
      rootValue: 37.5,
      //需要转换的css属性，*就是代表所有属性都要进行转换
      propList: ['*']
    }
  }
}