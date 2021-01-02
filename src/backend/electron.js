const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')
const Store = require('electron-store-data')
const { app, BrowserWindow, ipcMain, protocol } = require('electron')

const openApp = require('./openApp')
const removeApp = require('./removeApp')
const downloadApp = require('./downloadApp')
const downloadFile = require('./downloadFile')

const userDataPath = path.join(app.getPath('userData'), 'data')

const storeApps = new Store({
  filename: 'apps',
  defaults: { apps: {} }
})

const storeInstalledApps = new Store({
  filename: 'installedApps',
  defaults: { installedApps: [] }
})

const appsJson = async () => {
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
appsJson()

let mainWindow

ipcMain.on('openApp', (event, appId) => {
  openApp({ appId, userDataPath, storeInstalledApps, BrowserWindow })
})

ipcMain.on('downloadApp', async (event, appId) => {
  const _downloadApp = await downloadApp({ appId, userDataPath, storeInstalledApps })
  mainWindow.webContents.send('appDownloaded', _downloadApp)
})

ipcMain.on('removeApp', async (event, appId) => {
  await removeApp({ appId, userDataPath, storeInstalledApps })
  mainWindow.webContents.send('appRemoved', appId)
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
