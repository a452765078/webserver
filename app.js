const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
const Router = require('koa-router')
const router = new Router()
const koajwt = require("koa-jwt")


const index = require('./routes/index')
const users = require('./routes/users')
const log4js = require("./utils/index")
const util = require('./utils/resUtil')


require("./config/db")

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(async ctx => { 
//   ctx.body = ctx.request.body;
// });
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  let logger = log4js.getLogger();
  logger.info(`params:${ JSON.stringify(ctx.request.query)} || ${JSON.stringify(ctx.request.body)}`)
  await next().catch((err)=>{
    console.log("err =>",err)
    if(err.status == '401') {
      ctx.status = 200
      ctx.body = util.fail("token不存在或已经过期",'',util.CODE.TOKENNOTEXISTS)
    }else {
      throw err
    }
  })
  // const log_info = log4js.getLogger('error')
  // const end = Date.now()
  // const responseTime = end - start;

  // log_info.trace("Entering cheese testing");
  // log_info.debug("Got cheese.");
  // log_info.info("Cheese is Comté.");
  // log_info.info(`响应时间为${responseTime/1000}s`);
  // log_info.warn("Cheese is quite smelly.");
  // log_info.error("Cheese is too ripe!");
  // log_info.fatal("Cheese was breeding ground for listeria.");
})


app.use(koajwt({secret:'imooc'}).unless(
  {
    path: [/^\/api\/users\/login/]
  }
))

//应用级中间件
router.get('/api/leave/count',function(ctx,next) {
  ctx.body = util.success('访问成功')
  next()
})

// routes
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
