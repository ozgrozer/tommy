const path = require('path')
const isDev = require('electron-is-dev')
const Store = require('electron-store-data')
const { app, BrowserWindow, ipcMain, protocol } = require('electron')

const openApp = require('./openApp')
const deleteApp = require('./deleteApp')
const downloadApp = require('./downloadApp')

const userDataPath = path.join(app.getPath('userData'), 'data')

const storeInstalledApps = new Store({
  filename: 'installedApps',
  defaults: { installedApps: [] }
})

let mainWindow

ipcMain.on('openApp', (event, appId) => {
  openApp({ appId, userDataPath, storeInstalledApps, BrowserWindow })
})

ipcMain.on('downloadApp', async (event, appId) => {
  const _downloadApp = await downloadApp({ appId, userDataPath, storeInstalledApps })
  mainWindow.webContents.send('appDownloaded', _downloadApp)
})

ipcMain.on('deleteApp', async (event, appId) => {
  const _deleteApp = await deleteApp({ appId, userDataPath, storeInstalledApps })
  mainWindow.webContents.send('appDeleteed', _deleteApp)
})

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
