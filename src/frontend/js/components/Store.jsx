import React, { useState, useEffect, useContext } from 'react'

import Header from './Header'
import findInObject from '~/src/common/findInObject'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const Store = () => {
  const { state, setState } = useContext(MainContext)
  const { appName, apps, appIsOnProcess, installedApps } = state

  useEffect(() => {
    document.title = `Store | ${appName}`
  }, [appName])

  const [filteredApps, setFilteredApps] = useState(apps)

  useEffect(() => { setFilteredApps(apps) }, [apps])

  const searchOnChange = e => {
    const searchTerm = e.target.value.toLowerCase()
    let newApps = {}
    if (searchTerm) {
      for (const key in apps) {
        const app = apps[key]
        const found = app.n.toLowerCase().includes(searchTerm) || app.d.toLowerCase().includes(searchTerm)
        if (found) newApps[key] = app
      }
    } else {
      newApps = apps
    }
    setFilteredApps(newApps)
  }

  const downloadApp = async appId => {
    appIsOnProcess[appId] = true
    setState({ appIsOnProcess })
    const newInstalledApps = await window.ipcRenderer.invoke('downloadApp', appId)
    appIsOnProcess[appId] = false
    setState({ installedApps: newInstalledApps, appIsOnProcess })
  }

  const removeApp = async appId => {
    appIsOnProcess[appId] = true
    setState({ appIsOnProcess })
    const newInstalledApps = await window.ipcRenderer.invoke('removeApp', appId)
    appIsOnProcess[appId] = false
    setState({ installedApps: newInstalledApps, appIsOnProcess })
  }

  return (
    <div id='store'>
      <Header
        searchOnChange={searchOnChange}
        searchInputPlaceholder='Search in Store'
      />

      <div className='apps'>
        {Object.keys(filteredApps).map((appId, key) => {
          const app = filteredApps[appId]
          const appLogo = `https://raw.githubusercontent.com/${app.r}/master/tommy-logo.png`
          const appAuthor = app.r.split('/')[0]
          const appIndex = findInObject({ object: installedApps, search: { id: appId } })
          const appIsInstalled = appIndex && appIndex !== -1
          const _appIsOnProcess = appIsOnProcess[appId]

          return (
            <div key={key} className='app'>
              <div
                className='appLogo'
                style={{ backgroundImage: `url(${appLogo})` }}
              />

              <div className='appDetails'>
                <div className='appName'>
                  {app.n}
                </div>

                <div className='appAuthor'>
                  @{appAuthor}
                </div>

                <div className='appDescription'>
                  {app.d}
                </div>
              </div>

              {
                appIsInstalled
                  ? (
                    <button
                      onClick={() => removeApp(appId)}
                      className='appButton removeButton'
                    >
                      {_appIsOnProcess ? '...' : 'Remove'}
                    </button>
                    )
                  : (
                    <button
                      className='appButton'
                      onClick={() => downloadApp(appId)}
                    >
                      {_appIsOnProcess ? '...' : 'Get'}
                    </button>
                    )
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Store
