const fs = require('fs')
const path = './gulp/tasks'
module.exports = fs.readdirSync(path).map(fileName => path + '/' + fileName)
