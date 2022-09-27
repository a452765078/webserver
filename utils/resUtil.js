const log4js = require("../utils/index")

let CODE = {
    LOGINSUCCESS: 200,
    LOGINFAIL: 20001,
    TOKENNOTEXISTS: 30001,
}



module.exports = {
    success: function(msg,data='',code=CODE.LOGINSUCCESS,) {
        return {
            msg,
            data,
            code
        }
    },
    fail: function(msg,data='',code=CODE.LOGINFAIL){
        log4js.getLogger('error').error(msg)
        return {
            msg,
            data,
            code
        }
    },
    CODE
}