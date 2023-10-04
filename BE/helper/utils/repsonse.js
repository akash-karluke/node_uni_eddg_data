const { errorLogger } = require("../../winston/logger")

const successResposne = (data, msg) => {
    return {
        "status": true,
        "data": data,
        "message": msg
    }
}
const failedResposne = (error, url) => {
    errorLogger.error({ api: url, "error": error && error.toString() })
    return {
        "status": false,
        "message": error && error.toString()
    }
}

module.exports = { successResposne, failedResposne }