const path = require('path')
const isDev = require('electron-is-dev')
const Store = require('electron-store-data')
const { app, BrowserWindow, ipcMain, protocol } = require('electron')

const openApp = require('./openApp')
const removeApp = require('./removeApp')
const downloadApp = require('./downloadApp')
const downloadAppsJson = require('./downloadAppsJson')

const userDataPath = path.join(app.getPath('userData'), 'data')

const storeApps = new Store({
  filename: 'apps',
  defaults: { apps: {} }
})

const storeInstalledApps = new Store({
  filename: 'installedApps',
  defaults: { installedApps: [] }
})

downloadAppsJson({ storeApps, userDataPath })

let mainWindow

ipcMain.on('openApp', (event, appId) => {
  openApp({ appId, userDataPath, storeInstalledApps, BrowserWindow })
})

ipcMain.handle('downloadApp', async (event, appId) => {
  return await downloadApp({ appId, userDataPath, storeInstalledApps })
})

ipcMain.handle('removeApp', async (event, appId) => {
  return await removeApp({ appId, userDataPath, storeInstalledApps })
})

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    webPreferences: {
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

    const apps = storeApps.get('apps')
    const installedApps = storeInstalledApps.get('installedApps')

    mainWindow.webContents.send('initialize', {
      apps,
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
