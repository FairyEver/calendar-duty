// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
// 构建时间
process.env.VUE_APP_BUILD_TIME = `${require('dayjs')().valueOf()}|number`

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

module.exports = {
  publicPath,
  lintOnSave: true,
  devServer: {
    publicPath
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`
      }
    }
  }
}
