const fs = require('fs')
const https = require('https')

const downloadFile = props => {
  const { url, filePath } = props
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    https.get(url, res => {
      if (res.statusCode === 200) {
        res.pipe(file).on('close', resolve)
      } else {
        reject(res.statusCode)
      }
    })
  })
}

module.exports = downloadFile
