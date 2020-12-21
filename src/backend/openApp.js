const path = require('path')

const findInObject = require(path.join(__dirname, '..', 'common', 'findInObject'))

const openApp = props => {
  const { appId, userDataPath, storeInstalledApps, BrowserWindow } = props

  const installedApps = storeInstalledApps.get('installedApps')
  const appIndex = findInObject({ object: installedApps, search: { id: appId } })
  const app = installedApps[appIndex]
  const appPath = path.join(userDataPath, 'apps', app.id, app.version, app.tommy.main)

  const appWindow = new BrowserWindow({
    width: app.tommy.width,
    height: app.tommy.height
  })

  if (appPath.includes('.html')) {
    appWindow.loadFile(appPath)
  } else {
    appWindow.loadURL(app.tommy.main)
  }
}

module.exports = openApp
