const User = require("../model/User")
const resUtil = require("../utils/resUtil")
const jwt = require("jsonwebtoken")


class UserController {
    async login(ctx,next) {
            let {userName,userPwd} = ctx.request.body
            try {
              console.log("开始了")
              let res = await User.findOne({
                userName,
                userPwd
              },'userName userEmail mobile deptId roleList')
              let data = res._doc
              if(res) {
                const token = jwt.sign({data:data},'imooc',{expiresIn: '60000'})
                data.token = token
          
                ctx.body = resUtil.success("登录成功",data)
              }else {
                ctx.body = resUtil.fail("账号或密码不正确")
              }
            } catch (error) {
              ctx.body = resUtil.fail("登录失败",error)
            }
    }
    async create(ctx,next) {
        let {userName,userEmail,mobile,sex,deptId,job,state,role,roleList} = ctx.request.body
        try {
            const userPwd = '123456'
            const createTime = new Date()
            const lastLoginTime = new Date()
            let res = await new User({
              userName,
              userPwd,
              userEmail,
              mobile,
              sex,
              deptId,
              job,
              state,
              role,
              roleList
            }).save()
            if(res) {
              ctx.body = resUtil.success("创建成功")
            }else {
              ctx.body = resUtil.fail("创建失败")
            }
        } catch (error) {
            ctx.body = resUtil.fail(error)
        }

    }

    async del(ctx,next) {
        let {_id}= ctx.request.body
        try {
            let res = await User.deleteOne({_id})
            if(res) {
                ctx.body = resUtil.success("删除成功")
            }else {
                ctx.body = resUtil.fail("删除失败")
            }
        } catch (error) {
            ctx.body = resUtil.fail(error)
        }

    }

    async update(ctx,next) {
        let {_id,userName,userEmail,mobile,sex,deptId,job,state,role,roleList} = ctx.request.body
        console.log("_id =>",_id)
        try {
            let res = await User.findByIdAndUpdate(_id,{
                userName,userEmail,mobile,sex,deptId,job,state,role,roleList
            })
            if(res) {
                ctx.body = resUtil.success("更新成功")
            }else {
                ctx.body = resUtil.fail("更新失败")
            }
        } catch (error) {
            ctx.body = resUtil.fail(error)
        }

    }

    async list(ctx,next) {
        let res = await User.find({
            state:1
        })
        if(res) {
            let data = res._doc
            ctx.body = resUtil.success("获取成功",data)
        }else {
            ctx.body = resUtil.fail("获取失败")
        }
    }
}

module.exports = new UserController()