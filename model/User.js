const mongoose = require("mongoose")


const userSchema = mongoose.Schema( {
    userId: Number,
    userName: String,
    userPwd: String,
    userEmail: String,
    mobile:String,
    sex:Number,
    deptId:[],
    job:String,
    state:Number,
    role:Number,
    roleList: [],
    createTime: {
        type:Date,
        default:Date.now()
    },
    lastLoginTime: {
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model("users",userSchema)

module.exports = User