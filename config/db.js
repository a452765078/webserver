/**
 *  yzt
 */
const mongoose = require('mongoose');
const config = require("./index")
const logger = require("../utils/index")

mongoose.connect(config.URL)

const db = mongoose.connection;

db.on('error',() => {
    logger.getLogger("error").error("连接失败")
})

db.once('open',() => {
    logger.getLogger('trace').info("*****************连接成功*******************")
})
