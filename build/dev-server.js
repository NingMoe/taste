require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
// var history = require('connect-history-api-fallback')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
// app.use(history())

var appData = require('../mock/appData.json')
var activityList = require('../mock/activityList.json')
var tasteData = require('../mock/activity.json')
var goodsList = require('../mock/goodsList.json')
var goodsData = require('../mock/goods.json')
var questions = require('../mock/question.json')
var articleData = require('../mock/article.json')
var reportDetail = require('../mock/reportDetail.json')

var apiRouters = express.Router()
// 获取初始化信息
apiRouters.get('/appInitData',function (req, res) {
  res.json(appData)
})
// 获取活动列表
apiRouters.get('/getActivityList',function (req, res) {
  res.json(activityList)
})
// 获取活动详情
apiRouters.get('/getActivityDetail',function (req, res) {
  res.json(tasteData)
})
// 获取商品列表
apiRouters.get('/goodsList',function (req, res) {
  res.json(goodsList)
})
// 获取商品详情
apiRouters.get('/getGoodsDetail',function (req, res) {
  res.json(goodsData)
})
// 获取活动报名问题 和填写体验报告问题
apiRouters.get('/getQuestionList',function (req, res) {
  res.json(questions)
})
// 获取已填写过的我的体验详情
apiRouters.get('/myReportDetail',function (req, res) {
  res.json(reportDetail)
})
// 获取文章详情
apiRouters.get('/getArticleDetail',function (req, res) {
  res.json(articleData)
})
// 活动报名
apiRouters.post('/enroll',function (req, res) {
  res.json('success')
})
// 兑换商品
apiRouters.post('/cashGoods',function (req, res) {
  res.json('success')
})
// 提交体验报告
apiRouters.post('/postReport',function (req, res) {
  res.json('success')
})
// 商家申请活动
apiRouters.post('/applyActivity',function (req, res) {
  res.json('success')
})
// 修改手机号
apiRouters.post('/updatePhone',function (req, res) {
  res.json('success')
})
// 修改名字
apiRouters.post('/updateName',function (req, res) {
  res.json('success')
})
// 修改性别
apiRouters.post('/updateSex',function (req, res) {
  res.json('success')
})
// 分享任务文章的回调
apiRouters.post('/doTask',function (req, res) {
  res.json('success')
})
// 初次参加活动答题
apiRouters.post('/firstTime',function (req, res) {
  res.json('success')
})
// 测试
apiRouters.post('/test',function (req, res) {
  res.json('success')
})

app.use('/web',apiRouters)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
