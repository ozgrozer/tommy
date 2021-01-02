const { app, shell } = require('electron')
const updater = require('./updater')

const isMac = process.platform === 'darwin'

const menuTemplate = [
  ...(isMac
    ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          {
            label: 'Check for Updates',
            click () { updater.checkForUpdates() }
          },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }]
    : []),
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ]
        : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ]
      )
    ]
  },
  {
    label: 'View',
    submenu: [
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ]
      )
    ]
  },
  {
    role: 'help',
    submenu: [
      ...(isMac ? {} : { role: 'about' } ),
      ...(isMac
        ? {}
        : {
            label: 'Check for Updates',
            click () { updater.checkForUpdates() }
          }
      ),
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://github.com/ozgrozer/tommy')
        }
      }
    ]
  }
]

module.exports = menuTemplate
