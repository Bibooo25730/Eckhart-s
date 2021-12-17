// 读取文件的工具方法
const fs = require('fs');
module.exports.getFileJsonData = (filePath) => {
    return new Promise((relove, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                relove(data)
            }
        })
    })
}