const fs = require('fs')
const path = require('path')
const https = require('https')

const downloadFile = () => {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/ozgrozer/tommy/master/apps.json'
    const appsJsonPath = path.join(__dirname, '..', '..', '..', 'apps.json')
    const file = fs.createWriteStream(appsJsonPath)

    https.get(url, res => {
      if (res.statusCode === 200) {
        res.pipe(file).on('close', resolve)
      } else {
        reject(res.statusCode)
      }
    })
  })
}

const downloadAppList = async () => {
  await downloadFile()
}

module.exports = downloadAppList
