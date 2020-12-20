const fs = require('fs')
const path = require('path')
const https = require('https')
const AdmZip = require('adm-zip')

const downloadAppZip = props => {
  const { url, filePath } = props
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    https.get(url, res => {
      if (res.statusCode === 200) {
        res.pipe(file).on('close', resolve)
      } else {
        reject(res.statusCode)
      }
    })
  })
}

const downloadApp = async props => {
  try {
    const { appId, userDataPath, storeInstalledApps } = props

    const apps = require(path.join(__dirname, '..', '..', 'apps.json'))
    const app = apps[appId]
    const url = `https://codeload.github.com/${app.r}/zip/v${app.v}`
    const appFolder = path.join(userDataPath, 'apps', appId)
    const zipPath = path.join(appFolder, `${app.v}.zip`)

    await downloadAppZip({ url, filePath: zipPath })

    const zip = new AdmZip(zipPath)
    zip.extractAllTo(appFolder, true)

    fs.unlinkSync(zipPath)

    const appRepoName = app.r.split('/')[1]
    const oldFolder = path.join(appFolder, `${appRepoName}-${app.v}`)
    const newFolder = path.join(appFolder, app.v)
    fs.renameSync(oldFolder, newFolder)

    const appVersionFolder = path.join(appFolder, app.v)
    const appTommyJsonFilePath = path.join(appVersionFolder, 'tommy.json')
    const appTommyJsonFile = require(appTommyJsonFilePath)

    const unixTime = Math.round(+new Date() / 1000)
    const newInstalledApp = {
      id: appId,
      name: app.n,
      version: app.v,
      description: app.d,
      installationTime: unixTime,
      tommy: appTommyJsonFile
    }
    const installedApps = storeInstalledApps.get('installedApps')
    installedApps.push(newInstalledApp)
    storeInstalledApps.set('installedApps', installedApps)

    return newInstalledApp
  } catch (err) {
    console.log(err)
  }
}

module.exports = downloadApp
