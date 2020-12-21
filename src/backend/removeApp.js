const fs = require('fs')
const path = require('path')

const findInObject = require(path.join(__dirname, '..', 'common', 'findInObject'))

const removeApp = async props => {
  try {
    const { appId, userDataPath, storeInstalledApps } = props

    const appFolder = path.join(userDataPath, 'apps', appId)

    fs.rmdirSync(appFolder, { recursive: true })

    const installedApps = storeInstalledApps.get('installedApps')
    const appIndex = findInObject({ object: installedApps, search: { id: appId } })
    installedApps.splice(appIndex, 1)

    storeInstalledApps.set('installedApps', installedApps)

    return installedApps
  } catch (err) {
    console.log(err)
  }
}

module.exports = removeApp
