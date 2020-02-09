// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
// 构建时间 | 服务器时间转为中国时间
// Unix 时间戳 (毫秒)
let time = require('dayjs')()
time = time.subtract(time.utcOffset(), 'minute').add(480, 'minute')
process.env.VUE_APP_BUILD_TIME = `${time.valueOf()}|number`

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

module.exports = {
  publicPath,
  lintOnSave: true,
  devServer: {
    publicPath
  }
}
