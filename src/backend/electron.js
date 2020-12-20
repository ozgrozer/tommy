const path = require('path')
const isDev = require('electron-is-dev')
const { app, BrowserWindow, ipcMain, protocol } = require('electron')
const Store = require('electron-store-data')

const userDataPath = path.join(app.getPath('userData'), 'data')

const storeInstalledApps = new Store({
  filename: 'installedApps',
  defaults: { installedApps: [] }
})

const findInObject = props => {
  const { object, search } = props

  let result

  for (const key in object) {
    const objectItem = object[key]
    const searchKey = Object.keys(search)[0]
    const objectItemValue = objectItem[searchKey]
    const searchValue = search[searchKey]

    if (objectItemValue === searchValue) {
      result = key
    }
  }

  return result
}

ipcMain.on('createAppWindow', (event, message) => {
  const { appId } = message
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
})

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:1240')
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', '..', 'public', 'app.html'))
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()

    const installedApps = storeInstalledApps.get('installedApps')
    mainWindow.webContents.send('initialize', {
      userDataPath,
      installedApps
    })
  })
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('ready', async () => {
  const protocolName = 'file-protocol'

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')

    try {
      return callback(decodeURIComponent(url))
    } catch (err) {
      console.elogrror(err)
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
