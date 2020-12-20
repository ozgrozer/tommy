import React, { useState, useEffect, useContext } from 'react'
import isElectron from 'is-electron'

import apps from '~/apps.json'
import Header from './Header'
import { MainContext } from '~/src/frontend/js/context/MainContext'

const Store = () => {
  const { state } = useContext(MainContext)
  const { installedApps } = state

  useEffect(() => {
    document.title = `Store | ${state.appName}`
  }, [])

  const [filteredApps, setFilteredApps] = useState(apps)
  const searchOnChange = e => {
    const searchTerm = e.target.value.toLowerCase()
    let newApps = {}
    if (searchTerm) {
      for (const key in apps) {
        const app = apps[key]
        const found = app.n.toLowerCase().includes(searchTerm) || app.d.toLowerCase().includes(searchTerm)
        if (found) newApps[app.id] = app
      }
    } else {
      newApps = apps
    }
    setFilteredApps(newApps)
  }

  const appButtonOnClick = appId => {
    const appIsInstalled = Object.prototype.hasOwnProperty.call(installedApps, appId)

    if (appIsInstalled && isElectron()) {
      window.ipcRenderer.send('createAppWindow', { url: 'https://google.com' })
    }
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
          const appLogo = `https://raw.githubusercontent.com/${app.r}/master/logo.png`
          const appAuthor = app.r.split('/')[0]
          const appIsInstalled = Object.prototype.hasOwnProperty.call(installedApps, appId)

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

              <button
                className='appButton'
                onClick={() => appButtonOnClick(appId)}
              >
                {appIsInstalled ? 'Open' : 'Get'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Store
