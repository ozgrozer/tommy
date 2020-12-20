const path = require('path')
const isDev = require('electron-is-dev')
const { app, BrowserWindow, ipcMain } = require('electron')
const Store = require('electron-store-data')

const storeInstalledApps = new Store({
  filename: 'installedApps',
  defaults: { installedApps: [] }
})

ipcMain.on('createAppWindow', (event, message) => {
  const appWindow = new BrowserWindow({
    width: 600,
    height: 370
  })
  appWindow.loadURL(message.url)
})

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
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
    mainWindow.webContents.send('initialize', { installedApps })
  })
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
