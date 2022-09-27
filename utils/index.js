/**
 * @author tanwanwen
 */
const log4js = require('log4js');
log4js.configure({
    appenders: {
        _console: {
            type: 'console'
        },
        _info: {
            type: 'file',
            filename: './log/_info.log'
        },
        _trace: {
            type: 'console'
        },
        _error: {
            type: 'dateFile',
            filename: './log/error.log',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true //设置文件名称为 filename + pattern
        }
    },
    categories: {
        default: {
            appenders: ['_info','_error','_console'],
            level: 'info'
        },
        trace: {
            appenders: ['_trace'],
            level: 'trace'
        },
        error: {
            appenders: ['_error'],
            level: 'error'
        }
    }
})

module.exports = log4js

