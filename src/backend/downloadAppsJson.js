const fs = require('fs')
const path = require('path')

const downloadFile = require('./downloadFile')

const downloadAppsJson = async props => {
  const { storeApps, userDataPath } = props

  const getApps = storeApps.get('apps')
  if (Object.keys(getApps).length) {
    const url = 'https://raw.githubusercontent.com/ozgrozer/tommy/master/apps.json'
    const filePath = path.join(userDataPath, 'apps-new.json')
    await downloadFile({ url, filePath })

    const apps = require(filePath)
    storeApps.set('apps', apps)

    fs.unlinkSync(filePath)
  } else {
    const appsJsonPath = path.join(__dirname, '..', '..', 'apps.json')
    const apps = require(appsJsonPath)
    storeApps.set('apps', apps)
  }
}

module.exports = downloadAppsJson
