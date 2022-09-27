const router = require('koa-router')()
const User = require("../model/User")
const resUtil = require("../utils/resUtil")
const jwt = require('jsonwebtoken')
const UserController = require("../controller/UserController")


router.prefix('/api/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//login
router.post('/login',UserController.login)

//create
router.post('/create',UserController.create)

//del
router.post('/del',UserController.del)

//update
router.post('/update',UserController.update)

//list
router.post('/list',UserController.list
)

module.exports = router
